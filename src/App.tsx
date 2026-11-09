import { useState, useEffect, useCallback, useRef } from 'react';
import { TopNav } from './components/TopNav';
import { DesktopSidebar } from './components/DesktopSidebar';
import { DoodleDecorations } from './components/DoodleDecorations';
import { FloatingHearts } from './components/FloatingHearts';
import { LandingScreen } from './components/LandingScreen';
import { ProposalScreen } from './components/ProposalScreen';
import { CelebrationScreen } from './components/CelebrationScreen';
import { FinalScreen } from './components/FinalScreen';
import { startMusic, stopMusic, playHeartPop } from './utils/audio';

type Step = 'landing' | 'proposal' | 'celebration' | 'final';

export default function App() {
  const [step, setStep] = useState<Step>('landing');
  const [isMuted, setIsMuted] = useState(false);
  const userMutedExplicitly = useRef(false);

  // Optional dedications from URL query parameters (e.g. ?to=Emma&from=Alex)
  const [partnerName, setPartnerName] = useState('');
  const [senderName, setSenderName] = useState('');

  // Auto-play the song when entering the website with mobile gesture fallback
  useEffect(() => {
    startMusic();

    const unlockAudio = () => {
      if (!userMutedExplicitly.current) {
        startMusic();
        setIsMuted(false);
      }
    };

    const events = ['pointerdown', 'touchstart', 'click', 'keydown', 'scroll'];
    events.forEach((evt) => {
      window.addEventListener(evt, unlockAudio, { once: true, passive: true });
    });

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, unlockAudio);
      });
      stopMusic();
    };
  }, []);

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlTo = urlParams.get('to') || urlParams.get('partner');
      const urlFrom = urlParams.get('from') || urlParams.get('sender');

      if (urlTo) setPartnerName(urlTo);
      if (urlFrom) setSenderName(urlFrom);
    } catch {
      // Ignore URL parsing errors
    }
  }, []);

  const handleToggleSound = () => {
    if (!isMuted) {
      userMutedExplicitly.current = true;
      stopMusic();
      setIsMuted(true);
    } else {
      userMutedExplicitly.current = false;
      startMusic();
      setIsMuted(false);
    }
  };

  const handleOpenHeart = useCallback(() => {
    playHeartPop();
    if (!userMutedExplicitly.current) {
      startMusic();
      setIsMuted(false);
    }
    setStep('proposal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleYes = useCallback(() => {
    setStep('celebration');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCelebrationComplete = useCallback(() => {
    setStep('final');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleReplay = useCallback(() => {
    setStep('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[#FCE8EF] bg-grid-paper text-[#84364F] overflow-x-hidden selection:bg-[#F3A0B4] selection:text-[#84364F]">
      {/* Ambient floating hearts and cute doodles */}
      <FloatingHearts />
      <DoodleDecorations />

      {/* Navigation Layer */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-3 sm:px-6 pt-2">
        <TopNav
          isMuted={isMuted}
          onToggleSound={handleToggleSound}
          currentStep={step}
          onNavigateStep={(s) => setStep(s)}
        />
      </div>

      {/* Main Layout Area matching Desktop & Mobile Reference */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-3 sm:px-6 py-2 sm:py-4 flex-1 flex flex-col md:flex-row items-stretch gap-5 lg:gap-6">
        {/* Desktop Burgundy Left Sidebar */}
        <DesktopSidebar
          currentStep={step}
          onNavigateStep={(s) => setStep(s)}
        />

        {/* Central Window Screen Area */}
        <main className="flex-1 flex flex-col items-center justify-center w-full">
          {step === 'landing' && (
            <LandingScreen
              partnerName={partnerName}
              senderName={senderName}
              onOpenHeart={handleOpenHeart}
            />
          )}

          {step === 'proposal' && (
            <ProposalScreen
              partnerName={partnerName}
              onYes={handleYes}
            />
          )}

          {step === 'celebration' && (
            <CelebrationScreen
              partnerName={partnerName}
              onComplete={handleCelebrationComplete}
            />
          )}

          {step === 'final' && (
            <FinalScreen
              onReplay={handleReplay}
              partnerName={partnerName}
              senderName={senderName}
            />
          )}
        </main>
      </div>

      {/* Cute Romantic Footer */}
      <footer className="relative z-10 py-4 text-center text-xs font-bold text-[#84364F]/70 font-display">
        <div className="flex items-center justify-center gap-2 flex-wrap px-4">
          <span>Crafted with all the love in the world ♡</span>
          <span aria-hidden="true">·</span>
          <span>A romantic proposal made for two</span>
        </div>
      </footer>
    </div>
  );
}
