import React from 'react';
import { useCart } from '../context/CartContext';
import { Sparkles, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toasts } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-24 right-4 sm:right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 bg-[#2E2927] text-white rounded-xl shadow-xl border border-white/10 text-xs font-medium max-w-sm animate-slideUp"
        >
          {toast.type === 'info' ? (
            <Info className="w-4 h-4 text-[#F2C4CE] shrink-0" />
          ) : (
            <Sparkles className="w-4 h-4 text-[#F2B33D] shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
