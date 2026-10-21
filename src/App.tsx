import { useState, useEffect, useCallback, useRef } from 'react';
import { TopNav } from './components/TopNav';
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

  // Auto-play the song when entering the website
  useEffect(() => {
    // 1. Try to start music immediately upon load
    startMusic();

    // 2. Many mobile/desktop browsers require a first user gesture to unlock Web Audio.
    // Register one-shot interaction listeners to start playback immediately upon any touch/click/scroll.
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
      // Ignore storage/url parsing errors
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
    <div className="relative min-h-screen flex flex-col justify-between bg-[#FFFDF9] text-[#292524] overflow-x-hidden">
      {/* Ambient floating hearts effect */}
      <FloatingHearts />

      {/* Top Bar Navigation */}
      <TopNav
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        currentStep={step}
        onNavigateStep={(s) => setStep(s)}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center py-6 sm:py-10">
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

      {/* Subtle, unboxed footer with clean romantic typography */}
      <footer className="relative z-10 py-6 text-center text-xs text-rose-900/60 border-t border-rose-100/60 bg-[#FFFDF9]/60">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span>Crafted with all the love in the world</span>
          <span aria-hidden="true">·</span>
          <span>A proposal made for two</span>
        </div>
      </footer>
    </div>
  );
}
