import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://scojfbyhvlwlbnwwutke.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjb2pmYnlodmx3bGJud3d1dGtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NjA5MTQsImV4cCI6MjA2ODEzNjkxNH0.Q5riV53eC0Z1SONMBKi0BpJcs5aVQJxTDZZI8ZlG1GU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 