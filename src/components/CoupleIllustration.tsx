import { useState } from 'react';

interface CoupleIllustrationProps {
  src: string;
  alt: string;
  className?: string;
  variant?: 'landing' | 'proposal' | 'celebration';
}

export function CoupleIllustration({
  src,
  alt,
  className = '',
  variant = 'landing',
}: CoupleIllustrationProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`w-full aspect-square max-w-[280px] sm:max-w-[320px] mx-auto rounded-[22px] bg-[#FFF8F0] border-[2.5px] border-[#84364F] shadow-kawaii-sm p-6 flex flex-col items-center justify-center text-center ${className}`}
      >
        <div className="w-16 h-16 rounded-full bg-[#FAD5E0] border-[2px] border-[#84364F] flex items-center justify-center mb-2">
          {variant === 'proposal' ? (
            <span className="text-3xl" role="img" aria-label="Ring">💍</span>
          ) : variant === 'celebration' ? (
            <span className="text-3xl" role="img" aria-label="Celebration">🎉</span>
          ) : (
            <span className="text-3xl" role="img" aria-label="Love couple">👩‍❤️‍👨</span>
          )}
        </div>
        <p className="text-[#84364F] font-bold text-sm">Two Hearts, One Journey</p>
        <span className="text-xs text-[#B94E68] mt-1 font-semibold">♡ Always & Forever ♡</span>
      </div>
    );
  }

  return (
    <div className={`relative max-w-[280px] sm:max-w-[320px] mx-auto group ${className}`}>
      {/* Decorative cloud/soft border framing */}
      <div className="relative overflow-hidden rounded-[22px] border-[2.5px] border-[#84364F] shadow-kawaii-sm bg-white">
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="eager"
          className="w-full h-auto aspect-square object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          onError={() => setError(true)}
        />
      </div>
    </div>
  );
}
