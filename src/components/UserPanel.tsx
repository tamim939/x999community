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

      {/* Floating Draggable Predictor */}
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

      {/* Bottom SafeArea */}
      <div className="absolute bottom-0 inset-x-0 h-2 bg-black/10 z-10 pointer-events-none" />
    </div>
  );
};
