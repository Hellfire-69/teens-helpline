import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

// For static builds, Next.js requires these to be defined. If missing in production, it will fail loudly.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);
