import React, { useState } from 'react';
import { SavedFlamesItem } from '../utils/storage';
import { FLAMES_NAMES, FlamesKey } from '../utils/flamesAlgorithm';
import { FLAMES_DETAILS } from '../utils/flamesData';
import {
  X,
  History,
  Trash2,
  Heart,
  Search,
  Database,
  Calendar,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useToast } from '../context/ToastContext';

interface RecentCalculationsProps {
  isOpen: boolean;
  onClose: () => void;
  items: SavedFlamesItem[];
  onSelectCouple: (name1: string, name2: string) => void;
  onClearHistory: () => void;
  isLoading: boolean;
}

export const RecentCalculations: React.FC<RecentCalculationsProps> = ({
  isOpen,
  onClose,
  items,
  onSelectCouple,
  onClearHistory,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmClear, setConfirmClear] = useState(false);
  const { playPop } = useAudio();
  const { showToast } = useToast();

  if (!isOpen) return null;

  const filteredItems = items.filter((item) => {
    const q = searchTerm.toLowerCase();
    return (
      item.your_name.toLowerCase().includes(q) ||
      item.partner_name.toLowerCase().includes(q) ||
      item.flames_result.toLowerCase().includes(q)
    );
  });

  const handleClearClick = () => {
    playPop();
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    onClearHistory();
    setConfirmClear(false);
    showToast('Calculation history cleared! 🧹', 'info');
  };

  const formatTimestamp = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffSecs = Math.floor((now.getTime() - date.getTime()) / 1000);

      if (diffSecs < 60) return 'Just now';
      if (diffSecs < 3600) return `${Math.floor(diffSecs / 60)}m ago`;
      if (diffSecs < 86400) return `${Math.floor(diffSecs / 3600)}h ago`;
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    } catch {
      return 'Recently';
    }
  };

  const getFlamesKeyFromResult = (resultName: string): FlamesKey => {
    const firstWord = resultName.split(' ')[0];
    const match = Object.entries(FLAMES_NAMES).find(
      ([_, name]) => name.toLowerCase() === firstWord.toLowerCase()
    );
    return (match ? match[0] : 'L') as FlamesKey;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="history-modal-title"
    >
      <div className="relative w-full max-w-xl max-h-[85vh] flex flex-col glass-card rounded-3xl border border-pink-400/30 shadow-2xl overflow-hidden animate-scaleUp">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-500/20 text-pink-300 flex items-center justify-center border border-pink-400/30">
              <History className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <h3 id="history-modal-title" className="text-lg sm:text-xl font-bold text-white">
                Recent Love Connections
              </h3>
              <p className="text-xs text-pink-200/70">
                {items.length} {items.length === 1 ? 'connection' : 'connections'} recorded
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close history modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Actions Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-white/5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-pink-300/50 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search couples or outcomes..."
              className="w-full pl-9 pr-4 py-2 rounded-xl glass-input text-xs sm:text-sm placeholder:text-pink-300/40"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-pink-300/50 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {items.length > 0 && (
            <button
              onClick={handleClearClick}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                confirmClear
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                  : 'bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-300 border border-white/10'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{confirmClear ? 'Confirm Clear?' : 'Clear'}</span>
            </button>
          )}
        </div>

        {/* Scrollable Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 divide-y divide-transparent">
          {isLoading ? (
            <div className="py-12 text-center text-pink-200/60 flex flex-col items-center justify-center gap-3">
              <div className="w-6 h-6 border-2 border-pink-400/30 border-t-pink-400 rounded-full animate-spin" />
              <p className="text-xs">Loading connections...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="py-12 text-center text-pink-200/60 flex flex-col items-center justify-center gap-2">
              <Heart className="w-10 h-10 text-pink-400/30 stroke-[1.5]" />
              <p className="text-sm font-medium text-pink-200">
                {searchTerm ? 'No matching connections found.' : 'No calculations yet!'}
              </p>
              <p className="text-xs text-pink-300/60 max-w-xs">
                {searchTerm
                  ? 'Try searching with a different name.'
                  : 'Calculate your first couple on the main screen to start your history!'}
              </p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const key = getFlamesKeyFromResult(item.flames_result);
              const detail = FLAMES_DETAILS[key] || FLAMES_DETAILS['L'];

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    playPop();
                    onSelectCouple(item.your_name, item.partner_name);
                    onClose();
                  }}
                  className="group relative p-3.5 sm:p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-400/40 cursor-pointer transition-all flex items-center justify-between gap-3 shadow-sm"
                >
                  {/* Left: Names & timestamp */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-white">
                      <span className="truncate max-w-[110px] sm:max-w-[150px]">{item.your_name}</span>
                      <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400 shrink-0" />
                      <span className="truncate max-w-[110px] sm:max-w-[150px]">{item.partner_name}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-pink-300/60">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatTimestamp(item.created_at)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Database className="w-3 h-3 text-pink-400/70" />
                        {item.source === 'supabase' ? 'Cloud' : 'Local'}
                      </span>
                    </div>
                  </div>

                  {/* Right: FLAMES Badge & Select indicator */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`px-2.5 py-1 rounded-xl text-xs font-semibold border ${detail.theme.badgeBg} ${detail.theme.badgeText} flex items-center gap-1`}
                    >
                      <span>{detail.emoji}</span>
                      <span>{item.flames_result}</span>
                    </span>

                    <div className="w-7 h-7 rounded-xl bg-white/5 text-slate-400 group-hover:text-pink-300 group-hover:bg-pink-500/20 flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-950/40 text-center text-[11px] text-pink-200/50">
          Click any connection to instantly reload and recalculate its romantic destiny!
        </div>
      </div>
    </div>
  );
};
