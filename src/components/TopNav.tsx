import { Music, VolumeX, Heart, Home, Gift } from 'lucide-react';

interface TopNavProps {
  isMuted: boolean;
  onToggleSound: () => void;
  currentStep: 'landing' | 'proposal' | 'celebration' | 'final';
  onNavigateStep: (step: 'landing' | 'proposal' | 'final') => void;
}

export function TopNav({
  isMuted,
  onToggleSound,
  currentStep,
  onNavigateStep,
}: TopNavProps) {
  const isQuestionActive = currentStep === 'proposal' || currentStep === 'celebration';

  return (
    <header className="w-full select-none z-30 mb-2">
      {/* Mobile Top Bar (< md) */}
      <div className="md:hidden flex flex-col gap-2.5 px-4 pt-3 pb-2 bg-[#FCE8EF]/95 backdrop-blur-xs border-b border-[#84364F]/15">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <button
            onClick={() => onNavigateStep('landing')}
            className="flex items-center gap-1.5 text-[#84364F] font-extrabold text-lg font-display active:scale-95 transition-transform"
          >
            <Heart className="w-5 h-5 fill-[#B94E68] text-[#B94E68] animate-pulse-gentle" />
            <span>My Love</span>
          </button>

          {/* Music Button */}
          <button
            onClick={onToggleSound}
            className="min-h-[38px] px-3.5 py-1 rounded-full bg-white text-[#84364F] border-[2px] border-[#84364F] shadow-kawaii-sm flex items-center gap-1.5 text-xs font-bold font-display active:scale-95 transition-all cursor-pointer"
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-[#84364F]" />
            ) : (
              <Music className="w-3.5 h-3.5 text-[#B94E68] animate-bounce" />
            )}
            <span>{isMuted ? 'Music Off' : 'Music On'}</span>
          </button>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 p-1 bg-[#FAD5E0]/60 rounded-full border-[1.5px] border-[#84364F]/30">
          <button
            onClick={() => onNavigateStep('landing')}
            className={`flex-1 py-1.5 px-2 rounded-full text-xs font-extrabold font-display transition-all flex items-center justify-center gap-1 ${
              currentStep === 'landing'
                ? 'bg-white text-[#84364F] shadow-kawaii-sm border-[1.5px] border-[#84364F]'
                : 'text-[#84364F]/70 hover:text-[#84364F]'
            }`}
          >
            <Home className="w-3 h-3" />
            <span>Start</span>
          </button>

          <button
            onClick={() => onNavigateStep('proposal')}
            className={`flex-1 py-1.5 px-2 rounded-full text-xs font-extrabold font-display transition-all flex items-center justify-center gap-1 ${
              isQuestionActive
                ? 'bg-white text-[#84364F] shadow-kawaii-sm border-[1.5px] border-[#84364F]'
                : 'text-[#84364F]/70 hover:text-[#84364F]'
            }`}
          >
            <Heart className="w-3 h-3" />
            <span>Question</span>
          </button>

          <button
            onClick={() => onNavigateStep('final')}
            className={`flex-1 py-1.5 px-2 rounded-full text-xs font-extrabold font-display transition-all flex items-center justify-center gap-1 ${
              currentStep === 'final'
                ? 'bg-white text-[#84364F] shadow-kawaii-sm border-[1.5px] border-[#84364F]'
                : 'text-[#84364F]/70 hover:text-[#84364F]'
            }`}
          >
            <Gift className="w-3 h-3" />
            <span>Vows & Perks</span>
          </button>
        </div>
      </div>

      {/* Desktop Top Bar (md+) matching reference design: single Music pill button on right */}
      <div className="hidden md:flex items-center justify-end px-2 pt-2 pb-1">
        <button
          onClick={onToggleSound}
          className="min-h-[40px] px-4 py-1.5 rounded-full bg-white text-[#84364F] border-[2px] border-[#84364F] shadow-kawaii-sm flex items-center gap-2 text-xs sm:text-sm font-bold font-display hover:bg-[#FFF8F0] active:scale-95 transition-all cursor-pointer"
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-[#84364F]" />
          ) : (
            <Music className="w-4 h-4 text-[#B94E68] animate-bounce" />
          )}
          <span>{isMuted ? 'Music Off' : 'Music On'}</span>
        </button>
      </div>
    </header>
  );
}
