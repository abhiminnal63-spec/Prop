import { Mail } from 'lucide-react';
import { CHIBI_COUPLE_HUG } from '../assets/images';
import { CoupleIllustration } from './CoupleIllustration';
import { WindowFrame } from './WindowFrame';

interface LandingScreenProps {
  partnerName?: string;
  senderName?: string;
  onOpenHeart: () => void;
}

export function LandingScreen({ partnerName, onOpenHeart }: LandingScreenProps) {
  const windowTitle = partnerName ? `A MESSAGE FOR ${partnerName.toUpperCase()}` : 'A GENTLE MESSAGE';

  return (
    <div className="w-full animate-entrance">
      <WindowFrame title={windowTitle} stepIndicator=">">
        {/* Main Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#84364F] tracking-tight leading-snug text-center max-w-lg mb-2 font-display">
          Hey, I Have a Question for You... 💖
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#84364F]/85 text-center max-w-md mb-6 leading-relaxed font-semibold">
          I've been keeping something in my heart, and it's finally time to ask.
        </p>

        {/* Chibi Couple Hug Illustration */}
        <div className="w-full mb-6">
          <CoupleIllustration
            src={CHIBI_COUPLE_HUG}
            alt="A cute chibi human couple hugging warmly in a pink scarf"
            variant="landing"
          />
        </div>

        {/* Primary Action Button (Open My Heart) */}
        <div className="w-full max-w-xs flex flex-col items-center">
          <button
            onClick={onOpenHeart}
            className="group w-full min-h-[50px] px-8 py-3 rounded-full bg-[#B94E68] hover:bg-[#A33F57] text-white font-bold text-base sm:text-lg border-[2.5px] border-[#84364F] shadow-kawaii-pill hover:shadow-kawaii-sm active:scale-95 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F3A0B4]"
          >
            <Mail className="w-5 h-5 text-white/95" />
            <span className="tracking-wide">Open My Heart ♡</span>
          </button>
        </div>
      </WindowFrame>
    </div>
  );
}
