
import React from 'react';
import { GalleryItem } from '../types';

interface Props {
  items: GalleryItem[];
}

export const GallerySection: React.FC<Props> = ({ items }) => {
  const perfumes = items.filter(item => item.category === 'perfume');
  const makeup = items.filter(item => item.category === 'makeup');

  const renderMedia = (item: GalleryItem) => {
    if (item.type === 'video') {
      return (
        <video 
          src={item.url} 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
        />
      );
    }
    return (
      <img 
        src={item.url} 
        alt="Gallery content" 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
      />
    );
  };

  return (
    <section className="bg-white border-y border-black/5">
      <div className="flex flex-col md:flex-row">
        {/* Perfume Side */}
        <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-24 border-b md:border-b-0 md:border-r border-black/5">
          <div className="md:sticky md:top-40 mb-12 md:mb-20 text-left">
            <h2 className="text-5xl md:text-7xl font-light mb-6 uppercase tracking-tighter leading-none">The Scent<br/>Archive</h2>
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#C6A48E] font-black">Perfume Oils & Pure Essences</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {perfumes.map((item, idx) => (
              <div 
                key={item.id} 
                className={`group relative overflow-hidden bg-zinc-100 shadow-sm transition-all duration-700 ${idx % 3 === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'}`}
              >
                {renderMedia(item)}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Makeup Side */}
        <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-24 bg-[#F9F7F2]">
          <div className="md:sticky md:top-40 mb-12 md:mb-20 md:text-right text-left">
            <h2 className="text-5xl md:text-7xl font-light mb-6 uppercase tracking-tighter leading-none">Artistry<br/>Studio</h2>
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#C6A48E] font-black">Private Sessions & Bridal Prep</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {makeup.map((item, idx) => (
              <div 
                key={item.id} 
                className={`group relative overflow-hidden bg-zinc-100 shadow-sm transition-all duration-700 ${idx % 3 === 2 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'}`}
              >
                {renderMedia(item)}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
