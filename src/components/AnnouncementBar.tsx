import React, { useState } from 'react';
import { SITE_CONFIG } from '../data/products';
import { X, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-[#523E3A] text-[#FAF7F2] text-xs py-2 px-4 relative z-40 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 text-center font-medium tracking-wide flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#F2C4CE]" />
          <span>{SITE_CONFIG.announcement}</span>
          <span className="hidden md:inline text-[#D9C4BA]">| Code <strong className="text-white underline decoration-[#F2C4CE]">BLOOM10</strong> for 10% off</span>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-[#D9C4BA] hover:text-white p-0.5 transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
