import { api } from "./api";
import { Category, Product } from "@/types/product";

export const productService = {
  // 1. Get all products
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>("/products");
    return response.data;
  },

  // 2. Get single product by ID
  getProductById: async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  // 3. Get products compatible with a specific car
  getProductsByCar: async (carId: number): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/products/compatible/${carId}`);
    return response.data;
  },

  // 4. Get all categories
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>("/categories");
    return response.data;
  },
};