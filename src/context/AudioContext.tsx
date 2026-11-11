import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface AudioContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playPop: () => void;
  playChime: () => void;
  playSparkle: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('flames_sound_enabled');
      return stored !== null ? JSON.parse(stored) : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('flames_sound_enabled', JSON.stringify(soundEnabled));
    } catch (e) {
      console.warn('Could not save sound settings', e);
    }
  }, [soundEnabled]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  const getAudioContext = useCallback(() => {
    if (!soundEnabled || typeof window === 'undefined') return null;
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return null;
    return new AudioCtx();
  }, [soundEnabled]);

  const playPop = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      // Audio autoplay might be blocked before user gesture
    }
  }, [getAudioContext]);

  const playChime = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      // Harmonic romantic chords (C major / A minor shimmer)
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.08);

        gain.gain.setValueAtTime(0.06, ctx.currentTime + index * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + index * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + index * 0.08);
        osc.stop(ctx.currentTime + index * 0.08 + 0.65);
      });
    } catch (e) {
      // Audio playback blocked
    }
  }, [getAudioContext]);

  const playSparkle = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      // High frequency celestial sparkles
      const notes = [1318.51, 1567.98, 1760.0, 2093.0, 2637.02];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.05, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.06 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.45);
      });
    } catch (e) {
      // Audio playback blocked
    }
  }, [getAudioContext]);

  return (
    <AudioContext.Provider value={{ soundEnabled, toggleSound, playPop, playChime, playSparkle }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
