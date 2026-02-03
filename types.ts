
export interface PriceOption {
  id: string;
  size: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  scentProfile: string;
  longevity: string;
  images: string[];
  isSpecial: boolean;
  priceOptions: PriceOption[];
  notes: {
    top: string;
    heart: string;
    base: string;
  };
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  size: string;
  price: number;
  image: string;
}

export interface FlashSale {
  id: string;
  active: boolean;
  productId: string;
  originalPrice: number;
  discountedPrice: number;
  endTime: string; // ISO String
}

export interface GalleryItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  category: 'perfume' | 'makeup';
}

export interface SiteSettings {
  showFlashSale: boolean;
  showSpecialProducts: boolean;
  showGallery: boolean;
  showBooking: boolean;
  logoUrl: string;
  availableTimeSlots: string[];
  galleryItems: GalleryItem[];
}
