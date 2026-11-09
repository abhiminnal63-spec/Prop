import { Heart, Home, Gift } from 'lucide-react';
import { DoodleEnvelope, DoodleHeart, SparkleStar } from './DoodleDecorations';

interface DesktopSidebarProps {
  currentStep: 'landing' | 'proposal' | 'celebration' | 'final';
  onNavigateStep: (step: 'landing' | 'proposal' | 'final') => void;
}

export function DesktopSidebar({ currentStep, onNavigateStep }: DesktopSidebarProps) {
  const isQuestionActive = currentStep === 'proposal' || currentStep === 'celebration';

  return (
    <aside className="hidden md:flex flex-col justify-between w-48 lg:w-52 rounded-[28px] bg-[#84364F] border-[2.5px] border-[#84364F] shadow-kawaii p-4 text-white shrink-0 select-none relative overflow-hidden">
      {/* Decorative subtle background sparkle */}
      <div className="absolute top-2 right-2 opacity-25 pointer-events-none">
        <SparkleStar size={16} />
      </div>

      {/* Top Branding */}
      <div>
        <button
          onClick={() => onNavigateStep('landing')}
          className="flex items-center gap-2 text-white font-extrabold text-xl tracking-tight mb-8 font-display hover:opacity-90 active:scale-95 transition-all cursor-pointer w-full text-left"
        >
          <Heart className="w-5 h-5 fill-[#F3A0B4] text-[#F3A0B4] animate-pulse-gentle" />
          <span>My Love</span>
        </button>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-2.5 font-display text-sm font-bold">
          {/* Start */}
          <button
            onClick={() => onNavigateStep('landing')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl transition-all cursor-pointer ${
              currentStep === 'landing'
                ? 'bg-white text-[#84364F] shadow-sm font-extrabold scale-[1.02]'
                : 'text-white/85 hover:text-white hover:bg-white/10'
            }`}
          >
            <Home className="w-4 h-4 shrink-0" />
            <span>Start</span>
          </button>

          {/* Question */}
          <button
            onClick={() => onNavigateStep('proposal')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl transition-all cursor-pointer ${
              isQuestionActive
                ? 'bg-white text-[#84364F] shadow-sm font-extrabold scale-[1.02]'
                : 'text-white/85 hover:text-white hover:bg-white/10'
            }`}
          >
            <Heart className={`w-4 h-4 shrink-0 ${isQuestionActive ? 'fill-[#84364F]' : ''}`} />
            <span>Question</span>
          </button>

          {/* Vows & Perks */}
          <button
            onClick={() => onNavigateStep('final')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl transition-all cursor-pointer ${
              currentStep === 'final'
                ? 'bg-white text-[#84364F] shadow-sm font-extrabold scale-[1.02]'
                : 'text-white/85 hover:text-white hover:bg-white/10'
            }`}
          >
            <Gift className="w-4 h-4 shrink-0" />
            <span>Vows & Perks</span>
          </button>
        </nav>
      </div>

      {/* Bottom Envelope & Heart Sticker Doodle matching reference design */}
      <div className="pt-6 pb-2 flex flex-col items-center relative">
        <div className="relative">
          <DoodleEnvelope className="animate-float-slow" />
          <div className="absolute -top-3 -right-2">
            <DoodleHeart size={16} fill="#F3A0B4" />
          </div>
          <div className="absolute -bottom-1 -left-2">
            <SparkleStar size={14} />
          </div>
        </div>
      </div>
    </aside>
  );
}
