import React, { useState } from 'react';
import { FlamesResult, FLAMES_NAMES, FlamesKey } from '../utils/flamesAlgorithm';
import { ChevronDown, ChevronUp, Calculator, Check, ArrowRight } from 'lucide-react';

interface CalculationBreakdownProps {
  result: FlamesResult;
}

export const CalculationBreakdown: React.FC<CalculationBreakdownProps> = ({ result }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mt-6 rounded-2xl border border-pink-400/20 bg-slate-900/60 backdrop-blur-md overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-pink-500/15 text-pink-300 border border-pink-400/20 group-hover:bg-pink-500/25 transition-colors">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-pink-100">
              View Traditional FLAMES Breakdown
            </h4>
            <p className="text-xs text-pink-200/60">
              Step-by-step letter strikeout & circular elimination
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-pink-400 px-2 py-1 rounded-md bg-pink-500/10 border border-pink-500/20">
            Count: {result.remainingCount}
          </span>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-pink-300" />
          ) : (
            <ChevronDown className="w-5 h-5 text-pink-300" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="p-5 sm:p-6 border-t border-pink-400/15 space-y-6 text-sm text-slate-200 animate-fadeIn">
          {/* Step 1: Matching Letters Strikeout */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-pink-300 mb-3 flex items-center gap-1.5">
              <span>Step 1: Strikethrough Common Letters</span>
            </h5>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name 1 Strikeout */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-pink-200/70 block mb-1 font-medium">{result.yourName}:</span>
                <div className="flex flex-wrap gap-1.5 font-mono text-base font-bold">
                  {result.struckLetters1.map((item, idx) => (
                    <span
                      key={idx}
                      className={`w-7 h-7 flex items-center justify-center rounded-lg ${
                        item.isStruck
                          ? 'line-through text-red-400/60 bg-red-500/10 border border-red-500/20'
                          : 'text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 shadow-sm'
                      }`}
                      title={item.isStruck ? 'Matched & eliminated' : 'Remaining letter'}
                    >
                      {item.char.toUpperCase()}
                    </span>
                  ))}
                </div>
                <div className="mt-2 text-xs text-slate-300">
                  Remaining ({result.remainingLetters1.length}):{' '}
                  <span className="font-mono font-bold text-emerald-300">
                    {result.remainingLetters1.join(', ').toUpperCase() || 'None'}
                  </span>
                </div>
              </div>

              {/* Name 2 Strikeout */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-pink-200/70 block mb-1 font-medium">{result.partnerName}:</span>
                <div className="flex flex-wrap gap-1.5 font-mono text-base font-bold">
                  {result.struckLetters2.map((item, idx) => (
                    <span
                      key={idx}
                      className={`w-7 h-7 flex items-center justify-center rounded-lg ${
                        item.isStruck
                          ? 'line-through text-red-400/60 bg-red-500/10 border border-red-500/20'
                          : 'text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 shadow-sm'
                      }`}
                      title={item.isStruck ? 'Matched & eliminated' : 'Remaining letter'}
                    >
                      {item.char.toUpperCase()}
                    </span>
                  ))}
                </div>
                <div className="mt-2 text-xs text-slate-300">
                  Remaining ({result.remainingLetters2.length}):{' '}
                  <span className="font-mono font-bold text-emerald-300">
                    {result.remainingLetters2.join(', ').toUpperCase() || 'None'}
                  </span>
                </div>
              </div>
            </div>

            {/* Total Remaining Count Summary */}
            <div className="mt-3 p-3 rounded-xl bg-pink-500/10 border border-pink-400/20 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-pink-200">
                Total remaining unshared letters ({result.remainingLetters1.length} + {result.remainingLetters2.length}):
              </span>
              <span className="font-mono font-bold text-pink-300 text-base">
                Count = {result.remainingCount}
              </span>
            </div>
          </div>

          {/* Step 2: Circular Elimination Breakdown */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-pink-300 mb-3 flex items-center gap-1.5">
              <span>Step 2: Traditional Elimination (Round by Round)</span>
            </h5>

            {result.isSpecialSoulmate ? (
              <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-400/30 text-rose-100 text-xs sm:text-sm">
                ✨ All letters matched perfectly! In traditional FLAMES lore, zero remaining letters signifies an instant cosmic mirror soulmate connection!
              </div>
            ) : (
              <div className="space-y-2.5">
                {result.eliminationSteps.map((step) => (
                  <div
                    key={step.round}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-300 font-bold flex items-center justify-center shrink-0">
                        {step.round}
                      </span>
                      <div className="flex items-center gap-1 font-mono font-bold">
                        {step.lettersBefore.map((letter, idx) => {
                          const isElim = idx === step.eliminatedIndex;
                          const isStart = idx === step.startIndex;
                          return (
                            <span
                              key={idx}
                              className={`px-1.5 py-0.5 rounded ${
                                isElim
                                  ? 'bg-red-500 text-white line-through'
                                  : isStart
                                  ? 'bg-purple-500/30 text-purple-200 ring-1 ring-purple-400'
                                  : 'text-slate-300'
                              }`}
                            >
                              {letter}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="text-slate-300 flex items-center gap-1.5 sm:justify-end">
                      <span>Count {step.count} removes</span>
                      <span className="font-bold text-red-300 px-1.5 py-0.5 rounded bg-red-500/20 border border-red-500/30">
                        '{step.eliminatedLetter}' ({FLAMES_NAMES[step.eliminatedLetter]})
                      </span>
                    </div>
                  </div>
                ))}

                {/* Final Victorious Letter */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/40 flex items-center justify-between text-xs sm:text-sm font-semibold text-emerald-200">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Final Remaining FLAMES Destiny:</span>
                  </div>
                  <span className="font-bold text-base text-emerald-300 uppercase tracking-wider font-mono">
                    {result.resultKey} – {result.resultName}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
