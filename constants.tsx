
import { Product, SiteSettings, FlashSale } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Santal Mystique',
    description: 'A deep, meditative journey into the heart of ancient forests. This **Oil-based Version** elixir clings to the skin like a second velvet layer, unfolding layers of creaminess and spice over hours of wear.',
    scentProfile: 'Woody, Spicy, Creamy',
    longevity: '12+ Hours',
    images: ['https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1547610291-7c42ef277df5?auto=format&fit=crop&q=80&w=1200'],
    isSpecial: true,
    priceOptions: [
      { id: '1-1', size: '5ml', price: 15000 },
      { id: '1-2', size: '10ml', price: 27000 },
      { id: '1-3', size: '30ml', price: 65000 }
    ],
    notes: {
      top: 'Cardamom, Papyrus',
      heart: 'Sandalwood, Virginia Cedar',
      base: 'Leather, Amber, Violet'
    }
  },
  {
    id: '2',
    name: 'Oud Noir',
    description: 'An enigmatic blend that captures the essence of midnight in a blooming garden. Intense, dark, and utterly sophisticated, this **Oil-based Version** is for those who leave a lingering impression.',
    scentProfile: 'Oud, Floral, Smoky',
    longevity: '10+ Hours',
    images: ['https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=1200'],
    isSpecial: true,
    priceOptions: [
      { id: '2-1', size: '5ml', price: 25000 },
      { id: '2-2', size: '10ml', price: 45000 }
    ],
    notes: {
      top: 'Saffron, Rose',
      heart: 'Agarwood (Oud), Praline',
      base: 'Vanilla, Guaiac Wood'
    }
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  showFlashSale: true,
  showSpecialProducts: true,
  showGallery: true,
  showBooking: true,
  logoUrl: 'https://i.postimg.cc/mD8zndqQ/maizon-marie-logo.png',
  availableTimeSlots: ['10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'],
  galleryItems: [
    { id: 'g1', url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800', type: 'image', category: 'perfume' },
    { id: 'g2', url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800', type: 'image', category: 'makeup' },
    { id: 'g3', url: 'https://images.unsplash.com/photo-1563170351-be82bc888bb4?auto=format&fit=crop&q=80&w=800', type: 'image', category: 'perfume' },
    { id: 'g4', url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800', type: 'image', category: 'makeup' },
  ]
};

export const INITIAL_FLASH_SALES: FlashSale[] = [
  {
    id: 'fs-1',
    active: true,
    productId: '1',
    originalPrice: 15000,
    discountedPrice: 12000,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString()
  }
];
