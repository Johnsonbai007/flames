import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SavedFlamesItem, getLocalFlames, saveLocalFlames } from '../utils/storage';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  typeof supabaseUrl === 'string' &&
  supabaseUrl.trim() !== '' &&
  supabaseUrl.startsWith('http') &&
  supabaseAnonKey.trim() !== '' &&
  !supabaseUrl.includes('your-supabase-url')
);

// Initialize official client only if credentials look valid to avoid initialization crash
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
  savedTo: 'supabase' | 'local';
  data: SavedFlamesItem;
  error?: string;
}

export interface FetchResultsResponse {
  success: boolean;
  source: 'supabase' | 'local';
  data: SavedFlamesItem[];
  error?: string;
}

/**
 * Saves a FLAMES calculation to Supabase if configured.
 * Automatically mirrors to local storage so calculation history is always preserved.
 */
export async function saveFlamesResult(
  yourName: string,
  partnerName: string,
  flamesResult: string
): Promise<SaveResultResponse> {
  // Always save to local storage first as a guaranteed fallback
  const localItem = saveLocalFlames({
    your_name: yourName,
    partner_name: partnerName,
    flames_result: flamesResult,
  });

  if (!isSupabaseConfigured || !supabase) {
    return {
      success: true,
      savedTo: 'local',
      data: localItem,
      error: 'Supabase credentials not configured. Saved to local storage.',
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
        savedTo: 'local',
        data: localItem,
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
      savedTo: 'local',
      data: localItem,
      error: err?.message || 'Network error communicating with Supabase',
    };
  }
}

/**
 * Fetches recent FLAMES calculations.
 * Queries Supabase if available; gracefully falls back to local storage.
 */
export async function fetchRecentFlames(limit = 15): Promise<FetchResultsResponse> {
  if (!isSupabaseConfigured || !supabase) {
    const local = getLocalFlames();
    return {
      success: true,
      source: 'local',
      data: local.slice(0, limit),
      error: 'Supabase is not configured. Showing local history.',
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
      const local = getLocalFlames();
      return {
        success: false,
        source: 'local',
        data: local.slice(0, limit),
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
      source: 'supabase',
      data: formatted,
    };
  } catch (err: any) {
    console.warn('Supabase fetch network error:', err);
    const local = getLocalFlames();
    return {
      success: false,
      source: 'local',
      data: local.slice(0, limit),
      error: err?.message || 'Network error communicating with Supabase',
    };
  }
}
