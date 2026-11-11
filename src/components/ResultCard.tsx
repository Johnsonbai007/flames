import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { FlamesResult } from '../utils/flamesAlgorithm';
import { FLAMES_DETAILS } from '../utils/flamesData';
import { CalculationBreakdown } from './CalculationBreakdown';
import {
  Heart,
  RotateCcw,
  Share2,
  Copy,
  Sparkles,
  Quote,
  Check,
  Compass,
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { SaveResultResponse } from '../lib/supabase';

interface ResultCardProps {
  result: FlamesResult;
  onReset: () => void;
  onOpenShareModal: () => void;
  saveStatus?: SaveResultResponse | null;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  onReset,
  onOpenShareModal,
  saveStatus,
}) => {
  const detail = FLAMES_DETAILS[result.resultKey];
  const { showToast } = useToast();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger romantic heart confetti burst
    try {
      // Fire left & right cannons with hearts
      const count = 60;
      const defaults = {
        origin: { y: 0.65 },
        colors: ['#ff4b8b', '#f43f5e', '#ec4899', '#fbbf24', '#c084fc', '#ffffff'],
        scalar: 1.2,
      };

      confetti({
        ...defaults,
        particleCount: count,
        spread: 80,
      });

      // Second burst after 250ms
      setTimeout(() => {
        confetti({
          ...defaults,
          particleCount: 40,
          angle: 60,
          spread: 55,
          origin: { x: 0.2, y: 0.7 },
        });
        confetti({
          ...defaults,
          particleCount: 40,
          angle: 120,
          spread: 55,
          origin: { x: 0.8, y: 0.7 },
        });
      }, 250);
    } catch (e) {
      // Confetti fallback
    }

    // Smooth scroll to result
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

  const handleCopy = async () => {
    const formattedText = `❤️ FLAMES Love Destiny ❤️
✨ ${result.yourName} & ${result.partnerName}
🔥 Result: ${detail.name} ${detail.emoji} (${detail.badge})
💫 Compatibility Score: ${detail.compatibilityScore}%
💬 "${detail.quote}"
🔮 ${detail.tagline}

Calculate your FLAMES connection: ${window.location.origin}`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(formattedText);
        showToast('Romantic result copied to clipboard! 📋💖', 'love', 'Copied!');
      } else {
        throw new Error('Clipboard not accessible');
      }
    } catch (err) {
      onOpenShareModal();
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${result.yourName} & ${result.partnerName} – FLAMES Love Connection ❤️`,
      text: `We calculated our FLAMES connection and got ${detail.name} ${detail.emoji}! See what destiny says for you!`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        showToast('Shared successfully! ❤️', 'success');
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          onOpenShareModal();
        }
      }
    } else {
      onOpenShareModal();
    }
  };

  return (
    <div
      ref={cardRef}
      className="w-full max-w-3xl mx-auto px-4 py-6 sm:py-10 animate-fadeIn"
    >
      <div className="relative">
        {/* Dynamic theme glow */}
        <div
          className={`absolute -inset-1 rounded-3xl opacity-75 blur-2xl bg-gradient-to-r ${detail.theme.gradient}`}
        />

        {/* Card Body */}
        <div
          className={`relative rounded-3xl p-6 sm:p-10 border ${detail.theme.border} bg-gradient-to-b ${detail.theme.cardBg} backdrop-blur-2xl shadow-2xl overflow-hidden`}
        >
          {/* Top Bar: Result Badge */}
          <div className="flex items-center justify-center sm:justify-start mb-6 sm:mb-8">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-semibold ${detail.theme.badgeBg} ${detail.theme.badgeText}`}
            >
              <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
              <span>
                {result.isSpecialSoulmate ? '✨ Perfect Soulmate Mirror' : detail.badge}
              </span>
              <span>{detail.emoji}</span>
            </div>
          </div>

          {/* Couple Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-3 sm:gap-4 px-4 sm:px-6 py-2 rounded-2xl bg-white/5 border border-white/10 mb-4">
              <span className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                {result.yourName}
              </span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                {result.partnerName}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-pink-200/70 font-medium tracking-wide">
              The FLAMES Universe has spoken:
            </p>

            {/* Huge Outcome Display */}
            <div className="my-4 sm:my-6 relative inline-block">
              <h2
                className={`text-5xl sm:text-7xl md:text-8xl font-black font-serif tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${detail.theme.gradient} drop-shadow-xl`}
              >
                {detail.name}
              </h2>
              <span className="text-4xl sm:text-5xl ml-2">{detail.emoji}</span>
            </div>

            <p className="text-base sm:text-lg text-pink-100 font-medium max-w-lg mx-auto">
              "{detail.tagline}"
            </p>
          </div>

          {/* Compatibility Meter Bar */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 mb-6">
            <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-2 text-pink-200">
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                Connection Resonance Meter
              </span>
              <span className="font-mono text-base font-bold text-white">
                {detail.compatibilityScore}%
              </span>
            </div>
            <div className="w-full bg-black/40 h-3 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${detail.theme.gradient} transition-all duration-1000 ease-out`}
                style={{ width: `${detail.compatibilityScore}%` }}
              />
            </div>

            {/* Sub-metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/10 text-center">
              <div>
                <span className="text-[11px] text-pink-300/70 block uppercase tracking-wider">Chemistry</span>
                <span className="text-sm font-bold text-white font-mono">{detail.stats.chemistry}%</span>
              </div>
              <div>
                <span className="text-[11px] text-pink-300/70 block uppercase tracking-wider">Trust</span>
                <span className="text-sm font-bold text-white font-mono">{detail.stats.trust}%</span>
              </div>
              <div>
                <span className="text-[11px] text-pink-300/70 block uppercase tracking-wider">Passion</span>
                <span className="text-sm font-bold text-white font-mono">{detail.stats.passion}%</span>
              </div>
              <div>
                <span className="text-[11px] text-pink-300/70 block uppercase tracking-wider">Longevity</span>
                <span className="text-sm font-bold text-white font-mono">{detail.stats.longevity}%</span>
              </div>
            </div>
          </div>

          {/* Detailed Romantic Description */}
          <div className="space-y-4 mb-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-pink-300 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-400" />
                Celestial Insight
              </h3>
              <p className="text-sm sm:text-base text-pink-50/90 leading-relaxed font-light">
                {detail.description}
              </p>
            </div>

            {/* Romantic Quote */}
            <div className="relative p-5 rounded-2xl bg-pink-500/10 border border-pink-400/20 italic text-pink-100 text-xs sm:text-sm flex items-start gap-3">
              <Quote className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{detail.quote}</p>
            </div>

            {/* Relationship Advice */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
              <Compass className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 mb-1">
                  Cosmic Advice for {result.yourName} & {result.partnerName}
                </h4>
                <p className="text-xs sm:text-sm text-pink-100/80 leading-relaxed">
                  {detail.advice}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10">
            {/* Try Another Couple */}
            <button
              onClick={onReset}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <RotateCcw className="w-4 h-4 text-pink-400" />
              <span>Try Another Couple</span>
            </button>

            {/* Copy Result */}
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <Copy className="w-4 h-4 text-purple-400" />
              <span>Copy Result</span>
            </button>

            {/* Share Result */}
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm shadow-lg shadow-pink-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Result ❤️</span>
            </button>
          </div>

          {/* Mathematical Step-by-Step Breakdown */}
          <CalculationBreakdown result={result} />
        </div>
      </div>
    </div>
  );
};
