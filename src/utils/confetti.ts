import confetti from 'canvas-confetti';

export function fireCelebrationConfetti() {
  if (typeof window === 'undefined') return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // Center romantic burst with project kawaii colors
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#F3A0B4', '#B94E68', '#84364F', '#FAD5E0', '#FFF8F0', '#FBBF24', '#FFFFFF'],
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
      colors: ['#F3A0B4', '#B94E68', '#84364F', '#FAD5E0', '#FDE047'],
    });
  }, 200);

  // Right cannon
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#F3A0B4', '#B94E68', '#84364F', '#FAD5E0', '#FDE047'],
    });
  }, 400);
}
