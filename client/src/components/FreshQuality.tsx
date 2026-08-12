'use client';

import React from 'react';
import { Leaf, Award } from 'lucide-react';

export const FreshQuality: React.FC = () => {
  return (
    <section id="fresh-quality" className="w-11/12 max-w-7xl mx-auto py-16 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
      
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-gradient-to-br from-pink-100 to-red-100 rounded-3xl min-h-[160px] flex items-center justify-center p-6 shadow-sm">
          <div className="text-center">
            <span className="text-3xl font-extrabold text-orange-600 block">100%</span>
            <span className="text-xs text-gray-600 font-bold uppercase tracking-wider">Organic Leaves</span>
          </div>
        </div>
        
        <div className="rounded-3xl overflow-hidden shadow-sm">
          <img src="/images/fresh-1.png" alt="Fresh Tea Blend" className="w-full h-full object-cover" />
        </div>
        
        <div className="rounded-3xl overflow-hidden shadow-sm">
          <img src="/images/fresh-2.png" alt="Brewed Tea Cup" className="w-full h-full object-cover" />
        </div>
        
        <div className="bg-stone-200 rounded-3xl min-h-[160px] flex items-center justify-center p-6 shadow-sm">
          <div className="text-center">
            <span className="text-3xl font-extrabold text-gray-800 block">25+</span>
            <span className="text-xs text-gray-600 font-bold uppercase tracking-wider">Unique Blends</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
          Great Tea, Freshly <br className="hidden sm:inline" />Presented
        </h2>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
          The Tea House process starts with our passion for quality tea. From picking raw leaves to brewing the tea to perfection, every step is carefully crafted to deliver the richest flavor to your cup.
        </p>

        <div className="space-y-4 pt-2">
          <div>
            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-orange-500" /> Unique Taste
            </h4>
            <p className="text-gray-500 text-sm mt-1 leading-relaxed">
              A complex and subtle play of flavors that brings a refreshing feeling to your daily life.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-500" /> Premium Quality
            </h4>
            <p className="text-gray-500 text-sm mt-1 leading-relaxed">
              Premium Quality tea leaves sourced directly from sustainable gardens around the world.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
};
