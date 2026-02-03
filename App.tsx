
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Logo } from './components/Logo';
import { FlashSaleBanner } from './components/FlashSaleBanner';
import { ProductHero } from './components/ProductHero';
import { BookingSection } from './components/BookingSection';
import { AdminDashboard } from './components/AdminDashboard';
import { CartDrawer } from './components/CartDrawer';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS, INITIAL_FLASH_SALES } from './constants';
import { Product, SiteSettings, FlashSale, CartItem, PriceOption } from './types';

type View = 'products' | 'gallery';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [flashSales, setFlashSales] = useState<FlashSale[]>(INITIAL_FLASH_SALES);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentView, setCurrentView] = useState<View>('products');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('mm_data_v18');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProducts(parsed.products);
        setSettings(parsed.settings);
        setFlashSales(parsed.flashSales || INITIAL_FLASH_SALES);
      } catch (e) {
        console.error("Failed to load saved state", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mm_data_v18', JSON.stringify({ products, settings, flashSales }));
  }, [products, settings, flashSales]);

  const handleOrder = useCallback((product: Product, option: PriceOption) => {
    const newItem: CartItem = {
      id: Math.random().toString(36).substr(2, 9),
      productId: product.id,
      name: product.name,
      size: option.size,
      price: option.price,
      image: product.images[0]
    };
    setCart(prev => [...prev, newItem]);
    setIsCartOpen(true);
    setIsMobileMenuOpen(false);
  }, []);

  const handleFlashSaleOrder = useCallback((sale: FlashSale, product: Product) => {
    const baseOption = product.priceOptions[0];
    const newItem: CartItem = {
      id: Math.random().toString(36).substr(2, 9),
      productId: product.id,
      name: `${product.name} (Flash Sale)`,
      size: baseOption?.size || '5ml',
      price: sale.discountedPrice,
      image: product.images[0]
    };
    setCart(prev => [...prev, newItem]);
    setIsCartOpen(true);
  }, []);

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartItemSize = (cartItemId: string, newSize: string) => {
    setCart(prev => prev.map(item => {
      if (item.id === cartItemId) {
        const product = products.find(p => p.id === item.productId);
        const option = product?.priceOptions.find(o => o.size === newSize);
        if (option) {
          return { ...item, name: product?.name || item.name, size: newSize, price: option.price };
        }
      }
      return item;
    }));
  };

  const specialProducts = useMemo(() => products.filter(p => p.isSpecial), [products]);
  const otherProducts = useMemo(() => products.filter(p => !p.isSpecial), [products]);
  const perfumeGallery = useMemo(() => settings.galleryItems.filter(i => i.category === 'perfume'), [settings.galleryItems]);
  const makeupGallery = useMemo(() => settings.galleryItems.filter(i => i.category === 'makeup'), [settings.galleryItems]);

  const activeFlashSale = useMemo(() => flashSales.find(s => s.active && settings.showFlashSale), [flashSales, settings.showFlashSale]);

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const NavLinks = () => (
    <div className="flex flex-col gap-6 w-full max-w-[280px] mx-auto px-4 md:px-0">
      <button 
        onClick={() => handleNavigate('products')} 
        className={`py-5 px-4 border text-[12px] uppercase tracking-[0.6em] font-medium transition-all text-center ${currentView === 'products' ? 'bg-black text-white border-black' : 'border-black/10 text-black/70 hover:bg-zinc-50'}`}
      >
        PRODUCTS
      </button>
      <button 
        onClick={() => handleNavigate('gallery')} 
        className={`py-5 px-4 border text-[12px] uppercase tracking-[0.6em] font-medium transition-all text-center ${currentView === 'gallery' ? 'bg-black text-white border-black' : 'border-black/10 text-black/70 hover:bg-zinc-50'}`}
      >
        GALLERY
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] selection:bg-black selection:text-white scroll-smooth flex flex-col">
      {/* --- STICKY NAVIGATION --- */}
      <header className="fixed top-0 left-0 right-0 z-[60]">
        {activeFlashSale && (
          <FlashSaleBanner 
            sale={activeFlashSale} 
            product={products.find(p => p.id === activeFlashSale.productId)} 
            onOrder={() => {
              const product = products.find(p => p.id === activeFlashSale.productId);
              if (product) handleFlashSaleOrder(activeFlashSale, product);
            }}
          />
        )}
        
        <nav className="bg-white/95 backdrop-blur-sm px-6 md:px-12 h-20 md:h-24 flex items-center justify-between border-b border-black/5 relative shadow-sm">
          <div className="flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -ml-2 hover:scale-110 transition-transform">
              <svg className="w-6 h-6 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          <div className="hidden lg:flex gap-16 text-[10px] uppercase tracking-[0.5em] font-black text-black/40">
            <button onClick={() => handleNavigate('products')} className={`hover:text-black hover:opacity-100 transition-all ${currentView === 'products' ? 'text-black opacity-100' : ''}`}>PRODUCTS</button>
            <button onClick={() => handleNavigate('gallery')} className={`hover:text-black hover:opacity-100 transition-all ${currentView === 'gallery' ? 'text-black opacity-100' : ''}`}>GALLERY</button>
          </div>

          <button className="absolute left-1/2 -translate-x-1/2 group" onClick={() => handleNavigate('products')}>
            <Logo className="h-10 md:h-14 transition-transform group-hover:scale-105" />
          </button>

          <div className="flex gap-4 md:gap-8 items-center">
            <button 
              onClick={() => { setIsAdminOpen(true); setIsMobileMenuOpen(false); }}
              className="p-2 transition-transform hover:scale-110"
              aria-label="Admin Dashboard"
            >
              <div className="w-6 h-6 rounded-full border border-black/80 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-black rounded-full" />
              </div>
            </button>

            <button onClick={() => setIsCartOpen(true)} className="relative p-2 transition-transform hover:scale-110" aria-label="View cart">
              <svg className="w-6 h-6 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-black text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full border border-white font-bold">{cart.length}</span>
              )}
            </button>
          </div>
        </nav>

        <div className={`fixed inset-0 top-[inherit] bg-white z-[55] flex flex-col items-center justify-center transition-all duration-700 cubic-bezier(0.23, 1, 0.32, 1) ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
          <NavLinks />
        </div>
      </header>

      {/* Dynamic padding-top to compensate for variable header height */}
      <main className={`flex-grow transition-all duration-500 ${activeFlashSale ? 'pt-[130px] md:pt-[160px]' : 'pt-20 md:pt-24'}`}>
        {currentView === 'products' ? (
          /* --- PRODUCTS PAGE --- */
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {settings.showSpecialProducts && specialProducts.map((product, idx) => (
              <ProductHero 
                key={product.id} 
                product={product} 
                onOrder={handleOrder}
                reverse={idx % 2 !== 0}
              />
            ))}

            <div className="py-24 md:py-48 px-6 container mx-auto">
              <div className="text-center mb-16 md:mb-32 max-w-2xl mx-auto space-y-6">
                <h2 className="text-5xl md:text-8xl font-light uppercase tracking-tighter text-black">The Collection</h2>
                <div className="w-12 h-0.5 bg-[#C6A48E] mx-auto"></div>
                <p className="italic serif text-black/40 text-xl md:text-2xl leading-relaxed">Exquisite perfume oils, curated for the modern minimalist.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
                {otherProducts.map(product => (
                  <div key={product.id} className="group flex flex-col items-center text-center">
                    <div className="aspect-[4/5] w-full overflow-hidden mb-10 bg-zinc-50 relative shadow-sm transition-all duration-700 group-hover:shadow-2xl">
                      <img src={product.images[0]} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" alt={product.name} />
                      <button 
                        onClick={() => handleOrder(product, product.priceOptions[0])} 
                        className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <span className="bg-white text-black px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl hover:bg-black hover:text-white transition-all">Acquire Scent</span>
                      </button>
                    </div>
                    <div className="space-y-4 px-4">
                      <p className="text-[10px] uppercase tracking-[0.4em] font-black text-[#C6A48E]">{product.scentProfile}</p>
                      <h3 className="text-3xl font-light uppercase tracking-tighter text-black">{product.name}</h3>
                      <div className="pt-2">
                        <span className="text-lg font-black text-black">₦{product.priceOptions[0].price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-32 text-center">
                <button 
                  onClick={() => handleNavigate('gallery')}
                  className="px-16 py-6 border border-black/10 text-[11px] font-black uppercase tracking-[0.5em] hover:bg-black hover:text-white transition-all duration-700 shadow-sm"
                >
                  Enter The Gallery
                </button>
              </div>
            </div>
          </section>
        ) : (
          /* --- GALLERY PAGE --- */
          <section className="bg-white animate-in fade-in slide-in-from-bottom-4 duration-1000 min-h-[80vh]">
            <div className="py-24 md:py-40 px-6 container mx-auto text-center">
               <div className="max-w-3xl mx-auto space-y-8 mb-32">
                 <h2 className="text-5xl md:text-9xl font-light uppercase tracking-tighter text-black leading-none">The Gallery</h2>
                 <div className="w-16 h-0.5 bg-[#C6A48E] mx-auto"></div>
                 <p className="italic serif text-black/40 text-xl md:text-2xl leading-relaxed">A visual anthology of our studio artistry and fragrance archives.</p>
               </div>

               {/* Sub-section: Scent Archive */}
               {settings.showGallery && (
                 <div className="mb-48 md:mb-72">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 md:mb-24 border-b border-black/5 pb-12">
                      <div className="text-left">
                        <h3 className="text-3xl md:text-5xl font-light uppercase tracking-tighter text-black">Scent Archive</h3>
                        <p className="text-[10px] uppercase tracking-[0.4em] font-black text-[#C6A48E] mt-2">The Visual Language of Perfume</p>
                      </div>
                      <div className="hidden md:block text-[10px] uppercase tracking-[0.6em] text-black/20 font-black italic">Archive / 01</div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                      {perfumeGallery.length > 0 ? perfumeGallery.map((item, idx) => (
                        <div key={item.id} className={`group relative overflow-hidden bg-zinc-50 shadow-sm transition-all duration-1000 ${idx % 5 === 0 ? 'md:col-span-2 md:row-span-2 aspect-square' : 'aspect-[4/5]'}`}>
                          {item.type === 'video' ? (
                            <video 
                              src={item.url} 
                              autoPlay 
                              muted 
                              loop 
                              playsInline 
                              className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105" 
                            />
                          ) : (
                            <img 
                              src={item.url} 
                              className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105" 
                              alt="Archive" 
                            />
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700 pointer-events-none" />
                        </div>
                      )) : (
                        <div className="col-span-full py-20 text-center opacity-20 italic serif text-xl">Archive is currently empty.</div>
                      )}
                    </div>
                 </div>
               )}

               {/* Sub-section: Artistry Studio */}
               {settings.showBooking && (
                 <div>
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 md:mb-24 border-b border-black/5 pb-12">
                      <div className="text-left">
                        <h3 className="text-3xl md:text-5xl font-light uppercase tracking-tighter text-black">Artistry Studio</h3>
                        <p className="text-[10px] uppercase tracking-[0.4em] font-black text-[#C6A48E] mt-2">Captured Moments of Transformation</p>
                      </div>
                      <div className="hidden md:block text-[10px] uppercase tracking-[0.6em] text-black/20 font-black italic">Studio / 02</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 mb-24 md:mb-40">
                      {makeupGallery.length > 0 ? makeupGallery.map((item, idx) => (
                        <div key={item.id} className={`group relative overflow-hidden shadow-sm transition-all duration-1000 bg-zinc-50 ${idx % 3 === 0 ? 'md:col-span-8 aspect-[16/9]' : 'md:col-span-4 aspect-square'}`}>
                          {item.type === 'video' ? (
                            <video 
                              src={item.url} 
                              autoPlay 
                              muted 
                              loop 
                              playsInline 
                              className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105" 
                            />
                          ) : (
                            <img 
                              src={item.url} 
                              className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105" 
                              alt="Artistry Session" 
                            />
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700 pointer-events-none" />
                        </div>
                      )) : (
                        <div className="col-span-full py-40 text-center bg-[#FDFCF9] border border-black/5">
                          <p className="italic serif text-2xl text-black/10">The studio portfolio is currently being archived.</p>
                        </div>
                      )}
                    </div>

                    <div className="max-w-6xl mx-auto pt-20 border-t border-black/5">
                      <BookingSection timeSlots={settings.availableTimeSlots} />
                    </div>
                 </div>
               )}
            </div>
          </section>
        )}
      </main>

      <footer className="bg-[#0A0A0A] text-white pt-40 pb-20 px-8 mt-auto">
        <div className="container mx-auto max-w-7xl space-y-24 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
             <div className="space-y-12">
                <Logo className="h-16 opacity-90" />
                <p className="text-2xl md:text-3xl serif italic opacity-40 leading-relaxed max-w-lg">
                  Maizon Marie is a sanctuary for the discerning. Pure oils, defined by vision and artistic silence.
                </p>
                <div className="flex gap-12 text-[10px] uppercase tracking-[0.6em] font-black text-white/30">
                  <a href="#" className="hover:text-white transition-colors">Instagram</a>
                  <a href="#" className="hover:text-white transition-colors">Pinterest</a>
                  <a href="#" className="hover:text-white transition-colors">Concierge</a>
                </div>
             </div>
             
             <div className="flex flex-col md:flex-row gap-20">
               <div className="space-y-8">
                 <h4 className="text-[11px] uppercase tracking-[0.5em] font-black text-[#C6A48E]">Studio Maps</h4>
                 <ul className="text-[10px] space-y-6 opacity-30 uppercase tracking-[0.4em] font-bold">
                   <li><button onClick={() => handleNavigate('products')} className="hover:text-white transition-colors uppercase">Collection Index</button></li>
                   <li><button onClick={() => handleNavigate('gallery')} className="hover:text-white transition-colors uppercase">Visual Gallery</button></li>
                 </ul>
               </div>
               <div className="space-y-8">
                 <h4 className="text-[11px] uppercase tracking-[0.5em] font-black text-[#C6A48E]">Archives</h4>
                 <ul className="text-[10px] space-y-6 opacity-30 uppercase tracking-[0.4em] font-bold">
                   <li><button onClick={() => handleNavigate('gallery')} className="hover:text-white transition-colors uppercase">Scent Archive</button></li>
                   <li><button onClick={() => handleNavigate('gallery')} className="hover:text-white transition-colors uppercase">Artistry Portfolio</button></li>
                 </ul>
               </div>
             </div>
          </div>
          
          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-[9px] opacity-20 uppercase tracking-[0.6em] font-bold">
            <p>© 2024 MAIZON MARIE PARFUM ATELIER. LAGOS, NG.</p>
            <button onClick={() => setIsAdminOpen(true)} className="hover:opacity-100 transition-opacity">ADMIN PORTAL</button>
          </div>
        </div>
      </footer>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cart} onRemove={removeFromCart} onUpdateSize={updateCartItemSize} products={products} />
      {isAdminOpen && (
        <AdminDashboard 
          products={products} 
          setProducts={setProducts} 
          settings={settings} 
          setSettings={setSettings} 
          flashSales={flashSales} 
          setFlashSales={setFlashSales} 
          onClose={() => setIsAdminOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;
