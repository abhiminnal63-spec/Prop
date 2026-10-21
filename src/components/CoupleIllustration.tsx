import { useState } from 'react';

interface CoupleIllustrationProps {
  src: string;
  alt: string;
  className?: string;
  variant?: 'landing' | 'proposal' | 'celebration';
}

export function CoupleIllustration({ src, alt, className = '', variant = 'landing' }: CoupleIllustrationProps) {
  const [error, setError] = useState(false);

  if (error) {
    // Resilient styled fallback container
    return (
      <div
        className={`w-full aspect-square max-w-sm mx-auto rounded-3xl bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 border border-rose-200/60 p-6 flex flex-col items-center justify-center text-center shadow-lg shadow-rose-900/5 ${className}`}
      >
        <div className="w-20 h-20 rounded-full bg-rose-200/50 flex items-center justify-center mb-3">
          {variant === 'proposal' ? (
            <span className="text-4xl" role="img" aria-label="Ring">💍</span>
          ) : variant === 'celebration' ? (
            <span className="text-4xl" role="img" aria-label="Celebration">🎉</span>
          ) : (
            <span className="text-4xl" role="img" aria-label="Love couple">👩‍❤️‍👨</span>
          )}
        </div>
        <p className="text-rose-950 font-medium text-sm">Two Hearts, One Journey</p>
        <span className="text-xs text-rose-700/80 mt-1">❤️ Always & Forever</span>
      </div>
    );
  }

  return (
    <div className={`relative max-w-xs sm:max-w-sm md:max-w-md mx-auto group ${className}`}>
      {/* Soft romantic glowing aura behind illustration */}
      <div className="absolute -inset-2 bg-gradient-to-r from-rose-200/50 via-pink-200/40 to-purple-200/40 rounded-3xl blur-md -z-10 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative overflow-hidden rounded-3xl border border-rose-200/70 shadow-lg shadow-rose-950/5 bg-white">
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="eager"
          className="w-full h-auto aspect-square object-cover transition-transform duration-500 hover:scale-[1.02]"
          onError={() => setError(true)}
        />
      </div>
    </div>
  );
}
