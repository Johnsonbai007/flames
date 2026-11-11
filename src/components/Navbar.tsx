import React from 'react';
import { Heart, Volume2, VolumeX, History, Database, Sparkles, HelpCircle } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';
import { useAudio } from '../context/AudioContext';

interface NavbarProps {
  onOpenHistory: () => void;
  recentCount: number;
  onOpenSupabaseModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenHistory,
  recentCount,
  onOpenSupabaseModal,
}) => {
  const { soundEnabled, toggleSound, playPop } = useAudio();

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-xl bg-slate-950/40 border-b border-pink-500/15 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 select-none">
          <div className="relative group flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/30">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-white drop-shadow-md animate-pulse" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-purple-300 font-serif">
                FLAMES
              </span>
              <span className="text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 uppercase tracking-widest hidden xs:inline-block">
                Love
              </span>
            </div>
            <p className="text-[11px] text-pink-200/60 font-medium tracking-wide hidden sm:block">
              Discover Your Love Connection
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Supabase status badge */}
          <button
            onClick={() => {
              playPop();
              onOpenSupabaseModal();
            }}
            title={isSupabaseConfigured ? 'Connected to Supabase' : 'Running in Local Mode (Click for Supabase Setup)'}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              isSupabaseConfigured
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                : 'bg-purple-500/10 text-purple-200/80 border-purple-500/25 hover:bg-purple-500/20'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span className="hidden md:inline">
              {isSupabaseConfigured ? 'Supabase Sync' : 'Local Storage'}
            </span>
            <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
          </button>

          {/* Sound toggle button */}
          <button
            onClick={() => {
              toggleSound();
              playPop();
            }}
            className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-pink-400/50"
            aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
            ) : (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
            )}
          </button>

          {/* History button */}
          <button
            onClick={() => {
              playPop();
              onOpenHistory();
            }}
            className="relative flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-pink-500/15 hover:bg-pink-500/25 border border-pink-500/30 text-pink-200 text-xs sm:text-sm font-medium transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400/50"
            aria-label="View recent calculations"
          >
            <History className="w-4 h-4 text-pink-400" />
            <span className="hidden sm:inline">Recent</span>
            {recentCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-pink-500 text-white text-[11px] font-bold">
                {recentCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
