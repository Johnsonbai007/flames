import React, { useState } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { X, Database, CheckCircle2, AlertCircle, Copy, ExternalLink, Terminal } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAudio } from '../context/AudioContext';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({ isOpen, onClose }) => {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const { showToast } = useToast();
  const { playPop } = useAudio();

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    playPop();
    setTesting(true);
    setTestResult(null);

    if (!isSupabaseConfigured || !supabase) {
      setTimeout(() => {
        setTesting(false);
        setTestResult({
          success: false,
          message: 'Supabase credentials are not set in environment variables (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). Running in Local Storage Mode.',
        });
      }, 400);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('flames_results')
        .select('count', { count: 'exact', head: true });

      if (error) {
        setTestResult({
          success: false,
          message: `Database error: ${error.message}. Please verify table "flames_results" exists in Supabase.`,
        });
      } else {
        setTestResult({
          success: true,
          message: 'Supabase connection verified! The "flames_results" table is accessible with RLS.',
        });
        showToast('Supabase connection verified! 🚀', 'success');
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: `Network connection failed: ${err.message || 'Unknown error'}`,
      });
    } finally {
      setTesting(false);
    }
  };

  const copySchemaNotice = () => {
    playPop();
    showToast('Schema file is located at supabase/schema.sql', 'info');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="supabase-modal-title"
    >
      <div className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-7 border border-pink-400/30 shadow-2xl animate-scaleUp">
        {/* Close Button */}
        <button
          onClick={() => {
            playPop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close database modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-400/30">
            <Database className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 id="supabase-modal-title" className="text-lg font-bold text-white flex items-center gap-2">
              <span>Supabase Integration Status</span>
            </h3>
            <p className="text-xs text-pink-200/70">Database sync and cloud configuration</p>
          </div>
        </div>

        {/* Current Status Box */}
        <div
          className={`p-4 rounded-2xl border mb-5 ${
            isSupabaseConfigured
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
              : 'bg-purple-950/40 border-purple-500/30 text-purple-200'
          }`}
        >
          <div className="flex items-center gap-2 font-semibold text-sm mb-1">
            {isSupabaseConfigured ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Supabase Configured in Frontend</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>Running in Standalone Local Storage Mode</span>
              </>
            )}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {isSupabaseConfigured
              ? 'Your Vite environment variables are detected. Calculations automatically sync to the "flames_results" table in Supabase.'
              : 'Supabase credentials are not currently set. The app is fully operational with built-in browser local storage fallback!'}
          </p>
        </div>

        {/* Setup Quick Guide */}
        <div className="space-y-3 mb-5 text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="font-semibold text-pink-300 block mb-1">1. Environment Variables:</span>
            <code className="font-mono text-[11px] text-pink-200/80 block bg-black/40 p-2 rounded-lg break-all">
              VITE_SUPABASE_URL=https://your-project.supabase.co<br />
              VITE_SUPABASE_ANON_KEY=your-anon-key
            </code>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="font-semibold text-pink-300 block mb-1">2. Database Schema:</span>
            <p className="text-pink-200/80">
              Run the SQL script located in <span className="text-white font-mono">supabase/schema.sql</span> in your Supabase SQL Editor. It creates the <span className="text-white font-mono">flames_results</span> table with public RLS policies.
            </p>
          </div>
        </div>

        {/* Test Result Message */}
        {testResult && (
          <div
            className={`p-3.5 rounded-xl border mb-4 text-xs ${
              testResult.success
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
            }`}
          >
            {testResult.message}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleTestConnection}
            disabled={testing}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {testing ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Database className="w-4 h-4" />
            )}
            <span>Test Connection</span>
          </button>

          <button
            onClick={copySchemaNotice}
            className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5"
          >
            <Terminal className="w-4 h-4 text-pink-400" />
            <span>schema.sql</span>
          </button>
        </div>
      </div>
    </div>
  );
};
