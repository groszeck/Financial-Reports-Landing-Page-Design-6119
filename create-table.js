import { supabase } from './src/lib/supabase.js';

async function createContactTable() {
  console.log('Attempting to create contact_messages_x8f29a7b4 table...');
  
  try {
    const { data, error } = await supabase.rpc('create_contact_table');
    
    if (error) {
      console.error('Error creating table via RPC:', error);
      
      // Try direct SQL approach if RPC fails
      console.log('Trying direct SQL approach...');
      const { error: sqlError } = await supabase.from('contact_messages_x8f29a7b4')
        .insert({ 
          name: 'Test User', 
          email: 'test@example.com', 
          message: 'This is a test message to verify the table exists or create it.'
        });
      
      if (sqlError) {
        if (sqlError.code === '42P01') { // Table doesn't exist error
          console.log('Table does not exist. Creating table...');
          
          // Create the table with SQL
          const { error: createError } = await supabase.rpc('exec_sql', {
            sql: `
              CREATE TABLE IF NOT EXISTS contact_messages_x8f29a7b4 (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT,
                message TEXT NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
              );
              
              ALTER TABLE contact_messages_x8f29a7b4 ENABLE ROW LEVEL SECURITY;
              
              CREATE POLICY "Allow anonymous inserts" ON contact_messages_x8f29a7b4
                FOR INSERT WITH CHECK (true);
                
              CREATE POLICY "Allow authenticated reads" ON contact_messages_x8f29a7b4
                FOR SELECT USING (auth.role() = 'authenticated');
                
              CREATE POLICY "Allow authenticated deletes" ON contact_messages_x8f29a7b4
                FOR DELETE USING (auth.role() = 'authenticated');
            `
          });
          
          if (createError) {
            console.error('Failed to create table with exec_sql:', createError);
            return { success: false, error: createError };
          }
          
          console.log('Table created successfully!');
          return { success: true };
        }
        
        console.error('Error testing table insertion:', sqlError);
        return { success: false, error: sqlError };
      }
      
      console.log('Table exists and test insert successful!');
      return { success: true };
    }
    
    console.log('Table created via RPC successfully!', data);
    return { success: true, data };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: err };
  }
}

// Run the function
createContactTable().then(result => {
  console.log('Operation completed:', result);
});