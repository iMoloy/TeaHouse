'use client';

import React from 'react';
import { CartItem } from '@/types';
import { ShoppingBag, X, Trash2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-xs" />

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6 z-10">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
            <h3 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-orange-500" /> Your Shopping Bag
            </h3>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto pr-1">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-gray-700">Your Cart is Empty</h4>
                <p className="text-gray-500 text-xs mt-1">Explore our teas and add your favorites!</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl mb-3">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-contain bg-white rounded-xl p-1" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                      <span className="text-xs text-orange-600 font-semibold">${item.price.toFixed(2)} each</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-200 bg-white rounded-lg overflow-hidden">
                      <button onClick={() => onUpdateQuantity(item.id, -1)} className="px-2 py-0.5 text-xs font-bold hover:bg-gray-100">-</button>
                      <span className="px-2 text-xs font-bold text-gray-800">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)} className="px-2 py-0.5 text-xs font-bold hover:bg-gray-100">+</button>
                    </div>
                    <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700 text-xs p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
            <span>Subtotal</span>
            <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-4 text-lg font-extrabold text-gray-900">
            <span>Total Amount</span>
            <span className="text-orange-600">${subtotal.toFixed(2)}</span>
          </div>
          <button
            onClick={onCheckout}
            disabled={cart.length === 0}
            className="w-full btn-gradient py-3.5 rounded-full font-bold text-center shadow-lg disabled:opacity-50"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
