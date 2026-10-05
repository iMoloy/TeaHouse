'use client';

import React, { useState, useEffect } from 'react';
import { Product, Review, News, CartItem } from '@/types';
import { fetchProducts, fetchReviews, fetchNews, submitOrder } from '@/lib/api';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { ProductModal } from '@/components/ProductModal';
import { FreshQuality } from '@/components/FreshQuality';
import { SuperClients } from '@/components/SuperClients';
import { NewsSection } from '@/components/NewsSection';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { AuthModal } from '@/components/AuthModal';
import { WriteReviewModal } from '@/components/WriteReviewModal';
import { TeaSommelierModal } from '@/components/TeaSommelierModal';
import { SteepTimerModal } from '@/components/SteepTimerModal';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { toast } from 'react-toastify';
import { Sparkles, Clock } from 'lucide-react';

interface UserSession {
  name: string;
  email: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newsList, setNewsList] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  
  // Interactive AI & Tea Master Modals
  const [isSommelierOpen, setIsSommelierOpen] = useState(false);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [timerPreset, setTimerPreset] = useState<{ teaName: string; minutes: number; tempC: number } | null>(null);

  useEffect(() => {
    // Load saved cart
    const savedCart = localStorage.getItem('next_teahouse_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {}
    }

    // Load saved user session
    const savedUser = localStorage.getItem('next_teahouse_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {}
    }

    // Fetch dynamic data with loading indicator
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      const [prodsData, revsData, newsData] = await Promise.all([
        fetchProducts(),
        fetchReviews(),
        fetchNews()
      ]);
      setProducts(prodsData);
      setReviews(revsData);
      setNewsList(newsData);
    } catch (err) {
      toast.error('⚠️ Could not connect to live database. Loaded local backup menu.');
    } finally {
      setIsLoading(false);
    }
  }

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

  const handleUpdateQuantity = (id: string, delta: number) => {
    const itemToUpdate = cart.find(i => i.id === id);
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean) as CartItem[];

    saveCart(updatedCart);
    if (itemToUpdate) {
      if (delta > 0) {
        toast.info(`Increased quantity of "${itemToUpdate.name}"`);
      } else {
        toast.warn(`Decreased quantity of "${itemToUpdate.name}"`);
      }
    }
  };

  const handleRemoveCartItem = (id: string) => {
    const itemToRemove = cart.find(i => i.id === id);
    const updatedCart = cart.filter((item) => item.id !== id);
    saveCart(updatedCart);
    if (itemToRemove) {
      toast.warn(`🗑️ Removed "${itemToRemove.name}" from shopping bag.`);
    }
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
    toast.success('🎉 Thank you! Your Tea House order has been placed successfully.');
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
      
      <div>
        <Navbar
          cartCount={totalCartCount}
          currentUser={currentUser}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenSommelier={() => setIsSommelierOpen(true)}
          onOpenTimer={() => setIsTimerOpen(true)}
        />

        <main>
          <Hero
            onOpenSommelier={() => setIsSommelierOpen(true)}
            onOpenTimer={() => setIsTimerOpen(true)}
          />
          
          {isLoading ? (
            <div className="py-20">
              <LoadingSpinner message="Steeping fresh organic teas from MongoDB..." size="lg" />
            </div>
          ) : (
            <FeaturedProducts
              products={products}
              isLoading={false}
              onSelectProduct={(product) => setSelectedProduct(product)}
              onAddToCart={(product) => handleAddToCart(product)}
            />
          )}

          <FreshQuality />
          
          {isLoading ? (
            <div className="py-12">
              <LoadingSpinner message="Loading client reviews..." size="md" />
            </div>
          ) : (
            <SuperClients
              reviews={reviews}
              onOpenWriteReview={() => setIsWriteReviewOpen(true)}
            />
          )}

          {isLoading ? (
            <div className="py-12">
              <LoadingSpinner message="Loading news & events..." size="md" />
            </div>
          ) : (
            <NewsSection newsList={newsList} />
          )}
        </main>
      </div>

      <Footer />

      {/* Floating Quick Dock (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        <button
          onClick={() => setIsTimerOpen(true)}
          className="bg-white/90 hover:bg-white text-gray-800 hover:text-amber-600 border border-amber-200/80 p-3 rounded-full shadow-lg backdrop-blur-md transition-all hover:scale-105 flex items-center gap-2 group"
          title="Open Steep Timer"
        >
          <Clock className="w-5 h-5 text-amber-500" />
          <span className="hidden sm:inline text-xs font-bold pr-1">Brew Timer</span>
        </button>

        <button
          onClick={() => setIsSommelierOpen(true)}
          className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-3.5 rounded-full shadow-xl transition-all hover:scale-105 flex items-center gap-2 group"
          title="Ask AI Tea Sommelier"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span className="hidden sm:inline text-xs font-black pr-1 tracking-wide">AI Sommelier</span>
        </button>
      </div>

      {/* Modals & Drawers */}
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
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
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

      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        onReviewAdded={loadData}
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
