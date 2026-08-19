"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { AuthModal } from "@/components/AuthModal";
import { CartItem } from "@/types";
import { submitOrder } from "@/lib/api";
import { toast } from "react-toastify";

interface UserSession {
  name: string;
  email: string;
}

export default function ServicePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("next_teahouse_cart");
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) {}
    }
    const savedUser = localStorage.getItem("next_teahouse_user");
    if (savedUser) {
      try { setCurrentUser(JSON.parse(savedUser)); } catch (e) {}
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("next_teahouse_cart", JSON.stringify(newCart));
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    const email = currentUser ? currentUser.email : "guest@teahouse.com";
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await submitOrder({
      customerName: currentUser ? currentUser.name : "Valued Guest",
      customerEmail: email,
      items: cart,
      totalAmount
    });

    localStorage.setItem("last_order_email", email);
    toast.success("🎉 Order placed successfully!");
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

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm space-y-6">
          <span className="bg-orange-100 text-orange-800 text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">
            Tea House Service
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Health Insurance</h1>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            Comprehensive Tea House service protection ensuring fresh delivery, member privileges, and zero-compromise quality for all tea lovers.
          </p>

          <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Guaranteed Thermal Insulation
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Spill-Proof Packaging
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Priority 30-Min Delivery
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 100% Organic Quality Shield
            </div>
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
          localStorage.setItem("next_teahouse_user", JSON.stringify(user));
        }}
        onLogoutSuccess={() => {
          setCurrentUser(null);
          localStorage.removeItem("next_teahouse_user");
        }}
      />
    </div>
  );
}
