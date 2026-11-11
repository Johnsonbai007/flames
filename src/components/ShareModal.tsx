import React from 'react';
import { FlamesResult } from '../utils/flamesAlgorithm';
import { FLAMES_DETAILS } from '../utils/flamesData';
import { X, Copy, Check, ExternalLink, Heart, MessageCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAudio } from '../context/AudioContext';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: FlamesResult | null;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, result }) => {
  const { showToast } = useToast();
  const { playPop } = useAudio();

  if (!isOpen || !result) return null;

  const detail = FLAMES_DETAILS[result.resultKey];
  const url = window.location.origin;
  const shareText = `❤️ FLAMES Love Result: ${result.yourName} & ${result.partnerName} got ${detail.name} ${detail.emoji}! Compatibility: ${detail.compatibilityScore}%. Test yours at ${url}`;

  const handleCopyLink = async () => {
    playPop();
    try {
      await navigator.clipboard.writeText(url);
      showToast('Link copied to clipboard! 🔗', 'love');
    } catch {
      showToast('Could not copy automatically.', 'error');
    }
  };

  const handleCopyMessage = async () => {
    playPop();
    try {
      await navigator.clipboard.writeText(shareText);
      showToast('Full romantic message copied! 💌', 'love');
    } catch {
      showToast('Could not copy automatically.', 'error');
    }
  };

  const shareWhatsApp = () => {
    playPop();
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const shareTwitter = () => {
    playPop();
    const twUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-dialog-title"
    >
      <div className="relative w-full max-w-md glass-card rounded-3xl p-6 sm:p-7 border border-pink-400/30 shadow-2xl animate-scaleUp">
        {/* Close Button */}
        <button
          onClick={() => {
            playPop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close share dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-pink-500/20 text-pink-300 flex items-center justify-center border border-pink-400/30">
            <Heart className="w-5 h-5 fill-pink-400" />
          </div>
          <div>
            <h3 id="share-dialog-title" className="text-lg font-bold text-white">
              Share Your Love Destiny
            </h3>
            <p className="text-xs text-pink-200/70">Spread the romantic sparks with your friends!</p>
          </div>
        </div>

        {/* Preview Card */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-5 text-left">
          <div className="flex items-center justify-between text-xs font-semibold text-pink-300 mb-1">
            <span>{result.yourName} & {result.partnerName}</span>
            <span>{detail.emoji}</span>
          </div>
          <div className="text-2xl font-black font-serif text-white tracking-wide">
            {detail.name}
          </div>
          <p className="text-xs text-slate-300 mt-1 italic">
            "{detail.tagline}"
          </p>
        </div>

        {/* Social Share Buttons */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <button
            onClick={shareWhatsApp}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp</span>
          </button>
          <button
            onClick={shareTwitter}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-sky-600/90 hover:bg-sky-600 text-white text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span>X (Twitter)</span>
          </button>
        </div>

        {/* Copy Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleCopyMessage}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs sm:text-sm font-medium transition-all"
          >
            <Copy className="w-4 h-4 text-pink-400" />
            <span>Copy Full Romantic Summary</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-pink-200/70 hover:text-white text-xs transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Copy Website Link Only</span>
          </button>
        </div>
      </div>
    </div>
  );
};
