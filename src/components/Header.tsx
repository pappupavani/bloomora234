import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG } from '../data/products';
import { ShoppingBag, Menu, X, Heart } from 'lucide-react';

export const Header: React.FC = () => {
  const { cartCount, setIsCartOpen, currentPage, setCurrentPage, setCategoryFilter } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop', category: 'all' },
    { label: 'Bouquets', page: 'shop', category: 'bouquets' },
    { label: 'Custom Orders', page: 'custom' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: string, category?: string) => {
    setCurrentPage(page);
    if (category) {
      setCategoryFilter(category);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EFEAE4] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element wordmark in display face */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-[#2E2927] hover:text-[#C86D7A] transition-colors text-left flex items-center gap-1.5"
            >
              <span>{SITE_CONFIG.name}</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C86D7A] mb-1"></span>
            </button>
          </div>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-[#5E5552]">
            {navLinks.map((link) => {
              const isActive =
                currentPage === link.page &&
                (!link.category || link.category === 'all');

              return (
                <button
                  key={`${link.page}-${link.label}`}
                  onClick={() => handleNavClick(link.page, link.category)}
                  className={`relative py-1 transition-colors hover:text-[#C86D7A] ${
                    isActive ? 'text-[#C86D7A] font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C86D7A] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary actions (Cart Button + Mobile Toggle) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('custom')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#C86D7A] bg-[#FCECEE] hover:bg-[#F8DDE1] rounded-full transition-colors whitespace-nowrap"
            >
              <Heart className="w-3.5 h-3.5 fill-[#C86D7A]" />
              <span>Custom Bouquet</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-[#2E2927] hover:text-[#C86D7A] hover:bg-[#F2ECE6] rounded-full transition-all"
              aria-label={`Shopping Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C86D7A] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-scale">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#5E5552] hover:text-[#2E2927] rounded-lg transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EFEAE4] bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={`m-${link.page}-${link.label}`}
              onClick={() => handleNavClick(link.page, link.category)}
              className={`block w-full text-left py-2.5 px-3 rounded-lg text-base font-medium transition-colors ${
                currentPage === link.page
                  ? 'bg-[#FCECEE] text-[#C86D7A] font-semibold'
                  : 'text-[#4A4240] hover:bg-[#F2ECE6]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#EFEAE4]">
            <button
              onClick={() => handleNavClick('custom')}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#C86D7A] text-white rounded-xl text-sm font-medium shadow-sm hover:bg-[#B65D6A] transition-colors"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Design Your Custom Bouquet</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
