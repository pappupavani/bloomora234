import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { ProductCategory } from '../types';

export const ShopPage: React.FC = () => {
  const { categoryFilter, setCategoryFilter } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const categories: { key: ProductCategory; label: string }[] = [
    { key: 'all', label: 'All Creations' },
    { key: 'bouquets', label: 'Flower Bouquets' },
    { key: 'single-flowers', label: 'Single Flowers' },
    { key: 'keychains', label: 'Keychains' },
    { key: 'custom-gifts', label: 'Custom Gifts' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory =
        categoryFilter === 'all' || item.category === categoryFilter;

      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.material.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [categoryFilter, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#A66E78]">
          <Sparkles className="w-3.5 h-3.5 text-[#C86D7A]" />
          <span>The Atelier Shop</span>
        </div>
        <h1 className="font-display font-medium text-3xl sm:text-5xl text-[#2E2927]">
          Handmade Floral Collection
        </h1>
        <p className="text-sm text-[#736864] leading-relaxed">
          Explore our handcrafted woolen flower bouquets, single sculptural stems, cute keychains, and cozy desktop pots.
        </p>
      </div>

      {/* Control Bar: Categories + Search + Sort */}
      <div className="bg-white p-4 rounded-2xl border border-[#EDE7E1] shadow-2xs space-y-4">
        
        {/* Category Tabs (Segmented Controls) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setCategoryFilter(cat.key)}
              className={`px-4 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
                categoryFilter === cat.key
                  ? 'bg-[#2E2927] text-white shadow-xs font-semibold'
                  : 'text-[#6B615E] hover:bg-[#F2ECE6] hover:text-[#2E2927]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Bar + Sort Dropdown */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#F2ECE6]">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#A89E9A] absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search flowers, colors, materials..."
              className="w-full text-xs pl-9 pr-8 py-2.5 bg-[#FAF8F5] rounded-xl border border-[#D9CECE] text-[#2E2927] placeholder:text-[#A89E9A] focus:outline-hidden focus:border-[#C86D7A] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-[#A89E9A] hover:text-[#2E2927]"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector & Result Count */}
          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
            <span className="text-xs text-[#8C807C] font-medium">
              Showing <strong className="text-[#2E2927]">{filteredProducts.length}</strong> items
            </span>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C807C]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs bg-[#FAF8F5] border border-[#D9CECE] rounded-xl px-3 py-2 text-[#4A4240] focus:outline-hidden focus:border-[#C86D7A] cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

        </div>

      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#EDE7E1] p-8">
          <div className="w-16 h-16 rounded-full bg-[#FCECEE] text-[#C86D7A] flex items-center justify-center mx-auto mb-4">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="font-display font-medium text-2xl text-[#2E2927]">
            No flowers match your search
          </h3>
          <p className="text-xs text-[#7F7470] mt-1.5 max-w-sm mx-auto">
            Try searching for &ldquo;rose&rdquo;, &ldquo;sunflower&rdquo;, &ldquo;keychain&rdquo;, or resetting your filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
            }}
            className="mt-5 px-6 py-2.5 bg-[#C86D7A] hover:bg-[#B55D6A] text-white rounded-full text-xs font-semibold transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
