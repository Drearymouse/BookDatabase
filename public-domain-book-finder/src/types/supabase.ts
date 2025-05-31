export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          role: 'user' | 'admin'
          preferences: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      authors: {
        Row: {
          id: string
          name: string
          viaf_id: string | null
          birth_date: string | null
          death_date: string | null
          bio: string | null
          wikipedia_url: string | null
          image_url: string | null
          created_at: string
          updated_at: string
          created_by: string
        }
        Insert: {
          id?: string
          name: string
          viaf_id?: string | null
          birth_date?: string | null
          death_date?: string | null
          bio?: string | null
          wikipedia_url?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
          created_by: string
        }
        Update: {
          id?: string
          name?: string
          viaf_id?: string | null
          birth_date?: string | null
          death_date?: string | null
          bio?: string | null
          wikipedia_url?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string
        }
      }
      books: {
        Row: {
          id: string
          title: string
          subtitle: string | null
          original_title: string | null
          description: string | null
          language_code: string | null
          page_count: number | null
          publication_date: string | null
          original_publication_year: number | null
          isbn_10: string | null
          isbn_13: string | null
          cover_image_url: string | null
          cover_image_path: string | null
          status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
          copyright_status: 'PUBLIC_DOMAIN' | 'COPYRIGHTED' | 'UNKNOWN' | 'NEEDS_REVIEW'
          copyright_notes: string | null
          copyright_confidence: number | null
          created_at: string
          updated_at: string
          created_by: string
        }
        Insert: {
          id?: string
          title: string
          subtitle?: string | null
          original_title?: string | null
          description?: string | null
          language_code?: string | null
          page_count?: number | null
          publication_date?: string | null
          original_publication_year?: number | null
          isbn_10?: string | null
          isbn_13?: string | null
          cover_image_url?: string | null
          cover_image_path?: string | null
          status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
          copyright_status?: 'PUBLIC_DOMAIN' | 'COPYRIGHTED' | 'UNKNOWN' | 'NEEDS_REVIEW'
          copyright_notes?: string | null
          copyright_confidence?: number | null
          created_at?: string
          updated_at?: string
          created_by: string
        }
        Update: {
          id?: string
          title?: string
          subtitle?: string | null
          original_title?: string | null
          description?: string | null
          language_code?: string | null
          page_count?: number | null
          publication_date?: string | null
          original_publication_year?: number | null
          isbn_10?: string | null
          isbn_13?: string | null
          cover_image_url?: string | null
          cover_image_path?: string | null
          status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
          copyright_status?: 'PUBLIC_DOMAIN' | 'COPYRIGHTED' | 'UNKNOWN' | 'NEEDS_REVIEW'
          copyright_notes?: string | null
          copyright_confidence?: number | null
          created_at?: string
          updated_at?: string
          created_by?: string
        }
      }
      book_authors: {
        Row: {
          id: string
          book_id: string
          author_id: string
          role: string | null
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          book_id: string
          author_id: string
          role?: string | null
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          book_id?: string
          author_id?: string
          role?: string | null
          is_primary?: boolean
          created_at?: string
        }
      }
      book_metadata: {
        Row: {
          id: string
          book_id: string
          source: string
          source_id: string
          url: string | null
          metadata: Json
          last_synced_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          book_id: string
          source: string
          source_id: string
          url?: string | null
          metadata: Json
          last_synced_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          book_id?: string
          source?: string
          source_id?: string
          url?: string | null
          metadata?: Json
          last_synced_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      sales_potential: {
        Row: {
          id: string
          book_id: string
          overall_score: number | null
          demand_score: number | null
          competition_score: number | null
          kdp_competitors: number | null
          avg_kdp_price: number | null
          amazon_bestsellers_rank: number | null
          google_trends_score: number | null
          wikipedia_views_30d: number | null
          wikipedia_views_90d: number | null
          wikipedia_views_365d: number | null
          notes: string | null
          last_analyzed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          book_id: string
          overall_score?: number | null
          demand_score?: number | null
          competition_score?: number | null
          kdp_competitors?: number | null
          avg_kdp_price?: number | null
          amazon_bestsellers_rank?: number | null
          google_trends_score?: number | null
          wikipedia_views_30d?: number | null
          wikipedia_views_90d?: number | null
          wikipedia_views_365d?: number | null
          notes?: string | null
          last_analyzed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          book_id?: string
          overall_score?: number | null
          demand_score?: number | null
          competition_score?: number | null
          kdp_competitors?: number | null
          avg_kdp_price?: number | null
          amazon_bestsellers_rank?: number | null
          google_trends_score?: number | null
          wikipedia_views_30d?: number | null
          wikipedia_views_90d?: number | null
          wikipedia_views_365d?: number | null
          notes?: string | null
          last_analyzed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_book_lists: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      list_items: {
        Row: {
          id: string
          list_id: string
          book_id: string
          notes: string | null
          status: string | null
          priority: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          list_id: string
          book_id: string
          notes?: string | null
          status?: string | null
          priority?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          list_id?: string
          book_id?: string
          notes?: string | null
          status?: string | null
          priority?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      research_notes: {
        Row: {
          id: string
          user_id: string
          book_id: string
          title: string
          content: string
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          book_id: string
          title: string
          content: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          book_id?: string
          title?: string
          content?: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      book_search: {
        Row: {
          id: string | null
          title: string | null
          subtitle: string | null
          year: number | null
          cover_image_url: string | null
          copyright_status: string | null
          copyright_confidence: number | null
          status: string | null
          authors: string[] | null
          sales_potential_score: number | null
          demand_score: number | null
          competition_score: number | null
          kdp_competitors: number | null
          amazon_bestsellers_rank: number | null
        }
      }
    }
    Functions: {
      search_books: {
        Args: {
          search_term: string
          limit_rows?: number
          offset_rows?: number
        }
        Returns: {
          id: string
          title: string
          subtitle: string | null
          year: number | null
          cover_image_url: string | null
          copyright_status: string
          copyright_confidence: number | null
          sales_potential_score: number | null
          authors: string[] | null
          similarity: number
        }[]
      }
      calculate_copyright_status: {
        Args: {
          p_publication_year: number
          p_author_death_year: number
          p_country_code?: string
        }
        Returns: Json
      }
      calculate_sales_potential: {
        Args: {
          p_demand_score: number
          p_competition_score: number
          p_kdp_competitors: number
          p_amazon_rank: number
        }
        Returns: number
      }
    }
    Enums: {
      user_role: 'user' | 'admin'
      copyright_status: 'PUBLIC_DOMAIN' | 'COPYRIGHTED' | 'UNKNOWN' | 'NEEDS_REVIEW'
      book_status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
