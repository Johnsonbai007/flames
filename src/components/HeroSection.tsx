import React, { useState } from 'react';
import { Heart, Sparkles, ArrowRightLeft, Flame, User, X, Wand2 } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

interface HeroSectionProps {
  onCalculate: (name1: string, name2: string) => void;
  isLoading: boolean;
}

const SAMPLE_COUPLES = [
  { name1: 'Romeo', name2: 'Juliet' },
  { name1: 'Jack', name2: 'Rose' },
  { name1: 'Tony', name2: 'Pepper' },
  { name1: 'Noah', name2: 'Allie' },
  { name1: 'Edward', name2: 'Bella' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onCalculate, isLoading }) => {
  const [yourName, setYourName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [errors, setErrors] = useState<{ yourName?: string; partnerName?: string }>({});
  const { playPop } = useAudio();

  const handleSwap = () => {
    playPop();
    setYourName(partnerName);
    setPartnerName(yourName);
    setErrors({});
  };

  const handleSampleClick = (sample1: string, sample2: string) => {
    playPop();
    setYourName(sample1);
    setPartnerName(sample2);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playPop();

    const clean1 = yourName.trim();
    const clean2 = partnerName.trim();

    const newErrors: { yourName?: string; partnerName?: string } = {};

    if (!clean1) {
      newErrors.yourName = 'Please enter your name ❤️';
    } else if (!/[a-zA-Z]/.test(clean1)) {
      newErrors.yourName = 'Name must contain at least one letter';
    }

    if (!clean2) {
      newErrors.partnerName = "Please enter your partner's name ❤️";
    } else if (!/[a-zA-Z]/.test(clean2)) {
      newErrors.partnerName = 'Partner name must contain at least one letter';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onCalculate(clean1, clean2);
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center text-center">
      {/* Decorative celestial pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-rose-500/20 border border-pink-400/30 text-pink-200 text-xs sm:text-sm font-medium tracking-wide mb-6 shadow-[0_0_20px_rgba(244,63,94,0.2)] animate-pulse">
        <Sparkles className="w-4 h-4 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Authentic Traditional FLAMES Algorithm</span>
        <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
      </div>

      {/* Hero Heading */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-serif text-white max-w-3xl leading-[1.1] mb-4">
        Discover Your Love Story{' '}
        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 drop-shadow-sm">
          ❤️
        </span>
      </h1>

      {/* Hero Subtitle */}
      <p className="text-base sm:text-xl text-pink-100/75 max-w-xl font-light mb-8 sm:mb-10 leading-relaxed">
        Two names, one destiny. Let's see what the universe says!
      </p>

      {/* Main Glassmorphism Form Card */}
      <div className="w-full max-w-2xl relative">
        {/* Glow backdrop behind card */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-rose-500/30 via-pink-500/25 to-purple-600/30 rounded-3xl blur-2xl opacity-75" />

        <div className="relative glass-card rounded-3xl p-6 sm:p-9 shadow-2xl border border-pink-400/20 text-left">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 relative">
              {/* Field 1: Your Name */}
              <div className="space-y-2">
                <label
                  htmlFor="your-name"
                  className="flex items-center justify-between text-xs sm:text-sm font-medium text-pink-200/90"
                >
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-rose-400" />
                    Enter Your Name
                  </span>
                  {yourName && (
                    <span className="text-[11px] text-pink-300/60 uppercase tracking-wider font-mono">
                      {yourName.replace(/[^a-zA-Z]/g, '').length} letters
                    </span>
                  )}
                </label>
                <div className="relative">
                  <input
                    id="your-name"
                    type="text"
                    value={yourName}
                    onChange={(e) => {
                      setYourName(e.target.value);
                      if (errors.yourName) setErrors((prev) => ({ ...prev, yourName: undefined }));
                    }}
                    placeholder="e.g. Alexander"
                    autoComplete="off"
                    className={`w-full px-4 py-3.5 sm:py-4 rounded-2xl glass-input text-base sm:text-lg placeholder:text-pink-300/30 transition-all ${
                      errors.yourName ? 'border-red-400/80 bg-red-950/20' : ''
                    }`}
                  />
                  {yourName && (
                    <button
                      type="button"
                      onClick={() => setYourName('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-pink-300/50 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label="Clear your name"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {errors.yourName && (
                  <p className="text-xs text-rose-400 font-medium flex items-center gap-1 pt-0.5">
                    <Heart className="w-3 h-3 fill-rose-400 shrink-0" />
                    {errors.yourName}
                  </p>
                )}
              </div>

              {/* Swap Button for Desktop & Mobile */}
              <div className="hidden md:flex absolute left-1/2 top-11 -translate-x-1/2 z-10">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="p-2.5 rounded-full bg-slate-900/90 border border-pink-400/40 text-pink-300 hover:text-white hover:scale-110 active:scale-95 transition-all shadow-lg hover:border-pink-400 shadow-pink-500/20"
                  title="Swap names"
                  aria-label="Swap names"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Field 2: Partner's Name */}
              <div className="space-y-2">
                <label
                  htmlFor="partner-name"
                  className="flex items-center justify-between text-xs sm:text-sm font-medium text-pink-200/90"
                >
                  <span className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-pink-400 fill-pink-400/40" />
                    Enter Your Partner's Name
                  </span>
                  {partnerName && (
                    <span className="text-[11px] text-pink-300/60 uppercase tracking-wider font-mono">
                      {partnerName.replace(/[^a-zA-Z]/g, '').length} letters
                    </span>
                  )}
                </label>
                <div className="relative">
                  <input
                    id="partner-name"
                    type="text"
                    value={partnerName}
                    onChange={(e) => {
                      setPartnerName(e.target.value);
                      if (errors.partnerName) setErrors((prev) => ({ ...prev, partnerName: undefined }));
                    }}
                    placeholder="e.g. Elizabeth"
                    autoComplete="off"
                    className={`w-full px-4 py-3.5 sm:py-4 rounded-2xl glass-input text-base sm:text-lg placeholder:text-pink-300/30 transition-all ${
                      errors.partnerName ? 'border-red-400/80 bg-red-950/20' : ''
                    }`}
                  />
                  {partnerName && (
                    <button
                      type="button"
                      onClick={() => setPartnerName('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-pink-300/50 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label="Clear partner's name"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {errors.partnerName && (
                  <p className="text-xs text-rose-400 font-medium flex items-center gap-1 pt-0.5">
                    <Heart className="w-3 h-3 fill-rose-400 shrink-0" />
                    {errors.partnerName}
                  </p>
                )}
              </div>
            </div>

            {/* Mobile Swap Button */}
            <div className="flex md:hidden justify-center -my-1">
              <button
                type="button"
                onClick={handleSwap}
                className="flex items-center gap-1.5 text-xs text-pink-300/80 hover:text-white px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Swap Names</span>
              </button>
            </div>

            {/* Calculate Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full overflow-hidden rounded-2xl p-[2px] font-semibold transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-pink-500/40 disabled:opacity-60 disabled:hover:scale-100"
              >
                {/* Animated rainbow gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 rounded-2xl animate-pulse-glow" />

                {/* Inner button surface */}
                <div className="relative flex items-center justify-center gap-3 px-6 py-4 sm:py-4.5 rounded-[14px] bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white text-base sm:text-lg font-bold shadow-xl">
                  {/* Subtle light sweep */}
                  <div className="absolute inset-0 w-1/2 h-full bg-white/15 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out" />

                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Reading Cosmic Alignment...</span>
                    </div>
                  ) : (
                    <>
                      <Flame className="w-5 h-5 text-yellow-300 group-hover:scale-125 transition-transform" />
                      <span>Calculate Our FLAMES ❤️</span>
                      <Heart className="w-5 h-5 fill-white text-white group-hover:animate-ping transition-all" />
                    </>
                  )}
                </div>
              </button>
            </div>
          </form>

          {/* Sample quick picks */}
          <div className="mt-6 pt-5 border-t border-pink-400/15">
            <div className="flex items-center gap-2 mb-2 text-xs text-pink-200/60 font-medium">
              <Wand2 className="w-3.5 h-3.5 text-pink-400" />
              <span>Or try a legendary couple:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_COUPLES.map((couple) => (
                <button
                  key={`${couple.name1}-${couple.name2}`}
                  type="button"
                  onClick={() => handleSampleClick(couple.name1, couple.name2)}
                  className="px-2.5 py-1 rounded-lg text-xs bg-white/5 hover:bg-pink-500/20 text-pink-200/80 hover:text-white border border-pink-400/10 hover:border-pink-400/30 transition-all"
                >
                  {couple.name1} & {couple.name2}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FLAMES Meaning Legend Cards at bottom of hero */}
      <div className="mt-12 sm:mt-16 w-full max-w-3xl">
        <p className="text-xs uppercase tracking-widest text-pink-300/60 font-semibold mb-4">
          The Sacred FLAMES Destiny System
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {[
            { letter: 'F', name: 'Friends', color: 'from-amber-500 to-orange-500', emoji: '🤝' },
            { letter: 'L', name: 'Love', color: 'from-rose-500 to-pink-500', emoji: '💖' },
            { letter: 'A', name: 'Affection', color: 'from-fuchsia-500 to-pink-400', emoji: '🥰' },
            { letter: 'M', name: 'Marriage', color: 'from-amber-400 to-yellow-500', emoji: '💍' },
            { letter: 'E', name: 'Enemies', color: 'from-purple-600 to-indigo-600', emoji: '⚡' },
            { letter: 'S', name: 'Siblings', color: 'from-teal-400 to-cyan-500', emoji: '🧸' },
          ].map((item) => (
            <div
              key={item.letter}
              className="glass-panel p-2.5 sm:p-3 rounded-2xl flex flex-col items-center justify-center text-center hover:scale-105 transition-transform border-pink-400/10 hover:border-pink-400/30"
            >
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-black text-sm sm:text-base shadow-md mb-1.5`}
              >
                {item.letter}
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-200">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
