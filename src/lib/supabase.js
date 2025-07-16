import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://nyfxhyrdhsiogjurhxsa.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55ZnhoeXJkaHNpb2dqdXJoeHNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NzIzNDQsImV4cCI6MjA2ODI0ODM0NH0.zuQ39j-jhCQl7LLJVdAofUzsCjpLuFQst69g31AdnEI'

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})

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