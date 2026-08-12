'use client';

import React, { useState } from 'react';
import { News } from '@/types';
import { ArrowRight, X, Calendar, User } from 'lucide-react';

interface NewsSectionProps {
  newsList: News[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ newsList }) => {
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  return (
    <section id="news" className="w-11/12 max-w-7xl mx-auto py-16">
      
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">News & Events</h2>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsList.map((item) => (
          <div key={item._id || item.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-lg transition duration-300">
            <div>
              <div className="rounded-2xl overflow-hidden mb-5">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover group-hover:scale-105 transition duration-300" />
              </div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-2">{item.date} • {item.author}</span>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.excerpt}</p>
            </div>
            <button
              onClick={() => setSelectedNews(item)}
              className="text-orange-600 font-bold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all"
            >
              Learn More <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative bg-white rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center font-bold"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-2xl overflow-hidden mb-4">
              <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-64 object-cover" />
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{selectedNews.date}</span>
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{selectedNews.author}</span>
            </div>
            
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">{selectedNews.title}</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">{selectedNews.content}</p>
            
            <button onClick={() => setSelectedNews(null)} className="btn-gradient w-full py-3 rounded-full font-bold text-center">
              Close Article
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
