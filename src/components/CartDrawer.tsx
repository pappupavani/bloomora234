import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG } from '../data/products';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  MessageCircle, 
  CreditCard, 
  CheckCircle2, 
  Truck, 
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    items, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    subtotal, 
    discount, 
    shipping, 
    total,
    promoCode,
    promoApplied,
    applyPromoCode,
    removePromoCode,
    generateWhatsAppOrderUrl,
    showToast
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  
  // Delivery form state
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
    paymentMethod: 'Credit / Debit Card',
  });

  const [orderId, setOrderId] = useState('');

  if (!isCartOpen) return null;

  const freeShippingLeft = Math.max(0, 50 - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / 50) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const success = applyPromoCode(couponInput);
    if (success) {
      setCouponInput('');
    }
  };

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    const url = generateWhatsAppOrderUrl(customerInfo.name ? customerInfo : undefined);
    window.open(url, '_blank');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      showToast('Please fill in your name, phone, and delivery address', 'info');
      return;
    }
    const newOrderId = `WB-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newOrderId);
    setCheckoutStep('success');
    clearCart();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-fadeIn"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#EDE7E1] animate-slideLeft"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#EDE7E1] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C86D7A]" />
            <h2 className="font-display font-medium text-xl text-[#2E2927]">
              {checkoutStep === 'cart' && 'Your Shopping Bag'}
              {checkoutStep === 'checkout' && 'Delivery & Payment'}
              {checkoutStep === 'success' && 'Order Confirmed!'}
            </h2>
          </div>
          <button
            onClick={() => {
              setIsCartOpen(false);
              if (checkoutStep === 'success') setCheckoutStep('cart');
            }}
            className="p-1.5 rounded-full text-[#736864] hover:bg-[#F2ECE6] hover:text-[#2E2927] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Tracker */}
        {checkoutStep === 'cart' && (
          <div className="bg-[#FAF3EE] px-5 py-3 border-b border-[#EFE5DC] text-xs">
            {freeShippingLeft > 0 ? (
              <div>
                <p className="text-[#695D59] font-medium flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#C86D7A]" />
                  <span>
                    Add <strong className="text-[#C86D7A]">{SITE_CONFIG.currency}{freeShippingLeft.toFixed(2)}</strong> more for <strong>FREE Delivery</strong>!
                  </span>
                </p>
                <div className="w-full bg-[#E5D7CE] h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-[#C86D7A] h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-[#4E6E4C] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#8A9A86]" />
                <span>You unlocked <strong>FREE Delivery!</strong> 🎉</span>
              </p>
            )}
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5">
          {checkoutStep === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 text-[#7F7470]">
                  <div className="w-20 h-20 rounded-full bg-[#F5ECE8] flex items-center justify-center text-[#C86D7A] mb-4">
                    <ShoppingBag className="w-8 h-8 opacity-60" />
                  </div>
                  <h3 className="font-display font-medium text-xl text-[#2E2927]">
                    Your bag is empty
                  </h3>
                  <p className="text-xs text-[#7F7470] mt-1 max-w-xs">
                    Explore our handmade floral bouquets, woolen desk pots, and cute charms!
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 px-6 py-2.5 bg-[#C86D7A] text-white rounded-full text-xs font-semibold hover:bg-[#B55D6A] transition-colors"
                  >
                    Discover Collection
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3.5 p-3.5 bg-white rounded-2xl border border-[#EDE7E1] shadow-2xs"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-xl object-cover bg-[#F7F4F0] shrink-0"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-medium text-[#2E2927] truncate">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[#A89E9A] hover:text-[#C86D7A] p-0.5 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-[11px] text-[#8C807C] mt-0.5">
                            Color: <span className="text-[#3D3533] font-medium">{item.selectedColor}</span>
                          </p>
                          {item.customNote && (
                            <p className="text-[10px] text-[#A66E78] italic mt-1 line-clamp-1">
                              Note: {item.customNote}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F7F4F0]">
                          {/* Quantity control */}
                          <div className="flex items-center border border-[#E0D7D0] rounded-lg bg-[#FAF8F5]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-xs text-[#523E3A] hover:bg-[#F0E6DE]"
                            >
                              -
                            </button>
                            <span className="w-7 text-center text-xs font-semibold tabular-nums text-[#2E2927]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-xs text-[#523E3A] hover:bg-[#F0E6DE]"
                            >
                              +
                            </button>
                          </div>

                          {/* Item price */}
                          <span className="font-semibold text-sm text-[#2E2927] tabular-nums">
                            {SITE_CONFIG.currency}{(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Promo code entry */}
                  <div className="mt-4 pt-4 border-t border-[#EDE7E1]">
                    {promoApplied ? (
                      <div className="flex items-center justify-between p-2.5 bg-[#FCECEE] rounded-xl text-xs text-[#823846]">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Tag className="w-3.5 h-3.5 text-[#C86D7A]" />
                          Coupon &apos;{promoCode}&apos; Applied (-10%)
                        </span>
                        <button
                          type="button"
                          onClick={removePromoCode}
                          className="text-[11px] underline hover:text-[#522931]"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Coupon (try BLOOM10)"
                          className="flex-1 text-xs px-3 py-2 bg-white rounded-xl border border-[#D9CECE] text-[#2E2927] placeholder:text-[#A89E9A] focus:outline-hidden focus:border-[#C86D7A]"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#F2ECE6] hover:bg-[#E5DCD4] text-[#4A4240] rounded-xl text-xs font-medium transition-colors"
                        >
                          Apply
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {checkoutStep === 'checkout' && (
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="text-xs text-[#736864] pb-2 border-b border-[#EDE7E1]">
                Please enter your shipping address to calculate safe packaging &amp; courier delivery.
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3D3533] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  placeholder="e.g. Maya Lin"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#D9CECE] bg-white focus:outline-hidden focus:border-[#C86D7A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#3D3533] mb-1">
                    WhatsApp / Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    placeholder="+1 555 0192"
                    className="w-full text-xs p-2.5 rounded-xl border border-[#D9CECE] bg-white focus:outline-hidden focus:border-[#C86D7A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3D3533] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full text-xs p-2.5 rounded-xl border border-[#D9CECE] bg-white focus:outline-hidden focus:border-[#C86D7A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3D3533] mb-1">
                  Street Delivery Address *
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  placeholder="Apartment, studio, or street number"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#D9CECE] bg-white focus:outline-hidden focus:border-[#C86D7A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#3D3533] mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.city}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                    placeholder="New York"
                    className="w-full text-xs p-2.5 rounded-xl border border-[#D9CECE] bg-white focus:outline-hidden focus:border-[#C86D7A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3D3533] mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={customerInfo.postalCode}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, postalCode: e.target.value })}
                    placeholder="10001"
                    className="w-full text-xs p-2.5 rounded-xl border border-[#D9CECE] bg-white focus:outline-hidden focus:border-[#C86D7A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3D3533] mb-1">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['Credit / Debit Card', 'Cash on Delivery (COD)', 'Instant WhatsApp Confirmation'].map((method) => (
                    <label
                      key={method}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        customerInfo.paymentMethod === method
                          ? 'border-[#C86D7A] bg-[#FCECEE] text-[#823846] font-medium'
                          : 'border-[#EDE7E1] bg-white text-[#523E3A]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={customerInfo.paymentMethod === method}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, paymentMethod: e.target.value })}
                        className="text-[#C86D7A] focus:ring-[#C86D7A]"
                      />
                      <span className="truncate">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3D3533] mb-1">
                  Delivery Notes / Delivery Date Request
                </label>
                <textarea
                  rows={2}
                  value={customerInfo.notes}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                  placeholder="e.g. Leave at front door, or deliver before Friday for anniversary"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#D9CECE] bg-white resize-none focus:outline-hidden focus:border-[#C86D7A]"
                />
              </div>
            </form>
          )}

          {checkoutStep === 'success' && (
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#EEF5ED] text-[#5C8A55] flex items-center justify-center mb-4">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="font-display font-medium text-2xl text-[#2E2927]">
                Thank you for your order!
              </h3>
              <p className="text-xs text-[#6B615E] mt-2 max-w-xs">
                Your order <strong className="text-[#2E2927]">{orderId}</strong> has been received with warm gratitude.
              </p>
              
              <div className="w-full my-6 p-4 bg-white rounded-2xl border border-[#EDE7E1] text-left text-xs space-y-2">
                <div className="flex justify-between text-[#7F7470]">
                  <span>Status:</span>
                  <span className="font-semibold text-[#8A9A86]">Crafting in Progress 🧶</span>
                </div>
                <div className="flex justify-between text-[#7F7470]">
                  <span>Recipient:</span>
                  <span className="text-[#2E2927] font-medium">{customerInfo.name || 'Valued Customer'}</span>
                </div>
                <div className="flex justify-between text-[#7F7470]">
                  <span>Delivery Address:</span>
                  <span className="text-[#2E2927] text-right truncate max-w-[200px]">{customerInfo.address}, {customerInfo.city}</span>
                </div>
                <div className="flex justify-between text-[#7F7470] pt-2 border-t border-[#F2ECE6]">
                  <span>Payment Method:</span>
                  <span className="text-[#2E2927] font-medium">{customerInfo.paymentMethod}</span>
                </div>
              </div>

              <div className="space-y-3 w-full">
                <button
                  onClick={() => {
                    const message = encodeURIComponent(
                      `Hello! I just placed order ${orderId} on Wool & Bloom for ${customerInfo.name}. Looking forward to receiving these beautiful flowers! 🌸`
                    );
                    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`, '_blank');
                  }}
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Order Confirmation to WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCheckoutStep('cart');
                  }}
                  className="w-full py-3 bg-[#FAF8F5] border border-[#D9CECE] text-[#523E3A] hover:bg-[#F2ECE6] rounded-xl text-xs font-semibold transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {checkoutStep !== 'success' && items.length > 0 && (
          <div className="p-5 bg-white border-t border-[#EDE7E1] space-y-3">
            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-[#6B615E]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#2E2927] tabular-nums">
                  {SITE_CONFIG.currency}{subtotal.toFixed(2)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#C86D7A]">
                  <span>Discount ({promoCode})</span>
                  <span className="font-medium tabular-nums">
                    -{SITE_CONFIG.currency}{discount.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium text-[#2E2927] tabular-nums">
                  {shipping === 0 ? 'FREE' : `${SITE_CONFIG.currency}${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#2E2927] pt-2 border-t border-[#F2ECE6]">
                <span>Total</span>
                <span className="font-display font-bold text-lg text-[#2E2927] tabular-nums">
                  {SITE_CONFIG.currency}{total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Step: Cart -> Proceed to Checkout */}
            {checkoutStep === 'cart' && (
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full py-3.5 bg-[#C86D7A] hover:bg-[#B55D6A] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <span>Proceed to Delivery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Direct WhatsApp Ordering */}
                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-2.5 bg-[#EEF7F0] hover:bg-[#DFEFE2] text-[#227238] border border-[#C5E4CC] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Order Directly via WhatsApp</span>
                </button>
              </div>
            )}

            {/* Step: Checkout -> Place Order */}
            {checkoutStep === 'checkout' && (
              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full py-3.5 bg-[#C86D7A] hover:bg-[#B55D6A] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Confirm &amp; Place Order ({SITE_CONFIG.currency}{total.toFixed(2)})</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="py-2.5 bg-[#FAF8F5] border border-[#D9CECE] text-[#523E3A] hover:bg-[#F2ECE6] rounded-xl text-xs font-medium transition-colors"
                  >
                    Back to Bag
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppCheckout}
                    className="py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>WhatsApp Pay</span>
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#8C807C] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8A9A86]" />
              <span>Safe packaging • 100% Satisfaction Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
