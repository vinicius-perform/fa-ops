import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dpuxzvhhymceylqsjecr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwdXh6dmhoeW1jZXlscXNqZWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MzA2MTYsImV4cCI6MjA5MTEwNjYxNn0.cA7UbW1dcQh-xLDh_EW9yMFLz-ziPHxDGPxyyHw7A4k'
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkOtherTables() {
  const { data: clients } = await supabase.from('clients').select('*').limit(1)
  const { data: tasks } = await supabase.from('tasks').select('*').limit(1)
  
  console.log('Client sample:', clients?.[0])
  console.log('Task sample:', tasks?.[0])
}

checkOtherTables()
