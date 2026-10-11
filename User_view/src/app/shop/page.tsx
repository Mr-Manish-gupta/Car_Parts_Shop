"use client";

import React, { useState, useEffect } from "react";
import { productService } from "@/services/productService";
import { Product, Category } from "@/types/product";
import { useCar } from "@/context/CarContext";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductFilters } from "@/components/product/ProductFilters";
import { Search, Car, PackageSearch, Sparkles, ShieldCheck, Truck, ArrowRight, Zap, Award, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ShopPage() {
  const { selectedCar } = useCar();
  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | string>("");
  const [selectedSeller, setSelectedSeller] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");

  // Extract unique sellers across all catalog products
  const sellers: string[] = Array.from(
    new Set(products.map((p) => p.sellerName).filter(Boolean) as string[])
  ).sort();

  // Fetch Products & Categories from backend
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        try {
          const catData = await productService.getCategories();
          setCategories(Array.isArray(catData) ? catData : []);
        } catch (e) {
          console.error("Failed to load categories from backend", e);
          setCategories([]);
        }

        let prodData: Product[] = [];
        try {
          if (selectedCar) {
            prodData = await productService.getProductsByCar(selectedCar.id);
          } else {
            prodData = await productService.getAllProducts();
          }
        } catch (e) {
          console.error("Failed to load products from backend", e);
          prodData = [];
        }

        setProducts(Array.isArray(prodData) ? prodData : []);
      } catch (err) {
        console.error("Failed to load shop products", err);
        setProducts([]);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [selectedCar]);

  // Filter & Sort Logic
  const filteredProducts = products
    .filter((p) => {
      if (selectedCategory !== "" && String(p.categoryId) !== String(selectedCategory)) {
        return false;
      }
      if (selectedSeller !== "" && p.sellerName !== selectedSeller) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesPartNo = p.partNumber?.toLowerCase().includes(q);
        const matchesBrand = p.categoryName?.toLowerCase().includes(q);
        const matchesSeller = p.sellerName?.toLowerCase().includes(q);
        return matchesName || matchesPartNo || matchesBrand || matchesSeller;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      return 0;
    });

  const handleAddToCart = async (product: any) => {
    addToCart(product, 1);
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-white py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Flagship Showroom Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-gradient-to-r from-[#0C0F17] via-[#121624] to-[#0A0D15] p-6 sm:p-10 shadow-2xl">
          {/* Ambient Lighting Background */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-600/15 border border-red-500/30 text-red-400 text-[11px] font-black rounded-full uppercase tracking-widest shadow-sm">
                <Sparkles size={12} className="text-red-500" />
                <span>DriveZone Pro Marketplace • 100% Fitment Guarantee</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Precision Automotive <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                  Spares &amp; Accessories
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed max-w-xl">
                Discover OEM-spec brake pads, LED performance lighting, premium leather interiors, and genuine styling components verified by our master mechanics.
              </p>

              {/* Quick Trust Highlights */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-gray-400 font-bold">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 size={14} /> 100% Genuine OEM Certified
                </span>
                <span className="flex items-center gap-1 text-gray-300">
                  <Truck size={14} className="text-red-500" /> Express Pan-India Courier
                </span>
                <span className="flex items-center gap-1 text-amber-400">
                  <Award size={14} /> 1-Year Replacement Warranty
                </span>
              </div>
            </div>

            {/* Quick Live Search Box */}
            <div className="w-full lg:w-96 relative flex-shrink-0 bg-[#10141F] p-2 rounded-2xl border border-white/[0.08] shadow-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by part name, brand, or OEM..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-[#161B28] border border-white/[0.08] rounded-xl text-xs font-bold text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-all shadow-inner"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-4" />
              </div>
              <div className="flex items-center justify-between px-3 pt-2 text-[10px] text-gray-500 font-bold">
                <span>Popular: Brake Pads, LED H4, 7D Mats</span>
                <span className="text-red-500">{filteredProducts.length} Items</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Fitment Card */}
        {selectedCar ? (
          <div className="bg-gradient-to-r from-[#0C1A14] via-[#0E221A] to-[#0A1611] border-2 border-emerald-500/40 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-600/30">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                  <ShieldCheck size={13} /> Active Garage Filter • 100% Guaranteed Fitment
                </span>
                <h2 className="text-base sm:text-xl font-black text-white mt-0.5">
                  Showing parts for {selectedCar.brand} {selectedCar.model} ({selectedCar.year})
                </h2>
              </div>
            </div>
            <Link
              href="/my-car"
              className="text-xs font-bold text-emerald-300 hover:text-white bg-[#0A261B] hover:bg-[#0E3526] border border-emerald-500/40 px-5 py-2.5 rounded-xl transition-all shadow-md flex-shrink-0"
            >
              Change Vehicle
            </Link>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-[#111520] via-[#151B28] to-[#10141F] border border-white/[0.08] p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-[#1A2132] border border-white/[0.08] text-red-500 rounded-2xl shadow-inner">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-white">Want to see guaranteed compatible components?</h3>
                <p className="text-xs text-gray-400 font-medium">
                  Select your car make and year from your garage to filter exact-fit parts with zero guesswork.
                </p>
              </div>
            </div>
            <Link
              href="/my-car"
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-105 flex items-center gap-2 flex-shrink-0"
            >
              <span>Select My Car</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* Filter Controls */}
        <ProductFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          sortBy={sortBy}
          onSelectSort={setSortBy}
          sellers={sellers}
          selectedSeller={selectedSeller}
          onSelectSeller={setSelectedSeller}
          onResetFilters={() => {
            setSelectedCategory("");
            setSelectedSeller("");
            setSearchQuery("");
            setSortBy("newest");
          }}
        />

        {/* Products Grid */}
        <div>
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div
                  key={i}
                  className="bg-[#10141F] border border-white/[0.06] rounded-2xl sm:rounded-3xl p-3 sm:p-4 h-64 sm:h-72 animate-pulse space-y-3"
                >
                  <div className="h-32 sm:h-44 bg-[#161B28] rounded-xl sm:rounded-2xl" />
                  <div className="h-4 bg-[#161B28] rounded-md w-3/4" />
                  <div className="h-4 bg-[#161B28] rounded-md w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-gradient-to-b from-[#10141F] to-[#0A0D15] border border-white/[0.08] rounded-3xl p-16 text-center space-y-4 shadow-2xl">
              <div className="w-16 h-16 bg-[#161B28] border border-white/[0.08] text-gray-500 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                <PackageSearch className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="font-black text-xl text-white">No Products Found</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto font-medium">
                We couldn&apos;t find any components matching your current filter criteria or search query.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("");
                  setSelectedSeller("");
                  setSearchQuery("");
                  setSortBy("newest");
                }}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-105"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}