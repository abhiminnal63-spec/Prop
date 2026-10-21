import { useEffect, useState, useRef } from 'react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { COUPLE_CELEBRATION_IMG } from '../assets/images';
import { CoupleIllustration } from './CoupleIllustration';
import { fireCelebrationConfetti } from '../utils/confetti';
import { playYesFanfare } from '../utils/audio';

interface CelebrationScreenProps {
  onComplete: () => void;
  partnerName: string;
}

export function CelebrationScreen({ onComplete, partnerName }: CelebrationScreenProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(5);
  const timerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);

  // Keep ref up to date
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // 1. Play romantic fanfare and confetti burst immediately
    playYesFanfare();
    fireCelebrationConfetti();

    // Secondary confetti burst at 2.5s for continued celebration
    const secondaryBurst = window.setTimeout(() => {
      fireCelebrationConfetti();
    }, 2400);

    // 2. Real JavaScript interval for the 5-second countdown display
    intervalRef.current = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 3. Real JavaScript 5000ms timer for the automatic transition
    timerRef.current = window.setTimeout(() => {
      onCompleteRef.current();
    }, 5000);

    // Strict cleanup function to prevent memory leaks and duplicate timers
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

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center px-4 py-6 sm:py-8 animate-in zoom-in-95 duration-500">
      {/* Dedication badge */}
      <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700/80 mb-3 tracking-wide">
        <Sparkles className="w-4 h-4 text-amber-500" />
        <span>{partnerName ? `Official Answer from ${partnerName}` : 'The Sweetest Moment'}</span>
        <Sparkles className="w-4 h-4 text-amber-500" />
      </div>

      {/* Success Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#4C0519] tracking-tight leading-tight max-w-xl text-balance mb-3">
        OMG! YOU SAID YES! 🥹❤️
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg text-rose-950/80 max-w-lg mb-6 leading-relaxed">
        Best decision ever. My heart officially belongs to you! 💕
      </p>

      {/* 2D Happy Celebration Couple Illustration */}
      <div className="w-full max-w-xs sm:max-w-sm mb-6 animate-pulse-gentle">
        <CoupleIllustration
          src={COUPLE_CELEBRATION_IMG}
          alt="Cute 2D human couple celebrating together with joyful smiles and confetti"
          variant="celebration"
        />
      </div>

      {/* 5-Second Timer Bar & Countdown */}
      <div className="w-full max-w-xs sm:max-w-sm flex flex-col items-center gap-3">
        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-rose-100 overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-1000 ease-linear rounded-full"
            style={{ width: `${((5 - remainingSeconds) / 5) * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-full text-xs text-rose-800/80 font-medium">
          <span className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-ping" />
            Celebration in progress…
          </span>
          <span className="font-mono tabular-nums">{remainingSeconds}s remaining</span>
        </div>

        {/* Skip button with active:scale-95 */}
        <button
          onClick={onComplete}
          className="mt-2 text-xs font-semibold text-rose-700 hover:text-rose-900 underline underline-offset-4 flex items-center gap-1 cursor-pointer transition-all active:scale-95"
        >
          <span>Continue to our promises ahead</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
