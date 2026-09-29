import React from 'react';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG, ASSET_IMAGES } from '../data/products';
import { Heart, Sparkles, Feather, ShieldCheck, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentPage, setCategoryFilter } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-20">
      
      {/* Intro Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A66E78]">
            <Sparkles className="w-3.5 h-3.5 text-[#C86D7A]" />
            <span>Our Artisanal Story</span>
          </div>

          <h1 className="font-display font-medium text-4xl sm:text-5xl text-[#2E2927] leading-tight text-balance">
            Crafting Blooms That Whisper Love For Years to Come
          </h1>

          <p className="text-base text-[#615652] leading-relaxed">
            {SITE_CONFIG.name} was born in a cozy sunlit room filled with pastel yarn skeins, cups of herbal tea, and a passion for slow, meaningful craftsmanship.
          </p>

          <p className="text-sm text-[#736864] leading-relaxed">
            Every year, millions of fresh flower bouquets are bought with deep affection, only to droop and be discarded within days. We wondered: what if flowers could hold onto that same tender moment forever? What if every single petal carried the warmth of patient human hands?
          </p>

          <p className="text-sm text-[#736864] leading-relaxed">
            Today, our small artisan studio handcrafts delicate crochet roses, cheerful woolen daisies, and custom bouquets that never wilt, never drop leaves, and never trigger allergies.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => {
                setCategoryFilter('all');
                setCurrentPage('shop');
              }}
              className="px-6 py-3 bg-[#C86D7A] hover:bg-[#B55D6A] text-white rounded-full text-xs font-semibold transition-all shadow-sm flex items-center gap-2"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage('custom')}
              className="px-6 py-3 bg-white text-[#4A4240] hover:bg-[#FCECEE] border border-[#D9CECE] rounded-full text-xs font-semibold transition-all"
            >
              Design a Custom Order
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#F0EBE5]">
            <img
              src={ASSET_IMAGES.roseBouquet}
              alt="Artisan handcrafting crochet flowers"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>

      {/* Crafting Process */}
      <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#EDE7E1] shadow-2xs space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#A66E78]">
            Petal by Petal
          </span>
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-[#2E2927]">
            How We Make Every Bloom
          </h2>
          <p className="text-xs text-[#7F7470]">
            No automated machinery. Just fine crochet hooks, pure milk cotton, and hours of mindful stitching.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#EDE7E1] space-y-3">
            <span className="font-display font-bold text-2xl text-[#C86D7A]">01.</span>
            <h3 className="font-display font-medium text-lg text-[#2E2927]">
              Combed Cotton Yarn
            </h3>
            <p className="text-xs text-[#6B615E] leading-relaxed">
              We select high-grade 5-ply combed milk cotton that is velvety to touch, lint-free, and resistant to pilling over time.
            </p>
          </div>

          <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#EDE7E1] space-y-3">
            <span className="font-display font-bold text-2xl text-[#C86D7A]">02.</span>
            <h3 className="font-display font-medium text-lg text-[#2E2927]">
              Needle-Hook Artistry
            </h3>
            <p className="text-xs text-[#6B615E] leading-relaxed">
              Each petal is individually crocheted to mimic the organic curvature, gentle ruffles, and dimension of real botanical blooms.
            </p>
          </div>

          <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#EDE7E1] space-y-3">
            <span className="font-display font-bold text-2xl text-[#C86D7A]">03.</span>
            <h3 className="font-display font-medium text-lg text-[#2E2927]">
              Wired Stem Assembly
            </h3>
            <p className="text-xs text-[#6B615E] leading-relaxed">
              Flexible florist wire is enveloped in tight yarn wraps, allowing you to bend, shape, or arrange stems freely in any vase.
            </p>
          </div>

          <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#EDE7E1] space-y-3">
            <span className="font-display font-bold text-2xl text-[#C86D7A]">04.</span>
            <h3 className="font-display font-medium text-lg text-[#2E2927]">
              Heirloom Packaging
            </h3>
            <p className="text-xs text-[#6B615E] leading-relaxed">
              Wrapped in eco-friendly textured papers, satin ribbons, and a personal gift card ready to touch hearts upon opening.
            </p>
          </div>

        </div>
      </section>

      {/* Sustainable Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-6 bg-[#FAF5F0] rounded-2xl border border-[#EDE4DC] space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#C86D7A] shadow-2xs">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-display font-medium text-lg text-[#2E2927]">Gifts With Sentiment</h3>
          <p className="text-xs text-[#6B615E] leading-relaxed">
            People remember the exact day they received a Wool &amp; Bloom piece because it stays sitting on their desk or nightstand year after year.
          </p>
        </div>

        <div className="p-6 bg-[#FAF5F0] rounded-2xl border border-[#EDE4DC] space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#8A9A86] shadow-2xs">
            <Feather className="w-5 h-5" />
          </div>
          <h3 className="font-display font-medium text-lg text-[#2E2927]">Zero Waste Philosophy</h3>
          <p className="text-xs text-[#6B615E] leading-relaxed">
            Unlike commercial cut-flower industries that discard millions of tons of biological waste, our thread scraps are repurposed into toy stuffing.
          </p>
        </div>

        <div className="p-6 bg-[#FAF5F0] rounded-2xl border border-[#EDE4DC] space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#523E3A] shadow-2xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-display font-medium text-lg text-[#2E2927]">Handmade Integrity</h3>
          <p className="text-xs text-[#6B615E] leading-relaxed">
            We never drop-ship or import cheap plastic impostors. Every order is inspected and finished with human touch.
          </p>
        </div>

      </div>

    </div>
  );
};
