'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function HealthInsurancePage() {
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
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase">Tea House Wellness Services</span>
              <h1 className="text-3xl font-extrabold text-gray-900">Organic Health & Immunity Shield</h1>
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            Boost your daily immune system with our certified organic herbal remedies. Formulated by tea nutritionists to enhance digestion, mental focus, and stress recovery.
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
            <h4 className="font-bold text-gray-900 text-base mb-2">Health Benefits:</h4>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> High polyphenol & catechin density
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Zero artificial flavorings or corn syrup
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free nutritionist consultation for members
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
