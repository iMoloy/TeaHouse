'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, User, Coffee, ShieldCheck, Package, Sparkles, Clock } from 'lucide-react';

interface UserSession {
  name: string;
  email: string;
}

interface NavbarProps {
  cartCount: number;
  currentUser: UserSession | null;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onOpenSommelier?: () => void;
  onOpenTimer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  currentUser,
  onOpenCart,
  onOpenAuth,
  onOpenSommelier,
  onOpenTimer
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300 shadow-xs">
      <div className="w-11/12 max-w-7xl mx-auto py-3.5 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105">
            <Coffee className="w-6 h-6" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-gray-900">Tea<span className="text-orange-600">House</span></span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-7 font-bold text-sm text-gray-600">
          <Link href="/" className="hover:text-orange-600 transition">Home</Link>
          <Link href="/products" className="hover:text-orange-600 transition">Products</Link>
          <Link href="/about" className="hover:text-orange-600 transition">About Us</Link>
          <Link href="/faqs" className="hover:text-orange-600 transition">FAQs</Link>
          <Link href="/contact" className="hover:text-orange-600 transition">Contact</Link>
        </nav>

        {/* Quick Assistant Buttons (Desktop) */}
        <div className="hidden sm:flex items-center gap-2">
          {onOpenSommelier && (
            <button
              onClick={onOpenSommelier}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-800 text-xs font-bold transition shadow-xs"
              title="AI Blend Sommelier"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
              <span>AI Sommelier</span>
            </button>
          )}

          {onOpenTimer && (
            <button
              onClick={onOpenTimer}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold transition shadow-xs"
              title="Interactive Steep Timer"
            >
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Brew Timer</span>
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {currentUser ? (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-orange-50 hover:bg-orange-100 border border-orange-200 text-gray-800 transition"
              title="View Profile & Dashboard"
            >
              <div className="relative w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 text-white font-black text-xs flex items-center justify-center shadow">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border border-white rounded-full" />
              </div>
              <span className="text-xs font-bold truncate max-w-[85px]">{currentUser.name}</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
              title="Sign In / Register"
            >
              <User className="w-4 h-4" />
            </button>
          )}

          <button 
            onClick={onOpenCart} 
            className="relative p-2.5 rounded-full bg-orange-50 hover:bg-orange-100 text-orange-600 transition"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3 font-semibold text-gray-700 animate-fadeIn">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-orange-600">Home</Link>
          <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-orange-600">Products</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-orange-600">About Us</Link>
          <Link href="/faqs" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-orange-600">FAQs</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-orange-600">Contact</Link>

          {/* Quick interactive helpers on mobile */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
            {onOpenSommelier && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSommelier();
                }}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-orange-50 text-orange-800 text-xs font-bold border border-orange-200"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-600" /> AI Sommelier
              </button>
            )}

            {onOpenTimer && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenTimer();
                }}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200"
              >
                <Clock className="w-3.5 h-3.5 text-amber-600" /> Steep Timer
              </button>
            )}
          </div>

          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            <Link href="/my-orders" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-sm font-bold text-gray-800 hover:text-orange-600">
              <Package className="w-4 h-4 text-orange-500" /> My Orders History
            </Link>
            <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-sm font-bold text-gray-800 hover:text-orange-600">
              <ShieldCheck className="w-4 h-4 text-amber-500" /> Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
