'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { X, Star, ShoppingBag } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="relative bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center font-bold"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="bg-amber-50 rounded-2xl p-6 flex justify-center items-center">
            <img src={product.image} alt={product.name} className="w-48 h-48 object-contain" />
          </div>

          <div>
            <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full inline-block mb-2">
              {product.categoryLabel || product.category}
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{product.name}</h2>
            
            <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
              <span className="flex items-center text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-500 mr-1" />
                {product.rating}
              </span>
              <span>({product.reviewsCount} reviews)</span>
            </div>

            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{product.description}</p>

            {product.ingredients && product.ingredients.length > 0 && (
              <div className="mb-4">
                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Key Ingredients</h5>
                <div className="flex flex-wrap gap-1.5">
                  {product.ingredients.map((ing, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-6 pt-3 border-t border-gray-100">
              <div>
                <span className="text-xs text-gray-400 block">Unit Price</span>
                <span className="text-2xl font-black text-gray-900">${product.price.toFixed(2)}</span>
              </div>

              <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold"
                >
                  -
                </button>
                <span className="px-4 font-bold text-gray-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="w-full btn-gradient py-3 rounded-full font-bold text-center flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" /> Add to Order (${(product.price * quantity).toFixed(2)})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
