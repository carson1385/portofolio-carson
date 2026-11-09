import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundFX } from '../../utils/soundEffects';

/**
 * AudioToggle - React Bits Component
 * Interactive UI sound feedback toggle with animated equalizer bars.
 */
export default function AudioToggle() {
  const [enabled, setEnabled] = useState(false);

  const toggleSound = () => {
    const nextState = !enabled;
    setEnabled(nextState);
    soundFX.enabled = nextState;
    if (nextState) {
      soundFX.init();
      soundFX.playSuccess();
    }
  };

  return (
    <button
      onClick={toggleSound}
      className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center space-x-1.5 text-xs font-mono ${
        enabled
          ? 'bg-accent/15 border-accent text-accent shadow-xs'
          : 'bg-slate-100 dark:bg-obsidian-900 border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white'
      }`}
      title={enabled ? 'Suara UI Aktif (Klik untuk Mute)' : 'Nyalakan Suara UI Mikro'}
      aria-label="Toggle UI Audio Feedback"
    >
      {enabled ? (
        <>
          <Volume2 className="w-4 h-4 text-accent" />
          {/* Animated Mini Equalizer Bars */}
          <span className="flex items-end space-x-0.5 h-3">
            <span className="w-0.5 bg-accent animate-pulse h-2 rounded-full" />
            <span className="w-0.5 bg-accent animate-pulse h-3 rounded-full [animation-delay:0.15s]" />
            <span className="w-0.5 bg-accent animate-pulse h-1.5 rounded-full [animation-delay:0.3s]" />
          </span>
        </>
      ) : (
        <VolumeX className="w-4 h-4" />
      )}
    </button>
  );
}

