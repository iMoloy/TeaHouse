'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product, CartItem } from '@/types';
import { fetchProducts, submitOrder } from '@/lib/api';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { ProductModal } from '@/components/ProductModal';
import { CartDrawer } from '@/components/CartDrawer';
import { AuthModal } from '@/components/AuthModal';
import { TeaSommelierModal } from '@/components/TeaSommelierModal';
import { SteepTimerModal } from '@/components/SteepTimerModal';
import { ArrowLeft, Sparkles, Clock } from 'lucide-react';
import { toast } from 'react-toastify';

interface UserSession {
  name: string;
  email: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSommelierOpen, setIsSommelierOpen] = useState(false);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [timerPreset, setTimerPreset] = useState<{ teaName: string; minutes: number; tempC: number } | null>(null);

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProducts();
      setProducts(data);
    }

    const savedCart = localStorage.getItem('next_teahouse_cart');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) {}
    }

    const savedUser = localStorage.getItem('next_teahouse_user');
    if (savedUser) {
      try { setCurrentUser(JSON.parse(savedUser)); } catch (e) {}
    }

    loadProducts();
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('next_teahouse_cart', JSON.stringify(newCart));
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    const pId = product._id || String(product.id);
    const existingIndex = cart.findIndex((item) => item.id === pId);

    let updatedCart: CartItem[];
    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart = [
        ...cart,
        {
          id: pId,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity
        }
      ];
    }

    saveCart(updatedCart);
    toast.success(`🛒 Added ${quantity}x "${product.name}" to your cart!`);
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
    toast.success('🎉 Order submitted! Tracking details saved under My Orders.');
    saveCart([]);
    setIsCartOpen(false);
  };

  const handleOpenSteepTimerForTea = (teaName: string, minutes: number, tempC: number) => {
    setTimerPreset({ teaName, minutes, tempC });
    setIsTimerOpen(true);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col justify-between relative">
      <Navbar
        cartCount={totalCartCount}
        currentUser={currentUser}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSommelier={() => setIsSommelierOpen(true)}
        onOpenTimer={() => setIsTimerOpen(true)}
      />

      <main className="w-11/12 max-w-7xl mx-auto py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-orange-600 transition">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsSommelierOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-800 text-xs font-bold transition shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-orange-600 animate-pulse" />
              <span>Ask AI Sommelier</span>
            </button>

            <button
              onClick={() => setIsTimerOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold transition shadow-xs"
            >
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Brew Timer</span>
            </button>
          </div>
        </div>

        <FeaturedProducts
          products={products}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={handleAddToCart}
        />
      </main>

      <Footer />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenSteepTimer={handleOpenSteepTimerForTea}
      />

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

      <TeaSommelierModal
        isOpen={isSommelierOpen}
        onClose={() => setIsSommelierOpen(false)}
        products={products}
        onAddToCart={handleAddToCart}
        onOpenTimerForTea={handleOpenSteepTimerForTea}
      />

      <SteepTimerModal
        isOpen={isTimerOpen}
        onClose={() => {
          setIsTimerOpen(false);
          setTimerPreset(null);
        }}
        initialTeaName={timerPreset?.teaName}
        initialMinutes={timerPreset?.minutes}
        initialTempC={timerPreset?.tempC}
      />
    </div>
  );
}
