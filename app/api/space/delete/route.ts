import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(request: Request) {
  try {
    const { spaceId } = await request.json();

    if (!spaceId) {
      return NextResponse.json({ error: 'spaceId is required' }, { status: 400 });
    }

    // 1. Delete nova_messages associated with this space's conversations
    const { data: convs } = await supabase
      .from('nova_conversations')
      .select('id')
      .eq('space_id', spaceId);
      
    if (convs && convs.length > 0) {
      const convIds = convs.map(c => c.id);
      await supabase.from('nova_messages').delete().in('conversation_id', convIds);
      await supabase.from('nova_conversations').delete().in('id', convIds);
    }

    // 2. Delete all other rows associated with spaceId
    await Promise.all([
      supabase.from('mood_entries').delete().eq('space_id', spaceId),
      supabase.from('journal_entries').delete().eq('space_id', spaceId),
      supabase.from('saved_articles').delete().eq('space_id', spaceId),
      supabase.from('user_settings').delete().eq('space_id', spaceId),
    ]);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
