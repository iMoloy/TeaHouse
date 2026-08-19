'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { AuthModal } from '@/components/AuthModal';
import { Product, CartItem } from '@/types';
import { fetchProducts, createProduct, updateProduct, deleteProduct, fetchAllOrders, updateOrderStatus, submitOrder } from '@/lib/api';
import { Plus, Edit2, Trash2, Package, RefreshCw, Layers } from 'lucide-react';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface UserSession {
  name: string;
  email: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Modal State for Create/Edit Product
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'milk-tea',
    categoryLabel: 'Milk Tea',
    price: 4.5,
    rating: 5,
    reviewsCount: 50,
    image: '/images/tea-1.png',
    description: '',
    ingredients: ''
  });

  useEffect(() => {
    // Load cart
    const savedCart = localStorage.getItem('next_teahouse_cart');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) {}
    }

    // Load user session
    const savedUser = localStorage.getItem('next_teahouse_user');
    if (savedUser) {
      try { setCurrentUser(JSON.parse(savedUser)); } catch (e) {}
    }

    loadAdminData();
  }, []);

  async function loadAdminData() {
    setLoading(true);
    try {
      const [prods, ords] = await Promise.all([fetchProducts(), fetchAllOrders()]);
      setProducts(prods);
      setOrders(ords);
    } catch (err) {
      toast.error('Failed to load admin data.');
    } finally {
      setLoading(false);
    }
  }

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
    const email = currentUser ? currentUser.email : 'admin@teahouse.com';
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await submitOrder({
      customerName: currentUser ? currentUser.name : 'Admin User',
      customerEmail: email,
      items: cart,
      totalAmount
    });

    toast.success('🎉 Order placed successfully!');
    saveCart([]);
    setIsCartOpen(false);
    loadAdminData();
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: 'milk-tea',
      categoryLabel: 'Milk Tea',
      price: 4.5,
      rating: 5,
      reviewsCount: 50,
      image: '/images/tea-1.png',
      description: '',
      ingredients: 'Ceylon Tea, Organic Milk, Natural Sugar'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    const id = p._id || String(p.id);
    setEditingId(id);
    setFormData({
      name: p.name,
      category: p.category,
      categoryLabel: p.categoryLabel || p.category,
      price: p.price,
      rating: p.rating,
      reviewsCount: p.reviewsCount || 50,
      image: p.image,
      description: p.description,
      ingredients: p.ingredients ? p.ingredients.join(', ') : ''
    });
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tea product?')) return;
    try {
      await deleteProduct(id);
      toast.warn('🗑️ Product deleted.');
      setProducts(products.filter(p => (p._id || String(p.id)) !== id));
    } catch (err) {
      toast.error('Failed to delete product.');
    }
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      ingredients: formData.ingredients.split(',').map(i => i.trim()).filter(Boolean)
    };

    try {
      if (editingId) {
        await updateProduct(editingId, payload);
        toast.success('🎉 Product updated!');
        setProducts(products.map(p => ((p._id || String(p.id)) === editingId ? { ...p, ...payload } : p)));
      } else {
        const created = await createProduct(payload);
        toast.success('🎉 New product created!');
        setProducts([...products, created]);
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Could not save product.');
    }
  };

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus(orderId, status);
      toast.success(`Order status updated to "${status.toUpperCase()}"`);
      setOrders(orders.map(o => (o._id === orderId ? { ...o, status } : o)));
    } catch (err) {
      toast.error('Could not update order status.');
    }
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

        <main className="w-11/12 max-w-7xl mx-auto py-12">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 border-b border-gray-200 pb-6">
            <div>
              <span className="bg-orange-100 text-orange-700 text-xs font-black px-3 py-1 rounded-full uppercase">
                Admin Panel
              </span>
              <h1 className="text-3xl font-extrabold text-gray-900 mt-2">Tea House Operations Center</h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 ${
                  activeTab === 'products' ? 'btn-gradient text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Layers className="w-4 h-4" /> Manage Products ({products.length})
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 ${
                  activeTab === 'orders' ? 'btn-gradient text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Package className="w-4 h-4" /> Live Orders ({orders.length})
              </button>

              <button onClick={loadAdminData} className="p-2.5 bg-white border rounded-full hover:bg-gray-100" title="Refresh">
                <RefreshCw className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {loading ? (
            <LoadingSpinner message="Fetching live MongoDB database entries..." size="lg" />
          ) : activeTab === 'products' ? (
            /* ================= PRODUCTS TAB ================= */
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">Tea Catalog List</h3>
                <button onClick={handleOpenCreate} className="btn-gradient px-6 py-2.5 rounded-full font-bold text-sm shadow flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add New Tea Blend
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => {
                  const pId = p._id || String(p.id);
                  return (
                    <div key={pId} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
                      <div className="flex items-center gap-4 mb-4">
                        <img src={p.image} alt={p.name} className="w-20 h-20 object-contain rounded-2xl bg-gray-50 p-2" />
                        <div>
                          <span className="text-xs font-bold text-orange-600 uppercase tracking-wide">{p.category}</span>
                          <h4 className="text-xl font-bold text-gray-900">{p.name}</h4>
                          <p className="text-lg font-black text-gray-800">${p.price.toFixed(2)}</p>
                        </div>
                      </div>

                      <p className="text-gray-500 text-xs line-clamp-2 mb-4">{p.description}</p>

                      <div className="pt-4 border-t border-gray-100 flex gap-2 justify-end">
                        <button onClick={() => handleOpenEdit(p)} className="px-4 py-2 bg-amber-50 text-amber-700 hover:bg-amber-100 font-bold text-xs rounded-xl flex items-center gap-1">
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button onClick={() => handleDeleteProduct(pId)} className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-bold text-xs rounded-xl flex items-center gap-1">
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* ================= ORDERS TAB ================= */
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Live Customer Orders</h3>

              {orders.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No customer orders placed yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-xs font-extrabold text-gray-500 uppercase">
                      <tr>
                        <th className="p-4 rounded-l-xl">Order ID</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Items Purchased</th>
                        <th className="p-4">Total Amount</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 rounded-r-xl">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.map((ord) => (
                        <tr key={ord._id} className="hover:bg-gray-50/50">
                          <td className="p-4 font-mono text-xs text-gray-400">#{String(ord._id).slice(-6)}</td>
                          <td className="p-4">
                            <div className="font-bold text-gray-900">{ord.customerName}</div>
                            <div className="text-xs text-gray-500">{ord.customerEmail}</div>
                          </td>
                          <td className="p-4">
                            <ul className="text-xs text-gray-600">
                              {ord.items?.map((item: any, idx: number) => (
                                <li key={idx}>
                                  • {item.quantity}x {item.name}
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="p-4 font-black text-orange-600">${ord.totalAmount?.toFixed(2)}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase inline-flex items-center gap-1 ${
                              ord.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                              ord.status === 'out-for-delivery' ? 'bg-blue-100 text-blue-800' :
                              ord.status === 'preparing' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {ord.status || 'pending'}
                            </span>
                          </td>
                          <td className="p-4">
                            <select
                              value={ord.status || 'pending'}
                              onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                              className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold focus:outline-none"
                            >
                              <option value="pending">Pending</option>
                              <option value="preparing">Preparing</option>
                              <option value="out-for-delivery">Out for Delivery</option>
                              <option value="delivered">Delivered</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </main>
      </div>

      {/* CREATE / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="text-xl font-extrabold text-gray-900">{editingId ? 'Edit Tea Product' : 'Add New Tea Product'}</h3>

            <form onSubmit={handleSubmitProduct} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category Key</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value, categoryLabel: e.target.value.replace('-', ' ') })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                  >
                    <option value="milk-tea">milk-tea</option>
                    <option value="black-tea">black-tea</option>
                    <option value="lemon-tea">lemon-tea</option>
                    <option value="green-tea">green-tea</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Image Path / URL</label>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                <textarea
                  required
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Ingredients (comma separated)</label>
                <input
                  type="text"
                  value={formData.ingredients}
                  onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-100 py-2.5 rounded-xl font-bold text-sm text-gray-700">
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn-gradient py-2.5 rounded-xl font-bold text-sm text-white shadow">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
