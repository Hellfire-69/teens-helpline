import { supabase } from '@/lib/supabase/client';
import { generateUUID, getLocalSpaceId, setLocalSpaceId } from '@/lib/identity/uuid-manager';

export const identityService = {
  async initializeIdentity(): Promise<string> {
    const existingId = getLocalSpaceId();
    if (existingId) {
      // In a real implementation we might update last_active here
      return existingId;
    }

    const newId = generateUUID();
    setLocalSpaceId(newId);

    // Persist to Supabase
    try {
      const { error } = await supabase.from('users').insert({
        id: newId,
        created_at: new Date().toISOString(),
        last_active: new Date().toISOString(),
      });

      if (error) {
        console.error('Failed to create user space in DB:', error);
      }
    } catch (e) {
      console.error('Error during space creation:', e);
    }

    return newId;
  }
};
