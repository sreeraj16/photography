import { useState, useCallback } from 'react';

export function useAudio() {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('dotpic_sound_enabled') === 'true';
  });

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const next = !prev;
      localStorage.setItem('dotpic_sound_enabled', String(next));
      return next;
    });
  }, []);

  const playShutterSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Stage 1: Mirror flip / pre-click (high frequency mechanical click)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(320, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.05);
      gain1.gain.setValueAtTime(0.3, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.05);

      // Stage 2: Shutter curtain release (filtered noise burst)
      const bufferSize = ctx.sampleRate * 0.08;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime + 0.02);
      filter.Q.setValueAtTime(3, ctx.currentTime + 0.02);

      const gain2 = ctx.createGain();
      gain2.gain.setValueAtTime(0.4, ctx.currentTime + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.09);

      whiteNoise.connect(filter);
      filter.connect(gain2);
      gain2.connect(ctx.destination);
      whiteNoise.start(ctx.currentTime + 0.02);
      whiteNoise.stop(ctx.currentTime + 0.09);
    } catch {
      // AudioContext might be blocked until user gesture, ignore gracefully
    }
  }, [soundEnabled]);

  return {
    soundEnabled,
    toggleSound,
    playShutterSound
  };
}
