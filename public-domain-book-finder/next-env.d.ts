/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY?: string;
    NEXT_PUBLIC_PROJECT_GUTENBERG_API_URL?: string;
    NEXT_PUBLIC_WIKIPEDIA_API_URL?: string;
    NEXT_PUBLIC_GOOGLE_TRENDS_API_KEY?: string;
    NEXT_PUBLIC_DEBUG?: string;
  }
}
