import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ixhxlczplucyczkiscxs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4aHhsY3pwbHVjeWN6a2lzY3hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MjcxNDYsImV4cCI6MjA2NjUwMzE0Nn0.vGBLZS1EdFDkhhXTITu1DLCtQq4XYvFD47cGmzbp_lw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test connection
console.log('Testing Supabase connection...')
supabase.auth.getSession()
  .then(({ data, error }) => {
    if (error) {
      console.error('Supabase connection error:', error)
    } else {
      console.log('Supabase connected successfully')
    }
  })
  .catch(err => {
    console.error('Failed to connect to Supabase:', err)
  })