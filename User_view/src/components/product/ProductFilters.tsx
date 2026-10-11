import { Category } from "@/types/product";
import { Filter, RotateCcw, SlidersHorizontal, Sparkles, Layers, Store, ArrowUpDown, Tag, Check, Grid } from "lucide-react";
import React, { useState } from "react";

interface ProductFiltersProps {
  categories: Category[];
  selectedCategory: number | string;
  onSelectCategory: (id: number | string) => void;
  sortBy: string;
  onSelectSort: (sort: string) => void;
  onResetFilters: () => void;
  sellers?: string[];
  selectedSeller?: string;
  onSelectSeller?: (seller: string) => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSelectSort,
  onResetFilters,
  sellers,
  selectedSeller,
  onSelectSeller,
}) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const hasActiveFilters =
    Boolean(selectedCategory) || Boolean(selectedSeller) || sortBy !== "newest";

  return (
    <div className="w-full space-y-4">
      {/* Category Pills Strip (Quick One-Click Filters) */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => onSelectCategory("")}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all duration-300 flex items-center gap-2 flex-shrink-0 ${
            selectedCategory === ""
              ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/35 border border-red-500/50"
              : "bg-[#10141F] border border-white/[0.08] text-gray-400 hover:text-white hover:border-white/20 hover:bg-[#151B2A]"
          }`}
        >
          <Sparkles size={13} className={selectedCategory === "" ? "text-white" : "text-red-500"} />
          <span>All Components</span>
        </button>

        {categories.map((cat) => {
          const isSelected = String(selectedCategory) === String(cat.id);
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? "" : cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2 flex-shrink-0 ${
                isSelected
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/35 border border-red-500/50"
                  : "bg-[#10141F] border border-white/[0.08] text-gray-400 hover:text-white hover:border-white/20 hover:bg-[#151B2A]"
              }`}
            >
              {isSelected && <Check size={13} />}
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile Trigger Button */}
      <div className="flex md:hidden items-center justify-between bg-gradient-to-r from-[#10141F] to-[#0D101A] p-3.5 rounded-2xl border border-white/[0.08] shadow-lg">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl shadow-md transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" /> Filter & Sort Options
        </button>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="text-xs font-bold text-red-400 hover:underline flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        )}
      </div>

      {/* Desktop Filter Control Bar */}
      <div className="hidden md:flex bg-gradient-to-r from-[#10141F] via-[#0E121B] to-[#10141F] p-4 rounded-2xl border border-white/[0.08] shadow-xl flex-row items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#161B28] px-3 py-1.5 rounded-xl border border-white/[0.06]">
            <SlidersHorizontal className="w-4 h-4 text-red-500" />
            <span className="font-black text-xs text-white uppercase tracking-wider">
              Filters & View
            </span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-xs font-bold text-red-400 hover:text-red-300 hover:underline flex items-center gap-1.5 ml-2 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear All Filters
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 justify-end">
          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <ArrowUpDown size={12} className="text-red-500" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => onSelectSort(e.target.value)}
              className="px-3.5 py-2 bg-[#161B28] border border-white/[0.08] rounded-xl text-xs font-bold text-white focus:outline-none focus:border-red-600 transition-colors cursor-pointer"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>

          {/* Seller Filter */}
          {sellers && sellers.length > 0 && onSelectSeller && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <Store size={12} className="text-red-500" /> Dealer:
              </span>
              <select
                value={selectedSeller || ""}
                onChange={(e) => onSelectSeller(e.target.value)}
                className="px-3.5 py-2 bg-[#161B28] border border-white/[0.08] rounded-xl text-xs font-bold text-white focus:outline-none focus:border-red-600 transition-colors max-w-[190px] cursor-pointer"
              >
                <option value="">All Verified Dealers</option>
                {sellers.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/85 backdrop-blur-md md:hidden">
          <div className="absolute inset-0" onClick={() => setIsMobileFilterOpen(false)} />

          <div className="relative bg-[#0F131C] border-t border-white/10 w-full rounded-t-3xl p-6 space-y-5 max-h-[85vh] overflow-y-auto z-10 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-red-500" />
                <h3 className="font-black text-base text-white">Filters & Sorting</h3>
              </div>
              <button
                onClick={() => {
                  onResetFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="text-xs font-bold text-red-400 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-400 uppercase">Sort Order</label>
              <select
                value={sortBy}
                onChange={(e) => onSelectSort(e.target.value)}
                className="w-full px-3.5 py-3 bg-[#161B28] border border-white/[0.08] rounded-xl text-xs font-bold text-white focus:outline-none focus:border-red-600"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>

            {sellers && sellers.length > 0 && onSelectSeller && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-400 uppercase">
                  Verified Dealer / Merchant
                </label>
                <select
                  value={selectedSeller || ""}
                  onChange={(e) => onSelectSeller(e.target.value)}
                  className="w-full px-3.5 py-3 bg-[#161B28] border border-white/[0.08] rounded-xl text-xs font-bold text-white focus:outline-none focus:border-red-600"
                >
                  <option value="">All Verified Dealers</option>
                  {sellers.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/35 transition-all mt-4"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};