import { Volume2, VolumeX, Heart } from 'lucide-react';

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
  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/90 backdrop-blur-md border-b border-rose-100/80 px-4 sm:px-6 py-3 transition-colors">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => onNavigateStep('landing')}
          className="flex items-center gap-2 text-rose-900 font-bold text-lg sm:text-xl tracking-tight whitespace-nowrap shrink-0 hover:text-rose-700 active:scale-95 transition-all focus-visible:outline-rose-500 rounded-md cursor-pointer"
        >
          <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse-gentle" />
          <span>My Love</span>
        </button>

        {/* Zone 2: Clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-rose-950/70">
          <button
            onClick={() => onNavigateStep('landing')}
            className={`whitespace-nowrap shrink-0 hover:text-rose-900 active:scale-95 transition-all cursor-pointer ${
              currentStep === 'landing' ? 'text-rose-900 font-semibold' : ''
            }`}
          >
            Start
          </button>
          <button
            onClick={() => onNavigateStep('proposal')}
            className={`whitespace-nowrap shrink-0 hover:text-rose-900 active:scale-95 transition-all cursor-pointer ${
              currentStep === 'proposal' ? 'text-rose-900 font-semibold' : ''
            }`}
          >
            Question
          </button>
          <button
            onClick={() => onNavigateStep('final')}
            className={`whitespace-nowrap shrink-0 hover:text-rose-900 active:scale-95 transition-all cursor-pointer ${
              currentStep === 'final' ? 'text-rose-900 font-semibold' : ''
            }`}
          >
            Vows & Perks
          </button>
        </nav>

        {/* Zone 3: Primary Action (Audio Control) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onToggleSound}
            title={isMuted ? 'Turn romantic music on' : 'Mute music'}
            className="min-h-[44px] min-w-[44px] px-3 py-1.5 rounded-full text-rose-800 bg-rose-50 hover:bg-rose-100 active:scale-95 border border-rose-200/80 flex items-center justify-center gap-1.5 text-xs font-medium transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-rose-500"
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-rose-600 animate-pulse" />}
            <span className="hidden sm:inline">{isMuted ? 'Music Off' : 'Music On'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
