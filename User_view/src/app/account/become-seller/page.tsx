"use client";

import { ArrowLeft, Building, CheckCircle2, Clock, FileText, MapPin, Phone, Store, ShieldCheck, Sparkles, Zap, Award } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import { api as axiosClient } from "@/services/api";
import { api as apiUrls } from "@/services/apiUrls";

export default function BecomeSellerPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const [storeName, setStoreName] = useState("");
  const [gstin, setGstin] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("All Spare Categories");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      const savedApp = localStorage.getItem("my_seller_application");
      if (savedApp) {
        setIsSubmitted(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSubmittedApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const applicationData = {
      businessName: storeName,
      businessAddress: `${city} - Category: ${category || "Automotive Spares"}`,
      panNumber: gstin.length >= 12 ? gstin.slice(2, 12).toUpperCase() : "ABCDE1234F",
      gstin: gstin.toUpperCase(),
    };

    if (isAuthenticated) {
      try {
        await axiosClient.post(apiUrls.SELLER_APPLY(), applicationData);
      } catch (err) {
        console.error("Failed to submit seller request to backend", err);
      }
    }

    localStorage.setItem("my_seller_application", JSON.stringify(applicationData));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8 pb-10">
        
        <Link
          href="/"
          className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-red-500 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Customer Store
        </Link>

        {isSubmitted ? (
          <div className="bg-gradient-to-b from-[#10141F] to-[#0A0D15] border border-white/[0.08] rounded-3xl p-8 sm:p-12 text-white space-y-6 shadow-2xl max-w-xl mx-auto text-center">
            <div className="w-20 h-20 bg-[#161B28] text-amber-400 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Clock size={32} className="animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="px-3.5 py-1 bg-amber-950/80 text-amber-400 border border-amber-500/30 text-xs font-black rounded-full uppercase tracking-wider">
                Application Under Verification
              </span>
              <h1 className="text-2xl sm:text-3xl text-white font-black tracking-tight">Merchant Application Received!</h1>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-md mx-auto">
                Thank you for applying to sell automotive components and styling accessories on DriveZone. Our compliance team is verifying your business credentials.
              </p>
            </div>

            <div className="p-5 bg-[#161B28] border border-white/[0.08] rounded-2xl text-xs space-y-2 text-left">
              <p className="font-bold text-white flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" /> GSTIN Credentials Submitted
              </p>
              <p className="text-gray-400 font-medium leading-relaxed">
                Verification usually takes <strong>2 to 4 business hours</strong>. Once approved, your account will instantly gain access to the Seller Merchant Hub.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-105"
              >
                Return to Store
              </Link>
              <Link
                href="/admin"
                className="w-full sm:w-auto px-6 py-3 bg-[#161B28] hover:bg-[#202738] border border-white/[0.08] text-gray-300 font-bold text-xs rounded-xl transition-colors"
              >
                Admin Review Panel →
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-b from-[#10141F] to-[#0A0D15] border border-white/[0.08] rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8 text-white">
            <div className="space-y-2 border-b border-white/[0.08] pb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-red-600/20 text-red-400 border border-red-500/30 rounded-full text-xs font-black uppercase tracking-wider">
                <Store size={14} /> Official Merchant Onboarding
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Become a Verified DriveZone Seller
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">
                Sell genuine OEM and aftermarket accessories to automotive buyers across 28 Indian states with zero listing fees.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
              <div className="p-4 bg-[#161B28] border border-white/[0.06] rounded-2xl space-y-1">
                <p className="font-black text-white flex items-center gap-1.5"><Zap size={14} className="text-red-500" /> Pan-India Buyers</p>
                <p className="text-[11px] text-gray-400 font-medium">Instant exposure to thousands of car owners daily</p>
              </div>
              <div className="p-4 bg-[#161B28] border border-white/[0.06] rounded-2xl space-y-1">
                <p className="font-black text-white flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-400" /> Fitment Engine</p>
                <p className="text-[11px] text-gray-400 font-medium">Match exact car models to reduce wrong part returns to 0%</p>
              </div>
              <div className="p-4 bg-[#161B28] border border-white/[0.06] rounded-2xl space-y-1">
                <p className="font-black text-white flex items-center gap-1.5"><Award size={14} className="text-amber-400" /> Fast Payouts</p>
                <p className="text-[11px] text-gray-400 font-medium">Direct bank settlement with transparent 0% hidden deductions</p>
              </div>
            </div>

            <form onSubmit={handleSubmittedApplication} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                    <Building size={15} className="text-red-500" /> Business / Dealership Store Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="e.g. Apex Auto Spares & OEM Hub"
                    className="w-full px-4 py-3 bg-[#161B28] border border-white/[0.08] rounded-xl text-xs font-bold text-white placeholder-gray-500 focus:border-red-600 outline-none transition-colors"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                    <FileText size={15} className="text-red-500" /> GSTIN / Business Reg No. *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={15}
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    placeholder="15-digit GSTIN (e.g. 23AAAABBBA1Z5)"
                    className="w-full px-4 py-3 bg-[#161B28] border border-white/[0.08] rounded-xl text-xs font-bold text-white placeholder-gray-500 focus:border-red-600 outline-none transition-colors uppercase font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                    <Phone size={15} className="text-red-500" /> Contact Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-3 bg-[#161B28] border border-white/[0.08] rounded-xl text-xs font-bold text-white placeholder-gray-500 focus:border-red-600 outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                    <MapPin size={15} className="text-red-500" /> City / Warehouse Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Mumbai, Maharashtra"
                    className="w-full px-4 py-3 bg-[#161B28] border border-white/[0.08] rounded-xl text-xs font-bold text-white placeholder-gray-500 focus:border-red-600 outline-none transition-colors"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                    Primary Component Categories *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-[#161B28] border border-white/[0.08] rounded-xl text-xs font-bold text-white focus:border-red-600 outline-none transition-colors cursor-pointer"
                  >
                    <option value="All Spare Categories">All Spare Categories (Multi-Brand Distributor)</option>
                    <option value="Brakes & Rotors">Brakes & Rotors</option>
                    <option value="Engine & Transmission">Engine & Transmission Components</option>
                    <option value="LED Lighting & Bulbs">LED Lighting & Bulbs</option>
                    <option value="Suspension & Steering">Suspension & Steering</option>
                    <option value="Seat Covers & Mats">Interior Seat Covers & 7D Mats</option>
                    <option value="Car Audio & Infotainment">Car Audio & Infotainment</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-xl shadow-red-600/35 transition-all hover:scale-105"
                >
                  {isSubmitting ? "Submitting Application..." : "Submit Merchant Application"}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}