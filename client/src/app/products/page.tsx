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
import { ArrowLeft } from 'lucide-react';
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
    toast.success(`🛒 Added ${quantity}x "${product.name}" to cart!`);
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

      <main className="w-11/12 max-w-7xl mx-auto py-8">
        <div className="mb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
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
    </div>
  );
}
