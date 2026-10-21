import confetti from 'canvas-confetti';

export function fireCelebrationConfetti() {
  if (typeof window === 'undefined') return;

  // Check reduced motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // Center romantic burst
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#F43F5E', '#E11D48', '#FB7185', '#FDA4AF', '#F472B6', '#FBBF24', '#FFFFFF'],
    shapes: ['circle', 'square'],
    scalar: 1.1,
    ticks: 200,
  });

  // Left cannon
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#F43F5E', '#BE185D', '#F472B6', '#FDA4AF', '#FCD34D'],
    });
  }, 200);

  // Right cannon
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#F43F5E', '#BE185D', '#F472B6', '#FDA4AF', '#FCD34D'],
    });
  }, 400);
}
