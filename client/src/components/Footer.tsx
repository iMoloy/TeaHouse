'use client';

import React, { useState } from 'react';
import { Coffee, ChevronRight, Facebook, Twitter, Instagram } from 'lucide-react';

interface FooterProps {
  onSubscribeToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSubscribeToast }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      onSubscribeToast('⚠️ Please enter a valid email address!');
      return;
    }
    onSubscribeToast('🎉 Thank you for subscribing to Tea House newsletter!');
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-b from-pink-50/50 to-orange-50/80 pt-16 pb-8 border-t border-gray-100">
      <div className="w-11/12 max-w-7xl mx-auto">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-12 border-b border-gray-200">
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md">
              <Coffee className="w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold text-gray-900">Tea<span className="text-orange-600">House</span></span>
          </a>

          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-bold text-sm">Ready to get started?</span>
            <a href="#featured-products" className="btn-gradient px-6 py-2.5 rounded-full font-bold text-sm shadow">Get Started</a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-b border-gray-200">
          <div>
            <h4 className="font-extrabold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li><a href="#" className="hover:text-orange-600">Home</a></li>
              <li><a href="#fresh-quality" className="hover:text-orange-600">About Us</a></li>
              <li><a href="#featured-products" className="hover:text-orange-600">Products</a></li>
              <li><a href="#" className="hover:text-orange-600">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-gray-900 mb-4">Our Service</h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li><a href="#" className="hover:text-orange-600">Life Insurance</a></li>
              <li><a href="#" className="hover:text-orange-600">Car Insurance</a></li>
              <li><a href="#" className="hover:text-orange-600">Health Insurance</a></li>
              <li><a href="#" className="hover:text-orange-600">House Insurance</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-gray-900 mb-4">Help</h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li><a href="#" className="hover:text-orange-600">FAQs</a></li>
              <li><a href="#" className="hover:text-orange-600">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-gray-900 mb-4">Subscribe to newsletter</h4>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="w-full bg-white border border-gray-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-orange-500 pr-12 shadow-sm"
                />
                <button type="submit" className="absolute right-1.5 top-1.5 w-9 h-9 rounded-full btn-gradient flex items-center justify-center text-white text-xs">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="flex items-center gap-4 mt-6 text-gray-400 text-lg">
              <a href="#" className="hover:text-orange-600"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-orange-600"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-orange-600"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        <div className="text-center pt-8 text-xs text-gray-400">
          © 2027 Tea House - All rights reserved.
        </div>

      </div>
    </footer>
  );
};
