/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';
import { Chatboard } from './components/Chatboard';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CustomOrderPage } from './pages/CustomOrderPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { SITE_CONFIG } from './data/products';
import { MessageCircle } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentPage } = useCart();

  return (
    <main className="flex-1 min-h-[70vh]">
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'shop' && <ShopPage />}
      {currentPage === 'custom' && <CustomOrderPage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'contact' && <ContactPage />}
    </main>
  );
};

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2E2927]">
        <AnnouncementBar />
        <Header />
        <MainContent />
        <Footer />
        <ProductDetailsModal />
        <CartDrawer />
        <Toast />
        <Chatboard />

        {/* Floating WhatsApp Quick Contact Button */}
        <a
          href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi Wool & Bloom! I would like to ask a question about your handmade flowers.')}`}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 left-6 z-40 p-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 group"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-semibold pr-1">
            Chat with Maker
          </span>
        </a>
      </div>
    </CartProvider>
  );
}
