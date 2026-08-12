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
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { toast } from 'react-toastify';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newsList, setNewsList] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    // Load saved cart
    const savedCart = localStorage.getItem('next_teahouse_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {}
    }

    // Fetch dynamic data with loading indicator
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

    loadData();
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

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await submitOrder({
      customerName: 'Valued Guest',
      customerEmail: 'guest@teahouse.com',
      items: cart,
      totalAmount
    });

    toast.success('🎉 Thank you! Your Tea House order has been placed successfully.');
    saveCart([]);
    setIsCartOpen(false);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col justify-between relative">
      
      <div>
        <Navbar
          cartCount={totalCartCount}
          onOpenCart={() => {
            setIsCartOpen(true);
            toast.info("Opened Shopping Bag");
          }}
          onOpenAuth={() => {
            setIsAuthOpen(true);
          }}
        />

        <main>
          <Hero />
          
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
            <SuperClients reviews={reviews} />
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
      />

    </div>
  );
}
