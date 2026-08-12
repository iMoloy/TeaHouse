'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What makes The Tea House blends unique?",
      a: "All our teas are sourced directly from certified organic high-mountain gardens. We craft our signature fruit and boba infusions fresh to order without artificial colors or preservative syrups."
    },
    {
      q: "How fast is delivery?",
      a: "Local orders are delivered within 30 to 45 minutes via our insulated express vehicles. Nationwide packaged tea orders arrive in 2-3 business days."
    },
    {
      q: "Can I customize sugar and ice levels?",
      a: "Yes! In our online order system and quick view modal, you can select customized sweetness (0%, 30%, 50%, 100%) and ice preference."
    },
    {
      q: "Do you offer vegan or dairy-free options?",
      a: "Absolutely. We offer oat milk, almond milk, and coconut creamer substitutes for all our Milk Tea and Boba Fusion beverages."
    },
    {
      q: "How does the Tea House loyalty rewards program work?",
      a: "For every cup purchased, you earn 1 reward point. Collecting 8 points unlocks a 25% discount voucher or a free topping on your next order."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAFAFA]">
      <Navbar cartCount={0} onOpenCart={() => {}} onOpenAuth={() => {}} />

      <main className="w-11/12 max-w-4xl mx-auto py-12">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Frequently Asked Questions</h1>
          <p className="text-gray-500 text-sm">Have questions about our teas, delivery, or member rewards? Find answers below.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left font-bold text-gray-900 flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-orange-500" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-gray-600 border-t border-gray-50 pt-3 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
