"use client";

import React from "react";
import { useCar } from "@/context/CarContext";
import { CarSelector } from "@/components/car/CarSelector";
import {
  Car,
  CheckCircle2,
  ArrowRight,
  Trash2,
  ShieldCheck,
  Sparkles,
  Wrench,
  Layers,
  Gauge,
  Zap,
  Flame,
  Check,
  RotateCcw,
  Headphones,
  SlidersHorizontal,
  Compass,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MyCarPage() {
  const { selectedCar, clearCar } = useCar();

  // 6 Upgrades for active vehicle
  const upgradeCategories = [
    {
      title: "Custom Seat Covers",
      desc: "Nappa Leather & Breathable Cuts",
      icon: "🛋️",
      link: selectedCar ? `/shop?category=Seat+Covers&carId=${selectedCar.id}` : "/shop?category=Seat+Covers",
    },
    {
      title: "7D All-Weather Mats",
      desc: "Laser-Measured Floor Liners",
      icon: "📐",
      link: selectedCar ? `/shop?category=Floor+Mats&carId=${selectedCar.id}` : "/shop?category=Floor+Mats",
    },
    {
      title: "LED & Laser Lighting",
      desc: "Ultra High-Lumen Headlights & Fog",
      icon: "💡",
      link: selectedCar ? `/shop?category=Lighting&carId=${selectedCar.id}` : "/shop?category=Lighting",
    },
    {
      title: "Braking & Calipers",
      desc: "Ceramic Low-Dust Performance Pads",
      icon: "🛑",
      link: selectedCar ? `/shop?category=Brakes&carId=${selectedCar.id}` : "/shop?category=Brakes",
    },
    {
      title: "Car Audio & DSP",
      desc: "Subwoofers, Amps & Touchscreens",
      icon: "🔊",
      link: selectedCar ? `/shop?category=Audio&carId=${selectedCar.id}` : "/shop?category=Audio",
    },
    {
      title: "Engine & Service Spares",
      desc: "Filters, Plugs & Fluids",
      icon: "⚙️",
      link: selectedCar ? `/shop?category=Engine&carId=${selectedCar.id}` : "/shop",
    },
  ];

  return (
    <div className="min-h-screen bg-[#07080B] text-white py-12 px-4 sm:px-6 lg:px-8 space-y-12 selection:bg-red-600 selection:text-white">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* ======================================================== */}
        {/* 1. CINEMATIC GARAGE HERO HEADER */}
        {/* ======================================================== */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-black rounded-full uppercase tracking-widest backdrop-blur-md">
            <Sparkles size={14} className="text-red-500" />
            <span>VIP VIRTUAL SHOWROOM HANGAR</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            My Garage &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-500">Fitment Center</span>
          </h1>

          <p className="text-xs sm:text-base text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Lock in your vehicle specifications to activate 100% zero-guesswork fitment. Browse tailored seat covers, floor mats, lighting kits, and race-spec upgrades engineered for your exact car.
          </p>

          {/* Telemetry Status Strip */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-bold text-gray-400">
            <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3.5 py-1.5 rounded-xl">
              <ShieldCheck size={15} /> 100% Guaranteed OEM Fitment
            </span>
            <span className="flex items-center gap-1.5 text-gray-300 bg-[#141822] border border-white/10 px-3.5 py-1.5 rounded-xl">
              <Wrench size={15} className="text-red-500" /> Doorstep Mechanic Service Available
            </span>
            <span className="flex items-center gap-1.5 text-gray-300 bg-[#141822] border border-white/10 px-3.5 py-1.5 rounded-xl">
              <RotateCcw size={15} className="text-amber-400" /> 7-Day Doorstep Return Guarantee
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. ACTIVE SAVED CAR SHOWCASE STAGE */}
        {/* ======================================================== */}
        {selectedCar ? (
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0C1A14] via-[#10241B] to-[#0A1611] border-2 border-emerald-500/50 text-white p-6 sm:p-10 shadow-2xl space-y-8">
            {/* Ambient Green Stage Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-emerald-500/20 pb-8 relative z-10">
              <div className="flex items-start sm:items-center gap-5">
                <div className="p-5 bg-gradient-to-br from-emerald-500 to-teal-700 text-white rounded-3xl shadow-xl shadow-emerald-600/30 flex-shrink-0">
                  <Car className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 text-xs font-black rounded-full uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% Fitment Active in Garage
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {selectedCar.brand} {selectedCar.model}
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-200/80 font-medium">
                    Model Year: <strong className="text-white">{selectedCar.year}</strong>{" "}
                    {selectedCar.variant && `• Variant: ${selectedCar.variant}`}{" "}
                    {selectedCar.fuelType && `• Fuel: ${selectedCar.fuelType}`}
                  </p>
                </div>
              </div>

              {/* Top Quick Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={clearCar}
                  className="inline-flex items-center gap-2 text-xs font-bold text-red-400 hover:text-white bg-[#1A0A0A] hover:bg-red-600 border border-red-500/40 px-4 py-3 rounded-2xl transition-all shadow-md"
                >
                  <Trash2 className="w-4 h-4" /> Remove Vehicle
                </button>

                <Link
                  href={`/shop?carId=${selectedCar.id}`}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black uppercase tracking-wider rounded-2xl flex items-center gap-2 shadow-xl shadow-emerald-600/30 transition-all hover:scale-105"
                >
                  <span>Explore Matched Parts</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Vehicle Telemetry Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
              <div className="p-4 bg-[#0A1D15]/80 border border-emerald-500/20 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Manufacturer</span>
                <p className="text-base font-black text-white">{selectedCar.brand}</p>
              </div>

              <div className="p-4 bg-[#0A1D15]/80 border border-emerald-500/20 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Chassis / Generation</span>
                <p className="text-base font-black text-white">{selectedCar.year} Series</p>
              </div>

              <div className="p-4 bg-[#0A1D15]/80 border border-emerald-500/20 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Fitment Filter Status</span>
                <p className="text-base font-black text-emerald-400 flex items-center gap-1">
                  <Check size={16} /> Locked &amp; Active
                </p>
              </div>

              <div className="p-4 bg-[#0A1D15]/80 border border-emerald-500/20 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Doorstep Fitment</span>
                <p className="text-base font-black text-white">Supported (₹399)</p>
              </div>
            </div>

            {/* 6 Quick-Launchpad Upgrade Categories for this Car */}
            <div className="space-y-4 pt-2 relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-emerald-400" />
                  Direct Upgrades Matched for your {selectedCar.brand} {selectedCar.model}
                </h3>
                <span className="text-xs font-bold text-emerald-400">6 Categories</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {upgradeCategories.map((cat, idx) => (
                  <Link
                    key={idx}
                    href={cat.link}
                    className="p-4 bg-[#081812] hover:bg-[#0E261D] border border-emerald-500/20 hover:border-emerald-400/60 rounded-2xl flex items-center justify-between transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/40 group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-[#0F291F] border border-emerald-500/30 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform">
                        {cat.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                          {cat.title}
                        </h4>
                        <p className="text-[11px] text-gray-400 font-medium">{cat.desc}</p>
                      </div>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Empty State Hangar Prompt */
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#11141D] to-[#0A0D14] border border-white/10 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
            <div className="w-20 h-20 rounded-3xl bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-500 mx-auto shadow-xl shadow-red-600/20">
              <Car size={40} />
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                No Vehicle Locked in Garage
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">
                Add your car below to unlock tailored recommendations, guaranteed dimensions, and zero-guesswork checkout.
              </p>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. PRECISION VEHICLE SELECTOR FORM */}
        {/* ======================================================== */}
        <div className="max-w-2xl mx-auto">
          <CarSelector />
        </div>

        {/* ======================================================== */}
        {/* 4. WHY USE VIRTUAL GARAGE PILLARS */}
        {/* ======================================================== */}
        <div className="pt-8 border-t border-[#171A24]">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
            <span className="text-[11px] font-black text-red-500 uppercase tracking-widest">
              DRIVEZONE GUARANTEE
            </span>
            <h3 className="text-2xl font-black text-white tracking-tight">
              Why Drivers Love the Virtual Garage
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0F1219] border border-[#1E2330] rounded-3xl p-6 space-y-3 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-red-600/10 border border-red-500/30 text-red-500 flex items-center justify-center font-black">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-black text-base text-white">100% Fitment Guarantee</h4>
              <p className="text-xs text-gray-400 font-medium leading-relaxed">
                Our algorithm matches manufacturer part numbers, chassis codes, and engine displacements. If it doesn't fit, we replace it for free.
              </p>
            </div>

            <div className="bg-[#0F1219] border border-[#1E2330] rounded-3xl p-6 space-y-3 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black">
                <Wrench size={24} />
              </div>
              <h4 className="font-black text-base text-white">Doorstep Certified Fitting</h4>
              <p className="text-xs text-gray-400 font-medium leading-relaxed">
                Add mechanic installation at checkout. A certified automotive technician visits your doorstep to install your parts professionally.
              </p>
            </div>

            <div className="bg-[#0F1219] border border-[#1E2330] rounded-3xl p-6 space-y-3 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-black">
                <Headphones size={24} />
              </div>
              <h4 className="font-black text-base text-white">WhatsApp Fitment Help</h4>
              <p className="text-xs text-gray-400 font-medium leading-relaxed">
                Send your vehicle RC or dashboard photos directly on WhatsApp. Our master technicians will guide your upgrade selection.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
