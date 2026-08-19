'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function CarInsurancePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAFAFA]">
      <Navbar currentUser={null} cartCount={0} onOpenCart={() => {}} onOpenAuth={() => {}} />

      <main className="w-11/12 max-w-4xl mx-auto py-12">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Truck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase">Tea House Express Services</span>
              <h1 className="text-3xl font-extrabold text-gray-900">Safe Delivery & Transit Protection</h1>
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            Every tea order dispatched through Tea House Fleet is 100% insured against spills, delays, or temperature fluctuations during transit.
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
            <h4 className="font-bold text-gray-900 text-base mb-2">Coverage Guarantee:</h4>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-amber-500" /> Free order replacement on accidental spill
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-amber-500" /> Temperature-sealed insulated containers
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-amber-500" /> Real-time GPS delivery tracking
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
