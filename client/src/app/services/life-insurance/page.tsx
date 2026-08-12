'use client';

import React from 'react';
import Link from 'next/link';
import { HeartPulse, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function LifeInsurancePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAFAFA]">
      <Navbar cartCount={0} onOpenCart={() => {}} onOpenAuth={() => {}} />

      <main className="w-11/12 max-w-4xl mx-auto py-12">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <HeartPulse className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase">Tea House Care Services</span>
              <h1 className="text-3xl font-extrabold text-gray-900">Life & Well-being Protection Plan</h1>
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            Our Life & Well-being Protection Plan provides comprehensive wellness benefits for frequent Tea House club members, covering health checkups and organic tea subscription discounts.
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
            <h4 className="font-bold text-gray-900 text-base mb-2">Plan Highlights:</h4>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-orange-500" /> Complimentary monthly wellness tea delivery box
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-orange-500" /> Priority member lounge reservations
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-orange-500" /> 100% natural antioxidant boost guarantee
            </div>
          </div>
        </div>
      </main>

      <Footer onSubscribeToast={() => {}} />
    </div>
  );
}
