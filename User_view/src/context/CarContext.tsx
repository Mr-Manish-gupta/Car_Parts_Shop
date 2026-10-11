"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Car } from "@/types/car";

interface CarContextType {
  selectedCar: Car | null;
  selectCar: (car: Car) => void;
  clearCar: () => void;
  hasCarSelected: boolean;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  // Load saved car from localStorage on startup
  useEffect(() => {
    try {
      const savedCar = localStorage.getItem("selectedCar");
      if (savedCar) {
        setSelectedCar(JSON.parse(savedCar));
      }
    } catch (e) {
      console.error("Failed to load saved car", e);
    }
  }, []);

  const selectCar = (car: Car) => {
    setSelectedCar(car);
    localStorage.setItem("selectedCar", JSON.stringify(car));
  };

  const clearCar = () => {
    setSelectedCar(null);
    localStorage.removeItem("selectedCar");
  };

  return (
    <CarContext.Provider
      value={{
        selectedCar,
        selectCar,
        clearCar,
        hasCarSelected: !!selectedCar,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export const useCar = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error("useCar must be used within a CarProvider");
  }
  return context;
};
