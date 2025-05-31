import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Check if environment variables are set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

// Create a single supabase client for interacting with your database
export const supabase: SupabaseClient<Database> = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
});

// Type definitions for our database schema
type Tables = Database['public']['Tables'];
type Books = Tables['books']['Row'];
type BooksWithAuthors = Books & {
  book_authors: Array<{
    author: Tables['authors']['Row'];
    is_primary: boolean;
  }>;
};

// Helper function to handle errors
class SupabaseError extends Error {
  constructor(message: string, public originalError: unknown) {
    super(message);
    this.name = 'SupabaseError';
    if (originalError instanceof Error) {
      this.stack = originalError.stack;
    }
  }
}

export const handleSupabaseError = (error: unknown): never => {
  if (process.env.NEXT_PUBLIC_DEBUG === 'true') {
    console.error('Supabase error details:', error);
  }
  
  if (error instanceof Error) {
    throw new SupabaseError(error.message, error);
  }
  
  throw new SupabaseError('An unknown error occurred', error);
};

// Auth functions
export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    handleSupabaseError(error);
  }
};

export const signUp = async (email: string, password: string, userData: {
  username: string;
  full_name: string;
}) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: userData.username,
          full_name: userData.full_name,
        },
      },
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    handleSupabaseError(error);
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    handleSupabaseError(error);
  }
};

// Database functions
type FetchBooksOptions = {
  search?: string;
  query?: string; // Keeping for backward compatibility
  limit?: number;
  offset?: number;
  authorId?: string;
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  orderBy?: keyof Database['public']['Tables']['books']['Row'];
  ascending?: boolean;
};

export const fetchBooks = async ({
  search = '',
  query = '', // Keeping for backward compatibility
  limit = 10,
  offset = 0,
  authorId,
  status,
  orderBy = 'title' as const,
  ascending = true,
}: FetchBooksOptions = {}) => {
  try {
    // Use search parameter if provided, otherwise fall back to query for backward compatibility
    const searchTerm = search || query;
    
    let queryBuilder = supabase
      .from('books')
      .select(`
        *,
        book_authors!inner(
          author:author_id (
            id,
            name
          ),
          is_primary
        )
      `, { count: 'exact' })
      .order(orderBy, { ascending })
      .range(offset, offset + limit - 1);

    if (searchTerm) {
      queryBuilder = queryBuilder.ilike('title', `%${searchTerm}%`);
    }

    if (authorId) {
      queryBuilder = queryBuilder.eq('book_authors.author_id', authorId);
    }

    if (status) {
      queryBuilder = queryBuilder.eq('status', status);
    }

    const { data, error, count } = await queryBuilder;
    
    if (error) throw error;
    
    // Transform the data to match our expected format
    const transformedData = data?.map(book => ({
      ...book,
      authors: book.book_authors?.map((ba: { 
        author: { id: string; name: string } | string; 
        is_primary: boolean 
      }) => ({
        id: typeof ba.author === 'object' ? ba.author?.id : ba.author,
        name: typeof ba.author === 'object' ? ba.author?.name : 'Unknown Author',
        is_primary: ba.is_primary
      })) || []
    })) || [];
    
    return { 
      data: transformedData, 
      count: count || 0,
      error: null 
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error fetching books:', error);
    return { 
      data: [], 
      count: 0,
      error: errorMessage 
    };
  }
};

export const fetchBookById = async (id: string): Promise<BooksWithAuthors | null> => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select(`
        *,
        book_authors(
          is_primary,
          author:author_id (*)
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as BooksWithAuthors;
  } catch (error) {
    if ((error as any)?.code === 'PGRST116') {
      // No rows returned (not found)
      return null;
    }
    handleSupabaseError(error);
    return null;
  }
};

// File upload function
export const uploadFile = async (file: File, path: string) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;
    
    const { data, error } = await supabase.storage
      .from('book_covers')
      .upload(filePath, file);
    
    if (error) throw error;
    
    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('book_covers')
      .getPublicUrl(filePath);
    
    return {
      path: filePath,
      url: publicUrl,
    };
  } catch (error) {
    handleSupabaseError(error);
    return null;
  }
};

// Subscribe to real-time changes
export const subscribeToBooks = (
  callback: (payload: any) => void,
  filter?: string
) => {
  let subscription = supabase
    .channel('books')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'books',
        ...(filter ? { filter } : {}),
      },
      (payload) => callback(payload)
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
};
