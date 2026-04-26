import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dpuxzvhhymceylqsjecr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwdXh6dmhoeW1jZXlscXNqZWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MzA2MTYsImV4cCI6MjA5MTEwNjYxNn0.cA7UbW1dcQh-xLDh_EW9yMFLz-ziPHxDGPxyyHw7A4k'
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkAnalyses() {
  const { data, error, count } = await supabase
    .from('analyses')
    .select('*', { count: 'exact' })
  
  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Total analyses in DB:', count)
    console.log('Recent analyses:', data?.slice(0, 5))
  }
}

checkAnalyses()
