import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { SITE_CONFIG } from '../data/products';

interface ToastState {
  id: number;
  message: string;
  type?: 'success' | 'info';
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, color?: string, quantity?: number, customNote?: string, openDrawer?: boolean) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  promoCode: string;
  promoApplied: boolean;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  activeModalProduct: Product | null;
  setActiveModalProduct: (product: Product | null) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  openChatWithPrompt: (prompt?: string) => void;
  pendingChatPrompt: string | null;
  setPendingChatPrompt: (prompt: string | null) => void;
  toasts: ToastState[];
  showToast: (message: string, type?: 'success' | 'info') => void;
  generateWhatsAppOrderUrl: (customerDetails?: {
    name: string;
    phone: string;
    address: string;
    city: string;
    notes?: string;
    paymentMethod: string;
  }) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('woolandbloom_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [pendingChatPrompt, setPendingChatPrompt] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const openChatWithPrompt = (prompt?: string) => {
    if (prompt) {
      setPendingChatPrompt(prompt);
    }
    setIsChatOpen(true);
  };

  useEffect(() => {
    try {
      localStorage.setItem('woolandbloom_cart', JSON.stringify(items));
    } catch {
      // storage error fallback
    }
  }, [items]);

  // Window scroll to top when changing page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const addToCart = (
    product: Product,
    color?: string,
    quantity: number = 1,
    customNote: string = '',
    openDrawer: boolean = false
  ) => {
    const chosenColor = color || (product.colors[0]?.name ?? 'Default');
    const existingIndex = items.findIndex(
      (item) => item.productId === product.id && item.selectedColor === chosenColor && item.customNote === customNote
    );

    if (existingIndex > -1) {
      setItems((prev) =>
        prev.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${chosenColor}-${Date.now()}`,
        productId: product.id,
        product,
        selectedColor: chosenColor,
        quantity,
        customNote,
      };
      setItems((prev) => [...prev, newItem]);
    }

    showToast(`Added "${product.name}" to your cart! 🌸`);

    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    showToast("Item removed from cart", "info");
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'BLOOM10' || clean === 'HANDMADE10' || clean === 'LOVE10') {
      setPromoCode(clean);
      setPromoApplied(true);
      showToast("10% discount applied to your order! 🎁");
      return true;
    } else {
      showToast("Invalid coupon code. Try 'BLOOM10'", "info");
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setPromoApplied(false);
  };

  const discount = promoApplied ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 4.95;
  const total = Math.max(0, subtotal - discount + shipping);

  const generateWhatsAppOrderUrl = (customerDetails?: {
    name: string;
    phone: string;
    address: string;
    city: string;
    notes?: string;
    paymentMethod: string;
  }) => {
    let message = `*🌸 New Order via ${SITE_CONFIG.name}*\n\n`;
    message += `Hello! I would like to place an order for the following handmade crochet items:\n\n`;

    items.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}*\n`;
      message += `   - Shade/Color: ${item.selectedColor}\n`;
      message += `   - Quantity: ${item.quantity}\n`;
      message += `   - Price: ${SITE_CONFIG.currency}${(item.product.price * item.quantity).toFixed(2)}\n`;
      if (item.customNote) {
        message += `   - Note: "${item.customNote}"\n`;
      }
      message += `\n`;
    });

    message += `*Summary:*\n`;
    message += `Subtotal: ${SITE_CONFIG.currency}${subtotal.toFixed(2)}\n`;
    if (discount > 0) {
      message += `Discount (${promoCode}): -${SITE_CONFIG.currency}${discount.toFixed(2)}\n`;
    }
    message += `Shipping: ${shipping === 0 ? 'FREE' : `${SITE_CONFIG.currency}${shipping.toFixed(2)}`}\n`;
    message += `*Total Amount: ${SITE_CONFIG.currency}${total.toFixed(2)}*\n\n`;

    if (customerDetails && customerDetails.name) {
      message += `*Delivery Details:*\n`;
      message += `👤 Name: ${customerDetails.name}\n`;
      message += `📞 Phone: ${customerDetails.phone}\n`;
      message += `📍 Address: ${customerDetails.address}, ${customerDetails.city}\n`;
      if (customerDetails.paymentMethod) {
        message += `💳 Preferred Payment: ${customerDetails.paymentMethod}\n`;
      }
      if (customerDetails.notes) {
        message += `✉️ Special Note: ${customerDetails.notes}\n`;
      }
      message += `\n`;
    }

    message += `Thank you! Please let me know how to proceed with payment and order confirmation. ✨`;

    const encoded = encodeURIComponent(message);
    return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encoded}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        discount,
        shipping,
        total,
        promoCode,
        promoApplied,
        applyPromoCode,
        removePromoCode,
        isCartOpen,
        setIsCartOpen,
        activeModalProduct,
        setActiveModalProduct,
        currentPage,
        setCurrentPage,
        categoryFilter,
        setCategoryFilter,
        isChatOpen,
        setIsChatOpen,
        openChatWithPrompt,
        pendingChatPrompt,
        setPendingChatPrompt,
        toasts,
        showToast,
        generateWhatsAppOrderUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
