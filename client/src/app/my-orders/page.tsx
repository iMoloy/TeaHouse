'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { fetchUserOrders } from '@/lib/api';
import { Package, Clock, CheckCircle2, Truck, Coffee, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    const savedUser = localStorage.getItem('next_teahouse_user');
    if (savedUser) {
      try {
        const userObj = JSON.parse(savedUser);
        setUserEmail(userObj.email);
        loadOrders(userObj.email);
      } catch (e) {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  async function loadOrders(email: string) {
    setLoading(true);
    try {
      const data = await fetchUserOrders(email);
      setOrders(data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <div>
        <Navbar currentUser={null} cartCount={0} onOpenCart={() => {}} onOpenAuth={() => {}} />

        <main className="w-11/12 max-w-5xl mx-auto py-12">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/" className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">My Tea Orders & History</h1>
              <p className="text-gray-500 text-sm">Real-time status tracking for all your tea orders</p>
            </div>
          </div>

          {loading ? (
            <LoadingSpinner message="Fetching your order history..." size="lg" />
          ) : !userEmail ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100 space-y-4">
              <Coffee className="w-16 h-16 text-orange-400 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-800">Please Sign In</h3>
              <p className="text-gray-500 text-sm">Sign in to view your live tea order status and order history.</p>
              <Link href="/" className="btn-gradient px-8 py-3 rounded-full font-bold text-sm inline-block shadow">
                Go to Home Page
              </Link>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100 space-y-4">
              <Package className="w-16 h-16 text-gray-300 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-800">No Orders Placed Yet</h3>
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
    </div>
  );
}
