import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG, PRODUCTS } from '../data/products';
import { Product } from '../types';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Sparkles, Check, Truck } from 'lucide-react';

export const ProductDetailsModal: React.FC = () => {
  const { activeModalProduct, setActiveModalProduct, addToCart, openChatWithPrompt } = useCart();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [customNote, setCustomNote] = useState<string>('');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  useEffect(() => {
    if (activeModalProduct) {
      setSelectedColor(activeModalProduct.colors[0]?.name || '');
      setQuantity(1);
      setCustomNote('');
      setSelectedImageIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModalProduct]);

  if (!activeModalProduct) return null;

  const product = activeModalProduct;

  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity, customNote, false);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, quantity, customNote, true);
    setActiveModalProduct(null);
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-fadeIn"
      onClick={() => setActiveModalProduct(null)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#EDE7E1] overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveModalProduct(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#523E3A] shadow-sm transition-all hover:scale-105"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            
            {/* Left: Gallery */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F0EBE5] border border-[#E8DFD8] shadow-inner">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-[#C86D7A] scale-105 shadow-sm'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Callouts */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#EDE7E1] text-xs text-[#6E6360]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8A9A86] shrink-0" />
                  <span>100% Hand-knitted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C86D7A] shrink-0" />
                  <span>Never Wilts or Fades</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#8A9A86] shrink-0" />
                  <span>Safe Protective Box</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#C86D7A] shrink-0" />
                  <span>Free Gift Card Option</span>
                </div>
              </div>
            </div>

            {/* Right: Contiguous Purchase Module */}
            <div className="flex flex-col">
              
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#7F7470]">
                <span className="font-semibold tracking-wider uppercase text-[11px] text-[#A66E78]">
                  {product.categoryLabel}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="flex text-[#F2B33D]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-[#2E2927]">{product.rating.toFixed(1)}</span>
                  <span className="text-[#8C807C]">({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Product Title */}
              <h1 className="font-display font-medium text-2xl sm:text-3xl text-[#2E2927] mt-1.5 leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-display font-bold text-2xl sm:text-3xl text-[#2E2927] tabular-nums">
                  {SITE_CONFIG.currency}{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#9E9490] line-through tabular-nums">
                    {SITE_CONFIG.currency}{product.originalPrice}
                  </span>
                )}
                <span className="text-xs font-medium text-[#8A9A86] bg-[#EEF2ED] px-2 py-0.5 rounded-md">
                  In Stock & Ready to Gift
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-[#5E5450] leading-relaxed">
                {product.fullDescription}
              </p>

              {/* Color Selection */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-[#3D3533] uppercase tracking-wider">
                    Select Color / Shade:
                  </span>
                  <span className="text-[#C86D7A] font-medium">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all ${
                        selectedColor === color.name
                          ? 'border-[#C86D7A] bg-[#FCECEE] text-[#823846] font-semibold ring-1 ring-[#C86D7A]'
                          : 'border-[#E0D7D0] bg-white text-[#524946] hover:border-[#C86D7A]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                      {selectedColor === color.name && (
                        <Check className="w-3 h-3 text-[#C86D7A]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#3D3533]">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#D9CECE] bg-white rounded-xl overflow-hidden shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center text-[#523E3A] hover:bg-[#F2ECE6] text-base transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-[#2E2927] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center text-[#523E3A] hover:bg-[#F2ECE6] text-base transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Customization Notes */}
              <div className="mt-5">
                <label
                  htmlFor="custom-note"
                  className="block text-xs font-semibold text-[#3D3533] uppercase tracking-wider mb-1.5"
                >
                  Customization &amp; Gift Card Note (Optional):
                </label>
                <textarea
                  id="custom-note"
                  rows={2}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="e.g. Please include a free handwritten note: 'Happy Birthday Sarah! With love, Mom' & wrap with lilac ribbon."
                  className="w-full text-xs p-3 rounded-xl border border-[#D9CECE] bg-white text-[#2E2927] placeholder:text-[#A89E9A] focus:outline-hidden focus:border-[#C86D7A] focus:ring-1 focus:ring-[#C86D7A] transition-all resize-none"
                />
              </div>

              {/* Purchase Action Buttons */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-[#C86D7A] text-[#823846] bg-[#FAF8F5] hover:bg-[#FCECEE] font-semibold text-sm transition-all shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C86D7A]" />
                  <span>Add to Cart</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex items-center justify-center py-3 px-4 rounded-xl bg-[#C86D7A] hover:bg-[#B55D6A] text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg"
                >
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Ask Concierge Quick Button */}
              <button
                type="button"
                onClick={() => {
                  setActiveModalProduct(null);
                  openChatWithPrompt(`Can you tell me more about "${product.name}"? What occasions is it best for?`);
                }}
                className="w-full mt-2.5 py-2 px-3 text-xs text-[#823846] bg-[#FCECEE] hover:bg-[#F8DDE1] rounded-xl flex items-center justify-center gap-1.5 font-medium transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C86D7A]" />
                <span>Ask AI Concierge about this bloom</span>
              </button>

              {/* Specifications Accordion / Details */}
              <div className="mt-6 pt-4 border-t border-[#EDE7E1] text-xs space-y-1.5 text-[#6B615E]">
                {product.dimensions && (
                  <div>
                    <strong className="text-[#3D3533]">Dimensions: </strong>
                    {product.dimensions}
                  </div>
                )}
                <div>
                  <strong className="text-[#3D3533]">Materials: </strong>
                  {product.material}
                </div>
                <div>
                  <strong className="text-[#3D3533]">Care: </strong>
                  Dust gently with a soft dry brush. Keep away from excessive moisture.
                </div>
              </div>

            </div>
          </div>

          {/* Related Products Row */}
          <div className="mt-10 pt-8 border-t border-[#EDE7E1]">
            <h3 className="font-display font-medium text-xl text-[#2E2927] mb-4">
              You Might Also Adore
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    setActiveModalProduct(rel);
                  }}
                  className="group flex items-center gap-3 p-3 bg-white rounded-xl border border-[#EDE7E1] hover:border-[#C86D7A] transition-all cursor-pointer"
                >
                  <img
                    src={rel.images[0]}
                    alt={rel.name}
                    className="w-16 h-16 rounded-lg object-cover bg-[#F7F4F0] shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-[#2E2927] group-hover:text-[#C86D7A] transition-colors truncate">
                      {rel.name}
                    </p>
                    <p className="text-xs text-[#8A9A86] mt-0.5">{rel.categoryLabel}</p>
                    <p className="text-xs font-bold text-[#2E2927] mt-1 tabular-nums">
                      {SITE_CONFIG.currency}{rel.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
