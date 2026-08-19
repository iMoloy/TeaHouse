'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { AuthModal } from '@/components/AuthModal';
import { fetchUserOrders, submitOrder } from '@/lib/api';
import { CartItem } from '@/types';
import { Package, Clock, CheckCircle2, Truck, Coffee, ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { toast } from 'react-toastify';

interface UserSession {
  name: string;
  email: string;
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string>('');
  const [searchEmail, setSearchEmail] = useState<string>('');

  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    // Load cart
    const savedCart = localStorage.getItem('next_teahouse_cart');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) {}
    }

    // Load user session or last order email
    const savedUser = localStorage.getItem('next_teahouse_user');
    const lastOrderEmail = localStorage.getItem('last_order_email');

    let activeEmail = '';
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        setCurrentUser(u);
        activeEmail = u.email;
      } catch (e) {}
    } else if (lastOrderEmail) {
      activeEmail = lastOrderEmail;
    }

    if (activeEmail) {
      setUserEmail(activeEmail);
      setSearchEmail(activeEmail);
      loadOrders(activeEmail);
    } else {
      setLoading(false);
    }
  }, []);

  async function loadOrders(email: string) {
    if (!email) return;
    setLoading(true);
    try {
      const data = await fetchUserOrders(email);
      setOrders(data);
      setUserEmail(email);
    } catch (e) {
      toast.error('Could not fetch orders for ' + email);
    } finally {
      setLoading(false);
    }
  }

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchEmail) {
      loadOrders(searchEmail);
    }
  };

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('next_teahouse_cart', JSON.stringify(newCart));
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
    const email = currentUser ? currentUser.email : userEmail || 'guest@teahouse.com';
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
    loadOrders(email);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <div>
        <Navbar
          cartCount={totalCartCount}
          currentUser={currentUser}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
        />

        <main className="w-11/12 max-w-5xl mx-auto py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Link href="/" className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-100">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900">My Tea Orders & History</h1>
                <p className="text-gray-500 text-sm">Real-time status tracking for your tea orders</p>
              </div>
            </div>

            {/* Email Search Form for guest orders */}
            <form onSubmit={handleManualSearch} className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <input
                  type="email"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  placeholder="Enter order email..."
                  className="w-full bg-white border border-gray-200 rounded-full pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-orange-500 shadow-xs"
                />
                <Search className="w-3.5 h-3.5 absolute left-3.5 top-2.5 text-gray-400" />
              </div>
              <button type="submit" className="btn-gradient px-4 py-2 rounded-full font-bold text-xs shadow whitespace-nowrap">
                Track Orders
              </button>
            </form>
          </div>

          {loading ? (
            <LoadingSpinner message="Fetching your live tea orders..." size="lg" />
          ) : !userEmail && !searchEmail ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100 space-y-4">
              <Coffee className="w-16 h-16 text-orange-400 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-800">Track Your Tea Orders</h3>
              <p className="text-gray-500 text-sm">Sign in to your account or enter your order email above to view order history.</p>
              <button onClick={() => setIsAuthOpen(true)} className="btn-gradient px-8 py-3 rounded-full font-bold text-sm inline-block shadow">
                Sign In / Open Profile
              </button>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100 space-y-4">
              <Package className="w-16 h-16 text-gray-300 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-800">No Orders Found for {userEmail || searchEmail}</h3>
              <p className="text-gray-500 text-sm">Explore our organic tea menu and order your favorite blend today!</p>
              <Link href="/products" className="btn-gradient px-8 py-3 rounded-full font-bold text-sm inline-block shadow">
                Explore Tea Menu
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((ord) => (
                <div key={ord._id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
                    <div>
                      <span className="text-xs font-mono text-gray-400">Order ID: #{String(ord._id).slice(-8)}</span>
                      <h4 className="text-lg font-bold text-gray-900">
                        {new Date(ord.createdAt || Date.now()).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase inline-flex items-center gap-1.5 ${
                        ord.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                        ord.status === 'out-for-delivery' ? 'bg-blue-100 text-blue-800' :
                        ord.status === 'preparing' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {ord.status === 'delivered' && <CheckCircle2 className="w-4 h-4" />}
                        {ord.status === 'out-for-delivery' && <Truck className="w-4 h-4" />}
                        {ord.status === 'preparing' && <Clock className="w-4 h-4" />}
                        {ord.status || 'Pending'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-xs font-bold uppercase text-gray-400 mb-2">Items Ordered</h5>
                      <ul className="space-y-2">
                        {ord.items?.map((item: any, idx: number) => (
                          <li key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                            <img src={item.image || '/images/tea-1.png'} alt={item.name} className="w-10 h-10 object-contain rounded-xl bg-gray-50 p-1" />
                            <div>
                              <div className="font-bold">{item.name}</div>
                              <div className="text-xs text-gray-500">Qty: {item.quantity} x ${item.price?.toFixed(2)}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4 flex flex-col justify-between text-right">
                      <div>
                        <span className="text-xs text-gray-500">Total Amount Paid</span>
                        <div className="text-2xl font-black text-orange-600">${ord.totalAmount?.toFixed(2)}</div>
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        Delivering to: <span className="font-bold text-gray-700">{ord.customerEmail}</span>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </main>
      </div>

      <Footer />

      {/* Cart & Auth Modals */}
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
          setUserEmail(user.email);
          localStorage.setItem('next_teahouse_user', JSON.stringify(user));
          loadOrders(user.email);
        }}
        onLogoutSuccess={() => {
          setCurrentUser(null);
          setUserEmail('');
          localStorage.removeItem('next_teahouse_user');
          setOrders([]);
        }}
      />
    </div>
  );
}
