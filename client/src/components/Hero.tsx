'use client';

import React from 'react';
import { ArrowRight, Star, Sparkles, Clock, Leaf, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onOpenSommelier?: () => void;
  onOpenTimer?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSommelier, onOpenTimer }) => {
  return (
    <section id="hero" className="w-11/12 max-w-7xl mx-auto py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
      
      <div className="space-y-6 text-center lg:text-left">
        
        {/* Top Tagline */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-extrabold uppercase tracking-wider shadow-xs">
          <Leaf className="w-3.5 h-3.5 text-orange-600" />
          <span>100% Organic & Handcrafted Teas</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15]">
          It's good <br className="hidden sm:inline" />tea time at The <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Tea House</span>
        </h1>
        
        <p className="text-gray-500 text-base lg:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
          Explore the balance of rich aroma, health vitality, and handcrafted luxury. Sourced from high-mountain organic gardens to satisfy your taste buds.
        </p>

        {/* CTA Buttons */}
        <div className="pt-2 flex flex-wrap justify-center lg:justify-start items-center gap-3">
          <a
            href="#featured-products"
            className="btn-gradient px-7 py-3.5 rounded-2xl font-bold flex items-center gap-3 text-sm sm:text-base shadow-xl group"
          >
            <span>Explore Menu</span>
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </div>
          </a>

          {onOpenSommelier && (
            <button
              onClick={onOpenSommelier}
              className="bg-white hover:bg-orange-50 text-gray-800 hover:text-orange-600 border border-gray-200 hover:border-orange-300 px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base flex items-center gap-2 shadow-sm transition"
            >
              <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
              <span>AI Sommelier</span>
            </button>
          )}

          {onOpenTimer && (
            <button
              onClick={onOpenTimer}
              className="bg-orange-50 hover:bg-orange-100 text-orange-700 px-5 py-3.5 rounded-2xl font-bold text-sm sm:text-base flex items-center gap-2 transition"
              title="Interactive Brewing Timer"
            >
              <Clock className="w-4 h-4" />
              <span>Steep Timer</span>
            </button>
          )}
        </div>

        {/* Micro-Features */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-xs font-semibold text-gray-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Ethically Harvested
          </span>
          <span className="flex items-center gap-1.5">
            <Leaf className="w-4 h-4 text-orange-500" /> Zero Additives
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> 4.9/5 User Rating
          </span>
        </div>

      </div>

      {/* Right Column: Hero Banner with Animated Steam */}
      <div className="relative flex justify-center items-center">
        <div className="relative w-full max-w-lg">
          
          {/* Animated Steam Over Cup */}
          <div className="absolute top-12 left-1/3 flex gap-3 text-orange-300 pointer-events-none select-none">
            <span className="animate-steam-1 text-2xl font-bold">~</span>
            <span className="animate-steam-2 text-3xl font-bold">~</span>
            <span className="animate-steam-3 text-2xl font-bold">~</span>
          </div>

          <img
            src="/images/banner.png"
            alt="Tea House Banner"
            className="w-full h-auto object-contain drop-shadow-2xl animate-float"
          />
          
          {/* Trust Pilot Badge */}
          <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 glass-badge rounded-2xl p-4 flex items-center gap-3 shadow-xl">
            <div className="text-amber-500">
              <Star className="w-7 h-7 fill-amber-500" />
            </div>
            <div>
              <h4 className="text-xl font-extrabold text-gray-900">5.00</h4>
              <p className="text-xs text-gray-500 font-medium">Trust Pilot Ratings</p>
            </div>
          </div>

          {/* Quick Sommelier Hint Badge */}
          {onOpenSommelier && (
            <button
              onClick={onOpenSommelier}
              className="absolute top-4 right-4 glass-badge hover:bg-white rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-lg transition border border-orange-200 group text-left cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider block">Mood Matcher</span>
                <span className="text-xs font-black text-gray-900">Find Your Tea</span>
              </div>
            </button>
          )}

        </div>
      </div>

    </section>
  );
};
