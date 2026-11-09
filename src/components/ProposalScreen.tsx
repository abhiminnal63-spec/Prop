import React, { useState, useRef } from 'react';
import { Heart, MessageCircleHeart } from 'lucide-react';
import { CHIBI_COUPLE_PROPOSAL } from '../assets/images';
import { CoupleIllustration } from './CoupleIllustration';
import { playPlayfulBoing } from '../utils/audio';
import { WindowFrame } from './WindowFrame';

interface ProposalScreenProps {
  onYes: () => void;
  partnerName?: string;
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

    // Playful small shift within safe boundaries (max 26px) so it never covers YES or leaves window
    const offsets = [
      { x: 18, y: -6 },
      { x: -18, y: 8 },
      { x: 20, y: 6 },
      { x: -15, y: -8 },
      { x: 12, y: 10 },
    ];
    const chosenOffset = offsets[nextCount % offsets.length];
    setNoOffset(chosenOffset);

    // Brief wobble animation
    setIsWobbling(true);
    setTimeout(() => setIsWobbling(false), 300);
  };

  const handleNoKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const nextCount = noCount + 1;
      setNoCount(nextCount);
      const messageIndex = (nextCount - 1) % FUNNY_NO_MESSAGES.length;
      setCurrentFunnyMessage(FUNNY_NO_MESSAGES[messageIndex]);
    }
  };

  const yesScale = Math.min(1 + noCount * 0.05, 1.2);
  const windowTitle = partnerName ? `TO ${partnerName.toUpperCase()} ♡ WITH ALL MY HEART` : 'THE QUESTION OF A LIFETIME';

  return (
    <div ref={containerRef} className="w-full animate-entrance">
      <WindowFrame title={windowTitle} stepIndicator=">>">
        {/* Main Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#84364F] tracking-tight leading-snug text-center max-w-lg mb-2 font-display">
          Will You Be Mine Forever? 💍❤️
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#84364F]/85 text-center max-w-md mb-6 leading-relaxed font-semibold">
          I promise to annoy you, steal your snacks, send you silly memes, and love you even on your grumpiest days.
        </p>

        {/* Chibi Proposal Couple Illustration */}
        <div className="w-full mb-5">
          <CoupleIllustration
            src={CHIBI_COUPLE_PROPOSAL}
            alt="Cute chibi proposal illustration with ring box"
            variant="proposal"
          />
        </div>

        {/* Funny Speech Bubble when NO is clicked */}
        {currentFunnyMessage && (
          <div
            role="status"
            aria-live="polite"
            className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FAD5E0] border-[2px] border-[#84364F] text-[#84364F] text-xs sm:text-sm font-bold shadow-kawaii-sm animate-in slide-in-from-bottom-2 duration-300"
          >
            <MessageCircleHeart className="w-4 h-4 text-[#B94E68] shrink-0" />
            <span>{currentFunnyMessage}</span>
          </div>
        )}

        {/* Interactive Action Buttons */}
        <div className="w-full max-w-md flex flex-col items-center justify-center gap-3">
          <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 w-full flex-wrap">
            {/* YES Button */}
            <button
              id="yes_button"
              type="button"
              onClick={onYes}
              style={{ transform: `scale(${yesScale})` }}
              className="min-h-[48px] min-w-[130px] sm:min-w-[145px] px-6 py-2.5 rounded-full bg-[#B94E68] hover:bg-[#A33F57] text-white font-bold text-base sm:text-lg border-[2.5px] border-[#84364F] shadow-kawaii-pill hover:shadow-kawaii-sm active:scale-95 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F3A0B4] z-10"
            >
              <Heart className="w-4 h-4 fill-white text-white" />
              <span className="whitespace-nowrap font-display">YES! ♡</span>
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
                className={`min-h-[48px] min-w-[110px] sm:min-w-[125px] px-5 py-2.5 rounded-full bg-[#FFF8F0] hover:bg-[#FCE8EF] text-[#84364F] font-bold text-base border-[2.5px] border-[#84364F] shadow-kawaii-pill hover:shadow-kawaii-sm active:scale-95 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FAD5E0] ${
                  isWobbling ? 'animate-bounce' : ''
                }`}
                aria-label="No, playful rejection button"
              >
                <span className="whitespace-nowrap font-display">NO 🙈</span>
              </button>
            </div>
          </div>

          {noCount > 0 && (
            <p className="text-xs text-[#84364F]/75 font-bold mt-1 text-center">
              (P.S. The YES button gets sweeter every time you hesitate 😉)
            </p>
          )}
        </div>
      </WindowFrame>
    </div>
  );
}
