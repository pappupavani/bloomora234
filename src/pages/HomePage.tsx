import React from 'react';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG, PRODUCTS, CUSTOMER_REVIEWS, INSTAGRAM_POSTS, ASSET_IMAGES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { 
  Heart, 
  Sparkles, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Feather, 
  Clock, 
  Instagram,
  Smile,
  Palette
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setCurrentPage, setCategoryFilter } = useCart();

  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 4);

  const goToShop = (category: string = 'all') => {
    setCategoryFilter(category);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToCustom = () => {
    setCurrentPage('custom');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-20 sm:space-y-24 pb-16">
      
      {/* 1. Large Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF5F0] via-[#FAF8F5] to-transparent pt-8 sm:pt-14 pb-12 lg:pb-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Copy (Left 7 Cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Quiet Kicker (Zero-Pill Rule) */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A66E78]">
                <Sparkles className="w-3.5 h-3.5 text-[#C86D7A]" />
                <span>The Original Handcrafted Floral Atelier</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl text-[#2E2927] leading-[1.12] tracking-tight text-balance">
                Handmade Flowers That <span className="italic text-[#C86D7A]">Last Forever</span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-[#615652] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {SITE_CONFIG.subheading}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => goToShop('all')}
                  className="w-full sm:w-auto px-8 py-4 bg-[#C86D7A] hover:bg-[#B55D6A] text-white rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={goToCustom}
                  className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-[#FCECEE] text-[#523E3A] hover:text-[#823846] border border-[#E0D5CF] rounded-full font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-2xs"
                >
                  <Palette className="w-4 h-4 text-[#C86D7A]" />
                  <span>Custom Order</span>
                </button>
              </div>

              {/* Micro Trust Indicators */}
              <div className="pt-6 border-t border-[#EDE7E1] grid grid-cols-3 gap-3 text-left">
                <div>
                  <p className="font-display font-bold text-xl sm:text-2xl text-[#2E2927] tabular-nums">100%</p>
                  <p className="text-xs text-[#7F7470] mt-0.5">Combed Milk Cotton</p>
                </div>
                <div>
                  <p className="font-display font-bold text-xl sm:text-2xl text-[#2E2927] tabular-nums">0%</p>
                  <p className="text-xs text-[#7F7470] mt-0.5">Water or Wilting</p>
                </div>
                <div>
                  <p className="font-display font-bold text-xl sm:text-2xl text-[#2E2927] tabular-nums">4.9★</p>
                  <p className="text-xs text-[#7F7470] mt-0.5">Over 500+ Happy Gifts</p>
                </div>
              </div>

            </div>

            {/* Hero Image Showcase (Right 5 Cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Decorative background glow */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#FCECEE] to-[#FAF2EB] rounded-3xl -rotate-2 transform scale-102 opacity-70 blur-xs" />

                {/* Primary Hero Image */}
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#F0EBE5]">
                  <img
                    src={ASSET_IMAGES.hero}
                    alt="Handmade crochet flowers bouquet"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle Floating Tag */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/60 shadow-lg flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-[#2E2927]">Everlasting Floral Art</p>
                      <p className="text-[11px] text-[#7F7470]">Hand-stitched petal by petal in our studio</p>
                    </div>
                    <span className="text-xs font-semibold text-[#C86D7A] bg-[#FCECEE] px-2.5 py-1 rounded-full">
                      Eternal Kept
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A66E78]">
              Curated Favourites
            </span>
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-[#2E2927] mt-1">
              Featured Blooms &amp; Keepsakes
            </h2>
            <p className="text-sm text-[#736864] mt-1.5 max-w-lg">
              Each piece is patiently hooked with premium woolen threads and packaged with care in artisanal paper.
            </p>
          </div>
          <button
            onClick={() => goToShop('all')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C86D7A] hover:text-[#9A3C4B] transition-colors self-start md:self-auto"
          >
            <span>View Full Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. “Why Choose Handmade?” Section */}
      <section className="bg-[#F8F4EE] py-18 sm:py-22 border-y border-[#EDE4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A66E78]">
              Artisan Craftsmanship
            </span>
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-[#2E2927] mt-1 text-balance">
              Why Choose Crochet Flowers?
            </h2>
            <p className="text-sm text-[#736864] mt-2">
              Fresh flowers wilt in a few days, but handmade woolen blossoms preserve the sweetness of your memories forever.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1 */}
            <div className="p-6 bg-white rounded-2xl border border-[#EDE7E1] shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#FCECEE] flex items-center justify-center text-[#C86D7A] mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-display font-medium text-lg text-[#2E2927]">
                Lasts a Lifetime
              </h3>
              <p className="text-xs text-[#6B615E] mt-2 leading-relaxed">
                Zero watering, zero falling petals, zero fading. Your anniversary or birthday bouquet stays gorgeous season after season.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-white rounded-2xl border border-[#EDE7E1] shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#EEF5ED] flex items-center justify-center text-[#5C8A55] mb-4">
                <Feather className="w-6 h-6" />
              </div>
              <h3 className="font-display font-medium text-lg text-[#2E2927]">
                100% Hypoallergenic
              </h3>
              <p className="text-xs text-[#6B615E] mt-2 leading-relaxed">
                Free of pollen, scents, and allergens. Perfect for hospital visits, pet-friendly apartments, and sensitive loved ones.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-white rounded-2xl border border-[#EDE7E1] shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#B57C48] mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-display font-medium text-lg text-[#2E2927]">
                Heartfelt Emotion
              </h3>
              <p className="text-xs text-[#6B615E] mt-2 leading-relaxed">
                Every stem reflects intentional human care. There is an unmistakable warmth when someone receives a gift made by hand.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 bg-white rounded-2xl border border-[#EDE7E1] shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#F1EBF7] flex items-center justify-center text-[#8765A8] mb-4">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="font-display font-medium text-lg text-[#2E2927]">
                Endless Customization
              </h3>
              <p className="text-xs text-[#6B615E] mt-2 leading-relaxed">
                Pick your recipient&apos;s favorite shades, flower species, and wrapping styles. We even include free calligraphy gift notes!
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Custom Bouquet Banner Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FCECEE] via-[#FAF3F0] to-[#EAE0D7] p-8 sm:p-12 border border-[#E8DCD4] shadow-sm">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A66E78]">
              Personalized Gifting
            </span>
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-[#2E2927] leading-tight text-balance">
              Design a Bespoke Bouquet Styled Exactly To Your Heart
            </h2>
            <p className="text-sm text-[#615652] leading-relaxed">
              Mix roses, sunny chamomile daisies, lavender sprigs, and tulips in your choice of pastels. 
              Our artisan will curate your arrangement and even write your personal letter in wax-sealed calligraphy.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={goToCustom}
                className="px-6 py-3 bg-[#C86D7A] hover:bg-[#B55D6A] text-white rounded-full text-xs font-semibold shadow-sm transition-all"
              >
                Launch Custom Bouquet Builder
              </button>
              <button
                onClick={() => goToShop('bouquets')}
                className="px-6 py-3 bg-white text-[#4A4240] hover:bg-[#FAF8F5] border border-[#D9CECE] rounded-full text-xs font-semibold transition-all"
              >
                Browse Ready-to-Ship Bouquets
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Customer Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#A66E78]">
            Customer Love
          </span>
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-[#2E2927] mt-1">
            Cherished By Givers &amp; Receivers
          </h2>
          <p className="text-xs text-[#7F7470] mt-2">
            Stories from people who chose everlasting flowers for their most precious milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CUSTOMER_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-6 bg-white rounded-2xl border border-[#EDE7E1] shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-[#F2B33D]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-[#8A9A86] bg-[#EEF2ED] px-2 py-0.5 rounded-md">
                    {review.occasion}
                  </span>
                </div>
                <p className="text-xs text-[#524946] leading-relaxed italic">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#F2ECE6] flex items-center justify-between text-xs text-[#7F7470]">
                <div>
                  <span className="font-semibold text-[#2E2927]">{review.author}</span>
                  <span className="text-[#9E9490]"> · {review.location}</span>
                </div>
                <span className="text-[11px] text-[#A66E78] font-medium truncate max-w-[140px]">
                  {review.productName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Instagram & Social Media Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C86D7A] mb-1">
            <Instagram className="w-4 h-4" />
            <span>{SITE_CONFIG.instagram}</span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-[#2E2927]">
            From Our Studio Desk
          </h2>
          <p className="text-xs text-[#7F7470] mt-1.5">
            Follow our daily stitching clips, new color palettes, and behind-the-scenes packaging.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#F7F4F0] border border-[#EDE7E1]"
            >
              <img
                src={post.image}
                alt={post.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#2E2827]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-4 text-center text-white">
                <Heart className="w-5 h-5 fill-white mb-2" />
                <p className="text-[11px] font-medium line-clamp-3">{post.title}</p>
                <span className="text-[10px] text-white/80 mt-1">{post.likes} likes</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#D9CECE] text-xs font-semibold text-[#4A4240] hover:bg-[#FCECEE] hover:border-[#C86D7A] hover:text-[#823846] transition-colors"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>Follow @woolandbloom.crafts</span>
          </a>
        </div>
      </section>

    </div>
  );
};
