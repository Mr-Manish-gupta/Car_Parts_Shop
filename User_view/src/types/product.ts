import { Car } from "./car";

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  partNumber: string;
  imageUrl?: string;
  images?: string[];
  categoryId: number;
  categoryName?: string;
  sellerId?: number;
  sellerName?: string;
  sellerLocation?: string;
  sellerRating?: number;
  compatibleCars: Car[];
  availableColors?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFilterState {
  categoryId?: number | string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: "price_asc" | "price_desc" | "newest" | "rating";
  carId?: number;
}