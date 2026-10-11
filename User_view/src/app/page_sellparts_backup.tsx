"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCar } from "@/context/CarContext";
import Link from "next/link";
import { 
  Search, Car as CarIcon, Wrench, ShieldCheck, ArrowRight, 
  Star, ShoppingCart, Sparkles, Filter, CheckCircle2, ChevronRight, 
  Truck, RotateCcw, Store, Users, Award
} from "lucide-react";
import { Button } from "@/components/common/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { carService } from "@/services/carService";
import { productService } from "@/services/productService";
import { Car } from "@/types/car";
import { Product } from "@/types/product";

// Visual Categories Display
const categories = [
  { name: "Brakes & Rotors", count: "120+ Parts", icon: "🛑", color: "bg-red-50 text-red-600 border-red-100" },
  { name: "Engine Components", count: "350+ Parts", icon: "⚙️", color: "bg-amber-50 text-amber-600 border-amber-100" },
  { name: "Filters & Fluids", count: "85+ Parts", icon: "🛢️", color: "bg-blue-50 text-blue-600 border-blue-100" },
  { name: "Suspension & Steering", count: "190+ Parts", icon: "🔩", color: "bg-purple-50 text-purple-600 border-purple-100" },
  { name: "Electricals & Lights", count: "210+ Parts", icon: "💡", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { name: "Batteries & Power", count: "45+ Parts", icon: "🔋", color: "bg-orange-50 text-orange-600 border-orange-100" },
];

// Top Verified Multi-Vendor Dealers Across India
const topVerifiedVendors = [
  { name: "Sharma Auto Spares", city: "Delhi NCR", rating: 4.9, parts: "1,200+ parts", icon: "🏬", badge: "Top Rated" },
  { name: "Brembo Official Distribution", city: "Bengaluru", rating: 5.0, parts: "450+ parts", icon: "🏎️", badge: "Brand Direct" },
  { name: "Apex Brakes & Motors", city: "Mumbai", rating: 4.8, parts: "2,100+ parts", icon: "⚙️", badge: "Super Seller" },
  { name: "Gupta Brothers Motor Works", city: "Jaipur", rating: 4.7, parts: "840+ parts", icon: "🔧", badge: "Verified Hub" },
  { name: "Punjab Tractors & Spares", city: "Ludhiana", rating: 4.9, parts: "1,600+ parts", icon: "🚜", badge: "OEM Partner" },
  { name: "Deccan Auto Traders", city: "Hyderabad", rating: 4.8, parts: "1,150+ parts", icon: "⚡", badge: "Express Dispatch" },
];

export default function Home() {
  const router = useRouter();
  const { selectCar } = useCar();

  const [cars, setCars] = useState<Car[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectBrand, setSelectBrand] = useState("");
  const [selectModel, setSelectModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");



  

 
    const bestSellRef = useRef<HTMLDivElement>(null);
    const scrollBestRight = () => {
      if (bestSellRef.current) bestSellRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };
    const scrollBestLeft = () => {
      if (bestSellRef.current) bestSellRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };


    const topSellRef = useRef<HTMLDivElement>(null);
    const scrollTopRight = () => {
      if (topSellRef.current) topSellRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };
    const scrollTopLeft = () => {
      if (topSellRef.current) topSellRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };


    const offersRef = useRef<HTMLDivElement>(null);
    const scrollOffersRight = () => {
      if (offersRef.current) offersRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };
    const scrollOffersLeft = () => {
      if (offersRef.current) offersRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };





  // Fetch real cars and products from PostgreSQL backend
  useEffect(() => {
    carService.getAllCars()
      .then((backendCars) => {
        if (Array.isArray(backendCars)) {
          setCars(backendCars);
        }
      })
      .catch((e) => console.error("Failed to load cars from backend", e));

    productService.getAllProducts()
      .then((backendProducts) => {
        if (Array.isArray(backendProducts)) {
          setProducts(backendProducts);
        }
      })
      .catch((e) => console.error("Failed to load products from backend", e));
  }, []);

  const brands: string[] = Array.from(new Set(cars.map((c) => c.brand)));

  const availableModels: string[] = selectBrand
    ? Array.from(
        new Set(
          cars
            .filter((c) => c.brand.toLowerCase() === selectBrand.toLowerCase())
            .map((c) => c.model)
        )
      )
    : [];

  const availableYears: number[] = selectModel
    ? Array.from(
        new Set(
          cars
            .filter(
              (c) =>
                c.brand.toLowerCase() === selectBrand.toLowerCase() &&
                c.model.toLowerCase() === selectModel.toLowerCase()
            )
            .map((c) => c.year)
        )
      ).sort((a, b) => b - a)
    : [];

  // Handle "Find Compatible Parts" Click
  const handleFindParts = () => {
    if (!selectBrand || !selectModel) {
      alert("Please select at least a Car Brand and Model.");
      return;
    }

    const matchedCar = cars.find(
      (c) =>
        c.brand.toLowerCase() === selectBrand.toLowerCase() &&
        c.model.toLowerCase() === selectModel.toLowerCase() &&
        (!selectedYear || c.year === Number(selectedYear))
    ) || cars.find(
      (c) =>
        c.brand.toLowerCase() === selectBrand.toLowerCase() &&
        c.model.toLowerCase() === selectModel.toLowerCase()
    );

    if (matchedCar) {
      selectCar(matchedCar);
      router.push(`/shop?carId=${matchedCar.id}`);
    } else {
      router.push(`/shop?brand=${encodeURIComponent(selectBrand)}&model=${encodeURIComponent(selectModel)}`);
    }
  };
 
  return (
    <div className="space-y-16 pb-16 bg-slate-50">
      
      {/* 1. HERO SECTION & CAR SELECTOR */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero Left: Headline */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold rounded-full backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-blue-400" /> India&apos;s #1 Genuine Car Spare Parts Marketplace
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
              Find 100% Exact Parts for <span className="text-blue-400 underline decoration-blue-500/40">Your Vehicle</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Never buy the wrong part again. Select your car model to instantly see thousands of verified compatible OEM and aftermarket parts with doorstep delivery.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Fitment Guarantee
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free Returns in 7 Days
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Verified Sellers
              </div>
            </div>
          </div>

         
          {/* Hero Right: Interactive Boodmo-Style Car Selector Box */}
<div className="lg:col-span-5 bg-white text-black p-6 sm:p-8 rounded-3xl shadow-2xl border-2 border-black/10 space-y-5">
  
  <div className="flex items-center gap-3 border-b border-black/10 pb-4">
    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
      <CarIcon className="w-6 h-6 text-blue-600" />
    </div>
    <div>
      <h3 className="font-black text-lg text-black">Select Your Vehicle</h3>
      <p className="text-xs text-black/60 font-medium">Find 100% guaranteed fitting parts</p>
    </div>
  </div>

  <div className="space-y-4">
    
    {/* 1. Brand Dropdown */}
    <div>
      <label className="block text-xs font-bold text-black mb-1">1. Car Brand (Make) *</label>
      <select
        value={selectBrand}
        onChange={(e) => {
          setSelectBrand(e.target.value);
          setSelectModel("");
          setSelectedYear("");
        }}
        className="w-full px-3.5 py-2.5 bg-white border border-black/20 rounded-xl text-xs font-bold text-black focus:border-blue-600 outline-none"
      >
        <option value="">Select Brand (e.g. Maruti, Hyundai, Tata)</option>
        {brands.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>
    </div>

    <div className="grid grid-cols-2 gap-3">
      {/* 2. Model Dropdown (Dynamic) */}
      <div>
        <label className="block text-xs font-bold text-black mb-1">2. Model *</label>
        <select
          disabled={!selectBrand}
          value={selectModel}
          onChange={(e) => {
            setSelectModel(e.target.value);
            setSelectedYear("");
          }}
          className="w-full px-3.5 py-2.5 bg-white border border-black/20 rounded-xl text-xs font-bold text-black focus:border-blue-600 outline-none disabled:bg-black/5 disabled:text-black/40"
        >
          <option value="">{selectBrand ? "Select Model" : "Choose Brand 1st"}</option>
          {availableModels.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Year Dropdown (Dynamic) */}
      <div>
        <label className="block text-xs font-bold text-black mb-1">3. Year</label>
        <select
          disabled={!selectModel}
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-white border border-black/20 rounded-xl text-xs font-bold text-black focus:border-blue-600 outline-none disabled:bg-black/5 disabled:text-black/40"
        >
          <option value="">All Years</option>
          {availableYears.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </div>

    {/* Search Button */}
    <button
      onClick={handleFindParts}
      className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] mt-2"
    >
      <Search className="w-4 h-4" /> Find Compatible Parts
    </button>

  </div>
</div>

        </div>
      </section>


                  {/* 🚗 POPULAR CAR BRANDS QUICK SELECTOR STRIP */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
              <div className="bg-white border-2 border-black/10 rounded-2xl p-4 shadow-xl flex items-center gap-3 overflow-x-auto">
                <span className="text-xs font-black text-black/50 uppercase tracking-wider flex-shrink-0 px-2">
                  Popular Makes:
                </span>
                {["Maruti Suzuki", "Hyundai", "Tata Motors", "Mahindra", "Toyota", "Honda", "Kia"].map((brandName) => (
                  <button
                    key={brandName}
                    onClick={() => {
                      setSelectBrand(brandName.split(" ")[0]);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="px-4 py-2 bg-black/5 hover:bg-black hover:text-white text-black text-xs font-bold rounded-xl transition-all flex-shrink-0 shadow-sm"
                  >
                    {brandName}
                  </button>
                ))}
              </div>
            </div>



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-black rounded-3xl p-6 text-white shadow-lg shadow-pink-600 flex flex-col md:flex-row items-center justify-between gap-4">


          <div className="space-y-2 text-center md:text-left">
            <span className="inline-block px-2.5 py-2 bg-amber-400 text-black text-[10px] font-black rounded-md uppercase tracking-wider">New User Exclusive</span>
            <h3 className="text-lg sm:text-2xl font-black tracking-tight">Get Flat 10% Instant Discount on Your first Order!</h3>
            <p className="">Use code at checkout. Valid on all genuine car components. Min Order: ₹999</p>
          </div>


          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20">
            <div className="px-3.5 py-2 bg-white text-black font-black text-sm rounded-xl font-mono tracking-wider">FIRST10</div>
            <button onClick={() => {
              navigator.clipboard.writeText("FIRST10");
              alert("Coupon 'FIRST10' Copied to Clipboard! Paste it at checkout.");
            }}className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-black font-black text-xs rounded-xl shadow-md transition-all hover:scale-105">Copy Code</button>
          </div>
        </div>
      </div>




      {/* 🛡️ COMMERCIAL TRUST & FITMENT GUARANTEE BADGES */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  <div className="p-5 bg-white border border-black/10 rounded-2xl flex items-center gap-4 shadow-sm">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-black">100% Genuine OEM Parts</h4>
                      <p className="text-[11px] text-black/60 font-medium">Sourced directly from verified manufacturers</p>
                    </div>
                  </div>

                  <div className="p-5 bg-white border border-black/10 rounded-2xl flex items-center gap-4 shadow-sm">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                      <Truck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-black">Express Doorstep Delivery</h4>
                      <p className="text-[11px] text-black/60 font-medium">Delivering to 19,000+ pincodes across India</p>
                    </div>
                  </div>

                  <div className="p-5 bg-white border border-black/10 rounded-2xl flex items-center gap-4 shadow-sm">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                      <RotateCcw className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-black">7-Day Fitment Guarantee</h4>
                      <p className="text-[11px] text-black/60 font-medium">Zero-hassle replacement if part doesn&apos;t fit</p>
                    </div>
                  </div>

                </div>
              </div>


      {/* 2. POPULAR CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore by Category
            </h2>
            <p className="text-sm text-slate-500 mt-1">High-quality components for every vehicle system</p>
          </div>
          <Link href="/shop" className="text-sm font-semibold text-blue-600  flex items-center gap-1 group">
            View All <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, idx) => (
            <Link 
              key={idx} 
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all text-center space-y-3 group"
            >
              <div className="text-3xl p-3 rounded-xl inline-block bg-slate-50 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900  transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>


          <div className="spave-y-12 pb-16 bg-slate-50">
             <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="w-full">
                    
                  <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                          Best Selling Spare Parts
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                          Directly from verified manufacturers and trusted distributors
                        </p>
                      </div>
                      <Link href="/shop" className="text-xs sm:text-sm font-semibold text-blue-600  flex items-center gap-1 group whitespace-nowrap">
                        Browse All <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>

                    <div className="relative group w-full">
                      
                    <button 
                        onClick={scrollBestLeft}
                        className="hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity absolute -left-4 top-1/2 -translate-y-1/2 z-10 items-center justify-center p-3 bg-zinc-900 text-white rounded-full hover:bg-zinc-800 shadow-xl border border-black/10 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                        aria-label="Scroll left"
                      >
                        <ArrowRight size={20} className="rotate-180" /> 
                      </button>

                      <div 
                        ref={bestSellRef}
                        className=" flex overflow-x-auto  pb-4 scrollbar-none snap-x touch-pan-x gap-4"
                      >
                        {products.length > 0 ? (
                          products.map((product) => (
                            <div 
                              key={product.id} 
                              className="w-full sm:w-[240px] sm:flex-shrink-0 sm:snap-start"
                            >
                              <ProductCard product={product} />
                            </div>
                          ))
                        ) : (
                          <div className="w-full py-8 text-center text-sm text-black/40 font-medium">
                            No products in catalog yet. New stock arriving soon.
                          </div>
                        )}
                      </div>

                      <button 
                        onClick={scrollBestRight}
                        className="hidden opacity-0 group-hover:opacity-100 transition-opacity sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 items-center justify-center p-3 bg-zinc-900 text-white rounded-full hover:bg-zinc-800 shadow-xl border border-black/10 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                        aria-label="Scroll right"
                      >
                        <ArrowRight size={20} />
                      </button>

                    </div>
                    
                  </div>
                  </section>


                  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                          <div className="w-full">
                            <div className="flex items-center justify-between mb-6">
                              <div>
                                <h2 className="text-xl sm:text-3xl font-extrabold text-black tracking-tight">Top seller Products</h2>
                                <p className="text-xs sm:text-sm text-black/50 mt-1">
                                    Top seller selling products
                                </p>
                              </div>

                              <Link href="/shop?sort=tranding" className="text-xs sm:text-sm font-semibold text-blue-600  flex items-center justify-center gap-1 group whitespace-nowrap">
                                 Browse All <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                              </Link>
                            </div>



                            <div className="relative group w-full">
                      
                            <button 
                                onClick={scrollTopLeft}
                                className="hidden opacity-0 group-hover:opacity-100 transition-opacity  sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 items-center justify-center p-3 bg-zinc-900 text-white rounded-full hover:bg-zinc-800 shadow-xl border border-black/10 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                                aria-label="Scroll left"
                              >
                                <ArrowRight size={20} className="rotate-180" /> 
                              </button>

                              <div  
                                ref={topSellRef}
                                className=" flex overflow-x-auto pb-4 scrollbar-none snap-x touch-pan-x gap-4"
                              >
                                {products.length > 0 ? (
                                  products.map((product) => (
                                    <div 
                                      key={product.id} 
                                      className="w-full sm:w-[240px] sm:flex-shrink-0 sm:snap-start"
                                    >
                                      <ProductCard product={product} />
                                    </div>
                                  ))
                                ) : (
                                  <div className="w-full py-8 text-center text-sm text-black/40 font-medium">
                                    No top seller products yet.
                                  </div>
                                )}
                              </div>

                              <button 
                                onClick={scrollTopRight}
                                className="hidden opacity-0 group-hover:opacity-100 transition-opacity sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 items-center justify-center p-3 bg-zinc-900 text-white rounded-full hover:bg-zinc-800 shadow-xl border border-black/10 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                                aria-label="Scroll right"
                              >
                                <ArrowRight size={20} />
                              </button>

                            </div>
                          </div>
                  </section>



                  <section className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                          <div className="w-full">
                            <div className="flex items-center justify-between mb-6">
                              <div>
                                <h2 className="text-xl sm:text-3xl font-extrabold text-black tracking-tight">Best Offer Products</h2>
                                <p className="text-xs sm:text-sm text-black/50 mt-1">
                                    Seller best offer this products
                                </p>
                              </div>

                              <Link href="/shop?sort=tranding" className="text-xs sm:text-sm font-semibold text-blue-600  flex items-center justify-center gap-1 group whitespace-nowrap">
                                 Browse All <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                              </Link>
                            </div>



                            <div className="relative group w-full">
                      
                            <button 
                                onClick={scrollOffersLeft}
                                className="hidden opacity-0 group-hover:opacity-100 transition-opacity sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 items-center justify-center p-3 bg-zinc-900 text-white rounded-full hover:bg-zinc-800 shadow-xl border border-black/10 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                                aria-label="Scroll left"
                              >
                                <ArrowRight size={20} className="rotate-180" /> 
                              </button>

                              <div 
                                ref={offersRef}
                                className=" flex overflow-x-auto pb-4 scrollbar-none snap-x sm:touch-pan-x gap-4"
                              >
                                {products.length > 0 ? (
                                  products.map((product) => (
                                    <div 
                                      key={product.id} 
                                      className="w-full sm:w-[240px] sm:flex-shrink-0 sm:snap-start"
                                    >
                                      <ProductCard product={product} />
                                    </div>
                                  ))
                                ) : (
                                  <div className="w-full py-8 text-center text-sm text-black/40 font-medium">
                                    No discount offers currently active.
                                  </div>
                                )}
                              </div>

                              <button 
                                onClick={scrollOffersRight}
                                className="hidden opacity-0 group-hover:opacity-100 transition-opacity sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 items-center justify-center p-3 bg-zinc-900 text-white rounded-full hover:bg-zinc-800 shadow-xl border border-black/10 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                                aria-label="Scroll right"
                              >
                                <ArrowRight size={20} />
                              </button>

                            </div>
                          </div>
                  </section>
              </div>    





      {/* 4. SPECIAL PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider">
              Limited Period Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Get Up to 30% Off on Full Service Kits & Brake Rotors
            </h2>
            <p className="text-sm text-blue-100">
              Upgrade your vehicle performance with premium certified parts. Free doorstep shipping across India.
            </p>
          </div>
          <Link href="/shop" className="flex-shrink-0">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-slate-100 font-bold px-8 py-3.5 shadow-lg">
              Shop Promotional Deals <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}