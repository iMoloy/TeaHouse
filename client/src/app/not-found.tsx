'use client';

import React from 'react';
import Link from 'next/link';
import { Coffee, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] text-center p-6">
      <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-6 shadow-md">
        <Coffee className="w-8 h-8" />
      </div>
      <h1 className="text-5xl font-extrabold text-gray-900 mb-3">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-500 text-sm max-w-md mb-8">
        Oops! The page you are looking for might have been moved or doesn't exist in The Tea House menu.
      </p>
      <Link href="/" className="btn-gradient px-8 py-3.5 rounded-full font-bold text-sm shadow inline-flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Return to Home Page
      </Link>
    </div>
  );
}
