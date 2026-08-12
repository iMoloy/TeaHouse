'use client';

import React from 'react';
import { Coffee } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Steeping fresh tea data...',
  size = 'md'
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative flex items-center justify-center">
        {/* Animated outer ring */}
        <div className="w-20 h-20 rounded-full border-4 border-orange-200 border-t-orange-600 animate-spin" />
        
        {/* Pulsing center icon */}
        <div className="absolute inset-0 flex items-center justify-center text-orange-600 animate-pulse">
          <Coffee className={iconSizes[size]} />
        </div>
      </div>
      
      {message && (
        <p className="mt-4 text-sm font-bold text-gray-600 tracking-wide animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export const ProductSkeletonGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 animate-pulse flex flex-col justify-between">
          <div className="bg-gray-100 rounded-2xl h-48 w-full mb-4" />
          <div className="space-y-2 mb-4">
            <div className="h-6 bg-gray-200 rounded-md w-3/4" />
            <div className="h-4 bg-gray-100 rounded-md w-full" />
            <div className="h-4 bg-gray-100 rounded-md w-5/6" />
          </div>
          <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
            <div className="h-6 bg-gray-200 rounded-md w-16" />
            <div className="h-9 bg-gray-200 rounded-full w-24" />
          </div>
        </div>
      ))}
    </div>
  );
};
