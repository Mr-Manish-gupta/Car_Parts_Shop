"use client";

import React, { useState, useEffect } from "react";
import { carService } from "@/services/carService";
import { useCar } from "@/context/CarContext";
import { Car as CarType } from "@/types/car";
import {
  Car,
  Search,
  Check,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Gauge,
  SlidersHorizontal,
} from "lucide-react";
import { useRouter } from "next/navigation";

export const CarSelector = () => {
  const { selectCar, selectedCar, clearCar } = useCar();
  const router = useRouter();

  const [allCars, setAllCars] = useState<CarType[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | "">("");

  // Popular Quick-Picks
  const popularPicks = [
    { brand: "Hyundai", model: "Creta", year: 2024 },
    { brand: "Mahindra", model: "Thar", year: 2023 },
    { brand: "Maruti Suzuki", model: "Swift", year: 2023 },
    { brand: "Tata", model: "Nexon", year: 2024 },
    { brand: "Toyota", model: "Fortuner", year: 2023 },
    { brand: "Kia", model: "Seltos", year: 2024 },
  ];

  // 1. Fetch initial cars and brands from backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsData = await carService.getAllCars();
        if (Array.isArray(carsData) && carsData.length > 0) {
          setAllCars(carsData);
          const uniqueBrands = Array.from(new Set(carsData.map((c) => c.brand)));
          setBrands(uniqueBrands);
        } else {
          // Curated fallback brands
          setBrands([
            "Maruti Suzuki",
            "Hyundai",
            "Tata",
            "Mahindra",
            "Toyota",
            "Kia",
            "Honda",
            "Volkswagen",
            "BMW",
            "Mercedes-Benz",
          ]);
        }
      } catch (err) {
        setBrands([
          "Maruti Suzuki",
          "Hyundai",
          "Tata",
          "Mahindra",
          "Toyota",
          "Kia",
          "Honda",
          "Volkswagen",
          "BMW",
        ]);
      }
    };
    fetchCars();
  }, []);

  // 2. When Brand changes, filter Models
  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedModel("");
    setSelectedYear("");

    const availableModels = Array.from(
      new Set(allCars.filter((c) => c.brand.toLowerCase() === brand.toLowerCase()).map((c) => c.model))
    );

    if (availableModels.length > 0) {
      setModels(availableModels);
    } else {
      // Fallback model presets
      const fallbackMap: Record<string, string[]> = {
        "Maruti Suzuki": ["Swift", "Brezza", "Baleno", "Grand Vitara", "Dzire", "Ertiga"],
        Hyundai: ["Creta", "Venue", "i20", "Verna", "Tucson", "Exter"],
        Tata: ["Nexon", "Harrier", "Safari", "Punch", "Altroz", "Tiago"],
        Mahindra: ["Thar", "Scorpio-N", "XUV700", "XUV300", "Bolero"],
        Toyota: ["Fortuner", "Innova Hycross", "Innova Crysta", "Urban Cruiser", "Glanza"],
        Kia: ["Seltos", "Sonet", "Carens", "EV6"],
        Honda: ["City", "Amaze", "Elevate"],
        Volkswagen: ["Virtus", "Taigun", "Polo"],
        BMW: ["3 Series", "5 Series", "X1", "X3", "X5", "M3"],
      };
      setModels(fallbackMap[brand] || ["Standard Model"]);
    }
    setYears([]);
  };

  // 3. When Model changes, filter Years
  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setSelectedYear("");

    const availableYears = Array.from(
      new Set(
        allCars
          .filter(
            (c) =>
              c.brand.toLowerCase() === selectedBrand.toLowerCase() &&
              c.model.toLowerCase() === model.toLowerCase()
          )
          .map((c) => c.year)
      )
    ).sort((a, b) => b - a);

    if (availableYears.length > 0) {
      setYears(availableYears);
    } else {
      setYears([2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015]);
    }
  };

  // 4. Handle Quick Pick
  const handleQuickPick = (pick: { brand: string; model: string; year: number }) => {
    handleBrandChange(pick.brand);
    handleModelChange(pick.model);
    setSelectedYear(pick.year);

    const matched = allCars.find(
      (c) =>
        c.brand.toLowerCase() === pick.brand.toLowerCase() &&
        c.model.toLowerCase() === pick.model.toLowerCase() &&
        c.year === pick.year
    );

    if (matched) {
      selectCar(matched);
    } else {
      selectCar({
        id: Date.now(),
        brand: pick.brand,
        model: pick.model,
        year: pick.year,
        fuelType: "Petrol / Diesel",
      });
    }
  };

  // 5. Handle Find Parts button
  const handleFindParts = () => {
    if (!selectedBrand || !selectedModel || !selectedYear) return;

    const matchedCar = allCars.find(
      (c) =>
        c.brand.toLowerCase() === selectedBrand.toLowerCase() &&
        c.model.toLowerCase() === selectedModel.toLowerCase() &&
        c.year === Number(selectedYear)
    );

    if (matchedCar) {
      selectCar(matchedCar);
      router.push(`/shop?carId=${matchedCar.id}`);
    } else {
      selectCar({
        id: Date.now(),
        brand: selectedBrand,
        model: selectedModel,
        year: Number(selectedYear),
        fuelType: "Standard OEM",
      });
      router.push(
        `/shop?brand=${encodeURIComponent(selectedBrand)}&model=${encodeURIComponent(selectedModel)}`
      );
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#11141D] to-[#0A0D14] text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/10 space-y-6 relative overflow-hidden">
      {/* Red ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="p-3.5 bg-gradient-to-br from-red-600 to-rose-700 text-white rounded-2xl shadow-lg shadow-red-600/30">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black text-red-400 uppercase tracking-widest flex items-center gap-1">
              <Sparkles size={11} /> ZERO FITMENT GUESSWORK
            </span>
            <h3 className="font-black text-xl text-white">Select Vehicle Specs</h3>
          </div>
        </div>

        {selectedCar && (
          <button
            onClick={clearCar}
            className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1.5 bg-[#161B28] border border-white/10 px-3 py-1.5 rounded-xl transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset
          </button>
        )}
      </div>

      {/* Quick-Pick Chips */}
      <div className="space-y-2 relative z-10">
        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider">
          🔥 Quick-Select Popular Indian & Global Cars:
        </label>
        <div className="flex flex-wrap gap-2">
          {popularPicks.map((pick, i) => {
            const isCurrent =
              selectedCar &&
              selectedCar.brand.toLowerCase() === pick.brand.toLowerCase() &&
              selectedCar.model.toLowerCase() === pick.model.toLowerCase();

            return (
              <button
                key={i}
                type="button"
                onClick={() => handleQuickPick(pick)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isCurrent
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 border border-emerald-400"
                    : "bg-[#141822] hover:bg-[#1C212E] text-gray-300 hover:text-white border border-white/10"
                }`}
              >
                <span>{pick.brand} {pick.model}</span>
                <span className="text-[10px] opacity-70">({pick.year})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dropdown Selectors */}
      <div className="space-y-4 relative z-10">
        {/* 1. Brand */}
        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
            1. Car Manufacturer / Make
          </label>
          <select
            value={selectedBrand}
            onChange={(e) => handleBrandChange(e.target.value)}
            className="w-full px-4 py-3.5 bg-[#141822] border border-white/10 rounded-2xl text-xs font-bold text-white focus:outline-none focus:border-red-600 transition-colors cursor-pointer"
          >
            <option value="">Choose Manufacturer (e.g. Maruti Suzuki, Hyundai, Tata, Mahindra...)</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Model & Year Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
              2. Car Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => handleModelChange(e.target.value)}
              disabled={!selectedBrand}
              className="w-full px-4 py-3.5 bg-[#141822] border border-white/10 rounded-2xl text-xs font-bold text-white focus:outline-none focus:border-red-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <option value="">{selectedBrand ? "Choose Model" : "Select Brand First"}</option>
              {models.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
              3. Model Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value) || "")}
              disabled={!selectedModel}
              className="w-full px-4 py-3.5 bg-[#141822] border border-white/10 rounded-2xl text-xs font-bold text-white focus:outline-none focus:border-red-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <option value="">{selectedModel ? "Choose Year" : "Select Model First"}</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Find Parts CTA Button */}
      <div className="pt-2 relative z-10">
        <button
          type="button"
          disabled={!selectedBrand || !selectedModel || !selectedYear}
          onClick={handleFindParts}
          className="w-full py-4 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-red-600/30 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Search size={16} />
          <span>Lock Fitment &amp; Find Matching Spares</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Micro-guarantee */}
      <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 font-medium pt-1">
        <ShieldCheck size={14} className="text-emerald-400" />
        <span>100% Free Doorstep Returns if any part doesn't fit your car</span>
      </div>
    </div>
  );
};
