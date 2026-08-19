'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { AuthModal } from '@/components/AuthModal';
import { CartItem } from '@/types';
import { submitOrder } from '@/lib/api';
import { toast } from 'react-toastify';

interface UserSession {
  name: string;
  email: string;
}

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('next_teahouse_cart');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) {}
    }
    const savedUser = localStorage.getItem('next_teahouse_user');
    if (savedUser) {
      try { setCurrentUser(JSON.parse(savedUser)); } catch (e) {}
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('next_teahouse_cart', JSON.stringify(newCart));
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    const email = currentUser ? currentUser.email : 'guest@teahouse.com';
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await submitOrder({
      customerName: currentUser ? currentUser.name : 'Valued Guest',
      customerEmail: email,
      items: cart,
      totalAmount
    });

    localStorage.setItem('last_order_email', email);
    toast.success('🎉 Order placed successfully!');
    saveCart([]);
    setIsCartOpen(false);
  };

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
      <Navbar
        currentUser={currentUser}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

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

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={(id, delta) => {
          const updated = cart.map(item => item.id === id ? { ...item, quantity: item.quantity + delta } : item).filter(i => i.quantity > 0);
          saveCart(updated);
        }}
        onRemoveItem={(id) => saveCart(cart.filter(i => i.id !== id))}
        onCheckout={handleCheckout}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          localStorage.setItem('next_teahouse_user', JSON.stringify(user));
        }}
        onLogoutSuccess={() => {
          setCurrentUser(null);
          localStorage.removeItem('next_teahouse_user');
        }}
      />
    </div>
  );
}
