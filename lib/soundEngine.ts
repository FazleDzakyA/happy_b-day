// Web Audio API Synthesizer and Audio Manager for Romantic Storybook

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.6;
  private bgAudio: HTMLAudioElement | null = null;
  private isBgPlaying: boolean = false;
  private synthTimer: number | null = null;

  constructor() {
    // Lazy init audio context on first user interaction
  }

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.bgAudio) {
      this.bgAudio.muted = muted;
    }
  }

  public getMuted() {
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.bgAudio) {
      this.bgAudio.volume = this.volume;
    }
  }

  public getVolume() {
    return this.volume;
  }

  // Play background audio file if present, else fallback to soft ambient piano loop
  public startBgMusic() {
    this.initCtx();
    if (typeof window === "undefined") return;

    if (!this.bgAudio) {
      this.bgAudio = new Audio("/audio/bg-music.mp3");
      this.bgAudio.loop = true;
      this.bgAudio.volume = this.volume;
      this.bgAudio.muted = this.isMuted;
    }

    this.bgAudio.play().then(() => {
      this.isBgPlaying = true;
    }).catch(() => {
      // If audio file is missing or blocked, start soft synth piano ambient chord progression
      this.startSynthAmbient();
    });
  }

  private startSynthAmbient() {
    if (this.synthTimer || this.isMuted) return;
    
    // Soft romantic piano chords (Fmaj7 - Cmaj7 - Am7 - G6)
    const chords = [
      [349.23, 440.00, 523.25, 659.25], // Fmaj7
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [196.00, 246.94, 293.66, 392.00]  // G6
    ];

    let chordIdx = 0;
    const playNextChord = () => {
      if (this.isMuted) return;
      const currentChord = chords[chordIdx % chords.length];
      currentChord.forEach((freq, i) => {
        setTimeout(() => {
          this.playPianoNote(freq, 3.5, 0.08);
        }, i * 180);
      });
      chordIdx++;
    };

    playNextChord();
    this.synthTimer = window.setInterval(playNextChord, 4500);
  }

  public playPianoNote(freq: number, duration: number = 2.5, gainVal: number = 0.1) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      const actualGain = gainVal * this.volume;

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(actualGain, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Ignore audio synthesis glitches
    }
  }

  // Realistic paper flip SFX
  public playPageFlipSFX() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      const actualGain = 0.12 * this.volume;

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(actualGain, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start(now);
    } catch {
      // Ignore audio synthesis glitches
    }
  }

  // Pen writing scratch SFX
  public playPenWriteSFX() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const freq = 400 + Math.random() * 300;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.03 * this.volume, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Ignore
    }
  }

  // Soft button click SFX
  public playButtonClickSFX() {
    if (this.isMuted) return;
    this.playPianoNote(523.25, 0.4, 0.08); // C5 note soft tick
  }

  // Confetti celebration chime
  public playConfettiFanfare() {
    if (this.isMuted) return;
    const arpeggio = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    arpeggio.forEach((freq, idx) => {
      setTimeout(() => {
        this.playPianoNote(freq, 3.0, 0.15);
      }, idx * 120);
    });
  }
}

export const soundEngine = typeof window !== "undefined" ? new SoundEngine() : null;
