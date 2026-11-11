import React, { createContext, useContext, useState, useCallback } from 'react';
import { Heart, CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'love';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  title?: string;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, title?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info', title?: string) => {
    const id = (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'toast-' + Date.now() + Math.random());
    const newToast: ToastItem = { id, message, type, title };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {/* Toast Container */}
      <div
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
        aria-live="polite"
      >
        {toasts.map((toast) => {
          let icon = <Info className="w-5 h-5 text-blue-400 shrink-0" />;
          let borderStyle = 'border-white/20';
          let bgStyle = 'bg-slate-900/90 text-white';

          if (toast.type === 'love') {
            icon = <Heart className="w-5 h-5 text-rose-400 fill-rose-400 shrink-0 animate-bounce" />;
            borderStyle = 'border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.3)]';
            bgStyle = 'bg-[#1e0f24]/95 text-rose-50';
          } else if (toast.type === 'success') {
            icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
            borderStyle = 'border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.25)]';
            bgStyle = 'bg-[#0f1f17]/95 text-emerald-50';
          } else if (toast.type === 'error') {
            icon = <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />;
            borderStyle = 'border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.25)]';
            bgStyle = 'bg-[#200f13]/95 text-red-50';
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl backdrop-blur-xl border ${borderStyle} ${bgStyle} shadow-2xl transition-all duration-300 transform translate-y-0`}
              role="alert"
            >
              <div className="pt-0.5">{icon}</div>
              <div className="flex-1 min-w-0">
                {toast.title && (
                  <p className="font-semibold text-sm tracking-wide mb-0.5">{toast.title}</p>
                )}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed break-words">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white transition-colors p-1 -mr-1 -mt-1 rounded-lg"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
