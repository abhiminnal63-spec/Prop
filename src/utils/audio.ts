/**
 * Romantic Music Box & Sound Generator using Web Audio API
 * Plays seamlessly on page entry without external audio assets or network latency.
 */

let audioCtx: AudioContext | null = null;
let musicInterval: number | null = null;
let isMusicPlaying = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

export function playHeartPop() {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(520, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);

  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.16);
}

export function playPlayfulBoing() {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(320, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.2);

  gain.gain.setValueAtTime(0.07, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.23);
}

export function playYesFanfare() {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  // Romantic harmonic chime progression: C5, E5, G5, B5, C6
  const notes = [523.25, 659.25, 783.99, 987.77, 1046.50];
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);

    gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.1);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.1 + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.9);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + idx * 0.1);
    osc.stop(ctx.currentTime + idx * 0.1 + 0.95);
  });
}

// Romantic acoustic music-box progression (Canon in D inspired romantic arpeggios)
const melody = [
  // Phrase 1: D - A - Bm - F#m
  { lead: 587.33, chord: 293.66 }, // D5, D4
  { lead: 659.25, chord: 440.00 }, // E5, A4
  { lead: 739.99, chord: 369.99 }, // F#5, F#4
  { lead: 587.33, chord: 293.66 }, // D5
  { lead: 440.00, chord: 220.00 }, // A4, A3
  { lead: 493.88, chord: 246.94 }, // B4, B3
  { lead: 587.33, chord: 293.66 }, // D5
  { lead: 739.99, chord: 369.99 }, // F#5

  // Phrase 2: G - D - G - A
  { lead: 783.99, chord: 392.00 }, // G5, G4
  { lead: 739.99, chord: 369.99 }, // F#5
  { lead: 659.25, chord: 329.63 }, // E5
  { lead: 587.33, chord: 293.66 }, // D5
  { lead: 523.25, chord: 261.63 }, // C5
  { lead: 493.88, chord: 246.94 }, // B4
  { lead: 587.33, chord: 293.66 }, // D5
  { lead: 659.25, chord: 440.00 }, // E5, A4
];

let melodyStep = 0;

export function startMusic(): boolean {
  const ctx = getAudioContext();
  if (!ctx) return false;

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {
      // Handled by user gesture listener
    });
  }

  if (isMusicPlaying) return true;
  isMusicPlaying = true;

  const playChimeNote = () => {
    if (!isMusicPlaying || !ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
      return;
    }

    const { lead, chord } = melody[melodyStep % melody.length];
    melodyStep++;

    const now = ctx.currentTime;

    // Lead bell chime (gentle sine wave)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(lead, now);

    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.045, now + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.75);

    // Warm undertone harmonic (soft triangle wave)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(chord, now);

    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.02, now + 0.03);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now);
    osc2.stop(now + 0.65);
  };

  playChimeNote();
  if (musicInterval !== null) clearInterval(musicInterval);
  musicInterval = window.setInterval(playChimeNote, 480);
  return true;
}

export function stopMusic(): void {
  if (musicInterval !== null) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
  isMusicPlaying = false;
}

export function toggleMusic(enabled: boolean): boolean {
  if (!enabled) {
    stopMusic();
    return false;
  }
  return startMusic();
}

export function getIsMusicPlaying(): boolean {
  return isMusicPlaying;
}
