import React, { useState, useRef } from 'react';
import { Heart, Sparkles, MessageCircleHeart } from 'lucide-react';
import { COUPLE_PROPOSAL_IMG } from '../assets/images';
import { CoupleIllustration } from './CoupleIllustration';
import { playPlayfulBoing } from '../utils/audio';

interface ProposalScreenProps {
  onYes: () => void;
  partnerName: string;
}

const FUNNY_NO_MESSAGES = [
  "Are you really sure? 🥺",
  "Think about the snacks we could share! 🍕",
  "My heart is buffering… 💔",
  "Give me one tiny chance? 🥹",
  "Okay, but can I ask one more time? 😭",
  "I promise to give you the bigger half of the dessert! 🍰",
  "You'll get unlimited cuddles and warm socks! 🧦",
  "Look how shiny and cute that YES button is getting! ✨",
];

export function ProposalScreen({ onYes, partnerName }: ProposalScreenProps) {
  const [noCount, setNoCount] = useState(0);
  const [currentFunnyMessage, setCurrentFunnyMessage] = useState<string | null>(null);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [isWobbling, setIsWobbling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNoClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    playPlayfulBoing();

    const nextCount = noCount + 1;
    setNoCount(nextCount);

    const messageIndex = (nextCount - 1) % FUNNY_NO_MESSAGES.length;
    setCurrentFunnyMessage(FUNNY_NO_MESSAGES[messageIndex]);

    // Playful small shift within safe boundaries (max 28px) so it never covers YES or leaves view
    const offsets = [
      { x: 18, y: -8 },
      { x: -20, y: 10 },
      { x: 22, y: 8 },
      { x: -16, y: -10 },
      { x: 12, y: 12 },
    ];
    const chosenOffset = offsets[nextCount % offsets.length];
    setNoOffset(chosenOffset);

    // Brief wobble animation
    setIsWobbling(true);
    setTimeout(() => setIsWobbling(false), 350);
  };

  // Keyboard accessibility: handle space/enter on NO
  const handleNoKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const nextCount = noCount + 1;
      setNoCount(nextCount);
      const messageIndex = (nextCount - 1) % FUNNY_NO_MESSAGES.length;
      setCurrentFunnyMessage(FUNNY_NO_MESSAGES[messageIndex]);
    }
  };

  // YES button scale factor, capped at 1.25 for clean layout integrity
  const yesScale = Math.min(1 + noCount * 0.05, 1.22);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-2xl mx-auto flex flex-col items-center text-center px-4 py-6 sm:py-8 animate-in fade-in duration-500"
    >
      {/* Dedication label */}
      <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700/80 mb-3 tracking-wide">
        <Sparkles className="w-4 h-4 text-rose-500" />
        <span>{partnerName ? `From my heart to ${partnerName}` : 'The question of a lifetime'}</span>
      </div>

      {/* Proposal Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#4C0519] tracking-tight leading-tight max-w-xl text-balance mb-3">
        Will You Be Mine Forever? 💍❤️
      </h1>

      {/* Cute Emotional Description */}
      <p className="text-base sm:text-lg text-rose-950/80 max-w-lg mb-6 leading-relaxed">
        I promise to annoy you, steal your snacks, send you silly memes, and love you even on your grumpiest days.
      </p>

      {/* 2D Proposal Couple Illustration */}
      <div className="w-full max-w-xs sm:max-w-sm mb-6">
        <CoupleIllustration
          src={COUPLE_PROPOSAL_IMG}
          alt="Cute 2D proposal illustration with ring"
          variant="proposal"
        />
      </div>

      {/* Funny Speech Bubble when NO is clicked */}
      {currentFunnyMessage && (
        <div
          role="status"
          aria-live="polite"
          className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-rose-50 border border-rose-200/90 text-rose-900 text-sm font-medium shadow-sm animate-in slide-in-from-bottom-2 duration-300"
        >
          <MessageCircleHeart className="w-4 h-4 text-rose-500 shrink-0" />
          <span>{currentFunnyMessage}</span>
        </div>
      )}

      {/* Interactive Action Area */}
      <div className="w-full max-w-md flex flex-col items-center justify-center gap-4 mt-2">
        <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 w-full flex-wrap">
          {/* YES Button */}
          <button
            id="yes_button"
            type="button"
            onClick={onYes}
            style={{ transform: `scale(${yesScale})` }}
            className="min-h-[50px] min-w-[130px] sm:min-w-[150px] px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 text-white font-extrabold text-base sm:text-lg shadow-lg shadow-rose-600/30 hover:shadow-xl hover:shadow-rose-600/45 hover:brightness-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-400 z-10"
          >
            <Heart className="w-5 h-5 fill-white" />
            <span className="whitespace-nowrap">YES! ❤️</span>
          </button>

          {/* NO Button */}
          <div
            style={{
              transform: `translate(${noOffset.x}px, ${noOffset.y}px)`,
              transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            className="inline-block"
          >
            <button
              id="no_button"
              type="button"
              onClick={handleNoClick}
              onKeyDown={handleNoKeyDown}
              className={`min-h-[50px] min-w-[110px] px-5 py-3 rounded-2xl bg-rose-50/80 hover:bg-rose-100 text-rose-800/90 font-semibold text-sm sm:text-base border border-rose-200/90 shadow-xs hover:border-rose-300 active:scale-95 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-300 ${
                isWobbling ? 'animate-bounce' : ''
              }`}
              aria-label="No, playful rejection button"
            >
              <span className="whitespace-nowrap">NO 🙈</span>
            </button>
          </div>
        </div>

        {/* Playful hint text if NO was clicked */}
        {noCount > 0 && (
          <p className="text-xs text-rose-800/70 font-medium mt-1">
            (P.S. The YES button gets sweeter every time you hesitate 😉)
          </p>
        )}
      </div>
    </div>
  );
}
