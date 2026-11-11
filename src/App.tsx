import React, { useState } from 'react';
import { BackgroundHearts } from './components/BackgroundHearts';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FlameLoader } from './components/FlameLoader';
import { ResultCard } from './components/ResultCard';
import { ShareModal } from './components/ShareModal';
import { ToastProvider, useToast } from './context/ToastContext';
import { calculateFlames, FlamesResult } from './utils/flamesAlgorithm';
import { saveFlamesResult, SaveResultResponse } from './lib/supabase';
import { Heart } from 'lucide-react';

function FlamesMain() {
  const [result, setResult] = useState<FlamesResult | null>(null);
  const [loadingNames, setLoadingNames] = useState<{ name1: string; name2: string } | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveResultResponse | null>(null);

  // Modal State
  const [isShareOpen, setIsShareOpen] = useState(false);

  const { showToast } = useToast();

  // Handle Calculate Action
  const handleCalculate = async (name1: string, name2: string) => {
    setLoadingNames({ name1, name2 });

    try {
      const flamesRes = calculateFlames(name1, name2);

      // Save to Supabase in the background if configured
      const saveRes = await saveFlamesResult(name1, name2, flamesRes.resultName);
      setSaveStatus(saveRes);

      // Display the loader for 1.6s to create romantic suspense
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

  return (
    <div className="min-h-screen flex flex-col relative text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* Dynamic Animated Particles & Gradient Background */}
      <BackgroundHearts />

      {/* Top Navbar */}
      <Navbar />

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

      {/* Share Modal Fallback */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        result={result}
      />

      {/* Romantic Footer */}
      <footer className="relative z-10 w-full border-t border-pink-500/15 py-8 mt-12 backdrop-blur-xl bg-slate-950/40 text-center text-xs text-pink-200/60">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-medium mx-auto sm:mx-0">
            <span>FLAMES</span>
            <span>•</span>
            <span>Discover Your Love Connection</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
          </div>

          <p className="text-[11px] text-pink-200/40">
            Created with love for romance & destiny
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <FlamesMain />
    </ToastProvider>
  );
}
