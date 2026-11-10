/**
 * OCD CNC Web Audio Synthesizer
 * Generates an endlessly looping frantic high-pitched kazoo and an authentic bouncing upbeat polka.
 * Zero external audio files required — 100% synthesized in-browser.
 */

class SoundHazardEngine {
  private ctx: AudioContext | null = null;
  private isUnlocked: boolean = false;

  // Master Gain
  private masterGain: GainNode | null = null;
  private kazooGain: GainNode | null = null;
  private polkaGain: GainNode | null = null;

  // Track state
  public isKazooActive: boolean = true;
  public isPolkaActive: boolean = true;
  public kazooPitchFactor: number = 1.0;
  public isMuted: boolean = false;

  // Interval timers
  private kazooTimer: number | null = null;
  private polkaTimer: number | null = null;

  // Distortion curve cache
  private distortionCurve: Float32Array<ArrayBuffer> | null = null;

  constructor() {
    // Lazy initialize on first interaction
  }

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.kazooGain = this.ctx.createGain();
      this.kazooGain.gain.setValueAtTime(0.55, this.ctx.currentTime);
      this.kazooGain.connect(this.masterGain);

      this.polkaGain = this.ctx.createGain();
      this.polkaGain.gain.setValueAtTime(0.45, this.ctx.currentTime);
      this.polkaGain.connect(this.masterGain);

