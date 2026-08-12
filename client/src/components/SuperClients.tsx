'use client';

import React, { useState, useEffect } from 'react';
import { Review } from '@/types';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface SuperClientsProps {
  reviews: Review[];
}

export const SuperClients: React.FC<SuperClientsProps> = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  if (reviews.length === 0) return null;

  const current = reviews[currentIndex];

  return (
    <section id="super-clients" className="w-11/12 max-w-7xl mx-auto my-16 rounded-[35px] client-section-bg p-8 lg:p-16 text-white grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
      
      <div className="space-y-6 z-10 text-center lg:text-left">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
          Meet Our Super <br className="hidden lg:inline" />Clients
        </h2>
        <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.
        </p>
        <div>
          <a href="#featured-products" className="inline-block bg-white text-orange-600 font-bold px-8 py-3.5 rounded-full shadow-lg hover:bg-gray-100 transition">
            Show All
          </a>
        </div>
      </div>

      <div className="relative z-10">
        <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-2xl max-w-xl mx-auto border border-gray-100 text-gray-900 transition-all duration-300">
          <div className="absolute -top-6 -left-6 bg-white p-3 rounded-2xl shadow-md border border-gray-100">
            <img src={current.avatar} alt={current.name} className="w-14 h-14 rounded-full object-cover border-2 border-orange-500" />
          </div>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 pt-4 italic">
            "{current.comment}"
          </p>

          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <div>
              <h4 className="font-bold text-gray-900 text-lg">{current.name}</h4>
              <span className="text-xs text-gray-400">{current.role}</span>
            </div>
            <div className="flex text-amber-400 text-sm">
              {Array.from({ length: current.rating }).map((_, idx) => (
                <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 max-w-xl mx-auto">
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentIndex((currentIndex - 1 + reviews.length) % reviews.length)}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentIndex((currentIndex + 1) % reviews.length)}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-2 items-center">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/70 w-3'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};
