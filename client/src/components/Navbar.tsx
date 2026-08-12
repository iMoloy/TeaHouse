'use client';

import React, { useState } from 'react';
import { ShoppingBag, Menu, X, User, Coffee } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenAuth }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="w-11/12 max-w-7xl mx-auto py-4 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105">
            <Coffee className="w-6 h-6" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-gray-900">Tea<span className="text-orange-600">House</span></span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 font-semibold text-sm text-gray-600">
          <a href="#hero" className="hover:text-orange-600 transition">Home</a>
          <a href="#featured-products" className="hover:text-orange-600 transition">Products</a>
          <a href="#fresh-quality" className="hover:text-orange-600 transition">About Us</a>
          <a href="#super-clients" className="hover:text-orange-600 transition">Reviews</a>
          <a href="#news" className="hover:text-orange-600 transition">News & Events</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenAuth}
            className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
            title="User Account"
          >
            <User className="w-5 h-5" />
          </button>

          <button 
            onClick={onOpenCart} 
            className="relative p-2.5 rounded-full bg-orange-50 hover:bg-orange-100 text-orange-600 transition"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3 font-semibold text-gray-700">
          <a href="#hero" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-orange-600">Home</a>
          <a href="#featured-products" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-orange-600">Products</a>
          <a href="#fresh-quality" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-orange-600">About Us</a>
          <a href="#super-clients" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-orange-600">Reviews</a>
          <a href="#news" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-orange-600">News & Events</a>
        </div>
      )}
    </header>
  );
};
