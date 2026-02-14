
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://woimqaerbwkpmhbjnwgr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvaW1xYWVyYndrcG1oYmpud2dyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNjg3NDAsImV4cCI6MjA4NjY0NDc0MH0.GzvmgcRMels7u1amEbTvSZZJA9aWUDDM0MXdOAqVSJk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
