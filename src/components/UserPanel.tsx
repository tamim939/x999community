import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SignalBar } from './SignalBar';
import { WelcomeModal } from './WelcomeModal';
import { ResultOverlay } from './ResultOverlay';
import { useHeartbeat } from '@/src/hooks/useHeartbeat';
import { MessageSquare, Globe, Send, ExternalLink } from 'lucide-react';

export const UserPanel: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [vipSignal, setVipSignal] = useState<string>('');
  const [vipPeriod, setVipPeriod] = useState<string>('');
  const [vipSeconds, setVipSeconds] = useState(5);
  const [vipState, setVipState] = useState<'WAITING' | 'ACTIVE'>('WAITING');
  const [result, setResult] = useState<'WIN' | 'LOSS' | null>(null);

  const registrationUrl = "https://www.dhaka002.com/?id=842932915";
  const telegramUrl = "https://t.me/X_999_OFFICIAL_CHNNAL_09";

  useEffect(() => {
    let interval: number;
    interval = window.setInterval(() => {
      setVipSeconds(prev => {
        if (vipState === 'ACTIVE' && prev > 0) return prev - 1;
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [vipState]);

  const handleNextSignal = async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    setVipSignal('');
    
    // Simulate neural analysis
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const rand = Math.random();
    let multiplier;
    if (rand < 0.7) multiplier = (Math.random() * (2.8 - 1.2) + 1.2).toFixed(2);
    else multiplier = (Math.random() * (6.5 - 2.8) + 2.8).toFixed(2);
    
    setVipSignal(multiplier + 'x');
    setVipPeriod((Date.now() % 1000000).toString());
    setVipState('ACTIVE');
    setVipSeconds(15);
    setIsAnalyzing(false);
  };

  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '2') {
        setIsLocked(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useHeartbeat();

  return (
    <div className="relative w-full h-[100dvh] bg-[#020205] overflow-hidden flex flex-col font-sans select-none">
      <WelcomeModal />
      <ResultOverlay result={result} onComplete={() => setResult(null)} />
      
      {/* Full-screen Registration Webview */}
      <div className="absolute inset-0 z-0 bg-black">
        <iframe 
          src={registrationUrl}
          className="w-full h-full border-none pointer-events-auto"
          title="Game Registration"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {isLocked ? (
        <div className="absolute inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center p-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8 max-w-sm"
          >
            <div className="relative">
              <div className="w-24 h-24 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto border-4 border-rose-500/30">
                <span className="text-5xl text-rose-500 font-black animate-pulse prose-invert">!</span>
              </div>
              <div className="absolute inset-0 bg-rose-500/20 blur-[40px] rounded-full animate-pulse" />
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-black text-white tracking-tight uppercase italic underline decoration-rose-500/50">
                বন্ধ করা হয়েছে
              </h1>
              <p className="text-white/70 text-lg font-medium leading-relaxed px-4">
                এটা আর চালাতে পারবি না রে বোকারা <br/>
                বসে বসে মুড়ি খা
              </p>
            </div>

            {/* Hidden Input for Mobile Users to "write" the code if keyboard isn't active */}
            <input 
              type="text" 
              maxLength={1}
              autoFocus
              className="absolute opacity-0 pointer-events-none"
              onChange={(e) => {
                if (e.target.value === '2') {
                  setIsLocked(false);
                }
              }}
            />
          </motion.div>
        </div>
      ) : (
        /* Floating Draggable Predictor */
        <motion.div 
          drag
          dragMomentum={false}
          initial={{ opacity: 0, scale: 0.9, x: -20, y: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          className="absolute bottom-10 right-4 z-40 pointer-events-auto cursor-grab active:cursor-grabbing"
        >
          <div className="p-4">
            <SignalBar 
              signal={vipSignal} 
              period={vipPeriod} 
              currentPeriod={vipPeriod} 
              secondsLeft={vipSeconds} 
              maxSeconds={vipState === 'WAITING' ? 5 : 15}
              isVip={true}
              onManualSync={() => {}}
              onNextSignal={handleNextSignal}
              isAnalyzing={isAnalyzing}
            />
          </div>
        </motion.div>
      )}

      {/* Bottom SafeArea */}
      <div className="absolute bottom-0 inset-x-0 h-2 bg-black/10 z-10 pointer-events-none" />
    </div>
  );
};
