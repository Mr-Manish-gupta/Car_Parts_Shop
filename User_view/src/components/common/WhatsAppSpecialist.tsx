"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Wrench, Truck, Search } from "lucide-react";

export function WhatsAppSpecialist() {
  const pathname = usePathname();
  if (pathname === "/" || pathname?.startsWith("/drivezone")) return null;

  const [isOpen, setIsOpen] = useState(false);

  const WHATSAPP_PHONE = "919876543210"; // Placeholder Business Helpline

  const handleOpenWhatsApp = (message: string) => {
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-24 md:bottom-8 right-4 md:right-7 z-50 flex flex-col items-end">
      {/* 💬 Popover Quick Chat Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-[#0F1218] rounded-3xl border border-[#1C212B] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-800 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center font-bold text-sm">
                🚗
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-emerald-700"></span>
              </div>
              <div>
                <h4 className="font-extrabold text-sm leading-tight">DriveZone Specialist</h4>
                <p className="text-[10px] text-emerald-100 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span> Online • Responds in 2 mins
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-[#0A0C10]">
            <div className="bg-[#141822] p-3 rounded-2xl border border-[#222734] shadow-sm text-xs text-gray-200 font-medium">
              👋 Namaste! Need help finding the exact spare part for your car or verifying chassis compatibility?
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider pl-1">
                Frequently Asked:
              </span>

              <button
                type="button"
                onClick={() => handleOpenWhatsApp("Hi DriveZone Specialist, I need help checking spare parts compatibility for my vehicle.")}
                className="w-full text-left p-2.5 bg-[#141822] hover:bg-[#1C212B] border border-[#222734] hover:border-emerald-500/50 rounded-xl text-xs font-bold text-gray-200 flex items-center gap-2 transition-all"
              >
                <Search size={14} className="text-emerald-400 flex-shrink-0" />
                <span>Check part fitment for my car</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenWhatsApp("Hi, I want to book a doorstep certified mechanic installation for my replacement part.")}
                className="w-full text-left p-2.5 bg-[#141822] hover:bg-[#1C212B] border border-[#222734] hover:border-emerald-500/50 rounded-xl text-xs font-bold text-gray-200 flex items-center gap-2 transition-all"
              >
                <Wrench size={14} className="text-blue-400 flex-shrink-0" />
                <span>Book doorstep mechanic fitment</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenWhatsApp("Hi, I want to track the courier shipment status of my car parts order.")}
                className="w-full text-left p-2.5 bg-[#141822] hover:bg-[#1C212B] border border-[#222734] hover:border-emerald-500/50 rounded-xl text-xs font-bold text-gray-200 flex items-center gap-2 transition-all"
              >
                <Truck size={14} className="text-purple-400 flex-shrink-0" />
                <span>Track my courier order</span>
              </button>
            </div>
          </div>

          {/* Footer Direct CTA */}
          <div className="p-3 bg-[#0F1218] border-t border-[#1C212B]">
            <button
              onClick={() => handleOpenWhatsApp("Hi DriveZone Specialist, I need technical advice on spare parts.")}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <MessageCircle size={15} /> Open WhatsApp Chat
            </button>
          </div>
        </div>
      )}

      {/* 🟢 Floating Toggle Bubble */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 ring-4 ring-emerald-500/20 active:scale-95"
      >
        <span className="relative flex items-center justify-center">
          <MessageCircle size={22} className="fill-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-300 ring-2 ring-emerald-700 animate-ping"></span>
        </span>
        <span className="text-xs font-extrabold tracking-tight hidden sm:inline">
          {isOpen ? "Close Help" : "Ask Auto Specialist"}
        </span>
      </button>
    </div>
  );
}
