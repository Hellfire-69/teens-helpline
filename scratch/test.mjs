import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sdjzjoxrioardgrfkydm.supabase.co';
const supabaseKey = 'sb_publishable_Ee3I-EQ4w8bcWMCCXEZFvA_S7V2ubY7';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  try {
    const spaceId = 'test-space-id';
    
    let { data: conv, error: convError } = await supabase
      .from('nova_conversations')
      .insert({ space_id: spaceId })
      .select()
      .single();
      
    if (convError) throw convError;
    
    console.log('Conversation created:', conv.id);

    const { data: userMessage, error: msgError } = await supabase
      .from('nova_messages')
      .insert({ conversation_id: conv.id, role: 'user', content: 'hello' })
      .select()
      .single();
      
    if (msgError) throw msgError;
    
    console.log('Message created:', userMessage.id);

    await supabase
      .from('nova_conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conv.id);
      
    console.log('Conversation updated');
    
    // Cleanup
    await supabase.from('nova_conversations').delete().eq('id', conv.id);

  } catch (err) {
    console.error('Error:', err);
  }
}

test();
