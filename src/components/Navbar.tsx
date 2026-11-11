import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-xl bg-slate-950/40 border-b border-pink-500/15 transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
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

        {/* Right side decorative romantic pill */}
        <div className="flex items-center">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border bg-white/5 text-pink-200/80 border-pink-500/20 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline">Cosmic Compatibility</span>
          </div>
        </div>
      </div>
    </header>
  );
};
