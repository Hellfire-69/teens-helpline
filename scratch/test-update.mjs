import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sdjzjoxrioardgrfkydm.supabase.co';
const supabaseKey = 'sb_publishable_Ee3I-EQ4w8bcWMCCXEZFvA_S7V2ubY7';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  try {
    const res = await supabase
      .from('nova_conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', 'some-invalid-uuid');
      
    console.log('Result:', res);
  } catch (err) {
    console.error('Caught error:', err);
  }
}

test();
