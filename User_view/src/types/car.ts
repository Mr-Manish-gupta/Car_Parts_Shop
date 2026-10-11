export interface Car {
  id: number;
  brand: string;
  model: string;
  variant?: string;
  year: number;
  fuelType?: string;
}

export interface CarSelectorState {
  selectedBrand: string;
  selectedModel: string;
  selectedYear: number | "";
  selectedCar: Car | null;
}
