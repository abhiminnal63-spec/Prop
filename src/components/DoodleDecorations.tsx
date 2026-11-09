export function SparkleStar({ className = '', size = 20 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#FFFFFF"
      stroke="#84364F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`drop-shadow-xs select-none ${className}`}
    >
      <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />
    </svg>
  );
}

export function DoodleHeart({
  className = '',
  size = 22,
  fill = '#F3A0B4',
}: {
  className?: string;
  size?: number;
  fill?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="#84364F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`drop-shadow-xs select-none ${className}`}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export function CornerPlantDoodle({ className = '' }: { className?: string }) {
  return (
    <svg
      width="90"
      height="90"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Cute botanical leaves with dark burgundy outline and mint/green fill */}
      <path
        d="M95 95 C 75 75, 45 70, 35 45 C 32 37, 40 25, 52 30 C 65 35, 75 60, 95 95 Z"
        fill="#8DD0B6"
        stroke="#84364F"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M95 95 C 65 90, 50 75, 60 55 C 64 47, 76 46, 82 54 C 88 62, 90 78, 95 95 Z"
        fill="#A3E4C9"
        stroke="#84364F"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M95 95 C 80 60, 60 50, 48 62 C 40 70, 48 85, 95 95 Z"
        fill="#77C4A5"
        stroke="#84364F"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M95 95 C 90 60, 80 40, 70 35"
        stroke="#84364F"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoodleEnvelope({ className = '' }: { className?: string }) {
  return (
    <div className={`relative inline-block ${className}`}>
      <svg
        width="56"
        height="44"
        viewBox="0 0 60 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm select-none"
      >
        {/* Envelope Body */}
        <rect
          x="3"
          y="4"
          width="54"
          height="40"
          rx="8"
          fill="#FFF8F0"
          stroke="#84364F"
          strokeWidth="3"
        />
        {/* Flap lines */}
        <path
          d="M3 8 L30 26 L57 8"
          stroke="#84364F"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Small center heart on envelope */}
        <path
          d="M30 33 L26.5 29.5 C24 27 24 24 26.5 22.5 C29 21 30 23 30 23 C30 23 31 21 33.5 22.5 C36 24 36 27 33.5 29.5 L30 33 Z"
          fill="#F3A0B4"
          stroke="#84364F"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

export function DoodleDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* Top Left Sparkles and Hearts */}
      <div className="absolute top-6 left-6 hidden sm:block animate-sparkle">
        <SparkleStar size={22} />
      </div>
      <div className="absolute top-20 left-24 hidden lg:block animate-float-slow">
        <DoodleHeart size={20} fill="#FAD5E0" />
      </div>

      {/* Top Center-Right Sparkles */}
      <div className="absolute top-5 right-44 hidden md:block animate-sparkle">
        <SparkleStar size={18} />
      </div>

      {/* Right Edge Hearts & Sparkles */}
      <div className="absolute top-36 right-8 hidden sm:block animate-float-reverse">
        <DoodleHeart size={26} fill="#F3A0B4" />
      </div>
      <div className="absolute top-64 right-14 hidden md:block animate-sparkle">
        <SparkleStar size={24} />
      </div>
      <div className="absolute bottom-44 right-10 hidden sm:block animate-float-slow">
        <DoodleHeart size={22} fill="#FAD5E0" />
      </div>

      {/* Bottom Left Hearts */}
      <div className="absolute bottom-24 left-10 hidden lg:block animate-float-reverse">
        <DoodleHeart size={18} fill="#F3A0B4" />
      </div>
      <div className="absolute bottom-8 left-20 hidden md:block animate-sparkle">
        <SparkleStar size={20} />
      </div>

      {/* Bottom Right Corner Cute Plant Leaves (matching reference) */}
      <div className="absolute -bottom-2 -right-2">
        <CornerPlantDoodle className="w-24 h-24 sm:w-28 sm:h-28" />
      </div>
    </div>
  );
}
