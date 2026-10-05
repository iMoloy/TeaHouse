'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, X, Bell, Thermometer, Clock, Sparkles, Volume2, Info, ChevronDown } from 'lucide-react';
import { toast } from 'react-toastify';

interface SteepPreset {
  id: string;
  name: string;
  seconds: number;
  tempC: number;
  tempF: number;
  ratio: string;
  advice: string;
}

const PRESETS: SteepPreset[] = [
  {
    id: 'green-tea',
    name: '🌿 Green Tea / Sencha',
    seconds: 150, // 2m 30s
    tempC: 80,
    tempF: 175,
    ratio: '1 tsp per 250ml',
    advice: 'Never use boiling water—gentle 80°C preserves sweet amino acids and prevents bitterness.'
  },
  {
    id: 'black-tea',
    name: '☕ Royal Black Tea',
    seconds: 210, // 3m 30s
    tempC: 95,
    tempF: 205,
    ratio: '1.5 tsp per 300ml',
    advice: 'Pour fresh hot water at 95°C. Let the leaves circulate freely for a rich, malty amber brew.'
  },
  {
    id: 'milk-tea',
    name: '🧋 Spiced Milk Tea',
    seconds: 240, // 4m 00s
    tempC: 100,
    tempF: 212,
    ratio: '2 tsp per 250ml water + 100ml milk',
    advice: 'Simmer gently with warm frothed whole milk and natural cane sugar or honey.'
  },
  {
    id: 'lemon-tea',
    name: '🍋 Lemon & Herbal Tea',
    seconds: 300, // 5m 00s
    tempC: 90,
    tempF: 195,
    ratio: '1.5 tsp per 300ml',
    advice: 'Add fresh lemon slices right after steeping so acidity does not scorch the delicate herbal oils.'
  }
];

interface SteepTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTeaName?: string;
  initialMinutes?: number;
  initialTempC?: number;
}

export const SteepTimerModal: React.FC<SteepTimerModalProps> = ({
  isOpen,
  onClose,
  initialTeaName,
  initialMinutes,
  initialTempC
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('green-tea');
  const [timeLeft, setTimeLeft] = useState<number>(150);
  const [initialDuration, setInitialDuration] = useState<number>(150);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasFinished, setHasFinished] = useState<boolean>(false);

  // Audio chime using Web Audio API
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Sweet harmonic chord)
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;

        const startTime = ctx.currentTime + idx * 0.15;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.3);
      });
    } catch (e) {
      console.warn('AudioContext playback error:', e);
    }
  };

  // Sync with initial props if provided
  useEffect(() => {
    if (initialMinutes && initialMinutes > 0) {
      const secs = Math.round(initialMinutes * 60);
      setTimeLeft(secs);
      setInitialDuration(secs);
      setIsRunning(false);
      setHasFinished(false);
    }
  }, [initialMinutes, initialTeaName]);

  // Interval ticker
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft <= 0) {
      setIsRunning(false);
      setHasFinished(true);
      playChime();
      toast.success('🫖 Your tea has reached the ideal steep point! Ready to pour.');
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft]);

  if (!isOpen) return null;

  const currentPreset = PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0];

  const handleSelectPreset = (preset: SteepPreset) => {
    setSelectedPresetId(preset.id);
    setTimeLeft(preset.seconds);
    setInitialDuration(preset.seconds);
    setIsRunning(false);
    setHasFinished(false);
  };

  const toggleRun = () => {
    if (timeLeft <= 0) {
      setTimeLeft(initialDuration);
      setHasFinished(false);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialDuration);
    setHasFinished(false);
  };

  // Format MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Progress percentage
  const progressPercent = initialDuration > 0 ? ((initialDuration - timeLeft) / initialDuration) * 100 : 0;
  const strokeDashoffset = 440 - (440 * progressPercent) / 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto border border-orange-100">
        
        {/* Header Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center font-bold transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-1">
              <span>Virtual Tea Master</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
              Interactive Steep Timer
            </h2>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Select Your Tea Blend
          </label>
          <div className="grid grid-cols-2 gap-2">
            {PRESETS.map((preset) => {
              const isActive = selectedPresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-2.5 rounded-xl border text-left font-bold text-xs transition flex flex-col justify-between ${
                    isActive
                      ? 'border-orange-500 bg-orange-50/80 text-orange-900 shadow-sm'
                      : 'border-gray-200 bg-gray-50/60 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="truncate">{preset.name}</span>
                  <span className="text-[11px] font-medium text-gray-500 mt-1">
                    {Math.floor(preset.seconds / 60)}m {preset.seconds % 60 > 0 ? `${preset.seconds % 60}s` : ''} • {preset.tempC}°C
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Circular Countdown Display */}
        <div className="flex flex-col items-center justify-center my-4 relative">
          
          {/* Animated Steam Plumes */}
          {isRunning && (
            <div className="absolute -top-6 flex gap-3 text-orange-400 opacity-60">
              <span className="animate-steam-1 text-sm font-bold">~</span>
              <span className="animate-steam-2 text-base font-bold">~</span>
              <span className="animate-steam-3 text-sm font-bold">~</span>
            </div>
          )}

          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* SVG Circle Progress */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r="70"
                className="text-gray-100 stroke-current"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                className="text-orange-500 stroke-current transition-all duration-500"
                strokeWidth="8"
                strokeDasharray={440}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Center Content */}
            <div className="absolute text-center flex flex-col items-center">
              <span className="text-4xl font-black text-gray-900 tracking-tight font-mono">
                {formattedTime}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 mt-1">
                {hasFinished ? '🎉 Brew Ready!' : isRunning ? 'Steeping...' : 'Paused'}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={toggleRun}
              className={`px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg transition ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'btn-gradient'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" /> {timeLeft === 0 ? 'Brew Again' : 'Start Steep'}
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={playChime}
              className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
              title="Test Chime Sound"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Master Tea Guide Tips */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 mt-6">
          <div className="flex items-start gap-2.5">
            <Thermometer className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-extrabold text-gray-900">Recommended Heat:</span>
                <span className="bg-white px-2 py-0.5 rounded-md font-bold text-orange-700 border border-amber-200">
                  {currentPreset.tempC}°C ({currentPreset.tempF}°F)
                </span>
                <span className="text-gray-500">• Ratio: {currentPreset.ratio}</span>
              </div>
              <p className="text-gray-600 leading-relaxed pt-1">{currentPreset.advice}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-[11px] text-gray-400">
            🔔 Crystal harmonic bell rings automatically when steeping completes.
          </p>
        </div>

      </div>
    </div>
  );
};
