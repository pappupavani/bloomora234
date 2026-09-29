export type ProductCategory = 
  | 'all'
  | 'bouquets'
  | 'single-flowers'
  | 'keychains'
  | 'custom-gifts';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'bouquets' | 'single-flowers' | 'keychains' | 'custom-gifts';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  colors: ProductColor[];
  dimensions?: string;
  material: string;
  featured?: boolean;
  bestseller?: boolean;
  inStock: boolean;
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  product: Product;
  selectedColor: string;
  quantity: number;
  customNote?: string;
}

export interface CustomOrderRequest {
  colorPalette: string;
  stemCount: number;
  stemCountLabel: string;
  flowerTypes: string[];
  ribbonColor: string;
  wrappingPaper: string;
  personalizedMessage: string;
  deliveryDate: string;
  additionalNotes: string;
  estimatedPrice: number;
  senderName: string;
  senderPhone: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  productName: string;
  occasion: string;
}
