// Ten skrypt tworzy tabelę w Supabase przy użyciu API SQL

import { supabase } from './src/lib/supabase.js';

async function createContactTable() {
  console.log('Próbuję utworzyć tabelę contact_messages_x8f29a7b4...');
  
  try {
    // Spróbuj utworzyć tabelę za pomocą SQL
    const { error } = await supabase.rpc('exec_sql', {
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
    
    if (error) {
      console.error('Błąd podczas tworzenia tabeli:', error);
      return { success: false, error };
    }
    
    console.log('Tabela utworzona pomyślnie!');
    return { success: true };
    
  } catch (err) {
    console.error('Nieoczekiwany błąd:', err);
    return { success: false, error: err };
  }
}

// Uruchom funkcję
createContactTable().then(result => {
  console.log('Operacja zakończona:', result);
});