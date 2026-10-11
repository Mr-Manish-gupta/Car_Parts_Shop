"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Star,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Flame,
  Zap,
  Gauge,
  Sparkles,
  SlidersHorizontal,
  Compass,
  Check,
  Car,
  Clock,
  Eye,
  Heart,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { productService } from "@/services/productService";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";

export default function DriveZoneHomePage() {
  const router = useRouter();
  const { addToCart } = useCart();

  // Hero Slider State
  const [activeSlide, setActiveSlide] = useState(0);

  // Hotspot Car Anatomy State
  const [activeHotspot, setActiveHotspot] = useState<number>(0);

  // Tab switcher for Best Sellers
  const [activeTab, setActiveTab] = useState<"trending" | "performance" | "interior" | "lighting">("trending");

  // Flash Sale Countdown State
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 42, seconds: 18 });

  // Newsletter State
  const [subscribedEmail, setSubscribedEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Added-to-cart toast notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Backend Products & Categories
  const [backendProducts, setBackendProducts] = useState<Product[]>([]);
  const [backendCategories, setBackendCategories] = useState<any[]>([]);

  useEffect(() => {
    productService
      .getAllProducts()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setBackendProducts(data);
        }
      })
      .catch((err) => console.log("Using rich curated products on Home:", err));

    productService
      .getCategories()
      .then((cats) => {
        if (Array.isArray(cats) && cats.length > 0) {
          setBackendCategories(cats);
        }
      })
      .catch((err) => console.log("Categories fetch:", err));
  }, []);

  const dynamicTabProducts = useMemo(() => {
    if (backendProducts.length === 0) return null;

    if (activeTab === "trending") {
      return backendProducts.slice(0, 8);
    } else if (activeTab === "performance") {
      const filtered = backendProducts.filter((p) =>
        (p.categoryName || "").toLowerCase().includes("performance") ||
        (p.categoryName || "").toLowerCase().includes("engine") ||
        (p.categoryName || "").toLowerCase().includes("brake") ||
        (p.categoryName || "").toLowerCase().includes("exhaust")
      );
      return filtered.length > 0 ? filtered.slice(0, 8) : backendProducts.slice(0, 8);
    } else if (activeTab === "interior") {
      const filtered = backendProducts.filter((p) =>
        (p.categoryName || "").toLowerCase().includes("interior") ||
        (p.categoryName || "").toLowerCase().includes("seat") ||
        (p.categoryName || "").toLowerCase().includes("mat") ||
        (p.categoryName || "").toLowerCase().includes("cover")
      );
      return filtered.length > 0 ? filtered.slice(0, 8) : backendProducts.slice(0, 8);
    } else if (activeTab === "lighting") {
      const filtered = backendProducts.filter((p) =>
        (p.categoryName || "").toLowerCase().includes("light") ||
        (p.categoryName || "").toLowerCase().includes("lamp") ||
        (p.categoryName || "").toLowerCase().includes("led") ||
        (p.categoryName || "").toLowerCase().includes("headlight")
      );
      return filtered.length > 0 ? filtered.slice(0, 8) : backendProducts.slice(0, 8);
    }
    return backendProducts.slice(0, 8);
  }, [backendProducts, activeTab]);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Hero Slides Data
  const slides = [
    {
      id: 1,
      badge: "DRIVEZONE FLAGSHIP",
      title: "UPGRADE YOUR RIDE,",
      highlight: "STYLE YOUR JOURNEY",
      subtitle:
        "Precision engineered car accessories, interior upgrades and OEM replacement spares designed for pure driving exhilaration.",
      bgImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop",
      primaryCta: { text: "Explore Catalog", href: "/shop" },
      secondaryCta: { text: "Garage Fitment", href: "/my-car" },
      stat: "45,000+",
      statLabel: "Guaranteed Spares",
    },
    {
      id: 2,
      badge: "EXTREME MOTORSPORT BRAKING",
      title: "RACE READY STOPPING,",
      highlight: "CARBON PERFORMANCE",
      subtitle:
        "High-performance drilled brake rotors, ceramic racing pads, and braided fluid lines for maximum thermal endurance.",
      bgImage: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1920&auto=format&fit=crop",
      primaryCta: { text: "Shop Brakes & Calipers", href: "/shop?category=Brakes" },
      secondaryCta: { text: "View Fitment Guide", href: "/my-car" },
      stat: "100% OEM",
      statLabel: "Certified Quality",
    },
    {
      id: 3,
      badge: "COCKPIT LUXURY & SOUND",
      title: "AUDIOPHILE SOUND &",
      highlight: "NAPPA LEATHER COMFORT",
      subtitle:
        "Custom-tailored 3D floor mats, ventilated seat cushions, and high-fidelity DSP sound stages that elevate every mile.",
      bgImage: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1920&auto=format&fit=crop",
      primaryCta: { text: "Explore Interior", href: "/shop?category=Interior" },
      secondaryCta: { text: "Car Audio Systems", href: "/shop?category=Audio" },
      stat: "4.9 / 5.0",
      statLabel: "Driver Satisfaction",
    },
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Categories
  const categories = [
    {
      id: 1,
      title: "Seat Covers",
      count: "140+ Models",
      subtitle: "Nappa Leather & Breathable Fabrics",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop",
      link: "/shop?category=Seat+Covers",
    },
    {
      id: 2,
      title: "3D Floor Mats",
      count: "95+ Custom Cuts",
      subtitle: "All-Weather 7D Laser Measured",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop",
      link: "/shop?category=Floor+Mats",
    },
    {
      id: 3,
      title: "Car Audio & DSP",
      count: "80+ Systems",
      subtitle: "Subwoofers, Amps & Touchscreens",
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600&auto=format&fit=crop",
      link: "/shop?category=Audio",
    },
    {
      id: 4,
      title: "LED & Laser Lights",
      count: "210+ Bulbs",
      subtitle: "Ultra High-Lumen Headlights & Fog",
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=600&auto=format&fit=crop",
      link: "/shop?category=Lighting",
    },
    {
      id: 5,
      title: "Braking & Wheels",
      count: "120+ Rotors",
      subtitle: "Ceramic Pads & Caliper Covers",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=600&auto=format&fit=crop",
      link: "/shop?category=Brakes",
    },
    {
      id: 6,
      title: "Smart Accessories",
      count: "160+ Gadgets",
      subtitle: "Dashcams, Wireless Chargers & OBD",
      image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=600&auto=format&fit=crop",
      link: "/shop?category=Electronics",
    },
  ];

  // Hotspots for Car Anatomy
  const hotspots = [
    {
      id: 0,
      title: "Front Laser & LED Headlights",
      category: "Lighting",
      tag: "Ultra 20,000LM Output",
      desc: "Instant 6500K pure white beam with anti-glare projector lenses, CANBUS error-free.",
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=600&auto=format&fit=crop",
      price: "₹2,499",
      link: "/shop?category=Lighting",
      top: "45%",
      left: "18%",
    },
    {
      id: 1,
      title: "Ceramic Racing Brakes & Rotors",
      category: "Performance",
      tag: "Zero Fade Under 700°C",
      desc: "Cross-drilled and slotted discs paired with ceramic pads for razor-sharp response.",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=600&auto=format&fit=crop",
      price: "₹6,899",
      link: "/shop?category=Brakes",
      top: "60%",
      left: "32%",
    },
    {
      id: 2,
      title: "Cockpit Luxury Nappa Interior",
      category: "Interior",
      tag: "Memory Foam & Ventilation",
      desc: "Handcrafted ergonomic seat covers and custom laser 7D floor mats tailored to perfection.",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop",
      price: "₹7,999",
      link: "/shop?category=Interior",
      top: "35%",
      left: "52%",
    },
    {
      id: 3,
      title: "High-Fidelity Car Audio & DSP",
      category: "Audio",
      tag: "1000W RMS Deep Bass",
      desc: "Studio-grade neodymium tweeters and compact under-seat subwoofers with Bluetooth 5.3.",
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600&auto=format&fit=crop",
      price: "₹8,999",
      link: "/shop?category=Audio",
      top: "40%",
      left: "68%",
    },
    {
      id: 4,
      title: "Dual-Tip Sport Exhaust & Tips",
      category: "Performance",
      tag: "Titanium Anodized Finish",
      desc: "304 Stainless steel with deep acoustic rumble and anti-corrosion thermal coating.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop",
      price: "₹4,599",
      link: "/shop?category=Exhaust",
      top: "58%",
      left: "82%",
    },
  ];

  // Flash Sale Items
  const flashSaleItems = [
    {
      id: 101,
      name: "DriveZone Carbon Fiber Steering Cover",
      price: 1499,
      originalPrice: 2499,
      discount: "40% OFF",
      stockLeft: 4,
      totalStock: 20,
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop",
      rating: 4.9,
    },
    {
      id: 102,
      name: "Ultra-Bright 120W LED Headlight Kit (H7/H4)",
      price: 2199,
      originalPrice: 3499,
      discount: "37% OFF",
      stockLeft: 6,
      totalStock: 30,
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=600&auto=format&fit=crop",
      rating: 4.8,
    },
    {
      id: 103,
      name: "7D Custom Leather Car Mat Set (Front + Rear)",
      price: 3299,
      originalPrice: 4999,
      discount: "34% OFF",
      stockLeft: 3,
      totalStock: 15,
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop",
      rating: 4.9,
    },
    {
      id: 104,
      name: "Smart 4K Dual Dashcam with Night Vision & GPS",
      price: 4799,
      originalPrice: 6999,
      discount: "31% OFF",
      stockLeft: 5,
      totalStock: 25,
      image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=600&auto=format&fit=crop",
      rating: 4.7,
    },
  ];

  // Best Sellers By Tab
  const curatedProducts = {
    trending: [
      {
        id: 201,
        name: "Premium Nappa Leather Seat Covers (Full Set)",
        price: 7999,
        originalPrice: 9999,
        discount: "20% OFF",
        rating: 4.9,
        reviews: "1.4k",
        tag: "Bestseller",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: 202,
        name: "All-Weather 3D Honeycomb Floor Mats",
        price: 2549,
        originalPrice: 2999,
        discount: "15% OFF",
        rating: 4.8,
        reviews: "980",
        tag: "Popular",
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: 203,
        name: "Pioneer 1000W Active Tube Subwoofer",
        price: 8999,
        originalPrice: 9999,
        discount: "10% OFF",
        rating: 4.9,
        reviews: "720",
        tag: "OEM Pick",
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: 204,
        name: "Turbo LED Headlight Bulbs (6500K Pure White)",
        price: 1999,
        originalPrice: 2499,
        discount: "20% OFF",
        rating: 4.7,
        reviews: "560",
        tag: "Hot Drop",
        image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=600&auto=format&fit=crop",
      },
    ],
    performance: [
      {
        id: 205,
        name: "Cross-Drilled Performance Brake Discs (Pair)",
        price: 6499,
        originalPrice: 7999,
        discount: "18% OFF",
        rating: 4.9,
        reviews: "340",
        tag: "Track Spec",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: 206,
        name: "High-Flow Cold Air Induction Filter",
        price: 2899,
        originalPrice: 3499,
        discount: "17% OFF",
        rating: 4.8,
        reviews: "410",
        tag: "Power Gain",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: 207,
        name: "Ceramic Low-Dust Performance Brake Pads",
        price: 2499,
        originalPrice: 2999,
        discount: "16% OFF",
        rating: 4.9,
        reviews: "290",
        tag: "Zero Noise",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: 208,
        name: "Titanium Flame Dual Exhaust Muffler Tip",
        price: 1899,
        originalPrice: 2499,
        discount: "24% OFF",
        rating: 4.7,
        reviews: "510",
        tag: "Visual Spec",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop",
      },
    ],
    interior: [
      {
        id: 209,
        name: "Alcantara Suede Steering Wheel Wrap",
        price: 1299,
        originalPrice: 1799,
        discount: "27% OFF",
        rating: 4.9,
        reviews: "630",
        tag: "Luxury",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: 210,
        name: "Memory Foam Ergonomic Neck & Lumbar Pillow",
        price: 1499,
        originalPrice: 1999,
        discount: "25% OFF",
        rating: 4.8,
        reviews: "820",
        tag: "Comfort",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: 211,
        name: "64-Color RGB Wireless Ambient Lighting Kit",
        price: 2199,
        originalPrice: 2999,
        discount: "26% OFF",
        rating: 4.9,
        reviews: "1.1k",
        tag: "App Control",
        image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: 212,
        name: "Magnetic 15W MagSafe Fast Wireless Car Mount",
        price: 1199,
        originalPrice: 1599,
        discount: "25% OFF",
        rating: 4.7,
        reviews: "490",
        tag: "Fast Charge",
        image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=600&auto=format&fit=crop",
      },
    ],
    lighting: [
      {
        id: 213,
        name: "Matrix Laser Projector Fog Lamp Kit (Pair)",
        price: 3899,
        originalPrice: 4999,
        discount: "22% OFF",
        rating: 4.9,
        reviews: "410",
        tag: "All-Weather",
        image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: 214,
        name: "Dynamic Sequential LED Turn Signal Mirrors",
        price: 1699,
        originalPrice: 2199,
        discount: "22% OFF",
        rating: 4.8,
        reviews: "380",
        tag: "Audi Style",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: 215,
        name: "Underglow Neon Waterproof App RGB Light Kit",
        price: 2999,
        originalPrice: 3999,
        discount: "25% OFF",
        rating: 4.7,
        reviews: "720",
        tag: "Show Car",
        image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: 216,
        name: "High-Power LED Reverse Back-Up Light (White)",
        price: 799,
        originalPrice: 1099,
        discount: "27% OFF",
        rating: 4.9,
        reviews: "950",
        tag: "Max Vision",
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600&auto=format&fit=crop",
      },
    ],
  };

  const brands = [
    { name: "BREMBO", logo: "BREMBO", color: "text-red-500 font-black tracking-widest text-lg" },
    { name: "PIONEER", logo: "Pioneer", color: "text-gray-300 font-bold tracking-widest text-base" },
    { name: "BOSCH", logo: "BOSCH", color: "text-blue-400 font-black tracking-wider text-lg" },
    { name: "MICHELIN", logo: "MICHELIN", color: "text-yellow-400 font-black italic tracking-wide text-sm" },
    { name: "MOTUL", logo: "MOTUL", color: "text-red-600 font-black italic tracking-tighter text-lg" },
    { name: "BLAUPUNKT", logo: "● BLAUPUNKT", color: "text-blue-300 font-bold tracking-wider text-xs" },
    { name: "3M AUTO", logo: "3M", color: "text-red-500 font-black text-2xl tracking-tighter" },
    { name: "MOMO ITALY", logo: "momo", color: "text-yellow-500 font-black tracking-tight text-xl uppercase" },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Vikramaditya Roy",
      role: "BMW 330i M-Sport Owner",
      city: "Mumbai",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
      comment:
        "The fit and finish of the Nappa seat covers and Brembo ceramic brake pads are phenomenal. The doorstep delivery was within 24 hours. DriveZone is now my go-to automotive store.",
      rating: 5,
    },
    {
      id: 2,
      name: "Priya Sundaram",
      role: "Hyundai Creta SX(O) Owner",
      city: "Bangalore",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop",
      comment:
        "Fitment accuracy was 100% spot-on using their vehicle garage tool. No guesswork at all. The 7D floor mats look like they came straight from the factory showroom floor.",
      rating: 5,
    },
    {
      id: 3,
      name: "Arjun Singhania",
      role: "Mahindra Thar 4x4 Owner",
      city: "Delhi NCR",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      comment:
        "Upgraded my offroad lighting and Pioneer sound system. The audio specialist on WhatsApp answered all my technical wiring questions within minutes. Top tier customer care!",
      rating: 5,
    },
  ];

  const handleProductAdd = (item: any) => {
    // Format as Product
    const prod: Product = {
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.name,
      imageUrl: item.image,
      stock: 15,
      partNumber: `DZ-${item.id}`,
      categoryId: 1,
      compatibleCars: [],
    };
    addToCart(prod, 1);
    setToastMsg(`Added "${item.name}" to cart!`);
    setTimeout(() => setToastMsg(null), 3000);
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
    <div className="min-h-screen bg-[#07080B] text-white selection:bg-red-600 selection:text-white font-sans overflow-x-hidden">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-20 right-6 z-50 bg-[#121620] text-white px-5 py-3 rounded-2xl border border-red-500/50 shadow-2xl shadow-red-600/30 flex items-center gap-3 animate-bounce">
          <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white">
            <Check size={14} />
          </div>
          <span className="text-xs font-bold">{toastMsg}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. CINEMATIC HERO SLIDER */}
      {/* ======================================================== */}
      <section className="relative w-full h-[640px] sm:h-[720px] lg:h-[780px] overflow-hidden flex flex-col justify-between">
        {/* Slides Images with Transition */}
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeSlide === idx ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            <Image
              src={slide.bgImage}
              alt={slide.title}
              fill
              priority={idx === 0}
              unoptimized
              className="object-cover object-center transform transition-transform duration-10000 ease-out"
            />
            {/* Cinematic Luxury Dark Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#07080B] via-[#07080B]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/30 to-[#07080B]/70" />
            <div className="absolute inset-0 radial-top-glow opacity-50" />
          </div>
        ))}

        {/* Hero Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 sm:pt-24 lg:pt-32 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-5">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-500/30 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                <span className="text-[10px] sm:text-xs font-black tracking-[0.2em] text-red-500 uppercase">
                  {slides[activeSlide].badge}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] drop-shadow-2xl">
                {slides[activeSlide].title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-500">
                  {slides[activeSlide].highlight}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-gray-300 font-medium max-w-xl leading-relaxed">
                {slides[activeSlide].subtitle}
              </p>

              {/* CTA Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  href={slides[activeSlide].primaryCta.href}
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-2xl shadow-red-600/40 hover:shadow-red-600/60 transition-all hover:scale-105 flex items-center gap-2 group"
                >
                  <span>{slides[activeSlide].primaryCta.text}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                </Link>

                <Link
                  href={slides[activeSlide].secondaryCta.href}
                  className="px-6 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/15 backdrop-blur-md font-bold text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center gap-2 hover:border-white/30"
                >
                  <Car size={16} className="text-red-500" />
                  <span>{slides[activeSlide].secondaryCta.text}</span>
                </Link>
              </div>

              {/* Telemetry Micro-Badges */}
              <div className="pt-6 flex flex-wrap items-center gap-6 overflow-x-hidden sm:gap-10 border-t border-white/10">
                <div>
                  <p className="text-2xl font-black text-white tracking-tight">{slides[activeSlide].stat}</p>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    {slides[activeSlide].statLabel}
                  </p>
                </div>
                <div className="w-px h-8 bg-white/10 hidden sm:block" />
                <div>
                  <p className="text-2xl font-black text-white tracking-tight">Pan-India</p>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">24H Express Dispatch</p>
                </div>
                <div className="w-px h-8 bg-white/10 hidden sm:block" />
                <div>
                  <p className="text-2xl font-black text-white tracking-tight">100% Genuine</p>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">OEM Direct Sourcing</p>
                </div>
              </div>
            </div>

            {/* Right Interactive Slide Switcher Deck (Desktop) */}
            <div className="hidden lg:flex lg:col-span-4 flex-col gap-3 justify-center">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSlide(i)}
                  className={`text-left p-4 rounded-2xl transition-all border backdrop-blur-md flex items-center justify-between group ${
                    activeSlide === i
                      ? "bg-red-950/30 border-red-500/50 shadow-xl shadow-red-950/40"
                      : "bg-[#0D1017]/60 border-white/5 hover:border-white/20 hover:bg-[#121622]/60"
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-red-500">Slide 0{i + 1}</span>
                    <h4 className="text-xs font-bold text-gray-200 group-hover:text-white line-clamp-1">{s.badge}</h4>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      activeSlide === i ? "bg-red-600 text-white" : "bg-white/5 text-gray-400 group-hover:bg-white/10"
                    }`}
                  >
                    <ChevronRight size={14} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sleek Minimal Slide Indicators */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 z-10">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeSlide === i
                    ? "w-8 bg-red-600 shadow-[0_0_10px_rgba(229,9,20,0.8)]"
                    : "w-2.5 bg-white/20 hover:bg-white/40"
                }`}
                title={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. TRUST PILLARS BAR */}
      {/* ======================================================== */}
      <section className="bg-[#0B0D12] border-y border-[#181C26] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-[#131722] border border-[#202738] flex items-center justify-center text-red-500 flex-shrink-0 shadow-lg group-hover:border-red-600/50 group-hover:scale-110 transition-all">
                <Truck size={22} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Free Express Shipping</h4>
                <p className="text-xs text-gray-400 font-medium">Pan-India orders above ₹999</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-[#131722] border border-[#202738] flex items-center justify-center text-emerald-400 flex-shrink-0 shadow-lg group-hover:border-emerald-500/50 group-hover:scale-110 transition-all">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">100% Genuine OEM Spares</h4>
                <p className="text-xs text-gray-400 font-medium">Verified manufacturer warranty</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-[#131722] border border-[#202738] flex items-center justify-center text-red-500 flex-shrink-0 shadow-lg group-hover:border-red-600/50 group-hover:scale-110 transition-all">
                <RotateCcw size={22} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">7-Day Easy Replacement</h4>
                <p className="text-xs text-gray-400 font-medium">Zero questions doorstep pickup</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-[#131722] border border-[#202738] flex items-center justify-center text-amber-400 flex-shrink-0 shadow-lg group-hover:border-amber-500/50 group-hover:scale-110 transition-all">
                <Headphones size={22} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">WhatsApp Fitment Specialist</h4>
                <p className="text-xs text-gray-400 font-medium">Live mechanics ready to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. MIDNIGHT FLASH DEALS (WITH LIVE COUNTDOWN) */}
      {/* ======================================================== */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#120F15] via-[#16121E] to-[#0F121C] border border-red-500/20 p-6 sm:p-8 shadow-2xl">
          {/* Ambient Glow in Corner */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-3xl pointer-events-none" />

          {/* Flash Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500">
                <Flame size={22} className="animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-500">LIMITED TIME</span>
                  <span className="px-2 py-0.5 rounded-full bg-red-600 text-white font-black text-[9px] uppercase">
                    LIVE
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">Midnight Flash Deals</h2>
              </div>
            </div>

            {/* Countdown Box */}
            <div className="flex items-center gap-2 bg-[#090B10] px-4 py-2.5 rounded-2xl border border-white/10">
              <Clock size={16} className="text-red-500" />
              <span className="text-xs font-bold text-gray-400">Ends In:</span>
              <div className="flex items-center gap-1 font-mono text-sm font-black text-white">
                <span className="px-2 py-1 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30">
                  {String(timeLeft.hours).padStart(2, "0")}h
                </span>
                <span>:</span>
                <span className="px-2 py-1 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30">
                  {String(timeLeft.minutes).padStart(2, "0")}m
                </span>
                <span>:</span>
                <span className="px-2 py-1 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30">
                  {String(timeLeft.seconds).padStart(2, "0")}s
                </span>
              </div>
            </div>
          </div>

          {/* 4 Flash Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6">
            {flashSaleItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-[#0D1017]/90 border border-white/10 hover:border-red-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-red-950/40"
              >
                {/* Image */}
                <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#161B26] mb-3">
                  <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-1 bg-red-600 text-white font-black text-[10px] uppercase tracking-wider rounded-lg shadow-lg">
                    {item.discount}
                  </span>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    <Star size={12} className="fill-amber-400" />
                    <span className="font-extrabold text-white text-[11px]">{item.rating}</span>
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-gray-100 line-clamp-2 group-hover:text-white transition-colors">
                    {item.name}
                  </h3>

                  {/* Stock Bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between text-[10px] font-bold text-gray-400">
                      <span>Stock Available</span>
                      <span className="text-red-400">{item.stockLeft} left</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-600 to-rose-400 rounded-full"
                        style={{ width: `${(item.stockLeft / item.totalStock) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Pricing & Add */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-base font-black text-white">₹{item.price.toLocaleString("en-IN")}</div>
                      <div className="text-[11px] text-gray-500 line-through">
                        ₹{item.originalPrice.toLocaleString("en-IN")}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleProductAdd(item)}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all hover:scale-105"
                    >
                      <ShoppingCart size={13} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. INTERACTIVE VEHICLE ANATOMY / SHOWROOM EXPLORER */}
      {/* ======================================================== */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 text-[11px] font-black uppercase tracking-widest">
            <Sparkles size={12} />
            <span>INTERACTIVE CAR ANATOMY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Explore Upgrades by Zone
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-medium">
            Click on any zone to discover race-spec components and luxury accessories engineered for your build.
          </p>
        </div>

        {/* Interactive Anatomy Card */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#0F131C] to-[#0A0D14] border border-[#1F2636] p-6 lg:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Hotspot Canvas */}
            <div className="lg:col-span-8 relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-[#07090E] border border-white/5 flex items-center justify-center">
              <Image
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
                alt="Car Anatomy"
                fill
                unoptimized
                className="object-cover object-center opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-transparent to-[#07090E]/50" />

              {/* Hotspot Pulsing Pins */}
              {hotspots.map((spot, i) => (
                <button
                  key={spot.id}
                  onClick={() => setActiveHotspot(i)}
                  style={{ top: spot.top, left: spot.left }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group`}
                >
                  <span className="relative flex h-8 w-8 items-center justify-center">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        activeHotspot === i ? "bg-red-500" : "bg-white/40"
                      }`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-6 w-6 items-center justify-center font-black text-[10px] text-white shadow-lg transition-transform group-hover:scale-125 ${
                        activeHotspot === i ? "bg-red-600 ring-4 ring-red-500/30" : "bg-[#181C26] border border-white/30"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            {/* Active Zone Detail Card */}
            <div className="lg:col-span-4 bg-[#121622]/90 border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-red-500">
                  ZONE 0{activeHotspot + 1} • {hotspots[activeHotspot].category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                  {hotspots[activeHotspot].tag}
                </span>
              </div>

              <h3 className="text-xl font-black text-white tracking-tight">
                {hotspots[activeHotspot].title}
              </h3>

              <div className="relative w-full h-32 rounded-xl overflow-hidden border border-white/10">
                <Image
                  src={hotspots[activeHotspot].image}
                  alt={hotspots[activeHotspot].title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              <p className="text-xs text-gray-300 font-medium leading-relaxed">
                {hotspots[activeHotspot].desc}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold">Starting from</span>
                  <div className="text-lg font-black text-white">{hotspots[activeHotspot].price}</div>
                </div>

                <Link
                  href={hotspots[activeHotspot].link}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all hover:scale-105"
                >
                  <span>Explore Parts</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. SHOP BY POPULAR CATEGORIES */}
      {/* ======================================================== */}
      <section id="categories" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#161922]">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-0.5 bg-red-600 inline-block" />
              <span className="text-[11px] font-black text-red-500 uppercase tracking-widest">
                AUTOMOTIVE SECTORS
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Shop by Category
            </h2>
          </div>

          <Link
            href="/shop"
            className="text-xs sm:text-sm font-bold text-gray-400 hover:text-white flex items-center gap-1.5 group transition-colors"
          >
            <span>View All Catalog</span>
            <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.link}
              className="group relative rounded-2xl overflow-hidden bg-[#11141D] border border-[#1E2330] hover:border-red-600/60 transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/20 cursor-pointer flex flex-col justify-end h-64 p-4"
            >
              {/* Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  unoptimized
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080A0F] via-[#080A0F]/70 to-transparent" />
              </div>

              {/* Count Tag */}
              <span className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-[9px] font-bold text-gray-300 backdrop-blur-md">
                {cat.count}
              </span>

              {/* Info */}
              <div className="relative z-10 space-y-1">
                <h3 className="font-black text-sm text-white group-hover:text-red-400 transition-colors">
                  {cat.title}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-gray-400 font-medium truncate">{cat.subtitle}</p>
                  <ArrowRight
                    size={14}
                    className="text-gray-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all flex-shrink-0 ml-1"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. BEST SELLERS & CURATED DROPS (WITH TAB SWITCHER) */}
      {/* ======================================================== */}
      <section id="shop" className="py-16 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#161922]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-0.5 bg-red-600 inline-block" />
              <span className="text-[11px] font-black text-red-500 uppercase tracking-widest">
                VERIFIED PERFORMANCE
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Best Sellers & Upgrades</h2>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: "trending", label: "🔥 Trending" },
              { id: "performance", label: "⚡ Performance" },
              { id: "interior", label: "🛋️ Interior Luxury" },
              { id: "lighting", label: "💡 Lighting" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                    : "bg-[#11141C] text-gray-400 hover:text-white border border-[#1E2330]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {dynamicTabProducts && dynamicTabProducts.length > 0
            ? dynamicTabProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onAddToCart={(p) => {
                    setToastMsg(`Added "${p.name}" to cart!`);
                    setTimeout(() => setToastMsg(null), 3000);
                  }}
                />
              ))
            : curatedProducts[activeTab].map((prod) => (
                <div
                  key={prod.id}
                  className="group bg-[#0F1219] border border-[#1D222E] hover:border-red-600/50 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-red-950/30"
                >
                  <div className="space-y-3">
                    {/* Image Frame */}
                    <div className="relative w-full h-48 rounded-xl overflow-hidden bg-[#161A24] border border-white/5 flex items-center justify-center">
                      <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 bg-red-600 text-white font-black text-[10px] rounded-md shadow-md">
                        {prod.discount}
                      </span>

                      <span className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 bg-black/70 border border-white/10 text-gray-200 font-bold text-[9px] rounded-md backdrop-blur-md">
                        {prod.tag}
                      </span>

                      <Image
                        src={prod.image}
                        alt={prod.name}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Rating & Title */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs">
                        <div className="flex items-center text-amber-400">
                          <Star size={12} className="fill-amber-400" />
                          <span className="ml-1 font-extrabold text-[11px] text-gray-200">{prod.rating}</span>
                        </div>
                        <span className="text-gray-500 text-[11px]">({prod.reviews})</span>
                      </div>

                      <h3 className="font-bold text-xs sm:text-sm text-gray-100 line-clamp-2 group-hover:text-white transition-colors">
                        {prod.name}
                      </h3>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-base font-black text-white">₹{prod.price.toLocaleString("en-IN")}</div>
                      <div className="text-[11px] text-gray-500 line-through">
                        ₹{prod.originalPrice.toLocaleString("en-IN")}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleProductAdd(prod)}
                      className="px-4 py-2.5 bg-[#171B26] hover:bg-red-600 text-gray-200 hover:text-white font-bold text-xs rounded-xl transition-all duration-200 border border-white/10 hover:border-red-600 flex items-center gap-1.5 shadow-sm"
                    >
                      <ShoppingCart size={13} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. PROMOTIONAL VIP BANNER */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#10131B] via-[#161B26] to-[#0F121A] border border-[#222938] shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            
            {/* Left Luxury Interior Photo */}
            <div className="md:col-span-5 relative h-64 md:h-96 w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop"
                alt="Luxury Car Interior"
                fill
                unoptimized
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#10131B]/40 to-[#10131B] hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10131B] to-transparent md:hidden" />
            </div>

            {/* Center Offer Content */}
            <div className="md:col-span-7 p-8 sm:p-12 space-y-4 text-center md:text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-[11px] font-black text-red-500 tracking-[0.2em] uppercase">
                LIMITED TIME EXCLUSIVE
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Unlock Up to <span className="text-red-500">30% OFF</span> + Free Installation
              </h2>
              <p className="text-sm text-gray-300 font-medium max-w-lg">
                Upgrade your car audio, ambient lighting and custom seat covers with certified doorstep fitting across major metro cities.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                <Link
                  href="/shop"
                  className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-xl shadow-red-600/30 transition-all hover:scale-105 flex items-center gap-2"
                >
                  <span>Claim Offer Now</span>
                  <ArrowRight size={15} />
                </Link>

                <Link
                  href="/account/become-seller"
                  className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-gray-200 border border-white/15 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
                >
                  <span>Become a Partner</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. TOP BRAND WALL */}
      {/* ======================================================== */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#171A22]">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-0.5 bg-red-600 inline-block" />
            <span className="text-[11px] font-black text-red-500 uppercase tracking-widest">
              OFFICIAL OEM & PERFORMANCE PARTNERS
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
              className="h-20 bg-[#10131A] hover:bg-[#161B24] border border-[#1E232F] hover:border-red-500/40 rounded-2xl flex items-center justify-center p-3 transition-all duration-300 cursor-pointer shadow-sm group hover:scale-105"
            >
              <span className={`${b.color} transition-transform group-hover:scale-110 select-none`}>
                {b.logo}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 9. DRIVER TESTIMONIALS */}
      {/* ======================================================== */}
      <section className="py-16 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#171A22]">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-0.5 bg-red-600 inline-block" />
              <span className="text-[11px] font-black text-red-500 uppercase tracking-widest">
                VERIFIED DRIVER STORIES
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Trusted by 50,000+ Enthusiasts
            </h2>
          </div>

          <Link
            href="/shop"
            className="text-xs sm:text-sm font-bold text-gray-400 hover:text-white flex items-center gap-1.5 group transition-colors"
          >
            <span>Read All 1,200+ Reviews</span>
            <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#0F1219] border border-[#1E2330] rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl hover:border-red-600/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={15} className="fill-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              {/* User info */}
              <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/15 flex-shrink-0">
                  <Image src={t.avatar} alt={t.name} fill unoptimized className="object-cover" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white">{t.name}</h4>
                  <p className="text-[11px] text-gray-400 font-medium">{t.role} • {t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 10. VIP DRIVER CLUB NEWSLETTER */}
      {/* ======================================================== */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#121622] via-[#151A28] to-[#111520] border border-white/10 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-[11px] font-black uppercase tracking-widest text-red-500">
              JOIN THE INNER CIRCLE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Get ₹500 OFF Your First Upgrade
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-medium">
              Subscribe to receive private seasonal drop notifications, track day fitment tips, and VIP discount coupons.
            </p>
          </div>

          {newsletterSubmitted ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-2xl font-bold text-sm">
              <CheckCircle2 size={18} />
              <span>Welcome to the Driver Club! Promo code sent to your inbox.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex items-center gap-2">
              <input
                type="email"
                required
                placeholder="Enter your driver email..."
                value={subscribedEmail}
                onChange={(e) => setSubscribedEmail(e.target.value)}
                className="flex-1 bg-[#090B10] border border-white/15 focus:border-red-500 rounded-2xl px-5 py-3.5 text-xs text-white placeholder-gray-500 outline-none transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-red-600/30 transition-all hover:scale-105"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
