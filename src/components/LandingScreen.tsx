import { Sparkles, MailOpen, HeartHandshake } from 'lucide-react';
import { COUPLE_LANDING_IMG } from '../assets/images';
import { CoupleIllustration } from './CoupleIllustration';

interface LandingScreenProps {
  partnerName: string;
  senderName: string;
  onOpenHeart: () => void;
}

export function LandingScreen({ partnerName, senderName, onOpenHeart }: LandingScreenProps) {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center px-4 py-6 sm:py-10 animate-entrance">
      {/* Quiet top romantic dedication (no pills) */}
      <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-rose-700/90 mb-4 tracking-wide">
        <Sparkles className="w-4 h-4 text-rose-500" />
        <span>
          {partnerName ? `A special letter for ${partnerName}` : 'A gentle message from the heart'}
        </span>
        {senderName && (
          <>
            <span aria-hidden="true">·</span>
            <span>from {senderName}</span>
          </>
        )}
      </div>

      {/* Main Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#4C0519] tracking-tight leading-tight max-w-xl text-balance mb-4">
        Hey, I Have a Question for You… 💗
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg text-rose-900/80 max-w-lg mb-8 leading-relaxed font-normal">
        I've been keeping something in my heart, and it's finally time to ask.
      </p>

      {/* 2D Human Couple Illustration */}
      <div className="w-full max-w-xs sm:max-w-sm mb-8">
        <CoupleIllustration
          src={COUPLE_LANDING_IMG}
          alt="A cute 2D human couple surrounded by subtle floating hearts."
          variant="landing"
        />
      </div>

      {/* Primary Action Button */}
      <div className="w-full max-w-xs sm:max-w-sm flex flex-col items-center gap-3">
        <button
          onClick={onOpenHeart}
          className="group relative w-full min-h-[52px] px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 text-white font-bold text-base sm:text-lg shadow-lg shadow-rose-600/25 hover:shadow-xl hover:shadow-rose-600/35 hover:-translate-y-0.5 active:scale-95 transition-all duration-150 flex items-center justify-center gap-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-400"
        >
          <MailOpen className="w-5 h-5 text-rose-100 group-hover:scale-110 transition-transform" />
          <span className="tracking-wide">Open My Heart 💌</span>
        </button>

        <span className="text-xs text-rose-900/60 font-medium flex items-center gap-1.5">
          <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
          A cute little promise waiting inside
        </span>
      </div>
    </div>
  );
}
