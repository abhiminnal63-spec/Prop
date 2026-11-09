import { useEffect, useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { CHIBI_COUPLE_CELEBRATION } from '../assets/images';
import { CoupleIllustration } from './CoupleIllustration';
import { fireCelebrationConfetti } from '../utils/confetti';
import { playYesFanfare } from '../utils/audio';
import { WindowFrame } from './WindowFrame';

interface CelebrationScreenProps {
  onComplete: () => void;
  partnerName?: string;
}

export function CelebrationScreen({ onComplete, partnerName }: CelebrationScreenProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(5);
  const timerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // 1. Play romantic fanfare and confetti bursts
    playYesFanfare();
    fireCelebrationConfetti();

    const secondaryBurst = window.setTimeout(() => {
      fireCelebrationConfetti();
    }, 2200);

    // 2. Real JavaScript interval for countdown
    intervalRef.current = window.setInterval(() => {
      setRemainingSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    // 3. Real JavaScript 5000ms timer for transition
    timerRef.current = window.setTimeout(() => {
      onCompleteRef.current();
    }, 5000);

    return () => {
      clearTimeout(secondaryBurst);
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const windowTitle = partnerName ? `OFFICIAL ANSWER FROM ${partnerName.toUpperCase()}` : 'THE SWEETEST MOMENT';

  return (
    <div className="w-full animate-entrance">
      <WindowFrame title={windowTitle} stepIndicator=">">
        {/* Success Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#84364F] tracking-tight leading-snug text-center max-w-lg mb-2 font-display">
          OMG! YOU SAID YES! 🥺❤️
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#84364F]/85 text-center max-w-md mb-5 leading-relaxed font-semibold">
          Best decision ever. My heart officially belongs to you! 💕
        </p>

        {/* Chibi Celebration Illustration */}
        <div className="w-full mb-5">
          <CoupleIllustration
            src={CHIBI_COUPLE_CELEBRATION}
            alt="Cute chibi couple celebrating together with joyful smiles and confetti"
            variant="celebration"
          />
        </div>

        {/* Progress Bar & Countdown matching reference design */}
        <div className="w-full max-w-xs sm:max-w-sm flex flex-col items-center gap-2">
          {/* Progress bar with dark burgundy outline */}
          <div className="w-full h-3 rounded-full bg-[#FCE8EF] border-[2px] border-[#84364F] overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#B94E68] to-[#F3A0B4] rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${((5 - remainingSeconds) / 5) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between w-full text-xs text-[#84364F] font-bold">
            <span>Celebration in progress...</span>
            <span className="font-mono tabular-nums">{remainingSeconds}s remaining</span>
          </div>

          {/* Skip link */}
          <button
            onClick={onComplete}
            className="mt-3 text-xs font-bold text-[#B94E68] hover:text-[#84364F] underline underline-offset-4 flex items-center gap-1 cursor-pointer transition-all active:scale-95"
          >
            <span>Continue to our promises ahead</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </WindowFrame>
    </div>
  );
}
