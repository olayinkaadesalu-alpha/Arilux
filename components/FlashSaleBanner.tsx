
import React, { useState, useEffect } from 'react';
import { FlashSale, Product } from '../types';

interface Props {
  sale: FlashSale;
  product?: Product;
  onOrder: () => void;
}

export const FlashSaleBanner: React.FC<Props> = ({ sale, product, onOrder }) => {
  const [timeLeft, setTimeLeft] = useState<{h: number, m: number, s: number}>({h: 0, m: 0, s: 0});

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date(sale.endTime).getTime() - Date.now();
      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({h: 0, m: 0, s: 0});
        return;
      }
      setTimeLeft({
        h: Math.floor(diff / (1000 * 60 * 60)),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [sale.endTime]);

  if (!sale.active || !product) return null;

  return (
    <div className="bg-black text-white py-3 md:py-4 px-6 border-b border-white/10 z-[70] overflow-hidden">
      <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-8">
        {/* Title Section */}
        <div className="flex flex-col lg:items-start text-center lg:text-left space-y-0.5">
          <p className="serif italic text-[#C6A48E] text-[10px] tracking-[0.2em] leading-tight">Atelier Private Reserve</p>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] leading-tight text-white/90">Flash Sale: {product.name}</h3>
        </div>

        {/* Info & Timer Section */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {/* Prices */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-[7px] uppercase tracking-widest text-white/30 block mb-0.5">Was</span>
              <span className="line-through text-[11px] text-white/30 font-bold">₦{sale.originalPrice.toLocaleString()}</span>
            </div>
            <div className="text-left">
              <span className="text-[7px] uppercase tracking-widest text-[#C6A48E] block mb-0.5">Offer</span>
              <span className="text-lg md:text-xl font-black text-[#C6A48E]">₦{sale.discountedPrice.toLocaleString()}</span>
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-1.5 font-mono">
            <div className="flex flex-col items-center">
              <div className="bg-[#121212] min-w-[36px] py-1.5 text-[11px] font-black border border-white/5 rounded-sm">{String(timeLeft.h).padStart(2, '0')}</div>
            </div>
            <span className="text-[#C6A48E] text-[10px] font-black opacity-50">:</span>
            <div className="flex flex-col items-center">
              <div className="bg-[#121212] min-w-[36px] py-1.5 text-[11px] font-black border border-white/5 rounded-sm">{String(timeLeft.m).padStart(2, '0')}</div>
            </div>
            <span className="text-[#C6A48E] text-[10px] font-black opacity-50">:</span>
            <div className="flex flex-col items-center">
              <div className="bg-[#121212] min-w-[36px] py-1.5 text-[11px] font-black border border-white/5 rounded-sm">{String(timeLeft.s).padStart(2, '0')}</div>
            </div>
          </div>

          {/* CTA */}
          <button 
            onClick={onOrder}
            className="bg-white text-black px-8 py-2.5 text-[9px] font-black uppercase tracking-[0.4em] hover:bg-[#C6A48E] hover:text-white transition-all duration-300 shadow-lg"
          >
            Claim Offer
          </button>
        </div>
      </div>
    </div>
  );
};
