'use client';

import React from 'react';
import Link from 'next/link';
import { Coffee, Leaf, Award, Heart, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAFAFA]">
      <Navbar cartCount={0} onOpenCart={() => {}} onOpenAuth={() => {}} />

      <main className="w-11/12 max-w-6xl mx-auto py-12">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="bg-orange-100 text-orange-800 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider">
            Our Story & Craft
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Crafting Exceptional Tea Experiences Since 2020
          </h1>
          <p className="text-gray-500 text-base leading-relaxed">
            At The Tea House, we believe tea is more than a beverage—it is a daily ritual of tranquility, health, and unmatched flavor. From hand-selected organic tea leaves to innovative boba blends, every cup tells a story.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">100% Organic Leaves</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Directly sourced from sustainable high-altitude gardens across Asia and South America without artificial preservatives.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Master Brewing</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Our tea masters meticulously calibrate steeping temperatures and times to maximize natural antioxidants and subtle notes.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Community First</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              We pledge 5% of profits to tea farming communities and eco-friendly reforestation projects worldwide.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-[35px] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-3xl font-extrabold">Join Our Tea Revolution</h2>
            <p className="text-white/80 text-sm leading-relaxed">
              Experience the harmony of traditional tea culture blended with modern flavors. Order online today or visit one of our flagship lounges.
            </p>
          </div>
          <Link href="/products" className="bg-white text-orange-600 font-bold px-8 py-3.5 rounded-full shadow hover:bg-gray-100 transition whitespace-nowrap">
            Explore All Teas
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
