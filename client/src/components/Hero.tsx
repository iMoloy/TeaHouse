'use client';

import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="w-11/12 max-w-7xl mx-auto py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
      
      <div className="space-y-6 text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15]">
          It's good <br className="hidden sm:inline" />tea time at The <br className="hidden sm:inline" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Tea House</span>
        </h1>
        <p className="text-gray-500 text-base lg:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
          Explore Importance of Taste, Variety and Healthy Options. Total Satisfaction To Your Taste Buds.
        </p>
        <div className="pt-2 flex justify-center lg:justify-start">
          <a href="#featured-products" className="btn-gradient px-8 py-4 rounded-2xl font-bold flex items-center gap-3 text-base shadow-xl group">
            <span>Explore More</span>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </a>
        </div>
      </div>

      <div className="relative flex justify-center items-center">
        <div className="relative w-full max-w-lg">
          <img src="/images/banner.png" alt="Tea House Banner" className="w-full h-auto object-contain drop-shadow-2xl" />
          
          <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 glass-badge rounded-2xl p-4 flex items-center gap-3 shadow-xl">
            <div className="text-amber-500">
              <Star className="w-7 h-7 fill-amber-500" />
            </div>
            <div>
              <h4 className="text-xl font-extrabold text-gray-900">5.00</h4>
              <p className="text-xs text-gray-500 font-medium">Trust Pilot Ratings</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