      this.distortionCurve = this.makeDistortionCurve(40);
    } catch {
      // AudioContext not supported
    }
  }

  public async unlock() {
    this.init();
    if (!this.ctx) return false;
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
    this.isUnlocked = true;
    this.startLoops();
    return true;
  }

  public isRunning(): boolean {
    return this.isUnlocked && this.ctx !== null && this.ctx.state === 'running' && !this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const target = this.isMuted ? 0 : 0.7;
      this.masterGain.gain.setValueAtTime(target, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public setKazooState(enabled: boolean) {
    this.isKazooActive = enabled;
    if (this.kazooGain && this.ctx) {
      this.kazooGain.gain.setValueAtTime(enabled && !this.isMuted ? 0.55 : 0.0001, this.ctx.currentTime);
    }
  }

  public setPolkaState(enabled: boolean) {
    this.isPolkaActive = enabled;
    if (this.polkaGain && this.ctx) {
      this.polkaGain.gain.setValueAtTime(enabled && !this.isMuted ? 0.45 : 0.0001, this.ctx.currentTime);
    }
  }

  public setKazooPitch(factor: number) {
    this.kazooPitchFactor = Math.max(0.6, Math.min(2.5, factor));
  }

  private makeDistortionCurve(amount: number): Float32Array<ArrayBuffer> {
    const k = typeof amount === 'number' ? amount : 50;
    const nSamples = 44100;
    const curve = new Float32Array(nSamples);
    const deg = Math.PI / 180;
    for (let i = 0; i < nSamples; ++i) {
      const x = (i * 2) / nSamples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  // Plays a single buzz note of a plastic kazoo (distorted saw + nasal bandpass + vibrato)
  private playKazooNote(freq: number, duration: number, time: number) {
    if (!this.ctx || !this.kazooGain || !this.isKazooActive || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const subOsc = this.ctx.createOscillator();
      const waveShaper = this.ctx.createWaveShaper();
      const filter = this.ctx.createBiquadFilter();
      const noteGain = this.ctx.createGain();

      // Kazoo vibrato / flutter
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(14, time); // rapid kazoo diaphragm flutter
      lfoGain.gain.setValueAtTime(freq * 0.05, time);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start(time);
      lfo.stop(time + duration);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq * this.kazooPitchFactor, time);

      subOsc.type = 'square';
      subOsc.frequency.setValueAtTime((freq * 0.5) * this.kazooPitchFactor, time);

      if (this.distortionCurve) {
        waveShaper.curve = this.distortionCurve;
        waveShaper.oversample = '2x';
      }

      // Nasal bandpass around 900-1400Hz gives the iconic cheap kazoo buzz
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1100 * this.kazooPitchFactor, time);
      filter.Q.setValueAtTime(3.5, time);

      // Envelopes
      noteGain.gain.setValueAtTime(0.001, time);
      noteGain.gain.linearRampToValueAtTime(0.35, time + 0.03);
      noteGain.gain.setValueAtTime(0.35, time + duration - 0.04);
      noteGain.gain.linearRampToValueAtTime(0.001, time + duration);

      osc.connect(waveShaper);
      subOsc.connect(waveShaper);
      waveShaper.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.kazooGain);

      osc.start(time);
      subOsc.start(time);
      osc.stop(time + duration);
      subOsc.stop(time + duration);
    } catch {
      // Ignore audio glitch
    }
  }

  // Play Polka Tuba / Brass Bass Hit
  private playPolkaBass(freq: number, duration: number, time: number) {
    if (!this.ctx || !this.polkaGain || !this.isPolkaActive || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, time);
      // Slight pitch drop for brass punch
      osc.frequency.exponentialRampToValueAtTime(freq * 0.95, time + duration);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, time);
      filter.frequency.linearRampToValueAtTime(140, time + duration);

      gain.gain.setValueAtTime(0.5, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.polkaGain);

      osc.start(time);
      osc.stop(time + duration);
    } catch {
      // Ignore
    }
  }

  // Play Polka Accordion Chord (Chirp on offbeats)
  private playPolkaAccordionChord(freqs: number[], duration: number, time: number) {
    if (!this.ctx || !this.polkaGain || !this.isPolkaActive || this.isMuted) return;

    try {
      const chordGain = this.ctx.createGain();
      chordGain.gain.setValueAtTime(0.2, time);
      chordGain.gain.linearRampToValueAtTime(0.18, time + 0.02);
      chordGain.gain.exponentialRampToValueAtTime(0.001, time + duration);
      chordGain.connect(this.polkaGain);

      freqs.forEach((f) => {
        if (!this.ctx) return;
        const o = this.ctx.createOscillator();
        o.type = 'triangle';
        // Detune slightly for that wet musette accordion sound
        o.detune.setValueAtTime((Math.random() - 0.5) * 18, time);
        o.frequency.setValueAtTime(f, time);
        o.connect(chordGain);
        o.start(time);
        o.stop(time + duration);
      });
    } catch {
      // Ignore
    }
  }

  // Play Polka Melody Note (Bouncy lead)
  private playPolkaLead(freq: number, duration: number, time: number) {
    if (!this.ctx || !this.polkaGain || !this.isPolkaActive || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.18, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(gain);
      gain.connect(this.polkaGain);

      osc.start(time);
      osc.stop(time + duration);
    } catch {
      // Ignore
    }
  }

  // Start the background generation loops
  private startLoops() {
    if (this.kazooTimer || this.polkaTimer) return;

    // FRANTIC KAZOO MELODY: High-pitched, frantic carnival / circus frenzy
    const kazooNotes = [
      659.25, 783.99, 880.00, 987.77, 1046.50, 987.77, 880.00, 783.99,
      659.25, 698.46, 783.99, 880.00, 783.99, 698.46, 659.25, 587.33,
      523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51,
      1396.91, 1318.51, 1174.66, 1046.50, 987.77, 880.00, 783.99, 880.00,
    ];
    let kazooIndex = 0;

    // Runs every ~125ms (very brisk tempo, ~120 BPM sixteenth notes)
    this.kazooTimer = window.setInterval(() => {
      if (!this.ctx || !this.isUnlocked || !this.isKazooActive || this.isMuted) return;
      const now = this.ctx.currentTime;
      const noteFreq = kazooNotes[kazooIndex % kazooNotes.length];
      // Random chromatic wobble for extra frantic feeling
      const randomGlitch = Math.random() > 0.85 ? Math.pow(2, 1 / 12) : 1;
      this.playKazooNote(noteFreq * randomGlitch, 0.11, now);
      kazooIndex++;
    }, 120);

    // BOUNCY POLKA MUSIC: 2/4 Time, alternating Bass (Beat 1, Beat 2) and offbeat Accordion (1&, 2&)
    // C Major Polka
    // Bass: C2 (65.41Hz), G1 (49.00Hz), G2 (98.00Hz)
    // Chords: C-E-G (261, 329, 392) or G-B-D (196, 246, 293)
    const polkaBeats = [
      { bass: 65.41, chord: [261.63, 329.63, 392.00], lead: 523.25 },
      { bass: 98.00, chord: [261.63, 329.63, 392.00], lead: 659.25 },
      { bass: 65.41, chord: [261.63, 329.63, 392.00], lead: 783.99 },
      { bass: 98.00, chord: [261.63, 329.63, 392.00], lead: 659.25 },
      { bass: 49.00, chord: [246.94, 293.66, 392.00], lead: 587.33 },
      { bass: 98.00, chord: [246.94, 293.66, 392.00], lead: 698.46 },
      { bass: 49.00, chord: [246.94, 293.66, 392.00], lead: 783.99 },
      { bass: 65.41, chord: [261.63, 329.63, 392.00], lead: 523.25 },
    ];
    let polkaStep = 0;

    // Polka beat: 250ms per half-beat (120 BPM 2/4)
    this.polkaTimer = window.setInterval(() => {
      if (!this.ctx || !this.isUnlocked || !this.isPolkaActive || this.isMuted) return;
      const now = this.ctx.currentTime;
      const pattern = polkaBeats[polkaStep % polkaBeats.length];

      // On beat: Punchy Bass
      this.playPolkaBass(pattern.bass, 0.22, now);
      // Lead melody
      this.playPolkaLead(pattern.lead, 0.16, now);

      // On offbeat (+125ms later): Accordion stab
      window.setTimeout(() => {
        if (!this.ctx) return;
        this.playPolkaAccordionChord(pattern.chord, 0.11, this.ctx.currentTime);
      }, 125);

      polkaStep++;
    }, 250);
  }

  // Spontaneous Combustion SFX
  public playCombustionBlast() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // 1. White noise explosion blast
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(800, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(60, now + 1.8);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(1.0, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 1.8);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    noise.start(now);

    // 2. Rising siren screech
    const siren = this.ctx.createOscillator();
    const sirenGain = this.ctx.createGain();
    siren.type = 'sawtooth';
    siren.frequency.setValueAtTime(200, now);
    siren.frequency.exponentialRampToValueAtTime(2400, now + 0.4);
    siren.frequency.exponentialRampToValueAtTime(400, now + 1.2);

    sirenGain.gain.setValueAtTime(0.4, now);
    sirenGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

    siren.connect(sirenGain);
    sirenGain.connect(this.ctx.destination);
    siren.start(now);
    siren.stop(now + 1.5);
  }

  // Machine clatter / tool crash SFX
  public playToolCrash() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.35);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  }
}

export const soundHazard = new SoundHazardEngine();
