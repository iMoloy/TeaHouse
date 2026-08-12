'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAFAFA]">
      <Navbar cartCount={0} onOpenCart={() => {}} onOpenAuth={() => {}} />

      <main className="w-11/12 max-w-4xl mx-auto py-12">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm space-y-8">
          <div className="border-b border-gray-100 pb-6">
            <span className="bg-orange-100 text-orange-800 text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">
              Legal & Transparency
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-3">Privacy Policy</h1>
            <p className="text-xs text-gray-400 mt-1">Last Updated: February 12, 2027</p>
          </div>

          <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-orange-500" /> 1. Information We Collect
              </h3>
              <p>
                At The Tea House, we collect personal information necessary to deliver tea orders and improve customer experiences. This includes your name, email address, shipping details, and order preferences.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Lock className="w-5 h-5 text-orange-500" /> 2. Data Protection & Security
              </h3>
              <p>
                All account sessions and authentication tokens are encrypted using **Better Auth** standards. We never store raw credit card credentials on our servers.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Eye className="w-5 h-5 text-orange-500" /> 3. Third-Party Disclosures
              </h3>
              <p>
                We do not sell, rent, or trade customer personal data to third parties. Information is only shared with authorized delivery partners to fulfill your beverage orders.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
