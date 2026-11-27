// Soft singing-bowl tones for choosing a chakra, synthesised in the browser
// (no audio files). Off until the visitor turns sound on.
//
// Pitches follow the "solfeggio" set that sound-healing and yoga apps most
// often pair with the chakras (root 396 Hz ... crown 963 Hz). That pairing
// is a modern convention, not part of the classical texts, and the site
// makes no healing claim for it.
export const CHAKRA_HZ = [396, 417, 528, 639, 741, 852, 963];

let ctx: AudioContext | null = null;

export function playBowl(freq: number) {
  try {
    ctx ??= new AudioContext();
    if (ctx.state === 'suspended') void ctx.resume();
    const now = ctx.currentTime;
    const out = ctx.createGain();
    out.gain.setValueAtTime(0, now);
    out.gain.linearRampToValueAtTime(0.13, now + 0.04);
    out.gain.exponentialRampToValueAtTime(0.0001, now + 3.4);
    out.connect(ctx.destination);
    // A fundamental plus two inharmonic partials gives the bowl's shimmer.
    // Upper partials are scaled down for the higher chakras so the crown
    // doesn't turn shrill.
    const soften = 396 / freq;
    const partials: [number, number, number][] = [
      [1, 1, 0],
      [2.76, 0.3 * soften, 4],
      [5.4, 0.1 * soften * soften, -6]
    ];
    for (const [mult, amp, detune] of partials) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq * mult;
      osc.detune.value = detune;
      gain.gain.value = amp;
      osc.connect(gain).connect(out);
      osc.start(now);
      osc.stop(now + 3.5);
    }
  } catch {
    // Audio unavailable (old browser, blocked context): stay silent.
  }
}

const KEY = 'pts-sound';

export function loadSoundPref(): boolean {
  try {
    return localStorage.getItem(KEY) === 'on';
  } catch {
    return false;
  }
}

export function saveSoundPref(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off');
  } catch {
    // Private mode etc.: the choice just won't persist.
  }
}
