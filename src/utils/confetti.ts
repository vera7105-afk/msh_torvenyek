import confetti from 'canvas-confetti';

export function fireConfetti() {
  if (typeof window === 'undefined') return;

  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6']
    });
  } catch (e) {
    console.error('Confetti error:', e);
  }
}

export function fireCelebrationConfetti() {
  if (typeof window === 'undefined') return;

  try {
    const end = Date.now() + 1500;
    const colors = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } catch (e) {
    console.error('Confetti celebration error:', e);
  }
}
