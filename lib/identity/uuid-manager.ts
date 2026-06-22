export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older environments
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function getLocalSpaceId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('teens_helpline_space_id');
}

export function setLocalSpaceId(id: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('teens_helpline_space_id', id);
}

export function clearLocalSpaceId(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('teens_helpline_space_id');
}
