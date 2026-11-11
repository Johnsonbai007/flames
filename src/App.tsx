import React, { useState, useEffect, useCallback } from 'react';
import { BackgroundHearts } from './components/BackgroundHearts';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FlameLoader } from './components/FlameLoader';
import { ResultCard } from './components/ResultCard';
import { RecentCalculations } from './components/RecentCalculations';
import { ShareModal } from './components/ShareModal';
import { SupabaseModal } from './components/SupabaseModal';
import { ToastProvider, useToast } from './context/ToastContext';
import { AudioProvider, useAudio } from './context/AudioContext';
import { calculateFlames, FlamesResult } from './utils/flamesAlgorithm';
import {
  saveFlamesResult,
  fetchRecentFlames,
  SaveResultResponse,
  isSupabaseConfigured,
} from './lib/supabase';
import { SavedFlamesItem, clearLocalFlames } from './utils/storage';
import { Heart, Sparkles } from 'lucide-react';

function FlamesMain() {
  const [result, setResult] = useState<FlamesResult | null>(null);
  const [loadingNames, setLoadingNames] = useState<{ name1: string; name2: string } | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveResultResponse | null>(null);
  const [recentItems, setRecentItems] = useState<SavedFlamesItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // Modal States
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isSupabaseOpen, setIsSupabaseOpen] = useState(false);

  const { showToast } = useToast();
  const { playChime, playPop } = useAudio();

  // Load calculation history on mount
  const loadHistory = useCallback(async () => {
    setIsLoadingHistory(true);
    try {
      const res = await fetchRecentFlames(20);
      setRecentItems(res.data);
    } catch (err) {
      console.warn('Could not load calculation history:', err);
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  // Handle Calculate Action
  const handleCalculate = async (name1: string, name2: string) => {
    playChime();
    setLoadingNames({ name1, name2 });

    try {
      const flamesRes = calculateFlames(name1, name2);

      // Save to Supabase (or fallback to local storage)
      const saveRes = await saveFlamesResult(name1, name2, flamesRes.resultName);
      setSaveStatus(saveRes);

      // Refresh recent items
      setRecentItems((prev) => [saveRes.data, ...prev.filter((i) => i.id !== saveRes.data.id)]);

      // Display the loader for 1.6s to create suspense
      setTimeout(() => {
        setResult(flamesRes);
        setLoadingNames(null);
      }, 1600);
    } catch (err: any) {
      setLoadingNames(null);
      showToast(err?.message || 'Could not calculate FLAMES. Check names and try again.', 'error');
    }
  };

  const handleReset = () => {
    setResult(null);
    setSaveStatus(null);
  };

  const handleClearHistory = () => {
    clearLocalFlames();
    setRecentItems([]);
  };

  const handleSelectPastCouple = (name1: string, name2: string) => {
    handleCalculate(name1, name2);
  };

  return (
    <div className="min-h-screen flex flex-col relative text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* Dynamic Animated Particles & Gradient Background */}
      <BackgroundHearts />

      {/* Top Navbar */}
      <Navbar
        onOpenHistory={() => setIsHistoryOpen(true)}
        recentCount={recentItems.length}
        onOpenSupabaseModal={() => setIsSupabaseOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10">
        {result ? (
          <ResultCard
            result={result}
            onReset={handleReset}
            onOpenShareModal={() => setIsShareOpen(true)}
            saveStatus={saveStatus}
          />
        ) : (
          <HeroSection
            onCalculate={handleCalculate}
            isLoading={loadingNames !== null}
          />
        )}
      </main>

      {/* Calculation Loading Overlay */}
      {loadingNames && (
        <FlameLoader name1={loadingNames.name1} name2={loadingNames.name2} />
      )}

      {/* Recent Calculations Modal */}
      <RecentCalculations
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        items={recentItems}
        onSelectCouple={handleSelectPastCouple}
        onClearHistory={handleClearHistory}
        isLoading={isLoadingHistory}
      />

      {/* Share Modal Fallback */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        result={result}
      />

      {/* Supabase Diagnostic & Setup Modal */}
      <SupabaseModal
        isOpen={isSupabaseOpen}
        onClose={() => setIsSupabaseOpen(false)}
      />

      {/* Romantic Footer */}
      <footer className="relative z-10 w-full border-t border-pink-500/15 py-8 mt-12 backdrop-blur-xl bg-slate-950/40 text-center text-xs text-pink-200/60">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-medium">
            <span>FLAMES</span>
            <span>•</span>
            <span>Discover Your Love Connection</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => {
                playPop();
                setIsSupabaseOpen(true);
              }}
              className="hover:text-pink-300 transition-colors"
            >
              Database Status
            </button>
            <span>•</span>
            <button
              onClick={() => {
                playPop();
                setIsHistoryOpen(true);
              }}
              className="hover:text-pink-300 transition-colors"
            >
              History ({recentItems.length})
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AudioProvider>
        <FlamesMain />
      </AudioProvider>
    </ToastProvider>
  );
}
