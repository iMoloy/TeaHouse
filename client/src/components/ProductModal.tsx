'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { X, Star, ShoppingBag, Clock, Thermometer, Sparkles, Flame, Check } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenSteepTimer?: (teaName: string, minutes: number, tempC: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenSteepTimer
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedServing, setSelectedServing] = useState<'regular' | 'large'>('regular');

  if (!product) return null;

  // Flavor profile metrics based on category
  const getFlavorProfile = () => {
    switch (product.category) {
      case 'milk-tea':
        return { sweetness: 85, aroma: 75, body: 95, caffeine: 'Medium Energy', temp: 100, minutes: 4.0 };
      case 'black-tea':
        return { sweetness: 35, aroma: 90, body: 95, caffeine: 'High Boost', temp: 95, minutes: 3.5 };
      case 'lemon-tea':
        return { sweetness: 65, aroma: 92, body: 60, caffeine: 'Low / Refreshing', temp: 90, minutes: 5.0 };
      case 'green-tea':
      default:
        return { sweetness: 45, aroma: 95, body: 75, caffeine: 'Gentle Focus', temp: 80, minutes: 2.5 };
    }
  };

  const profile = getFlavorProfile();
  const priceMultiplier = selectedServing === 'large' ? 1.35 : 1.0;
  const calculatedUnitPrice = product.price * priceMultiplier;
  const totalAmount = calculatedUnitPrice * quantity;

  const handleAdd = () => {
    onAddToCart({ ...product, price: calculatedUnitPrice }, quantity);
    onClose();
  };

  const handleStartTimer = () => {
    if (onOpenSteepTimer) {
      onClose();
      onOpenSteepTimer(product.name, profile.minutes, profile.temp);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto border border-orange-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center font-bold transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Left Column: Image & Flavor Profile */}
          <div>
            <div className="bg-amber-50/80 rounded-3xl p-6 flex justify-center items-center shadow-inner relative overflow-hidden mb-4">
              <img src={product.image} alt={product.name} className="w-48 h-48 object-contain drop-shadow-md" />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-extrabold text-orange-600 uppercase tracking-wider shadow-xs">
                Handcrafted
              </div>
            </div>

            {/* Flavor Profile Bars */}
            <div className="bg-gray-50/80 border border-gray-200 rounded-2xl p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Flavor Profile
                </span>
                <span className="text-[11px] text-orange-600 bg-orange-100/60 px-2 py-0.5 rounded-full font-bold">
                  {profile.caffeine}
                </span>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-gray-500 mb-1">
                  <span>Aroma & Fragrance</span>
                  <span>{profile.aroma}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-1.5 rounded-full" style={{ width: `${profile.aroma}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-gray-500 mb-1">
                  <span>Body & Richness</span>
                  <span>{profile.body}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-amber-500 to-red-500 h-1.5 rounded-full" style={{ width: `${profile.body}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-gray-500 mb-1">
                  <span>Sweetness Note</span>
                  <span>{profile.sweetness}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-amber-300 to-yellow-500 h-1.5 rounded-full" style={{ width: `${profile.sweetness}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Order Controls */}
          <div>
            <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full inline-block mb-2">
              {product.categoryLabel || product.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1.5">{product.name}</h2>
            
            <div className="flex items-center gap-2 mb-3 text-xs text-gray-600">
              <span className="flex items-center text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-500 mr-1" />
                {product.rating}
              </span>
              <span>•</span>
              <span>{product.reviewsCount} customer reviews</span>
            </div>

            <p className="text-gray-600 text-xs sm:text-sm mb-4 leading-relaxed">{product.description}</p>

            {/* Serving Size Selector */}
            <div className="mb-4">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Cup Size / Loose Leaf
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedServing('regular')}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border flex items-center justify-between transition ${
                    selectedServing === 'regular'
                      ? 'border-orange-500 bg-orange-50 text-orange-900 font-extrabold shadow-xs'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>Regular (12 oz)</span>
                  {selectedServing === 'regular' && <Check className="w-3.5 h-3.5 text-orange-600" />}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedServing('large')}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border flex items-center justify-between transition ${
                    selectedServing === 'large'
                      ? 'border-orange-500 bg-orange-50 text-orange-900 font-extrabold shadow-xs'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>Large (16 oz / +35%)</span>
                  {selectedServing === 'large' && <Check className="w-3.5 h-3.5 text-orange-600" />}
                </button>
              </div>
            </div>

            {/* Brewing Guide Card */}
            <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-3 mb-4 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-700 block">
                  Brewing Guide
                </span>
                <div className="flex items-center gap-3 text-xs font-bold text-gray-800">
                  <span className="flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5 text-red-500" /> {profile.temp}°C
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" /> {profile.minutes} mins
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleStartTimer}
                className="bg-white hover:bg-orange-100 text-orange-700 border border-orange-300 px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition shadow-xs"
              >
                <Clock className="w-3.5 h-3.5" /> Start Timer
              </button>
            </div>

            {product.ingredients && product.ingredients.length > 0 && (
              <div className="mb-5">
                <h5 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Key Ingredients</h5>
                <div className="flex flex-wrap gap-1.5">
                  {product.ingredients.map((ing, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md font-medium">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Price & Quantity */}
            <div className="flex items-center justify-between mb-5 pt-3 border-t border-gray-100">
              <div>
                <span className="text-[11px] text-gray-400 block font-semibold">Total Price</span>
                <span className="text-2xl font-black text-gray-900">${totalAmount.toFixed(2)}</span>
              </div>

              <div className="flex items-center border border-gray-200 rounded-full overflow-hidden shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold transition"
                >
                  -
                </button>
                <span className="px-4 font-bold text-gray-800 text-sm">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold transition"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="w-full btn-gradient py-3.5 rounded-full font-bold text-center flex items-center justify-center gap-2 shadow-lg"
            >
              <ShoppingBag className="w-5 h-5" /> Add to Order (${totalAmount.toFixed(2)})
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
