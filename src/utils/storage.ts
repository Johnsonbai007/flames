export interface SavedFlamesItem {
  id: string;
  your_name: string;
  partner_name: string;
  flames_result: string;
  created_at: string;
  source?: 'supabase' | 'local';
}

const LOCAL_STORAGE_KEY = 'flames_recent_calculations_v1';
const MAX_LOCAL_ITEMS = 30;

export function getLocalFlames(): SavedFlamesItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.warn('Failed to read from localStorage:', err);
    return [];
  }
}

export function saveLocalFlames(item: Omit<SavedFlamesItem, 'id' | 'created_at'> & { id?: string; created_at?: string }): SavedFlamesItem {
  const newItem: SavedFlamesItem = {
    id: item.id || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'local-' + Date.now()),
    your_name: item.your_name,
    partner_name: item.partner_name,
    flames_result: item.flames_result,
    created_at: item.created_at || new Date().toISOString(),
    source: 'local',
  };

  try {
    const existing = getLocalFlames();
    // Prepend new item and filter out duplicates with the same names within a short window
    const filtered = existing.filter(
      (e) => !(e.your_name.toLowerCase() === newItem.your_name.toLowerCase() && 
               e.partner_name.toLowerCase() === newItem.partner_name.toLowerCase())
    );
    const updated = [newItem, ...filtered].slice(0, MAX_LOCAL_ITEMS);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to save to localStorage:', err);
  }

  return newItem;
}

export function clearLocalFlames(): void {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear localStorage:', err);
  }
}
