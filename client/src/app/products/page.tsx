'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product, CartItem } from '@/types';
import { fetchProducts } from '@/lib/api';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { ProductModal } from '@/components/ProductModal';
import { CartDrawer } from '@/components/CartDrawer';
import { ArrowLeft } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProducts();
      setProducts(data);
    }
    loadProducts();
  }, []);

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
    setCart(updatedCart);
    setToastMessage(`Added ${quantity}x "${product.name}" to cart!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAFAFA]">
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-gray-900 text-white text-sm font-semibold px-5 py-3.5 rounded-2xl shadow-xl animate-bounce">
          {toastMessage}
        </div>
      )}

      <Navbar currentUser={null} cartCount={cart.reduce((s, i) => s + i.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} onOpenAuth={() => {}} />

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
          setCart(updated);
        }}
        onRemoveItem={(id) => setCart(cart.filter(i => i.id !== id))}
        onCheckout={() => {
          setCart([]);
          setIsCartOpen(false);
          setToastMessage('🎉 Order placed successfully!');
          setTimeout(() => setToastMessage(null), 3000);
        }}
      />
    </div>
  );
}
