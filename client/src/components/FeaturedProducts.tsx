'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { Search, Star, Eye, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import { ProductSkeletonGrid } from './LoadingSpinner';

interface FeaturedProductsProps {
  products: Product[];
  isLoading?: boolean;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  isLoading = false,
  onSelectProduct,
  onAddToCart
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleCategoryChange = (cat: string, label: string) => {
    setActiveCategory(cat);
    toast.info(`Filtering products by "${label}"`);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="featured-products" className="w-11/12 max-w-7xl mx-auto py-16">
      
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Our Featured Products</h2>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { id: 'all', label: 'All Teas' },
            { id: 'milk-tea', label: 'Milk Tea' },
            { id: 'black-tea', label: 'Black Tea' },
            { id: 'lemon-tea', label: 'Lemon Tea' },
            { id: 'green-tea', label: 'Green Tea' }
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id, cat.label)}
                className={`px-5 py-2.5 rounded-full font-bold text-sm transition shadow-sm ${
                  isActive
                    ? 'btn-gradient text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tea blends..."
            className="w-full bg-white border border-gray-200 rounded-full pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 shadow-sm"
          />
          <Search className="w-4 h-4 absolute left-4 top-3.5 text-gray-400" />
        </div>

      </div>

      {isLoading ? (
        <ProductSkeletonGrid />
      ) : filteredProducts.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <h4 className="text-xl font-bold text-gray-700">No Tea Blends Found</h4>
          <p className="text-gray-500 text-sm mt-1">Try adjusting your filter or search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id || product.id} className="bg-white rounded-3xl p-6 text-center shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between group border border-gray-100">
              <div className="relative bg-gray-50 rounded-2xl p-6 mb-5 overflow-hidden flex items-center justify-center min-h-[200px]">
                <span className="absolute top-3 left-3 bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {product.rating}
                </span>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-36 h-36 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{product.description}</p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-2xl font-extrabold text-orange-600">${product.price.toFixed(2)}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onSelectProduct(product);
                      toast.info(`Viewing details for ${product.name}`);
                    }}
                    className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                    title="Quick View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="btn-gradient px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-1 shadow"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
};
