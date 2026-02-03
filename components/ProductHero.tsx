
import React, { useState, useEffect } from 'react';
import { Product, PriceOption } from '../types';

interface Props {
  product: Product;
  onOrder: (product: Product, option: PriceOption) => void;
  reverse?: boolean;
}

export const ProductHero: React.FC<Props> = ({ product, onOrder, reverse = false }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState('');

  useEffect(() => {
    if (product.priceOptions.length > 0) {
      setSelectedOptionId(product.priceOptions[0].id);
    }
  }, [product.priceOptions]);

  const selectedOption = product.priceOptions.find(o => o.id === selectedOptionId) || product.priceOptions[0];

  const renderDescription = (text: string) => {
    const parts = text.split(/(\*\*Oil-based Version\*\*)/g);
    return parts.map((part, i) => 
      part === '**Oil-based Version**' ? (
        <span key={i} className="font-bold text-black underline underline-offset-4 decoration-black/30">Oil-based Version</span>
      ) : part
    );
  };

  if (!selectedOption) return null;

  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} min-h-screen md:min-h-[85vh] bg-white border-b border-black/5`}>
      {/* Product Image Section */}
      <div className="w-full md:w-1/2 h-[60vh] md:h-auto relative overflow-hidden bg-[#FDFCF9]">
        <div 
          className="w-full h-full flex transition-transform duration-1000 cubic-bezier(0.23, 1, 0.32, 1)"
          style={{ transform: `translateX(-${activeImage * 100}%)` }}
        >
          {product.images.map((img, i) => (
            <img key={i} src={img} alt={product.name} className="w-full h-full object-cover" />
          ))}
        </div>
        
        {product.images.length > 1 && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${i === activeImage ? 'bg-black scale-x-[4] opacity-100' : 'bg-black opacity-20'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Details Section */}
      <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center text-left space-y-12">
        <div className="space-y-6">
          <span className="text-[10px] tracking-[0.6em] uppercase font-black text-[#C6A48E]">Elite Formulation</span>
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-light text-black leading-[0.9] uppercase tracking-tighter">
            {product.name}
          </h2>
        </div>
        
        <p className="text-xl md:text-2xl leading-relaxed text-black/40 serif italic max-w-xl">
          {renderDescription(product.description)}
        </p>

        <div className="flex flex-wrap gap-x-20 gap-y-10 pt-8 border-t border-black/5">
          <div className="space-y-3">
            <h4 className="text-[9px] uppercase tracking-[0.5em] font-black text-black/30">Longevity</h4>
            <p className="italic serif text-2xl text-black">{product.longevity}</p>
          </div>
          <div className="space-y-3">
            <h4 className="text-[9px] uppercase tracking-[0.5em] font-black text-black/30">Profile</h4>
            <p className="italic serif text-2xl text-black">{product.scentProfile}</p>
          </div>
        </div>

        <div className="space-y-12 pt-10">
          <div className="flex flex-col sm:flex-row sm:items-end gap-12">
            <div className="flex-1 max-w-[200px]">
              <label className="text-[9px] uppercase tracking-[0.5em] font-black text-black/30 block mb-4">Vial Size</label>
              <div className="relative border-b border-black/10">
                <select 
                  value={selectedOptionId}
                  onChange={(e) => setSelectedOptionId(e.target.value)}
                  className="w-full bg-transparent py-4 text-[11px] font-black tracking-[0.3em] uppercase focus:outline-none appearance-none cursor-pointer rounded-none"
                >
                  {product.priceOptions.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.size}</option>
                  ))}
                </select>
                <svg className="w-3 h-3 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-10">
            <div className="text-5xl md:text-6xl font-light text-black tracking-tighter">₦{selectedOption.price.toLocaleString()}</div>
            <button 
              onClick={() => onOrder(product, selectedOption)}
              className="px-16 py-6 bg-black text-white hover:bg-[#C6A48E] transition-all duration-700 uppercase text-[10px] tracking-[0.6em] font-black shadow-2xl transform hover:-translate-y-1"
            >
              Acquire Scent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
