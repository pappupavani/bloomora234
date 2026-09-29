import React, { useState } from 'react';
import { SITE_CONFIG } from '../data/products';
import { useCart } from '../context/CartContext';
import { 
  MessageCircle, 
  Instagram, 
  Mail, 
  Clock, 
  MapPin, 
  Send, 
  ChevronDown, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast, openChatWithPrompt } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Question',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    showToast("Message received! We will reply within 24 hours 🌸");
  };

  const faqs = [
    {
      q: 'How long does shipping take?',
      a: 'Ready-to-ship items (listed in our shop) dispatch within 1–2 business days. Delivery typically takes 3–5 business days within the country. Custom bespoke bouquets take 3–5 crafting days before shipping.',
    },
    {
      q: 'How do I clean and care for crochet flowers?',
      a: 'Crochet flowers require almost no maintenance! Simply brush them very gently with a soft dry makeup brush or feather duster every few months. Keep away from direct soaking or open flames.',
    },
    {
      q: 'Can you match a specific wedding dress or event color palette?',
      a: 'Yes, absolutely! We love custom color matching. You can submit our Custom Orders form or message us directly on WhatsApp with photos of your swatch or event theme.',
    },
    {
      q: 'Is gift packaging included?',
      a: 'Yes! All bouquets come lovingly wrapped in textured Korean florist paper, tied with a satin ribbon, and nestled safely in an impact-resistant shipping box with a free handwritten card.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#A66E78]">
          <Sparkles className="w-3.5 h-3.5 text-[#C86D7A]" />
          <span>Say Hello to Our Studio</span>
        </div>
        <h1 className="font-display font-medium text-3xl sm:text-5xl text-[#2E2927]">
          We&apos;d Love to Hear From You
        </h1>
        <p className="text-sm text-[#736864] leading-relaxed">
          Have a question about a bouquet, want custom colors, or need corporate/event gifting? Reach out directly via WhatsApp, Instagram, or email.
        </p>
      </div>

      {/* 4 Quick Action Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Chatboard Concierge Card */}
        <button
          type="button"
          onClick={() => openChatWithPrompt()}
          className="p-6 bg-[#FAF5F7] hover:bg-[#F5EDF1] rounded-3xl border border-[#F2D7D9] transition-all flex flex-col justify-between text-left group shadow-2xs hover:shadow-md cursor-pointer"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#C86D7A] text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 fill-white/20" />
            </div>
            <h3 className="font-display font-medium text-xl text-[#7A3645]">AI Floral Concierge</h3>
            <p className="text-xs text-[#8F4E5E] mt-1.5 leading-relaxed">
              Instant recommendations, custom bouquet advice, and answers to your questions 24/7.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-[#E8CCD7] text-xs font-semibold text-[#7A3645] flex items-center gap-1">
            <span>Launch Chatboard 💬</span>
          </div>
        </button>

        {/* WhatsApp Card */}
        <a
          href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello Wool & Bloom! I would like to ask about your handmade crochet flowers.')}`}
          target="_blank"
          rel="noreferrer"
          className="p-6 bg-[#EEF7F0] hover:bg-[#E2F2E5] rounded-3xl border border-[#CDE5D3] transition-all flex flex-col justify-between group shadow-2xs hover:shadow-md"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <MessageCircle className="w-6 h-6 fill-white" />
            </div>
            <h3 className="font-display font-medium text-xl text-[#1E562D]">Chat on WhatsApp</h3>
            <p className="text-xs text-[#3E6F4B] mt-1.5 leading-relaxed">
              Fastest response! Chat directly with our maker for custom requests, photo proofs, and quick answers.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-[#CCE5D3] text-xs font-semibold text-[#1E562D] flex items-center gap-1">
            <span>Open WhatsApp ({SITE_CONFIG.whatsappDisplay})</span>
          </div>
        </a>

        {/* Instagram Card */}
        <a
          href={SITE_CONFIG.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="p-6 bg-[#FAF0F3] hover:bg-[#F6E5EB] rounded-3xl border border-[#EED4DE] transition-all flex flex-col justify-between group shadow-2xs hover:shadow-md"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#985E74] text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Instagram className="w-6 h-6" />
            </div>
            <h3 className="font-display font-medium text-xl text-[#7A3645]">Instagram DM</h3>
            <p className="text-xs text-[#8F4E5E] mt-1.5 leading-relaxed">
              Browse our latest crochet reels, story highlights, and message our studio handle.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-[#E8CCD7] text-xs font-semibold text-[#7A3645] flex items-center gap-1">
            <span>{SITE_CONFIG.instagram}</span>
          </div>
        </a>

        {/* Email Card */}
        <a
          href={`mailto:${SITE_CONFIG.email}`}
          className="p-6 bg-[#FAF8F5] hover:bg-[#F2ECE6] rounded-3xl border border-[#EDE7E1] transition-all flex flex-col justify-between group shadow-2xs hover:shadow-md"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#3D3534] text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-display font-medium text-xl text-[#2E2927]">Email Studio</h3>
            <p className="text-xs text-[#6B615E] mt-1.5 leading-relaxed">
              Ideal for bulk orders, corporate gifting, or wholesale partnership inquiries.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-[#E5DDD6] text-xs font-semibold text-[#3D3534] flex items-center gap-1">
            <span>{SITE_CONFIG.email}</span>
          </div>
        </a>

      </div>

      {/* Contact Form + Studio Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Contact Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#EDE7E1] shadow-2xs">
          <h2 className="font-display font-medium text-2xl text-[#2E2927] mb-1">
            Send Us a Message
          </h2>
          <p className="text-xs text-[#7F7470] mb-6">
            Fill in the form below and we will get back to your email within 24 hours.
          </p>

          {submitted ? (
            <div className="py-10 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#5C8A55] mx-auto" />
              <h3 className="font-display font-medium text-2xl text-[#2E2927]">
                Message Delivered!
              </h3>
              <p className="text-xs text-[#6B615E] max-w-sm mx-auto">
                Thank you, {formData.name}. We have received your note and will be in touch shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', subject: 'General Question', message: '' });
                }}
                className="mt-4 px-5 py-2 text-xs font-semibold bg-[#FAF8F5] border border-[#D9CECE] text-[#523E3A] rounded-xl hover:bg-[#F2ECE6]"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3D3533] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Charlotte Rose"
                    className="w-full text-xs p-2.5 rounded-xl border border-[#D9CECE] bg-[#FAF8F5] focus:outline-hidden focus:border-[#C86D7A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3D3533] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="charlotte@example.com"
                    className="w-full text-xs p-2.5 rounded-xl border border-[#D9CECE] bg-[#FAF8F5] focus:outline-hidden focus:border-[#C86D7A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3D3533] mb-1">
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full text-xs p-2.5 rounded-xl border border-[#D9CECE] bg-[#FAF8F5] focus:outline-hidden focus:border-[#C86D7A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3D3533] mb-1">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#D9CECE] bg-[#FAF8F5] text-[#2E2927]"
                  >
                    <option value="General Question">General Question</option>
                    <option value="Custom Bouquet Inquiry">Custom Bouquet Inquiry</option>
                    <option value="Wedding / Event Order">Wedding / Event Order</option>
                    <option value="Shipping & Delivery">Shipping &amp; Delivery</option>
                    <option value="Order Status">Order Status</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3D3533] mb-1">
                  Your Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what flowers or gifts you have in mind..."
                  className="w-full text-xs p-3 rounded-xl border border-[#D9CECE] bg-[#FAF8F5] resize-none focus:outline-hidden focus:border-[#C86D7A]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#C86D7A] hover:bg-[#B55D6A] text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Business Hours & FAQ (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Studio Hours Card */}
          <div className="p-6 bg-white rounded-3xl border border-[#EDE7E1] shadow-2xs space-y-4">
            <h3 className="font-display font-medium text-xl text-[#2E2927]">
              Studio Information
            </h3>
            
            <div className="space-y-3 text-xs text-[#6B615E]">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C86D7A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2E2927] block">Business Hours:</strong>
                  <span>{SITE_CONFIG.businessHours}</span>
                  <p className="text-[11px] text-[#8C807C] mt-0.5">Online orders accepted 24/7</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-[#F2ECE6]">
                <MapPin className="w-4 h-4 text-[#8A9A86] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2E2927] block">Studio Location:</strong>
                  <span>{SITE_CONFIG.studioLocation}</span>
                  <p className="text-[11px] text-[#8C807C] mt-0.5">We ship nationwide in secure gift boxes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ Accordion */}
          <div className="p-6 bg-white rounded-3xl border border-[#EDE7E1] shadow-2xs space-y-3">
            <h3 className="font-display font-medium text-lg text-[#2E2927]">
              Frequently Asked Questions
            </h3>

            <div className="space-y-2">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#F2ECE6] rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-3 text-left text-xs font-semibold text-[#2E2927] hover:bg-[#FAF8F5] flex items-center justify-between gap-2"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#8C807C] transition-transform ${
                          isOpen ? 'rotate-180 text-[#C86D7A]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-3 pb-3 text-xs text-[#6B615E] leading-relaxed bg-[#FAF8F5]/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
