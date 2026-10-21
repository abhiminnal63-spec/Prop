import { useEffect, useState } from 'react';

interface HeartBubble {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

const HEART_COLORS = [
  '#F43F5E', // rose
  '#FB7185', // light rose
  '#FDA4AF', // blush
  '#E11D48', // deep rose
  '#F472B6', // pink
  '#C084FC', // soft purple/lavender
];

export function FloatingHearts() {
  const [ambientHearts, setAmbientHearts] = useState<HeartBubble[]>([]);
  const [interactiveHearts, setInteractiveHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    // Generate initial gentle ambient floating hearts
    const initial: HeartBubble[] = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      x: Math.random() * 96 + 2, // 2% to 98%
      y: Math.random() * 90 + 5,
      size: Math.floor(Math.random() * 16) + 12, // 12px to 28px
      duration: Math.random() * 8 + 8, // 8s to 16s
      delay: Math.random() * 5,
      opacity: Math.random() * 0.35 + 0.15,
      color: HEART_COLORS[i % HEART_COLORS.length],
    }));
    setAmbientHearts(initial);
  }, []);

  // Allow clicking anywhere to pop floating hearts
  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      // Don't trigger if clicked on an interactive button or input
      const target = e.target as HTMLElement;
      if (target.closest('button, input, textarea, a, [role="button"]')) {
        return;
      }

      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }

      const id = Date.now() + Math.random();
      setInteractiveHearts((prev) => [...prev.slice(-12), { id, x: clientX, y: clientY }]);

      // Remove after animation completes
      setTimeout(() => {
        setInteractiveHearts((prev) => prev.filter((h) => h.id !== id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Soft ambient background gradient spots */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-rose-200/30 blur-3xl" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-pink-100/40 blur-3xl" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-purple-100/30 blur-3xl" />

      {/* Ambient floating hearts */}
      {ambientHearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-slow select-none"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill={heart.color}
            className="drop-shadow-xs"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}

      {/* Click-to-burst hearts */}
      {interactiveHearts.map((h) => (
        <div
          key={h.id}
          className="absolute pointer-events-none"
          style={{
            left: `${h.x - 12}px`,
            top: `${h.y - 12}px`,
            animation: 'heartBurst 0.9s cubic-bezier(0.25, 1, 0.5, 1) forwards',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#E11D48">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
