
import React, { useState, useRef } from 'react';
import { Product, SiteSettings, FlashSale, PriceOption, GalleryItem } from '../types';

interface Props {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  flashSales: FlashSale[];
  setFlashSales: React.Dispatch<React.SetStateAction<FlashSale[]>>;
  onClose: () => void;
}

export const AdminDashboard: React.FC<Props> = ({ 
  products, setProducts, settings, setSettings, flashSales, setFlashSales, onClose 
}) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [galleryCategory, setGalleryCategory] = useState<'perfume' | 'makeup'>('perfume');

  const toggleSection = (key: keyof SiteSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleUpdateProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    if (products.find(p => p.id === editingProduct.id)) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
    } else {
      setProducts(prev => [...prev, editingProduct]);
    }
    setEditingProduct(null);
  };

  const createNewProduct = () => {
    const newProd: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'New Signature Scent',
      description: 'A new addition featuring the **Oil-based Version** of luxury...',
      scentProfile: 'Floral, Woody',
      longevity: '8+ Hours',
      images: ['https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1200'],
      isSpecial: false,
      priceOptions: [{ id: Date.now().toString(), size: '5ml', price: 15000 }],
      notes: { top: '', heart: '', base: '' }
    };
    setEditingProduct(newProd);
  };

  const deleteProduct = (id: string) => {
    if (window.confirm("Are you sure you want to remove this scent from the collection?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const addPriceOption = () => {
    if (!editingProduct) return;
    const newOption: PriceOption = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 4),
      size: 'New Size',
      price: 0
    };
    setEditingProduct({
      ...editingProduct,
      priceOptions: [...editingProduct.priceOptions, newOption]
    });
  };

  const removePriceOption = (optionId: string) => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      priceOptions: editingProduct.priceOptions.filter(o => o.id !== optionId)
    });
  };

  const updatePriceOption = (optionId: string, field: 'size' | 'price', value: string | number) => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      priceOptions: editingProduct.priceOptions.map(o => o.id === optionId ? { ...o, [field]: value } : o)
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProduct) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setEditingProduct({
          ...editingProduct,
          images: [base64String, ...editingProduct.images]
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      images: editingProduct.images.filter((_, i) => i !== index)
    });
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVideo = file.type.startsWith('video/');
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const newItem: GalleryItem = {
          id: Math.random().toString(36).substr(2, 9),
          url: base64String,
          type: isVideo ? 'video' : 'image',
          category: galleryCategory
        };
        setSettings(prev => ({
          ...prev,
          galleryItems: [newItem, ...prev.galleryItems]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeGalleryItem = (id: string) => {
    setSettings(prev => ({
      ...prev,
      galleryItems: prev.galleryItems.filter(item => item.id !== id)
    }));
  };

  const addFlashSale = () => {
    const newSale: FlashSale = {
      id: Math.random().toString(36).substr(2, 9),
      active: true,
      productId: products[0]?.id || '',
      originalPrice: 20000,
      discountedPrice: 15000,
      endTime: new Date(Date.now() + 86400000).toISOString()
    };
    setFlashSales([...flashSales, newSale]);
  };

  const removeFlashSale = (id: string) => {
    setFlashSales(flashSales.filter(s => s.id !== id));
  };

  const updateFlashSale = (id: string, updates: Partial<FlashSale>) => {
    setFlashSales(flashSales.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#FAF9F6] overflow-y-auto p-4 md:p-12 font-['Montserrat']">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10 md:mb-16 border-b-2 md:border-b-4 border-black pb-6 md:pb-8">
          <div className="flex items-center gap-4 md:gap-6">
             <div className="w-12 h-12 md:w-16 md:h-16 bg-black text-white flex items-center justify-center font-serif text-2xl md:text-4xl italic">M</div>
             <div>
               <h1 className="text-xl md:text-4xl font-black uppercase tracking-[0.1em] text-black text-left">Control</h1>
               <p className="text-[8px] md:text-[11px] font-bold text-[#C6A48E] uppercase tracking-[0.3em] md:tracking-[0.5em] mt-0.5 text-left">Atelier Management</p>
             </div>
          </div>
          <button onClick={onClose} className="p-3 md:p-4 bg-black text-white rounded-full hover:scale-110 transition-transform shadow-xl">
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Settings Sidebar */}
          <div className="space-y-8 md:space-y-12">
            <div>
              <h2 className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black mb-6 md:mb-8 border-l-4 border-black pl-4 text-black text-left">Sections</h2>
              <div className="space-y-2 md:space-y-3">
                {(['showFlashSale', 'showSpecialProducts', 'showGallery', 'showBooking'] as const).map(key => (
                  <label key={key} className="flex items-center justify-between p-4 bg-white border border-black/5 cursor-pointer shadow-sm">
                    <span className="capitalize text-[10px] tracking-[0.2em] font-black text-black">{key.replace('show', '')}</span>
                    <input 
                      type="checkbox" 
                      checked={settings[key] as boolean} 
                      onChange={() => toggleSection(key)}
                      className="w-4 h-4 accent-black"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Flash Sales Section */}
            <div className="bg-white p-6 border border-black/5 shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-black">Flash Sales</h2>
                <button 
                  onClick={addFlashSale}
                  className="text-[8px] bg-black text-white px-2 py-1 font-black uppercase tracking-widest"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-6">
                {flashSales.map((sale) => (
                  <div key={sale.id} className="p-4 border border-zinc-100 space-y-4 bg-[#FDFCF0]">
                    <div className="flex justify-between items-center">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" checked={sale.active} onChange={() => updateFlashSale(sale.id, { active: !sale.active })} className="w-3 h-3 accent-black" />
                        <span className="text-[9px] uppercase tracking-widest font-black text-black">Active</span>
                      </label>
                      <button onClick={() => removeFlashSale(sale.id)} className="text-[9px] text-red-500 font-bold uppercase tracking-widest">Remove</button>
                    </div>
                    <select 
                      value={sale.productId} 
                      onChange={(e) => updateFlashSale(sale.id, { productId: e.target.value })}
                      className="w-full p-2 bg-white border border-zinc-200 text-[9px] uppercase font-bold text-black"
                    >
                      {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-widest font-black text-black/40 text-left block">Old (₦)</label>
                        <input type="number" value={sale.originalPrice} onChange={(e) => updateFlashSale(sale.id, { originalPrice: Number(e.target.value) })} className="w-full p-2 text-xs font-bold border border-zinc-100" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-widest font-black text-black/40 text-left block">Sale (₦)</label>
                        <input type="number" value={sale.discountedPrice} onChange={(e) => updateFlashSale(sale.id, { discountedPrice: Number(e.target.value) })} className="w-full p-2 text-xs font-bold border border-zinc-100" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Listing */}
          <div className="lg:col-span-3 space-y-8 md:space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <h2 className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black border-l-4 border-black pl-4 text-black text-left">Collection ({products.length})</h2>
              <button 
                onClick={createNewProduct}
                className="w-full md:w-auto px-8 py-4 bg-black text-white text-[10px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.5em] font-black"
              >
                + Add Scent
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {products.map(p => (
                <div key={p.id} className="p-4 md:p-6 bg-white border border-black/5 flex gap-4 md:gap-6 items-center shadow-sm">
                  <div className="w-16 h-20 md:w-20 md:h-24 bg-zinc-100 flex-shrink-0">
                    <img src={p.images[0]} className="w-full h-full object-cover" alt={p.name} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-[11px] md:text-[12px] uppercase tracking-[0.2em] font-black mb-1 text-black">{p.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {p.priceOptions.map(opt => (
                        <span key={opt.id} className="text-[8px] bg-[#FDFCF0] border border-black/5 px-2 py-0.5 font-bold">₦{opt.price.toLocaleString()}</span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <button onClick={() => setEditingProduct(p)} className="text-[9px] uppercase font-black border-b border-black">Edit</button>
                      <button onClick={() => deleteProduct(p.id)} className="text-[9px] uppercase font-black text-red-600 border-b border-red-600">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Gallery Archive */}
            <div className="pt-12 border-t-2 border-black">
              <div className="flex flex-col gap-6 mb-8 text-left">
                <div>
                  <h2 className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black border-l-4 border-black pl-4 text-black">Gallery Archive</h2>
                  <p className="text-[9px] font-bold text-black/40 uppercase tracking-[0.2em] mt-1">Split content management</p>
                </div>
                
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex gap-2">
                    <button onClick={() => setGalleryCategory('perfume')} className={`px-3 py-1.5 text-[9px] font-black uppercase border ${galleryCategory === 'perfume' ? 'bg-black text-white' : 'bg-white'}`}>Scent</button>
                    <button onClick={() => setGalleryCategory('makeup')} className={`px-3 py-1.5 text-[9px] font-black uppercase border ${galleryCategory === 'makeup' ? 'bg-black text-white' : 'bg-white'}`}>Artistry</button>
                  </div>
                  <button 
                    onClick={() => galleryInputRef.current?.click()}
                    className="flex-1 md:flex-none px-6 py-2 bg-[#C6A48E] text-white text-[10px] font-black uppercase tracking-widest"
                  >
                    Upload Media
                  </button>
                  <input type="file" ref={galleryInputRef} onChange={handleGalleryUpload} className="hidden" accept="image/*,video/*" />
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 md:gap-4">
                {settings.galleryItems.map(item => (
                  <div key={item.id} className="group relative aspect-square bg-zinc-100 overflow-hidden">
                    {item.type === 'video' ? (
                      <video src={item.url} className="w-full h-full object-cover" muted loop />
                    ) : (
                      <img src={item.url} className="w-full h-full object-cover" alt="Gallery item" />
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 md:group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                      <button onClick={() => removeGalleryItem(item.id)} className="text-white bg-red-600 p-2 rounded-full scale-75 md:scale-100">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal: Formulation */}
        {editingProduct && (
          <div className="fixed inset-0 bg-white z-[110] p-4 overflow-y-auto">
            <form onSubmit={handleUpdateProduct} className="max-w-3xl mx-auto py-8">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-black/10">
                <h3 className="text-xl md:text-2xl font-light uppercase tracking-widest text-black text-left">Formulation</h3>
                <button type="button" onClick={() => setEditingProduct(null)} className="text-4xl">&times;</button>
              </div>
              
              <div className="space-y-8 text-left">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest font-black text-[#C6A48E]">Identity</label>
                  <input className="w-full p-4 border border-zinc-200 text-lg font-bold" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest font-black text-[#C6A48E]">Longevity</label>
                    <input className="w-full p-4 border border-zinc-200 text-sm font-bold" value={editingProduct.longevity} onChange={(e) => setEditingProduct({...editingProduct, longevity: e.target.value})} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest font-black text-[#C6A48E]">Profile</label>
                    <input className="w-full p-4 border border-zinc-200 text-sm font-bold" value={editingProduct.scentProfile} onChange={(e) => setEditingProduct({...editingProduct, scentProfile: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest font-black text-[#C6A48E]">Narrative</label>
                  <textarea className="w-full p-4 border border-zinc-200 text-base h-32" value={editingProduct.description} onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})} />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] uppercase tracking-widest font-black text-[#C6A48E]">Pricing</label>
                    <button type="button" onClick={addPriceOption} className="text-[8px] border border-black px-2 py-1 font-black">+ Size</button>
                  </div>
                  <div className="space-y-2">
                    {editingProduct.priceOptions.map((opt) => (
                      <div key={opt.id} className="flex gap-2 items-center">
                        <input className="w-20 p-2 border text-[10px] font-black uppercase" value={opt.size} onChange={(e) => updatePriceOption(opt.id, 'size', e.target.value)} />
                        <input type="number" className="flex-1 p-2 border text-[10px] font-black" value={opt.price} onChange={(e) => updatePriceOption(opt.id, 'price', Number(e.target.value))} />
                        <button type="button" onClick={() => removePriceOption(opt.id)} className="text-red-500 font-black px-2 text-lg">&times;</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest font-black text-[#C6A48E]">Visuals</label>
                  <div className="grid grid-cols-4 gap-2">
                    {editingProduct.images.map((img, i) => (
                      <div key={i} className="relative aspect-square">
                         <img src={img} className="w-full h-full object-cover" alt="Scent" />
                         <button type="button" onClick={() => removeImage(i)} className="absolute -top-1 -right-1 bg-white text-red-500 w-4 h-4 rounded-full text-[10px] shadow-md border">&times;</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="aspect-square border-2 border-dashed flex items-center justify-center text-zinc-300">+</button>
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                  </div>
                </div>

                <div className="flex gap-4 pt-8">
                  <button type="submit" className="flex-1 bg-black text-white py-4 text-xs font-black uppercase tracking-widest">Publish</button>
                  <button type="button" onClick={() => setEditingProduct(null)} className="px-8 py-4 border border-black text-xs font-black uppercase tracking-widest">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
