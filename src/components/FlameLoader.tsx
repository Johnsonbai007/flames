import React, { useEffect, useState } from 'react';
import { Heart, Sparkles, Flame } from 'lucide-react';

interface FlameLoaderProps {
  name1: string;
  name2: string;
}

const PHASES = [
  'Aligning cosmic frequencies...',
  'Striking through matching letters...',
  'Running traditional elimination wheel...',
  'Destiny calculated! Preparing reveal...',
];

const LETTERS = ['F', 'L', 'A', 'M', 'E', 'S'];

export const FlameLoader: React.FC<FlameLoaderProps> = ({ name1, name2 }) => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [activeLetterIdx, setActiveLetterIdx] = useState(0);

  useEffect(() => {
    const phaseTimer = setInterval(() => {
      setPhaseIndex((prev) => (prev < PHASES.length - 1 ? prev + 1 : prev));
    }, 450);

    const letterTimer = setInterval(() => {
      setActiveLetterIdx((prev) => (prev + 1) % LETTERS.length);
    }, 120);

    return () => {
      clearInterval(phaseTimer);
      clearInterval(letterTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md glass-card rounded-3xl p-8 sm:p-10 border border-pink-400/30 text-center shadow-[0_0_80px_rgba(244,63,94,0.3)]">
        {/* Animated pulsating heart ring */}
        <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-600 animate-ping opacity-25" />
          <div className="absolute -inset-2 rounded-full border border-pink-400/40 animate-spin" style={{ animationDuration: '4s' }} />
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-rose-600 via-pink-600 to-purple-600 flex items-center justify-center shadow-xl shadow-pink-500/50">
            <Heart className="w-12 h-12 text-white fill-white animate-bounce" />
          </div>
        </div>

        {/* Couple names connected */}
        <div className="flex items-center justify-center gap-2 text-lg sm:text-xl font-bold text-white mb-4">
          <span className="text-rose-300 truncate max-w-[140px]">{name1}</span>
          <Heart className="w-4 h-4 text-pink-400 fill-pink-400 shrink-0" />
          <span className="text-purple-300 truncate max-w-[140px]">{name2}</span>
        </div>

        {/* Cycling FLAMES letters */}
        <div className="flex justify-center gap-2 mb-6">
          {LETTERS.map((letter, idx) => {
            const isActive = idx === activeLetterIdx;
            return (
              <span
                key={letter}
                className={`w-9 h-9 rounded-xl font-black text-sm flex items-center justify-center transition-all duration-150 ${
                  isActive
                    ? 'bg-gradient-to-tr from-rose-500 to-pink-500 text-white scale-125 shadow-lg shadow-pink-500/60 border border-white/60'
                    : 'bg-white/5 text-pink-200/50 border border-white/10'
                }`}
              >
                {letter}
              </span>
            );
          })}
        </div>

        {/* Phase status text */}
        <p className="text-sm sm:text-base font-medium text-pink-100 flex items-center justify-center gap-2 h-6">
          <Sparkles className="w-4 h-4 text-pink-400 animate-spin" />
          <span>{PHASES[phaseIndex]}</span>
        </p>

        {/* Glowing mini progress bar */}
        <div className="w-full bg-white/10 h-1.5 rounded-full mt-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 transition-all duration-500 rounded-full"
            style={{ width: `${((phaseIndex + 1) / PHASES.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
