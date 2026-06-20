import React from 'react';
import { cn } from '@/src/lib/utils';

import { motion } from 'motion/react';

interface SignalBarProps {
  signal: string;
  period: string;
  currentPeriod: string;
  secondsLeft: number;
  maxSeconds?: number;
  isVip?: boolean;
  onManualSync?: () => void;
  onNextSignal?: () => void;
  isAnalyzing?: boolean;
}

export const SignalBar: React.FC<SignalBarProps> = ({
  signal,
  period,
  currentPeriod,
  secondsLeft,
  maxSeconds = 30,
  isVip = false,
  onManualSync,
  onNextSignal,
  isAnalyzing = false,
}) => {
  const isActive = signal && period && (isVip || period === currentPeriod);
  const progress = ((maxSeconds - secondsLeft) / maxSeconds) * 100;
  const [boxScale, setBoxScale] = React.useState(1);

  const handleGetSignal = () => {
    if (isAnalyzing || signal) return;
    onManualSync?.();
  };

  const handleNext = () => {
    if (isAnalyzing) return;
    onNextSignal?.();
  };

  if (isVip) {
    return (
      <motion.div 
        animate={{ scale: boxScale }}
        transition={{ type: 'spring', damping: 25 }}
        className="relative z-[100] flex flex-col items-center pointer-events-auto origin-center"
      >
        <div className="relative p-8 rounded-[48px] bg-[#0a0a15] border-2 border-amber-500/50 flex flex-col items-center w-full ring-1 ring-white/10">
          {/* VIP Badge */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-8 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full shadow-xl border border-amber-400/50 flex items-center gap-2 whitespace-nowrap z-50">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            <span className="text-[16px] font-black text-white uppercase tracking-[0.15em]">X~999 COMMUNITY</span>
          </div>

          {/* Zoom Controller */}
          <div className="absolute top-4 right-6 flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity z-50 bg-black/40 p-1 rounded-xl border border-white/10 backdrop-blur-md">
            <button 
              onClick={() => setBoxScale(prev => Math.max(0.6, prev - 0.1))}
              className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-lg text-white text-xl font-black border border-white/10 hover:bg-white/20 active:scale-90 transition-all"
              title="Decrease Size"
            >
              -
            </button>
            <div className="w-[1px] h-4 bg-white/20 mx-0.5" />
            <button 
              onClick={() => setBoxScale(prev => Math.min(1.5, prev + 0.1))}
              className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-lg text-white text-xl font-black border border-white/10 hover:bg-white/20 active:scale-90 transition-all"
              title="Increase Size"
            >
              +
            </button>
          </div>

          {/* Header */}
          <div className="mt-4 mb-4 text-center space-y-1">
            <h2 className="text-amber-500 font-extrabold text-[12px] tracking-[0.2em] uppercase leading-none italic opacity-85">
              PREDICTOR SYSTEM
            </h2>
            <div className="h-0.5 w-10 bg-amber-500/20 mx-auto rounded-full" />
          </div>

          {/* Main Circle Display */}
          <div className="relative w-44 h-44 mb-6 transition-transform duration-500">
            <div className="absolute inset-[-10px] rounded-full border-2 border-amber-500/10 animate-pulse" />
            
            <div className="absolute inset-0 rounded-full border-[4px] border-amber-500/80 flex items-center justify-center overflow-hidden bg-black shadow-[inset_0_0_60px_rgba(0,0,0,1)]">
              <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(245,158,11,0.15)_50%,transparent_100%)] bg-[length:100%_12px] animate-[scan_1s_linear_infinite]" />
              
              <div className="flex flex-col items-center justify-center h-full w-full relative z-10">
                {isAnalyzing && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0a0b1e] backdrop-blur-xl">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
                      className="w-14 h-14 border-[5px] border-amber-500 border-t-transparent rounded-full mb-4 shadow-[0_0_40px_rgba(245,158,11,0.6)]"
                    />
                    <span className="text-[12px] font-black text-amber-500 animate-pulse tracking-[0.4em] uppercase">
                      SYNCING...
                    </span>
                  </div>
                )}
                
                <div className="flex flex-col items-center px-4">
                  <span className="text-[10px] font-black text-amber-500/40 uppercase tracking-[0.3em] mb-2">RESULT</span>
                  <motion.span 
                    key={signal}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-[60px] font-mono font-black text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.6)] tracking-tighter"
                  >
                    {signal || "0.00x"}
                  </motion.span>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons Row */}
          <div className="flex flex-col gap-4 w-full">
            <button
              onClick={handleNext}
              disabled={isAnalyzing}
              className={cn(
                "w-full h-14 rounded-2xl font-black text-lg uppercase tracking-[0.2em] transition-all active:scale-95 border-[3px] group relative overflow-hidden",
                isAnalyzing 
                  ? "bg-slate-900/50 cursor-not-allowed text-white/20 border-white/5" 
                  : "bg-gradient-to-r from-amber-500 to-yellow-600 text-white border-amber-400/50 shadow-[0_15px_40px_rgba(245,158,11,0.6)]"
              )}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                NEXT SIGNAL
                <span className="text-amber-200">➔</span>
              </span>
            </button>
          </div>
          
          <div className="w-full flex flex-col gap-3 mt-6">
            <div className="w-full flex justify-between items-center px-1">
              <div className="flex items-center gap-2 font-black uppercase tracking-[0.2em] text-emerald-500 text-[10px]">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_currentColor] animate-pulse" />
                CONNECTED
              </div>
              <span className="text-[9px] font-black text-white/10 uppercase tracking-[0.1em]">v10.2 ALPHA</span>
            </div>

            <a
              href="https://t.me/X_999_OFFICIAL_CHNNAL_09"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-blue-600/90 hover:bg-blue-600 text-white rounded-xl text-[10px] font-black flex items-center justify-center gap-2 transition-all active:scale-95 border border-white/10"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
              TELEGRAM CHANNEL
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative flex items-center justify-between px-4 py-2 bg-white border-b border-gray-100 h-[56px]">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <span className="text-gray-400 font-medium text-sm">P:</span>
          <span className="font-mono font-bold text-gray-800 text-base">
            {currentPeriod?.slice(-6) || "..."}
          </span>
        </div>
        
        <div className="relative w-9 h-9 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="10.5"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1.5"
            />
            <circle
              cx="12"
              cy="12"
              r="10.5"
              fill="none"
              stroke="#2563eb"
              strokeWidth="1.8"
              strokeDasharray="65.97"
              strokeDashoffset={65.97 * (1 - progress / 100)}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <span className="relative font-mono font-bold text-xs text-gray-700">
            {secondsLeft}
          </span>
        </div>
      </div>

      <div className="flex items-center">
        {isActive ? (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full font-black text-xs uppercase tracking-wider text-white transition-all shadow-sm",
              signal === "BIG" 
                ? "bg-red-500" 
                : "bg-green-500"
            )}
          >
            <div className="w-4 h-4 rounded-full bg-white/30 flex items-center justify-center border border-white/20">
              <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_4px_white]" />
            </div>
            {signal}
          </motion.div>
        ) : (
          <div className="px-4 py-2 rounded-full bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest animate-pulse border border-gray-100">
            WAITING...
          </div>
        )}
      </div>
    </div>
  );
};
