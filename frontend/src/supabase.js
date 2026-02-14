
import { createClient } from '@supabase/supabase-js';

// Use environment variables for security and Vercel compatibility
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL and Anon Key are required! Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file or Vercel dashboard.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
