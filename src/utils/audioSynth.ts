// Web Audio API retro synthwave generator for Vice City FM
class ViceCitySynth {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;

  public start(genre: string = 'synthwave') {
    if (this.isPlaying) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.isPlaying = true;

      // Chord progression frequencies (F - G - A minor - E minor)
      const chords = [
        [174.61, 220.0, 261.63], // F major
        [196.0, 246.94, 293.66], // G major
        [220.0, 261.63, 329.63], // A minor
        [164.81, 196.0, 246.94], // E minor
      ];

      let step = 0;
      this.playSynthNote(chords[step]);

      this.intervalId = window.setInterval(() => {
        step = (step + 1) % chords.length;
        this.playSynthNote(chords[step]);
      }, 1800);
    } catch {
      // Audio context might be restricted before user gesture
    }
  }

  private playSynthNote(freqs: number[]) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Low pass filter for dreamy 80s warmth
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800 + idx * 200, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.04, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.7);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.8);
    });
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch {}
      this.ctx = null;
    }
  }

  public getStatus() {
    return this.isPlaying;
  }
}

export const viceCityAudio = new ViceCitySynth();
