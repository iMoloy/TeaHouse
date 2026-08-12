'use client';

import React from 'react';
import Link from 'next/link';
import { Home, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function HouseInsurancePage() {
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
            <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Home className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase">Tea House Franchise Services</span>
              <h1 className="text-3xl font-extrabold text-gray-900">Franchise & Outlet Protection</h1>
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            Our Outlet Protection Services ensure that every Tea House franchise partner is backed by standardized equipment warranties, quality control support, and property protection.
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
            <h4 className="font-bold text-gray-900 text-base mb-2">Franchise Privileges:</h4>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-indigo-500" /> Automated inventory replenishment
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-indigo-500" /> Commercial espresso & brewing equipment support
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-indigo-500" /> Brand asset licensing & staff training
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
