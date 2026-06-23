import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sdjzjoxrioardgrfkydm.supabase.co';
const supabaseKey = 'sb_publishable_Ee3I-EQ4w8bcWMCCXEZFvA_S7V2ubY7';
const supabase = createClient(supabaseUrl, supabaseKey);

async function simulateSendMessage() {
  try {
    const spaceId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'; // valid uuid
    
    // 1. Create conversation
    const { data: conv, error: convError } = await supabase
      .from('nova_conversations')
      .insert({ space_id: spaceId })
      .select()
      .single();
    if (convError) throw convError;
    console.log('Conversation created:', conv.id);

    // 2. Create message
    const content = 'hello nova';
    const { data: userMessage, error: msgError } = await supabase
      .from('nova_messages')
      .insert({ conversation_id: conv.id, role: 'user', content })
      .select()
      .single();
    
    if (msgError) throw msgError;
    console.log('Message created:', userMessage.id);

    // 3. Update conversation
    await supabase
      .from('nova_conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conv.id);

    console.log('Message creation logic succeeded without errors.');

  } catch (err) {
    console.error('Error during simulation:', err);
  }
}

simulateSendMessage();
