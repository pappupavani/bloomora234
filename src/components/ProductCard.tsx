import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG } from '../data/products';
import { ShoppingBag, Eye, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setActiveModalProduct } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor, 1, '', false);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor, 1, '', true);
  };

  return (
    <div
      onClick={() => setActiveModalProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-[#FFFFFF] rounded-2xl border border-[#EDE7E1] overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#DCCFC6] hover:-translate-y-1 cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative w-full aspect-[4/3] bg-[#F7F4F0] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Quiet status marker (if limited/bestseller) */}
        {product.bestseller && (
          <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs text-[#823846] text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-xs border border-[#F2D7D9]">
            Bestseller
          </div>
        )}

        {/* Quick View Overlay Button */}
        <div
          className={`absolute inset-0 bg-[#2E2927]/15 backdrop-blur-[1px] flex items-center justify-center transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/95 text-[#2E2927] rounded-full text-xs font-semibold shadow-md transform transition-transform group-hover:scale-100 scale-95 hover:bg-white">
            <Eye className="w-3.5 h-3.5 text-[#C86D7A]" />
            Quick View
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5">
        
        {/* Unboxed Metadata (Zero-Pill Rule) */}
        <div className="flex items-center justify-between text-xs text-[#7F7470] mb-1.5">
          <span className="font-medium tracking-wide uppercase text-[11px] text-[#A66E78]">
            {product.categoryLabel}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-[#F2B33D] text-[#F2B33D]" />
            <span className="font-semibold text-[#3D3533]">{product.rating.toFixed(1)}</span>
            <span className="text-[#9E9490]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="font-display font-medium text-lg text-[#2E2927] group-hover:text-[#C86D7A] transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Short description */}
        <p className="text-xs text-[#6B615E] mt-1 line-clamp-2 leading-relaxed flex-1">
          {product.shortDescription}
        </p>

        {/* Color Swatches */}
        <div className="mt-3 pt-3 border-t border-[#F2ECE6] flex items-center justify-between">
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.colors.slice(0, 4).map((col) => (
              <button
                key={col.name}
                type="button"
                onClick={() => setSelectedColor(col.name)}
                title={col.name}
                aria-label={`Select ${col.name}`}
                className={`w-5 h-5 rounded-full border transition-all flex items-center justify-center ${
                  selectedColor === col.name
                    ? 'ring-2 ring-[#C86D7A] ring-offset-1 scale-110 border-white'
                    : 'border-black/10 hover:scale-105'
                }`}
                style={{ backgroundColor: col.hex }}
              >
                {selectedColor === col.name && (
                  <Check className="w-2.5 h-2.5 text-white drop-shadow-xs" />
                )}
              </button>
            ))}
          </div>
          <span className="text-[11px] text-[#8C807C] italic truncate max-w-[120px]">
            {selectedColor}
          </span>
        </div>

        {/* Pricing */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display font-bold text-xl text-[#2E2927] tabular-nums">
            {SITE_CONFIG.currency}{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#9E9490] line-through tabular-nums">
              {SITE_CONFIG.currency}{product.originalPrice}
            </span>
          )}
        </div>

        {/* Action Buttons: Add to Cart and Buy Now */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#D9CECE] text-[#523E3A] bg-[#FAF8F5] hover:bg-[#F5ECE8] hover:border-[#C86D7A] text-xs font-semibold transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#C86D7A]" />
            <span>Add to Cart</span>
          </button>

          <button
            type="button"
            onClick={handleBuyNow}
            className="flex items-center justify-center py-2.5 px-3 rounded-xl bg-[#C86D7A] hover:bg-[#B55D6A] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <span>Buy Now</span>
          </button>
        </div>

      </div>
    </div>
  );
};
