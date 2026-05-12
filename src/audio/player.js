// Lightweight Web Audio note player. Lazy-creates the AudioContext on the
// first play call (so the browser autoplay policy is satisfied, as long as
// the first play is triggered by a user gesture).

const STORAGE_KEY = "nagham.audio.muted";

let audioContext = null;
let masterGain = null;

function getContext() {
  if (audioContext) return audioContext;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  audioContext = new Ctx();
  masterGain = audioContext.createGain();
  masterGain.gain.value = 0.18;
  masterGain.connect(audioContext.destination);
  return audioContext;
}

export function isAudioSupported() {
  return typeof window !== "undefined" &&
    Boolean(window.AudioContext || window.webkitAudioContext);
}

export function getMuted() {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function setMuted(muted) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, muted ? "1" : "0");
  } catch {
    // ignore — localStorage may be unavailable
  }
}

function midiToFrequency(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function ensureRunning() {
  const ctx = getContext();
  if (!ctx) return null;
  if (ctx.state === "suspended") {
    ctx.resume();
  }
  return ctx;
}

export function playNote(midi, { durationMs = 600 } = {}) {
  if (getMuted()) return;
  const ctx = ensureRunning();
  if (!ctx) return;
  const now = ctx.currentTime;
  const freq = midiToFrequency(midi);

  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.value = freq;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = Math.min(freq * 6, 6000);
  filter.Q.value = 0.7;

  const gain = ctx.createGain();
  // ADSR envelope
  const attackEnd = now + 0.005;
  const decayEnd = attackEnd + 0.08;
  const releaseStart = now + durationMs / 1000;
  const releaseEnd = releaseStart + 0.18;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(1, attackEnd);
  gain.gain.linearRampToValueAtTime(0.55, decayEnd);
  gain.gain.setValueAtTime(0.55, releaseStart);
  gain.gain.linearRampToValueAtTime(0, releaseEnd);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);

  osc.start(now);
  osc.stop(releaseEnd + 0.02);
}

export function playChord(midis, { strumMs = 0, durationMs = 900 } = {}) {
  if (!midis?.length || getMuted()) return;
  const sorted = [...midis].sort((a, b) => a - b);
  sorted.forEach((midi, i) => {
    const delay = strumMs > 0 ? (strumMs * i) / 1000 : 0;
    if (delay === 0) {
      playNote(midi, { durationMs });
    } else {
      setTimeout(() => playNote(midi, { durationMs }), delay * 1000);
    }
  });
}
