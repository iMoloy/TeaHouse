'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { Sparkles, X, Heart, Clock, Thermometer, ShoppingBag, RotateCcw, CheckCircle2, Flame, Award } from 'lucide-react';
import { toast } from 'react-toastify';

interface TeaSommelierModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddToCart: (product: Product, quantity?: number) => void;
  onOpenTimerForTea?: (teaName: string, minutes: number, tempC: number) => void;
}

interface MoodOption {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  categoryPreference: string;
  idealTemp: number;
  steepMinutes: number;
  tastingVibe: string;
}

const MOODS: MoodOption[] = [
  {
    id: 'relax',
    emoji: '🧘',
    title: 'De-Stress & Unwind',
    subtitle: 'Soothing chamomile, floral notes & calm serenity',
    categoryPreference: 'green-tea',
    idealTemp: 80,
    steepMinutes: 2.5,
    tastingVibe: 'Delicate floral aroma with lingering silky honey finish'
  },
  {
    id: 'energy',
    emoji: '⚡',
    title: 'Morning Focus & Energy',
    subtitle: 'High antioxidant boost for sharp mental clarity',
    categoryPreference: 'black-tea',
    idealTemp: 95,
    steepMinutes: 3.5,
    tastingVibe: 'Robust mountain malty body with brisk, energizing finish'
  },
  {
    id: 'sweet',
    emoji: '🍰',
    title: 'Sweet Dessert Craving',
    subtitle: 'Velvety milk creamer, boba pearls & rich comfort',
    categoryPreference: 'milk-tea',
    idealTemp: 100,
    steepMinutes: 4.0,
    tastingVibe: 'Creamy caramel sweetness infused with full-bodied Ceylon tea'
  },
  {
    id: 'detox',
    emoji: '🍋',
    title: 'Immunity & Detox Kick',
    subtitle: 'Zesty citrus, raw honey & invigorating ginger',
    categoryPreference: 'lemon-tea',
    idealTemp: 90,
    steepMinutes: 5.0,
    tastingVibe: 'Bright tangy Meyer lemon freshness paired with crisp herbal notes'
  }
];

export const TeaSommelierModal: React.FC<TeaSommelierModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddToCart,
  onOpenTimerForTea
}) => {
  const [selectedMood, setSelectedMood] = useState<string>('relax');
  const [sweetnessLevel, setSweetnessLevel] = useState<'pure' | 'balanced' | 'sweet'>('balanced');
  const [temperaturePref, setTemperaturePref] = useState<'hot' | 'iced'>('hot');
  const [hasCalculated, setHasCalculated] = useState<boolean>(true);

  if (!isOpen) return null;

  const currentMoodObj = MOODS.find((m) => m.id === selectedMood) || MOODS[0];

  // AI Matching Logic: find best product in catalog based on category or fallback
  let matchedProduct = products.find((p) => p.category === currentMoodObj.categoryPreference);
  if (!matchedProduct && products.length > 0) {
    matchedProduct = products[0];
  }

  // Calculate dynamic match score
  let matchScore = 94;
  if (sweetnessLevel === 'sweet' && currentMoodObj.id === 'sweet') matchScore += 5;
  if (temperaturePref === 'hot' && (currentMoodObj.id === 'relax' || currentMoodObj.id === 'energy')) matchScore += 4;
  if (temperaturePref === 'iced' && currentMoodObj.id === 'detox') matchScore += 5;
  matchScore = Math.min(matchScore, 99);

  const handleAddMatched = () => {
    if (matchedProduct) {
      onAddToCart(matchedProduct, 1);
      toast.success(`🎉 Added your Sommelier Match "${matchedProduct.name}" to cart!`);
    }
  };

  const handleStartBrewing = () => {
    if (matchedProduct && onOpenTimerForTea) {
      onClose();
      onOpenTimerForTea(matchedProduct.name, currentMoodObj.steepMinutes, currentMoodObj.idealTemp);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto border border-orange-100">
        
        {/* Header Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center font-bold transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider mb-1">
              <span>AI Blend Sommelier</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
              Find Your Perfect Cup of Tea
            </h2>
          </div>
        </div>

        {/* Question 1: Mood */}
        <div className="mb-6">
          <label className="block text-sm font-extrabold text-gray-900 mb-3 flex items-center gap-2">
            <span>1. What is your current mood or energy goal?</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MOODS.map((mood) => {
              const isSelected = selectedMood === mood.id;
              return (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`text-left p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50/60 shadow-md ring-2 ring-orange-200'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl p-1 bg-white rounded-xl shadow-xs">{mood.emoji}</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{mood.title}</h4>
                    <p className="text-xs text-gray-500 leading-snug mt-0.5">{mood.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Question 2 & 3: Sweetness & Temp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Sweetness Preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'pure', label: 'Pure / 0%' },
                { id: 'balanced', label: 'Balanced' },
                { id: 'sweet', label: 'Sweet 🍯' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSweetnessLevel(opt.id as any)}
                  className={`py-2 text-xs font-bold rounded-xl border transition ${
                    sweetnessLevel === opt.id
                      ? 'bg-orange-600 text-white border-orange-600 shadow'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Serving Temperature
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'hot', label: '☕ Hot & Steaming' },
                { id: 'iced', label: '🧊 Iced & Chilled' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setTemperaturePref(opt.id as any)}
                  className={`py-2 text-xs font-bold rounded-xl border transition ${
                    temperaturePref === opt.id
                      ? 'bg-orange-600 text-white border-orange-600 shadow'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Match Recommendation Card */}
        {matchedProduct && (
          <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 rounded-3xl p-5 border border-orange-200 shadow-sm mb-6 relative overflow-hidden">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {matchScore}% Sommelier Match Score
              </span>
              <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-500" /> Sommelier Verified
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-28 h-28 bg-white rounded-2xl p-2 shadow-inner flex items-center justify-center shrink-0">
                <img
                  src={matchedProduct.image}
                  alt={matchedProduct.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-1.5 text-center sm:text-left flex-1">
                <h3 className="text-xl font-black text-gray-900">{matchedProduct.name}</h3>
                <p className="text-xs text-gray-600 leading-relaxed italic">
                  "{currentMoodObj.tastingVibe}"
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs text-gray-700 font-medium">
                  <span className="flex items-center gap-1 bg-white/80 px-2.5 py-1 rounded-lg border border-orange-100">
                    <Thermometer className="w-3.5 h-3.5 text-red-500" />
                    Ideal: {currentMoodObj.idealTemp}°C
                  </span>
                  <span className="flex items-center gap-1 bg-white/80 px-2.5 py-1 rounded-lg border border-orange-100">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    Steep: {currentMoodObj.steepMinutes} mins
                  </span>
                  <span className="flex items-center gap-1 bg-white/80 px-2.5 py-1 rounded-lg border border-orange-100">
                    <Flame className="w-3.5 h-3.5 text-orange-500" />
                    ${matchedProduct.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-3 border-t border-orange-200/60">
              <button
                onClick={handleAddMatched}
                className="btn-gradient py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Order (${matchedProduct.price.toFixed(2)})
              </button>

              <button
                onClick={handleStartBrewing}
                className="bg-white hover:bg-orange-100/60 text-orange-700 border border-orange-300 py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition"
              >
                <Clock className="w-4 h-4" /> Start Steep Guide ({currentMoodObj.steepMinutes}m)
              </button>
            </div>
          </div>
        )}

        <div className="text-center">
          <p className="text-[11px] text-gray-400">
            🌱 100% Organic Handpicked Leaves • Sourced ethically from high altitude gardens.
          </p>
        </div>

      </div>
    </div>
  );
};
