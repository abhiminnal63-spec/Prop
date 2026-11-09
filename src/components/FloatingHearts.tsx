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

const KAWAII_HEART_COLORS = [
  '#F3A0B4', // primary pink
  '#FAD5E0', // light pastel pink
  '#B94E68', // deep rose
  '#84364F', // dark burgundy
  '#FFF8F0', // warm cream
];

export function FloatingHearts() {
  const [ambientHearts, setAmbientHearts] = useState<HeartBubble[]>([]);
  const [interactiveHearts, setInteractiveHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const initial: HeartBubble[] = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 92 + 4,
      y: Math.random() * 88 + 6,
      size: Math.floor(Math.random() * 12) + 14, // 14px to 26px
      duration: Math.random() * 6 + 7,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.35 + 0.25,
      color: KAWAII_HEART_COLORS[i % KAWAII_HEART_COLORS.length],
    }));
    setAmbientHearts(initial);
  }, []);

  // Allow clicking anywhere to pop floating hearts
  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
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
      setInteractiveHearts((prev) => [...prev.slice(-10), { id, x: clientX, y: clientY }]);

      setTimeout(() => {
        setInteractiveHearts((prev) => prev.filter((h) => h.id !== id));
      }, 900);
    };

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
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
            stroke="#84364F"
            strokeWidth="1.5"
            className="drop-shadow-xs"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
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
            animation: 'heartBurst 0.85s cubic-bezier(0.25, 1, 0.5, 1) forwards',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#B94E68" stroke="#84364F" strokeWidth="2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
