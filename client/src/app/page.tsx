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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newsList, setNewsList] = useState<News[]>([]);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Load initial cart from localStorage
    const savedCart = localStorage.getItem('next_teahouse_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {}
    }

    // Fetch dynamic data from Express/MongoDB backend
    async function loadData() {
      const [prodsData, revsData, newsData] = await Promise.all([
        fetchProducts(),
        fetchReviews(),
        fetchNews()
      ]);
      setProducts(prodsData);
      setReviews(revsData);
      setNewsList(newsData);
    }

    loadData();
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('next_teahouse_cart', JSON.stringify(newCart));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
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
          quantity: quantity
        }
      ];
    }

    saveCart(updatedCart);
    showToast(`Added ${quantity}x "${product.name}" to your cart!`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
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
  };

  const handleRemoveCartItem = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    saveCart(updatedCart);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await submitOrder({
      customerName: 'Valued Guest',
      customerEmail: 'guest@teahouse.com',
      items: cart,
      totalAmount
    });

    showToast('🎉 Order placed successfully! Thank you for ordering from Tea House.');
    saveCart([]);
    setIsCartOpen(false);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col justify-between relative">
      
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-gray-900 text-white text-sm font-semibold px-5 py-3.5 rounded-2xl shadow-2xl border border-gray-700 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Main Sections */}
      <div>
        <Navbar
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
        />

        <main>
          <Hero />
          <FeaturedProducts
            products={products}
            onSelectProduct={(product) => setSelectedProduct(product)}
            onAddToCart={(product) => handleAddToCart(product)}
          />
          <FreshQuality />
          <SuperClients reviews={reviews} />
          <NewsSection newsList={newsList} />
        </main>
      </div>

      <Footer onSubscribeToast={showToast} />

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
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
        onToast={showToast}
      />

    </div>
  );
}
