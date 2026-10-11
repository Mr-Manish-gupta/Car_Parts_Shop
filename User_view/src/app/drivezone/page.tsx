"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  User,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Settings,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Star,
  CheckCircle2,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";

export default function DriveZoneHomePage() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [subscribedEmail, setSubscribedEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const categories = [
    {
      id: 1,
      title: "Seat Covers",
      subtitle: "Comfort & Style",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Floor Mats",
      subtitle: "Clean & Durable",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Car Audio",
      subtitle: "Feel the Music",
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Lighting",
      subtitle: "See Better, Drive Safer",
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Exterior Accessories",
      subtitle: "Enhance Your Look",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 6,
      title: "Interior Accessories",
      subtitle: "Small Upgrades, Big Impact",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop",
    },
  ];

  const bestSellers = [
    {
      id: 1,
      name: "Premium Leather Seat Covers",
      price: 7999,
      originalPrice: 9999,
      discount: "-20%",
      rating: 4.8,
      reviews: "1.2k",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "3D Car Floor Mats (Set of 4)",
      price: 2549,
      originalPrice: 2999,
      discount: "-15%",
      rating: 4.7,
      reviews: "856",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Pioneer Car Subwoofer",
      price: 8999,
      originalPrice: 9999,
      discount: "-10%",
      rating: 4.8,
      reviews: "642",
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "LED Headlight Bulbs (H4)",
      price: 1999,
      originalPrice: 2499,
      discount: "-20%",
      rating: 4.6,
      reviews: "521",
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Mobile Holder for Car",
      price: 799,
      originalPrice: 999,
      discount: "-20%",
      rating: 4.4,
      reviews: "398",
      image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=600&auto=format&fit=crop",
    },
  ];

  const brands = [
    { name: "3M", logoText: "3M", color: "text-red-600 font-black text-2xl tracking-tighter" },
    { name: "Pioneer", logoText: "Pioneer", color: "text-gray-300 font-bold tracking-widest text-lg" },
    { name: "SONY", logoText: "SONY", color: "text-gray-200 font-serif font-black tracking-widest text-lg" },
    { name: "BLAUPUNKT", logoText: "● BLAUPUNKT", color: "text-blue-400 font-bold tracking-wider text-sm" },
    { name: "MICHELIN", logoText: "MICHELIN", color: "text-gray-300 font-black italic tracking-wide text-sm" },
    { name: "MOTUL", logoText: "MOTUL", color: "text-red-500 font-black tracking-tighter text-lg italic" },
    { name: "GOODYEAR", logoText: "GOODYEAR", color: "text-yellow-400 font-black italic tracking-wider text-sm" },
    { name: "momo", logoText: "momo", color: "text-yellow-500 font-black tracking-tighter text-xl uppercase" },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Rohit Sharma",
      role: "Verified Buyer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
      date: "12 Nov 2024",
      comment: "Amazing quality and fast delivery. The seat covers fit perfectly and look premium. Highly recommended!",
      rating: 5,
    },
    {
      id: 2,
      name: "Priya Mehta",
      role: "Verified Buyer",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop",
      date: "5 Oct 2024",
      comment: "Great collection and genuine products. The prices are also very reasonable. Will shop again!",
      rating: 5,
    },
    {
      id: 3,
      name: "Amit Verma",
      role: "Verified Buyer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      date: "20 Sep 2024",
      comment: "Superb experience! The floor mats are of excellent quality and easy to install. Keep up the good work!",
      rating: 5,
    },
  ];

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribedEmail) {
      setNewsletterSubmitted(true);
      setTimeout(() => setNewsletterSubmitted(false), 4000);
      setSubscribedEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-white selection:bg-red-600 selection:text-white font-sans">
      {/* ======================================================== */}
      {/* 1. STICKY NAVBAR */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-50 bg-[#0A0C10]/95 backdrop-blur-md border-b border-[#1A1E26] shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Logo */}
            <Link href="/drivezone" className="flex items-center gap-2 group flex-shrink-0">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  {/* Stylized Red/White Car Silhouette SVG */}
                  <svg className="w-8 h-8 text-red-600 transition-transform group-hover:scale-105" viewBox="0 0 48 48" fill="none">
                    <path
                      d="M6 30C6 30 11 20 18 17C25 14 34 16 38 21C42 26 44 30 44 30M10 30H40M12 36C10.3431 36 9 34.6569 9 33C9 31.3431 10.3431 30 12 30C13.6569 30 15 31.3431 15 33C15 34.6569 13.6569 36 12 36ZM36 36C34.3431 36 33 34.6569 33 33C33 31.3431 34.3431 30 36 30C37.6569 30 39 31.3431 39 33C39 34.6569 37.6569 36 36 36Z"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <path d="M19 22H29" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  <span className="text-2xl font-black tracking-tight text-white">
                    Drive<span className="text-red-600">Zone</span>
                  </span>
                </div>
                <span className="text-[8px] tracking-[0.25em] text-gray-400 font-bold uppercase pl-9 -mt-1.5">
                  CAR ACCESSORIES
                </span>
              </div>
            </Link>

            {/* Navigation Links with Active Red Line */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
              <Link
                href="/drivezone"
                className="text-white relative py-2 transition-colors border-b-2 border-red-600 font-bold"
              >
                Home
              </Link>
              <Link href="#shop" className="text-gray-400 hover:text-white py-2 transition-colors">
                Shop
              </Link>
              <Link href="#categories" className="text-gray-400 hover:text-white py-2 transition-colors">
                Categories
              </Link>
              <Link href="#about" className="text-gray-400 hover:text-white py-2 transition-colors">
                About
              </Link>
              <Link href="#contact" className="text-gray-400 hover:text-white py-2 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Search Bar + Account + Cart */}
            <div className="flex items-center gap-3.5 flex-1 max-w-sm justify-end">
              <div className="relative w-full max-w-[240px] lg:max-w-[280px]">
                <input
                  type="text"
                  placeholder="Search for car accessories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 bg-[#12151D] border border-[#222734] rounded-xl text-xs text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-red-600 transition-all shadow-inner"
                />
                <Search size={15} className="absolute right-3.5 top-3 text-gray-400 pointer-events-none" />
              </div>

              <button
                type="button"
                className="p-2.5 text-gray-300 hover:text-white hover:bg-[#151922] rounded-xl transition-colors"
                title="My Account"
              >
                <User size={19} />
              </button>

              <button
                type="button"
                onClick={handleAddToCart}
                className="relative p-2.5 text-gray-300 hover:text-white hover:bg-[#151922] rounded-xl transition-colors"
                title="Shopping Cart"
              >
                <ShoppingCart size={19} />
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-black flex items-center justify-center ring-2 ring-[#0A0C10]">
                  {cartCount}
                </span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. CINEMATIC HERO SECTION */}
      {/* ======================================================== */}
      <section className="relative w-full h-[620px] lg:h-[700px] overflow-hidden flex flex-col justify-between">
        {/* Background Image (Driving towards highway sunset) */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop"
            alt="Porsche on highway at sunset"
            fill
            priority
            unoptimized
            className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Deep Dark Cinema Gradients for Crystal Clear Text */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/95 via-[#07080B]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-transparent to-[#07080B]/60" />
        </div>

        {/* Hero Content (Left Aligned) */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 lg:pt-28 z-10">
          <div className="max-w-2xl space-y-4">
            <span className="inline-block text-[11px] font-extrabold tracking-[0.25em] text-red-500 uppercase">
              PREMIUM CAR ACCESSORIES
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Upgrade Your Ride, <br />
              <span className="text-red-600">Style</span> Your Journey
            </h1>

            <p className="text-sm sm:text-base text-gray-300 font-medium max-w-lg leading-relaxed pt-1">
              Top quality car accessories for a better, safer and more comfortable driving experience.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 pt-4">
              <Link
                href="#shop"
                className="px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-105 flex items-center gap-2 group"
              >
                <span>Shop Now</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 backdrop-blur-md font-bold text-sm rounded-xl transition-all flex items-center gap-2.5 hover:border-white/40"
              >
                <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center">
                  <Play size={10} className="fill-black ml-0.5" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>
          </div>
        </div>

        {/* Video Scrubber Controls at Bottom of Hero */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 z-10">
          <div className="flex items-center gap-3 text-xs text-gray-300 bg-[#0D1016]/80 backdrop-blur-md p-2.5 px-4 rounded-xl border border-white/10 shadow-2xl">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 hover:text-white transition-colors"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>

            <span className="font-mono text-[11px] text-gray-400">0:03 / 0:30</span>

            {/* Scrubber Timeline */}
            <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer relative">
              <div className="h-full bg-red-600 w-[18%] rounded-full shadow-[0_0_8px_rgba(229,9,20,0.8)]" />
            </div>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1 hover:text-white transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>

            <button className="p-1 hover:text-white transition-colors hidden sm:block">
              <Settings size={14} />
            </button>

            <button className="p-1 hover:text-white transition-colors">
              <Maximize2 size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. TRUST FEATURES STRIP */}
      {/* ======================================================== */}
      <section className="bg-[#0B0D12] border-y border-[#171A22] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Feature 1 */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#141821] border border-[#212735] flex items-center justify-center text-gray-300 flex-shrink-0 shadow-sm">
                <Truck size={22} className="text-gray-200" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Free Shipping</h4>
                <p className="text-xs text-gray-400 font-medium">On orders over ₹999</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#141821] border border-[#212735] flex items-center justify-center text-gray-300 flex-shrink-0 shadow-sm">
                <ShieldCheck size={22} className="text-gray-200" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Secure Payments</h4>
                <p className="text-xs text-gray-400 font-medium">100% safe & trusted</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#141821] border border-[#212735] flex items-center justify-center text-gray-300 flex-shrink-0 shadow-sm">
                <RotateCcw size={22} className="text-gray-200" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Easy Returns</h4>
                <p className="text-xs text-gray-400 font-medium">Hassle free 7 days</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#141821] border border-[#212735] flex items-center justify-center text-gray-300 flex-shrink-0 shadow-sm">
                <Headphones size={22} className="text-gray-200" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">24/7 Support</h4>
                <p className="text-xs text-gray-400 font-medium">We&apos;re here to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. SHOP BY CATEGORY */}
      {/* ======================================================== */}
      <section id="categories" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-0.5 bg-red-600 inline-block" />
              <span className="text-[11px] font-black text-red-500 uppercase tracking-widest">
                SHOP BY CATEGORY
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Find What Your Car Needs
            </h2>
          </div>

          <Link
            href="#categories"
            className="text-xs sm:text-sm font-bold text-gray-400 hover:text-white flex items-center gap-1 group transition-colors"
          >
            <span>View All</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group relative rounded-2xl overflow-hidden bg-[#12151D] border border-[#1F2430] hover:border-red-600/60 transition-all duration-300 hover:shadow-xl hover:shadow-red-600/10 cursor-pointer flex flex-col justify-end h-56 p-4"
            >
              {/* Image with Dark Vignette */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  unoptimized
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090B0F] via-[#090B0F]/70 to-transparent" />
              </div>

              {/* Text Info */}
              <div className="relative z-10 space-y-0.5">
                <h3 className="font-black text-sm text-white group-hover:text-red-400 transition-colors">
                  {cat.title}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-gray-400 font-medium truncate">{cat.subtitle}</p>
                  <ArrowRight
                    size={13}
                    className="text-gray-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. BEST SELLERS PRODUCT GRID */}
      {/* ======================================================== */}
      <section id="shop" className="py-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#161922]">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-0.5 bg-red-600 inline-block" />
              <span className="text-[11px] font-black text-red-500 uppercase tracking-widest">
                POPULAR PRODUCTS
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Best Sellers</h2>
          </div>

          <Link
            href="#shop"
            className="text-xs sm:text-sm font-bold text-gray-400 hover:text-white flex items-center gap-1 group transition-colors"
          >
            <span>View All Products</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 5 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {bestSellers.map((prod) => (
            <div
              key={prod.id}
              className="group bg-[#0F1218] border border-[#1C212B] hover:border-red-600/50 rounded-2xl p-3.5 space-y-3 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/10"
            >
              <div className="space-y-3">
                {/* Product Image Frame */}
                <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#161A22] border border-white/5 flex items-center justify-center">
                  {/* Discount Badge */}
                  <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 bg-red-600 text-white font-black text-[10px] rounded-md shadow-md">
                    {prod.discount}
                  </span>

                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <h3 className="font-bold text-xs sm:text-sm text-gray-100 line-clamp-1 group-hover:text-white transition-colors">
                    {prod.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 text-xs">
                    <div className="flex items-center text-amber-400">
                      <Star size={12} className="fill-amber-400" />
                      <span className="ml-1 font-extrabold text-[11px] text-gray-200">{prod.rating}</span>
                    </div>
                    <span className="text-gray-500 text-[11px]">({prod.reviews})</span>
                  </div>
                </div>
              </div>

              {/* Pricing & Add to Cart Action */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-sm sm:text-base font-black text-white">
                    ₹{prod.price.toLocaleString("en-IN")}
                  </div>
                  <div className="text-[11px] text-gray-500 line-through">
                    ₹{prod.originalPrice.toLocaleString("en-IN")}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="p-2.5 bg-[#171B24] hover:bg-red-600 text-gray-300 hover:text-white rounded-xl transition-all duration-200 border border-white/5 hover:border-red-600 shadow-sm"
                  title="Add to Cart"
                >
                  <ShoppingCart size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. PROMOTIONAL BANNER */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#11141B] via-[#151922] to-[#12141B] border border-[#222733] shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            
            {/* Left Luxury Interior Photo */}
            <div className="md:col-span-4 relative h-64 md:h-80 w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop"
                alt="Luxury Car Interior"
                fill
                unoptimized
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#11141B] hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11141B] to-transparent md:hidden" />
            </div>

            {/* Center Offer Content */}
            <div className="md:col-span-5 p-8 sm:p-10 space-y-3 text-center md:text-left">
              <span className="text-[11px] font-black text-gray-400 tracking-[0.2em] uppercase">
                LIMITED TIME OFFER
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Get Up to <span className="text-red-600">30% OFF</span>
              </h2>
              <p className="text-sm text-gray-300 font-medium">
                On Selected Car Accessories
              </p>

              <div className="pt-2">
                <Link
                  href="#shop"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-105"
                >
                  <span>Shop Now</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right Slanted Red Accent Graphic */}
            <div className="md:col-span-3 h-full hidden md:flex items-center justify-center p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-bl from-red-600/30 to-transparent clip-path-slant" />
              <div className="relative z-10 text-center space-y-2">
                <svg className="w-16 h-16 text-red-600 mx-auto" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M6 30C6 30 11 20 18 17C25 14 34 16 38 21C42 26 44 30 44 30M10 30H40M12 36C10.3431 36 9 34.6569 9 33C9 31.3431 10.3431 30 12 30C13.6569 30 15 31.3431 15 33C15 34.6569 13.6569 36 12 36ZM36 36C34.3431 36 33 34.6569 33 33C33 31.3431 34.3431 30 36 30C37.6569 30 39 31.3431 39 33C39 34.6569 37.6569 36 36 36Z"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="font-serif italic font-bold text-white text-lg">Drive Better</p>
                <p className="font-serif italic text-red-500 text-sm -mt-1">Live Better</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. TOP BRANDS WE CARRY */}
      {/* ======================================================== */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#171A22]">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-0.5 bg-red-600 inline-block" />
            <span className="text-[11px] font-black text-red-500 uppercase tracking-widest">
              TRUSTED BRANDS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Top Brands We Carry
          </h2>
        </div>

        {/* 8 Monochrome Brand Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {brands.map((b, i) => (
            <div
              key={i}
              className="h-20 bg-[#10131A] hover:bg-[#161B24] border border-[#1E232F] hover:border-gray-600/40 rounded-2xl flex items-center justify-center p-3 transition-all duration-200 cursor-pointer shadow-sm group"
            >
              <span className={`${b.color} transition-transform group-hover:scale-105 select-none`}>
                {b.logoText}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. CUSTOMER REVIEWS (TESTIMONIALS) */}
      {/* ======================================================== */}
      <section className="py-14 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#171A22]">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-0.5 bg-red-600 inline-block" />
              <span className="text-[11px] font-black text-red-500 uppercase tracking-widest">
                WHAT OUR CUSTOMERS SAY
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Trusted by Car Lovers
            </h2>
          </div>

          <Link
            href="#reviews"
            className="text-xs sm:text-sm font-bold text-gray-400 hover:text-white flex items-center gap-1 group transition-colors"
          >
            <span>View All Reviews</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#0F1218] border border-[#1D222D] rounded-3xl p-6 space-y-4 shadow-xl hover:border-red-600/30 transition-all duration-300"
            >
              {/* User info */}
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                  <Image src={t.avatar} alt={t.name} fill unoptimized className="object-cover" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white">{t.name}</h4>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 size={11} /> {t.role}
                  </span>
                </div>
              </div>

              {/* 5 Stars */}
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-xs text-gray-300 leading-relaxed font-medium">
                &ldquo;{t.comment}&rdquo;
              </p>

              {/* Date */}
              <p className="text-[10px] text-gray-500 font-medium pt-1">
                — {t.date}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 9. PREMIUM DARK FOOTER */}
      {/* ======================================================== */}
      <footer id="contact" className="bg-[#050608] border-t border-[#181B22] pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
            {/* Col 1: Brand */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-1.5">
                <svg className="w-8 h-8 text-red-600" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M6 30C6 30 11 20 18 17C25 14 34 16 38 21C42 26 44 30 44 30M10 30H40M12 36C10.3431 36 9 34.6569 9 33C9 31.3431 10.3431 30 12 30C13.6569 30 15 31.3431 15 33C15 34.6569 13.6569 36 12 36ZM36 36C34.3431 36 33 34.6569 33 33C33 31.3431 34.3431 30 36 30C37.6569 30 39 31.3431 39 33C39 34.6569 37.6569 36 36 36Z"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-2xl font-black tracking-tight text-white">
                  Drive<span className="text-red-600">Zone</span>
                </span>
              </div>
              <p className="text-xs text-gray-400 max-w-sm leading-relaxed font-medium">
                Premium automotive accessories designed for driving enthusiasts. High durability, precision fitment, and verified genuine products.
              </p>
            </div>

            {/* Col 2: Quick Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2 text-xs text-gray-400 font-medium">
                <li><Link href="/drivezone" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="#shop" className="hover:text-white transition-colors">Shop</Link></li>
                <li><Link href="#categories" className="hover:text-white transition-colors">Categories</Link></li>
                <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Col 3: Customer Service */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Customer Service</h4>
              <ul className="space-y-2 text-xs text-gray-400 font-medium">
                <li><Link href="#faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="#shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                <li><Link href="#returns" className="hover:text-white transition-colors">Return Policy</Link></li>
                <li><Link href="#terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link></li>
                <li><Link href="#privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Col 4: Stay Connected */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Stay Connected</h4>
              <p className="text-[11px] text-gray-400 font-medium">
                Subscribe to get special offers, new arrivals and more!
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={subscribedEmail}
                    onChange={(e) => setSubscribedEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#12151D] border border-[#232733] rounded-xl text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-red-600"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex-shrink-0"
                  >
                    Subscribe
                  </button>
                </div>
                {newsletterSubmitted && (
                  <p className="text-[10px] text-emerald-400 font-bold">
                    ✓ Thank you for subscribing to DriveZone!
                  </p>
                )}
              </form>

              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-2 text-gray-400">
                <span className="w-8 h-8 rounded-full bg-[#12151D] border border-[#222733] flex items-center justify-center hover:text-white hover:border-gray-500 cursor-pointer text-xs font-bold transition-all">f</span>
                <span className="w-8 h-8 rounded-full bg-[#12151D] border border-[#222733] flex items-center justify-center hover:text-white hover:border-gray-500 cursor-pointer text-xs font-bold transition-all">📸</span>
                <span className="w-8 h-8 rounded-full bg-[#12151D] border border-[#222733] flex items-center justify-center hover:text-white hover:border-gray-500 cursor-pointer text-xs font-bold transition-all">▶</span>
                <span className="w-8 h-8 rounded-full bg-[#12151D] border border-[#222733] flex items-center justify-center hover:text-white hover:border-gray-500 cursor-pointer text-xs font-bold transition-all">𝕏</span>
              </div>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 border-t border-[#161922] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>© 2026 DriveZone. All rights reserved.</p>
            <p className="text-gray-400 font-medium">Drive Your Style | Premium Car Accessories</p>
          </div>

        </div>
      </footer>
    </div>
  );
}
