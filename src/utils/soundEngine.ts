/**
 * Cinematic Ambient Sound Engine for SB Aerials
 * Uses Web Audio API to synthesize deep sub-drone, warm harmonics, and high-altitude wind atmosphere.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private targetVolume = 0.6;

  // Nodes for cleanup
  private subOsc: OscillatorNode | null = null;
  private padOsc1: OscillatorNode | null = null;
  private padOsc2: OscillatorNode | null = null;
  private windNode: AudioNode | null = null;
  private lfoNode: OscillatorNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public async start() {
    if (this.isPlaying) return;
    this.initContext();

    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // 1. Deep Sub Drone (55Hz - A1)
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(55, now);
    subGain.gain.setValueAtTime(0.35, now);
    subOsc.connect(subGain);

    const subFilter = this.ctx.createBiquadFilter();
    subFilter.type = "lowpass";
    subFilter.frequency.setValueAtTime(120, now);
    subGain.connect(subFilter);
    subFilter.connect(this.masterGain);
    subOsc.start(now);
    this.subOsc = subOsc;

    // 2. Warm Cinematic Pad (Fifth chord: A2 110Hz + E3 164.8Hz)
    const padOsc1 = this.ctx.createOscillator();
    const padOsc2 = this.ctx.createOscillator();
    const padGain = this.ctx.createGain();
    const padFilter = this.ctx.createBiquadFilter();

    padOsc1.type = "triangle";
    padOsc1.frequency.setValueAtTime(110, now); // A2

    padOsc2.type = "sine";
    padOsc2.frequency.setValueAtTime(164.81, now); // E3

    padGain.gain.setValueAtTime(0.25, now);
    padFilter.type = "lowpass";
    padFilter.frequency.setValueAtTime(450, now);

    padOsc1.connect(padGain);
    padOsc2.connect(padGain);
    padGain.connect(padFilter);
    padFilter.connect(this.masterGain);

    padOsc1.start(now);
    padOsc2.start(now);
    this.padOsc1 = padOsc1;
    this.padOsc2 = padOsc2;

    // 3. High-Altitude Air/Wind Simulation (Filtered Noise + LFO)
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02; // Pink-ish noise
      lastOut = output[i];
    }

    const noiseSrc = this.ctx.createBufferSource();
    noiseSrc.buffer = noiseBuffer;
    noiseSrc.loop = true;

    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = "bandpass";
    windFilter.frequency.setValueAtTime(600, now);
    windFilter.Q.setValueAtTime(1.5, now);

    // LFO to slowly modulate wind frequency (sweeping 400Hz - 900Hz)
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.15, now); // Slow 0.15Hz cycle
    lfoGain.gain.setValueAtTime(250, now);
    lfo.connect(lfoGain);
    lfoGain.connect(windFilter.frequency);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.12, now);

    noiseSrc.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(this.masterGain);

    noiseSrc.start(now);
    lfo.start(now);
    this.windNode = noiseSrc;
    this.lfoNode = lfo;

    // Smooth fade-in
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(this.targetVolume, now + 1.2);

    this.isPlaying = true;
  }

  public stop() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Smooth fade-out
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.001, now + 0.6);

    setTimeout(() => {
      try {
        this.subOsc?.stop();
        this.padOsc1?.stop();
        this.padOsc2?.stop();
        if (this.windNode && "stop" in this.windNode) {
          (this.windNode as AudioBufferSourceNode).stop();
        }
        this.lfoNode?.stop();

        this.subOsc?.disconnect();
        this.padOsc1?.disconnect();
        this.padOsc2?.disconnect();
        this.windNode?.disconnect();
        this.lfoNode?.disconnect();
      } catch {
        // Ignored if already stopped
      }

      this.subOsc = null;
      this.padOsc1 = null;
      this.padOsc2 = null;
      this.windNode = null;
      this.lfoNode = null;
      this.isPlaying = false;
    }, 650);
  }

  public setVolume(volume: number) {
    this.targetVolume = Math.max(0, Math.min(1, volume));
    if (this.ctx && this.masterGain && this.isPlaying) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(this.targetVolume, now + 0.1);
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public isActive(): boolean {
    return this.isPlaying;
  }
}

export const soundEngine = new SoundEngine();
