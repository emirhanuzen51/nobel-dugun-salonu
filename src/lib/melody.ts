// Kamu malı eserlerin (Pachelbel — Canon, Wagner — Gelin Marşı) Web Audio ile sentezlenmiş basit düzenlemeleri.
// Ses dosyası gerektirmez; telif içermez.

const N: Record<string, number> = {};
(() => {
  const names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  for (let o = 1; o <= 7; o++) names.forEach((n, i) => (N[`${n}${o}`] = 440 * Math.pow(2, (o - 4) + (i - 9) / 12)));
})();

type Ev = { t: number; f: number; d: number; v: number };

function canon(): { evs: Ev[]; len: number } {
  const chords = [["D3", "F#3", "A3"], ["A2", "C#3", "E3"], ["B2", "D3", "F#3"], ["F#2", "A2", "C#3"], ["G2", "B2", "D3"], ["D3", "F#3", "A3"], ["G2", "B2", "D3"], ["A2", "C#3", "E3"]];
  const top = ["F#5", "E5", "D5", "C#5", "B4", "A4", "B4", "C#5"];
  const q = 0.5; // saniye / vuruş
  const evs: Ev[] = [];
  chords.forEach((c, i) => {
    const t0 = i * 4 * q;
    evs.push({ t: t0, f: N[c[0]] / 2, d: 4 * q, v: 0.18 });
    const up = c.map((n) => N[n] * 2);
    const pat = [up[0], up[1], up[2], up[0] * 2, up[2], up[1], up[2], up[0] * 2];
    pat.forEach((f, k) => evs.push({ t: t0 + k * (q / 2), f, d: q, v: 0.07 }));
    evs.push({ t: t0, f: N[top[i]], d: 4 * q, v: 0.11 });
  });
  return { evs, len: 32 * q };
}

function bridal(): { evs: Ev[]; len: number } {
  const b = 0.62;
  const mel: [string, number][] = [["G4", 1], ["C5", 0.75], ["C5", 0.25], ["C5", 2], ["G4", 1], ["D5", 0.75], ["B4", 0.25], ["C5", 2], ["G4", 1], ["C5", 0.75], ["F5", 0.25], ["F5", 1], ["E5", 0.75], ["D5", 0.25], ["C5", 0.75], ["B4", 0.25], ["C5", 2], ["C5", 2]];
  const evs: Ev[] = [];
  let t = 0;
  mel.forEach(([n, d]) => {
    evs.push({ t: t * b, f: N[n], d: d * b * 1.4, v: 0.13 });
    t += d;
  });
  const bass = [["C3", 0], ["G2", 4], ["C3", 8], ["F2", 10], ["G2", 12], ["C3", 14]] as const;
  bass.forEach(([n, at]) => {
    const f = N[n];
    [f, f * 1.5, f * 2].forEach((x, k) => evs.push({ t: (at + k * 0.33) * b, f: x, d: 2.4 * b, v: 0.06 }));
  });
  return { evs, len: t * b + 1.2 };
}

export class MelodyPlayer {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private nextLoop = 0;
  playing = false;

  start(id: "canon" | "gelin") {
    this.stop();
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0;
    this.master.gain.linearRampToValueAtTime(0.9, this.ctx.currentTime + 1.5);
    const rev = this.ctx.createDelay();
    rev.delayTime.value = 0.18;
    const fb = this.ctx.createGain();
    fb.gain.value = 0.28;
    rev.connect(fb).connect(rev);
    this.master.connect(this.ctx.destination);
    this.master.connect(rev);
    rev.connect(this.ctx.destination);
    const song = id === "canon" ? canon() : bridal();
    const harp = id === "gelin";
    this.nextLoop = this.ctx.currentTime + 0.1;
    const schedule = () => {
      if (!this.ctx || !this.master) return;
      while (this.nextLoop < this.ctx.currentTime + 2) {
        for (const e of song.evs) this.note(this.nextLoop + e.t, e.f, e.d, e.v, harp);
        this.nextLoop += song.len;
      }
    };
    schedule();
    this.timer = setInterval(schedule, 500);
    this.playing = true;
  }

  private note(t: number, f: number, d: number, v: number, harp: boolean) {
    if (!this.ctx || !this.master) return;
    const o = this.ctx.createOscillator();
    const o2 = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = harp ? "triangle" : "sine";
    o2.type = "sine";
    o.frequency.value = f;
    o2.frequency.value = f * (harp ? 2 : 3);
    const g2 = this.ctx.createGain();
    g2.gain.value = harp ? 0.25 : 0.18;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(v, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(0.4, d) * (harp ? 1.6 : 1.2));
    o.connect(g);
    o2.connect(g2).connect(g);
    g.connect(this.master);
    o.start(t);
    o2.start(t);
    o.stop(t + d * 2 + 0.5);
    o2.stop(t + d * 2 + 0.5);
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    if (this.ctx) {
      const c = this.ctx;
      try {
        this.master?.gain.linearRampToValueAtTime(0, c.currentTime + 0.4);
      } catch {}
      setTimeout(() => c.close().catch(() => {}), 500);
    }
    this.ctx = null;
    this.master = null;
    this.playing = false;
  }
}
