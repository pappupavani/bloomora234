import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG } from '../data/products';
import { Heart, Instagram, MessageCircle, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, setCategoryFilter, showToast } = useCart();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    showToast("Welcome to the Wool & Bloom family! 🌸 Check your inbox for 10% off.");
    setNewsletterEmail('');
  };

  const navigateTo = (page: string, category?: string) => {
    setCurrentPage(page);
    if (category) setCategoryFilter(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2E2827] text-[#FAF7F2] pt-16 pb-12 border-t border-[#423937]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#423937]">
          
          {/* Brand & Story Column */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-display text-2xl font-medium tracking-tight text-white flex items-center gap-1.5">
              <span>{SITE_CONFIG.name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C86D7A]"></span>
            </h3>
            <p className="text-xs text-[#C2B5B0] leading-relaxed max-w-sm">
              We handcraft timeless crochet floral bouquets and knitted art that never wilt. 
              Each petal is individually hooked with combed milk-cotton yarn to turn heartfelt moments into everlasting keepsakes.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#3D3534] hover:bg-[#C86D7A] flex items-center justify-center text-[#E0D5CF] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#3D3534] hover:bg-[#25D366] flex items-center justify-center text-[#E0D5CF] hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="w-9 h-9 rounded-full bg-[#3D3534] hover:bg-[#8A9A86] flex items-center justify-center text-[#E0D5CF] hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#E8DFDB]">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#B5A8A3]">
              <li>
                <button
                  onClick={() => navigateTo('shop', 'all')}
                  className="hover:text-white transition-colors text-left"
                >
                  All Handmade Flowers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'bouquets')}
                  className="hover:text-white transition-colors text-left"
                >
                  Crochet Rose Bouquets
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'single-flowers')}
                  className="hover:text-white transition-colors text-left"
                >
                  Single Bloom Stems
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'keychains')}
                  className="hover:text-white transition-colors text-left"
                >
                  Cute Flower Keychains
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'custom-gifts')}
                  className="hover:text-white transition-colors text-left"
                >
                  Desktop Tulip Pots
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Custom */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#E8DFDB]">
              Artisan Studio
            </h4>
            <ul className="space-y-2 text-xs text-[#B5A8A3]">
              <li>
                <button
                  onClick={() => navigateTo('custom')}
                  className="hover:text-white transition-colors text-left text-[#F2C4CE]"
                >
                  Custom Bouquet Builder ✨
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  Our Yarn Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors text-left"
                >
                  Contact &amp; Studio Visits
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi Wool & Bloom! I have a question about placing an order.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#25D366] transition-colors flex items-center gap-1.5"
                >
                  <span>WhatsApp Chat</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Studio Notes */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#E8DFDB]">
              Bloom Letters
            </h4>
            <p className="text-xs text-[#B5A8A3] leading-relaxed">
              Get secret discounts, seasonal bouquet releases, and gift inspiration directly in your inbox.
            </p>
            {subscribed ? (
              <p className="text-xs text-[#A9C5A0] font-medium pt-1">
                Thank you! You are on our VIP list. 🌸
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full text-xs px-3.5 py-2.5 bg-[#3D3534] border border-[#524947] text-white placeholder:text-[#8C7F7A] rounded-xl focus:outline-hidden focus:border-[#C86D7A]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-1.5 bg-[#C86D7A] hover:bg-[#B55D6A] text-white rounded-lg transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
            <div className="pt-2 text-[11px] text-[#8C7F7A] space-y-1">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#A89E9A]" />
                <span>{SITE_CONFIG.businessHours}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#A89E9A]" />
                <span>{SITE_CONFIG.studioLocation}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7F7A] gap-4">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} {SITE_CONFIG.name}. Handcrafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#C86D7A] fill-[#C86D7A]" />
            <span>for flower lovers worldwide.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Milk Cotton Yarn</span>
            <span>·</span>
            <span>Worldwide Courier</span>
            <span>·</span>
            <span>Hypoallergenic &amp; Everlasting</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
