"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, Truck, Headphones, RotateCcw, Mail } from "lucide-react";

export const Footer = () => {
  const pathname = usePathname();

  return (
    <footer className="bg-[#050608] text-gray-400 pt-12 pb-24 md:pb-12 mt-16 border-t border-[#181B22]">
      {/* Features Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-b border-[#181B22] text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <ShieldCheck className="w-8 h-8 text-red-500 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white text-sm">100% Genuine Parts</h4>
              <p className="text-xs text-gray-500">Verified OEM & Aftermarket</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <Truck className="w-8 h-8 text-red-500 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white text-sm">Fast Courier Delivery</h4>
              <p className="text-xs text-gray-500">Express delivery to your doorstep</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <RotateCcw className="w-8 h-8 text-red-500 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white text-sm">Easy Returns</h4>
              <p className="text-xs text-gray-500">Hassle-free 7-day replacement</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <Headphones className="w-8 h-8 text-red-500 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white text-sm">24/7 Expert Support</h4>
              <p className="text-xs text-gray-500">Vehicle fitment consultation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 group">
            <svg className="w-7 h-7 text-red-600" viewBox="0 0 48 48" fill="none">
              <path
                d="M6 30C6 30 11 20 18 17C25 14 34 16 38 21C42 26 44 30 44 30M10 30H40M12 36C10.3431 36 9 34.6569 9 33C9 31.3431 10.3431 30 12 30C13.6569 30 15 31.3431 15 33C15 34.6569 13.6569 36 12 36ZM36 36C34.3431 36 33 34.6569 33 33C33 31.3431 34.3431 30 36 30C37.6569 30 39 31.3431 39 33C39 34.6569 37.6569 36 36 36Z"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path d="M19 22H29" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="font-black text-xl text-white tracking-tight">
              Drive<span className="text-red-600">Zone</span>
            </span>
          </Link>
          <p className="text-xs text-gray-400 leading-relaxed">
            India&apos;s premier car accessories and spare parts destination. Guaranteed 100% vehicle compatibility for all brands.
          </p>
        </div>

        <div>
          <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Quick Links</h3>
          <ul className="space-y-2 text-xs">
            <li><Link href="/shop" className="hover:text-red-400 transition-colors">Browse Catalog</Link></li>
            <li><Link href="/my-car" className="hover:text-red-400 transition-colors">Select My Vehicle</Link></li>
            <li><Link href="/orders" className="hover:text-red-400 transition-colors">Track Orders</Link></li>
            <li><Link href="/account/become-seller" className="hover:text-red-400 transition-colors">Become a Verified Seller</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Popular Categories</h3>
          <ul className="space-y-2 text-xs">
            <li><Link href="/shop?category=Seat Covers" className="hover:text-red-400 transition-colors">Seat Covers & Interior</Link></li>
            <li><Link href="/shop?category=Lighting" className="hover:text-red-400 transition-colors">LED Lighting & Bulbs</Link></li>
            <li><Link href="/shop?category=Car Audio" className="hover:text-red-400 transition-colors">Car Audio & Infotainment</Link></li>
            <li><Link href="/shop?category=Floor Mats" className="hover:text-red-400 transition-colors">3D & 7D Floor Mats</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Customer Support</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Need help finding the exact accessories or spares for your car? Our specialists are available 24/7.
          </p>
          <p className="text-xs font-semibold text-red-400 mt-2 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" /> support@drivezone.com
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-[#181B22] text-center text-xs text-gray-500">
        © {new Date().getFullYear()} DriveZone Automotive Marketplace. All rights reserved.
      </div>
    </footer>
  );
};