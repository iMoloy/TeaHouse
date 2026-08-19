'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, ArrowLeft } from 'lucide-react';
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

export default function PrivacyPolicyPage() {
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
                All account sessions and authentication tokens are encrypted using Better Auth standards. We never store raw credit card credentials on our servers.
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
