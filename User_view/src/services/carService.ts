import { api } from "./api";
import { Car } from "@/types/car";

export const carService = {
  // 1. Get all unique car brands
  getBrands: async (): Promise<string[]> => {
    const response = await api.get<string[]>("/cars/brands");
    return response.data;
  },

  // 2. Get models for a specific brand
  getModelsByBrand: async (brand: string): Promise<string[]> => {
    const response = await api.get<string[]>(`/cars/models?brand=${encodeURIComponent(brand)}`);
    return response.data;
  },

  // 3. Get all cars
  getAllCars: async (): Promise<Car[]> => {
    const response = await api.get<Car[]>("/cars");
    return response.data;
  },

  // 4. Get car by ID
  getCarById: async (id: number): Promise<Car> => {
    const response = await api.get<Car>(`/cars/${id}`);
    return response.data;
  },
};
