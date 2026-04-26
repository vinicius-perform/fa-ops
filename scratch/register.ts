import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dpuxzvhhymceylqsjecr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwdXh6dmhoeW1jZXlscXNqZWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MzA2MTYsImV4cCI6MjA5MTEwNjYxNn0.cA7UbW1dcQh-xLDh_EW9yMFLz-ziPHxDGPxyyHw7A4k'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function register() {
  console.log('Registering user...')
  const { data, error } = await supabase.auth.signUp({
    email: 'viniciusmarinhods@gmail.com',
    password: 'admin@FA1',
    options: {
      data: {
        full_name: 'Vinícius Marinho',
      }
    }
  })

  if (error) {
    console.error('Error during registration:', error.message)
    // If user already exists, it's fine
    if (error.message.includes('already registered')) {
        console.log('User already exists. Proceeding.')
    }
  } else {
    console.log('User registered successfully:', data.user?.email)
  }
}

register()
