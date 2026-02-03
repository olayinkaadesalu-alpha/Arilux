
import React from 'react';
import { CartItem, Product } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateSize: (cartItemId: string, newSize: string) => void;
  products: Product[];
}

export const CartDrawer: React.FC<Props> = ({ isOpen, onClose, items, onRemove, onUpdateSize, products }) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 h-full w-full max-w-[90%] md:max-w-md bg-white z-[80] shadow-2xl transition-transform duration-700 cubic-bezier(0.23, 1, 0.32, 1) ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-8 md:p-12">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-2xl font-light uppercase tracking-widest text-black">Collection</h2>
            <button onClick={onClose} className="p-3 hover:bg-zinc-50 rounded-full transition-colors" aria-label="Close cart">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-10 pr-2 scrollbar-hide">
            {items.length === 0 ? (
              <div className="text-center py-24 opacity-30 italic serif text-xl text-black">
                Your gallery is empty.
              </div>
            ) : (
              items.map((item) => {
                const product = products.find(p => p.id === item.productId);
                return (
                  <div key={item.id} className="flex gap-6 items-start group relative">
                    <div className="w-24 h-32 bg-zinc-50 overflow-hidden flex-shrink-0 shadow-sm">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xs font-black tracking-widest uppercase text-black leading-tight pr-4">{item.name}</h3>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-[9px] text-red-400 font-bold uppercase tracking-widest opacity-0 md:group-hover:opacity-100 transition-opacity p-1"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Concentrated Oil</p>
                      
                      <div className="flex items-center gap-4 mt-6">
                        <div className="relative flex-1">
                          <select 
                            value={item.size}
                            onChange={(e) => onUpdateSize(item.id, e.target.value)}
                            className="w-full bg-zinc-50 border border-black/5 text-[10px] font-black uppercase tracking-widest px-3 py-2 focus:outline-none focus:border-black appearance-none pr-8 rounded-none transition-all cursor-pointer"
                          >
                            {product?.priceOptions.map(opt => (
                              <option key={opt.id} value={opt.size}>{opt.size}</option>
                            ))}
                          </select>
                          <svg className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                        <span className="text-sm font-bold text-black min-w-[80px] text-right">₦{item.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="mt-12 pt-10 border-t border-black/10 space-y-10">
            <div className="flex justify-between items-end">
              <span className="text-[10px] uppercase tracking-[0.5em] font-black text-black/30">Subtotal</span>
              <span className="text-4xl font-light text-black tracking-tighter">₦{total.toLocaleString()}</span>
            </div>
            <button 
              className="w-full py-6 bg-black text-white uppercase text-[11px] tracking-[0.6em] font-black hover:bg-[#C6A48E] transition-all duration-700 shadow-2xl disabled:opacity-20 transform hover:-translate-y-1"
              disabled={items.length === 0}
            >
              Finalize Order
            </button>
            <p className="text-[9px] text-center opacity-30 uppercase tracking-[0.4em] font-bold">
              Bottled in Lagos &middot; Shipped Nationwide
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
