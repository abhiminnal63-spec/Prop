
import { useState } from 'react';
import {
  RotateCcw,
  CheckCircle2,
  Pizza,
  Music2,
  Moon,
  Sparkles,
  Heart,
} from 'lucide-react';

interface FinalScreenProps {
  onReplay: () => void;
  partnerName?: string;
  senderName?: string;
}

const PREFILLED_MESSAGE =
  "YESSS! ❤️🥹 You officially have my heart! I'm ready for all the silly moments, laughter, adventures, and beautiful memories with you. Here's to us! 💕💍";

export function FinalScreen({ onReplay }: FinalScreenProps) {
  const [replyInitiated, setReplyInitiated] = useState(false);

  const handleOpenWhatsApp = () => {
    const encodedText = encodeURIComponent(PREFILLED_MESSAGE);
    const waUrl = `https://wa.me/?text=${encodedText}`;

    setReplyInitiated(true);

    // Open WhatsApp without specifying a recipient number.
    window.location.href = waUrl;
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center px-4 py-6 sm:py-8 animate-entrance">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700/80 mb-3 tracking-wide">
        <Sparkles className="w-4 h-4 text-rose-500" />
        <span>Chapter 1: Forever Begins Today</span>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#4C0519] tracking-tight leading-tight text-center max-w-xl text-balance mb-3">
        One YES. A Million Beautiful Memories Ahead. 💖
      </h1>

      <p className="text-base sm:text-lg text-rose-950/80 text-center max-w-lg mb-8 leading-relaxed">
        You just made someone incredibly happy. Here's to our silly moments,
        endless laughter, unforgettable memories, and a love that keeps growing.
      </p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
        <div className="p-4 rounded-2xl bg-white/80 border border-rose-100 shadow-xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100/80 flex items-center justify-center shrink-0 text-amber-700">
            <Pizza className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-rose-950">50/50 Snack Sharing Rule</h2>
            <p className="text-xs text-rose-900/70 mt-1 leading-normal">
              What's mine is yours (including the fries, even if you claimed you weren't hungry).
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/80 border border-rose-100 shadow-xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-100/80 flex items-center justify-center shrink-0 text-rose-700">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-rose-950">Guaranteed Hugs & Sweet Texts</h2>
            <p className="text-xs text-rose-900/70 mt-1 leading-normal">
              A warm hug on grumpy days and sweet goodnight wishes every single evening.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/80 border border-rose-100 shadow-xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-100/80 flex items-center justify-center shrink-0 text-purple-700">
            <Music2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-rose-950">Passenger Seat DJ Rights</h2>
            <p className="text-xs text-rose-900/70 mt-1 leading-normal">
              Full control over road trip playlists and singing loudly off-key together.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/80 border border-rose-100 shadow-xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100/80 flex items-center justify-center shrink-0 text-emerald-700">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-rose-950">A Love That Stays & Grows</h2>
            <p className="text-xs text-rose-900/70 mt-1 leading-normal">
              Through sweet days and chaotic adventures, always choosing each other.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full rounded-3xl bg-white border border-rose-200/80 p-5 sm:p-6 shadow-md shadow-rose-900/5 mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-rose-900/80">
            Your Romantic Reply
          </span>
        </div>

        <blockquote className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100/80 text-rose-950 font-medium text-sm sm:text-base leading-relaxed mb-6 italic">
          "{PREFILLED_MESSAGE}"
        </blockquote>

        <div className="flex flex-col items-center gap-2.5">
          <button
            id="whatsapp_reply_button"
            type="button"
            onClick={handleOpenWhatsApp}
            className="w-full min-h-[52px] px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-base sm:text-lg shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 hover:-translate-y-0.5 active:scale-95 transition-all duration-150 flex items-center justify-center gap-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400"
          >
            <svg className="w-6 h-6 fill-white shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.067-2.036-.49-1.637-.679-2.73-2.348-2.812-2.457-.082-.109-.667-.887-.667-1.692s.422-1.203.571-1.367c.149-.164.326-.205.435-.205.109 0 .218.001.313.006.101.005.236-.039.369.281.137.33.468 1.144.509 1.228.041.084.068.183.014.292-.054.109-.081.178-.163.273-.082.095-.172.213-.245.286-.082.082-.167.171-.072.335.095.163.424.698.908 1.13 1.05.934 1.932 1.223 2.204 1.358.272.136.435.114.598-.073.163-.187.697-.812.883-1.091.187-.279.373-.233.626-.14.253.093 1.605.757 1.881.895.276.138.459.207.527.323.068.116.068.672-.076 1.077z" />
            </svg>
            <span className="whitespace-nowrap">Send My Reply on WhatsApp 💚</span>
          </button>

          <p className="text-[11px] text-rose-900/60 font-normal">
            Opens WhatsApp with your prefilled reply. Choose a recipient and press Send.
          </p>
        </div>

        {replyInitiated && (
          <p className="mt-3 text-xs text-emerald-800">
            Continue in WhatsApp to choose a recipient and send your message.
          </p>
        )}
      </div>

      <div className="flex flex-col items-center gap-2">
        <button
          id="replay_button"
          type="button"
          onClick={onReplay}
          className="min-h-[48px] px-6 py-2.5 rounded-2xl bg-white hover:bg-rose-50 text-rose-900 font-bold text-sm sm:text-base border border-rose-200/90 shadow-xs hover:border-rose-300 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-300"
        >
          <RotateCcw className="w-4 h-4 text-rose-600" />
          <span>Replay Our Little Moment 💗</span>
        </button>
        <span className="text-xs text-rose-800/60 font-medium">
          Experience the proposal again from the very beginning
        </span>
      </div>
    </div>
  );
}
