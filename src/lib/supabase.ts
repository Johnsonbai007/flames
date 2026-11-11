import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export interface SavedFlamesItem {
  id: string;
  your_name: string;
  partner_name: string;
  flames_result: string;
  created_at: string;
  source?: 'supabase' | 'session';
}

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  typeof supabaseUrl === 'string' &&
  supabaseUrl.trim() !== '' &&
  supabaseUrl.startsWith('http') &&
  supabaseAnonKey.trim() !== '' &&
  !supabaseUrl.includes('your-supabase-url')
);

// Initialize official client only if credentials look valid
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

export interface SaveResultResponse {
  success: boolean;
  savedTo: 'supabase' | null;
  data: SavedFlamesItem;
  error?: string;
}

export interface FetchResultsResponse {
  success: boolean;
  data: SavedFlamesItem[];
  error?: string;
}

/**
 * Saves a FLAMES calculation directly to Supabase if configured.
 * Does not use localStorage.
 */
export async function saveFlamesResult(
  yourName: string,
  partnerName: string,
  flamesResult: string
): Promise<SaveResultResponse> {
  const sessionItem: SavedFlamesItem = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'calc-' + Date.now(),
    your_name: yourName.trim(),
    partner_name: partnerName.trim(),
    flames_result: flamesResult.trim(),
    created_at: new Date().toISOString(),
    source: 'session',
  };

  if (!isSupabaseConfigured || !supabase) {
    return {
      success: true,
      savedTo: null,
      data: sessionItem,
    };
  }

  try {
    const { data, error } = await supabase
      .from('flames_results')
      .insert([
        {
          your_name: yourName.trim(),
          partner_name: partnerName.trim(),
          flames_result: flamesResult.trim(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.warn('Supabase insert failed:', error.message);
      return {
        success: false,
        savedTo: null,
        data: sessionItem,
        error: error.message,
      };
    }

    const savedItem: SavedFlamesItem = {
      id: data.id,
      your_name: data.your_name,
      partner_name: data.partner_name,
      flames_result: data.flames_result,
      created_at: data.created_at,
      source: 'supabase',
    };

    return {
      success: true,
      savedTo: 'supabase',
      data: savedItem,
    };
  } catch (err: any) {
    console.warn('Supabase network error during insert:', err);
    return {
      success: false,
      savedTo: null,
      data: sessionItem,
      error: err?.message || 'Network error communicating with Supabase',
    };
  }
}

/**
 * Fetches recent FLAMES calculations directly from Supabase if configured.
 * Does not use localStorage.
 */
export async function fetchRecentFlames(limit = 15): Promise<FetchResultsResponse> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      success: true,
      data: [],
    };
  }

  try {
    const { data, error } = await supabase
      .from('flames_results')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.warn('Supabase select error:', error.message);
      return {
        success: false,
        data: [],
        error: error.message,
      };
    }

    const formatted: SavedFlamesItem[] = (data || []).map((row) => ({
      id: row.id,
      your_name: row.your_name,
      partner_name: row.partner_name,
      flames_result: row.flames_result,
      created_at: row.created_at,
      source: 'supabase',
    }));

    return {
      success: true,
      data: formatted,
    };
  } catch (err: any) {
    console.warn('Supabase fetch network error:', err);
    return {
      success: false,
      data: [],
      error: err?.message || 'Network error communicating with Supabase',
    };
  }
}
