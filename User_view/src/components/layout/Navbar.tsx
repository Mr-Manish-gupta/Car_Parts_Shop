"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {useWishlist} from "@/context/WishlistContext";


import {
  Search,
  ShoppingCart,
  User as UserIcon,
  Car,
  Menu,
  X,
  Heart,
  LogOut,
  Shield,
  Store,
  ChevronDown,
  Sparkles,
  Package,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCar } from "@/context/CarContext";
import { useCart } from "@/context/CartContext";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { selectedCar } = useCar();
  const { totalItems } = useCart();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const { totalWishlistItems } = useWishlist();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop Catalog", href: "/shop" },
    {
      name: selectedCar ? `${selectedCar.brand} ${selectedCar.model}` : "My Garage",
      href: "/my-car",
      icon: <Car size={14} className="text-red-500" />,
    },
    { name: "Track Orders", href: "/orders" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A0C10]/95 backdrop-blur-md border-b border-[#1A1E26] shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo with Car Silhouette */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <img src="Downloads.jpeg" alt="App Logo" className="w-7 h-7 rounded-full  shadow-[0_0_20px_1px_rgba(255,255,255,0.3)]  "/>
                <span className="text-xl font-black text-white font-mono tracking-tighter">
                  CHAWDA <span className="text-red-600">CAR DECOR</span>
                </span>
              </div>
              <span className="text-[8px] tracking-[0.25em] text-gray-400 font-bold uppercase pl-9 -mt-1.5">
                CAR ACCESSORIES
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Active Red Line Indicator */}
          <nav className="hidden lg:flex items-center gap-8 text-xs sm:text-sm font-semibold">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`py-2 transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "text-white font-bold border-b-2 border-red-600 shadow-sm"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Search Bar + Account + Cart */}
          <div className="flex items-center gap-3.5 flex-1 max-w-sm justify-end">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full max-w-[200px] sm:max-w-[240px] lg:max-w-[260px]">
              <input
                type="text"
                placeholder="Search accessories..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-3.5 pr-9 py-2 bg-[#12151D] border border-[#222734] rounded-xl text-xs text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-red-600 transition-all shadow-inner"
              />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-red-500 transition-colors">
                <Search size={14} />
              </button>
            </form>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative p-2.5 text-gray-300 hover:text-white hover:bg-[#151922] rounded-xl transition-colors"
              title="Shopping Cart"
            >
              <ShoppingCart size={19} />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-black flex items-center justify-center ring-2 ring-[#0A0C10] shadow-md animate-bounce border border-gray-50">
                  {totalItems}
                </span>
              )}
            </Link>

            {/** Heart Icon */}

            <Link href="/wishlist" 
            className="relative p-2.5 text-gray-300 hover:text-white hover:bg-[#151922] rounded-xl transition-colors"
            title="Wishlist"> 
              <Heart size={19} />

              {totalWishlistItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full border border-gray-50 text-[10px] font-black flex items-center justify-center ring-2 ring-[#0A0C10]  shadow-lg animate-bounce">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            {/* User Account / Profile Dropdown */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 bg-[#141822] text-white border border-[#222734]"
                >
                  <span className="hidden sm:inline px-1 font-bold">{user.name.split(" ")[0]}</span>
                  {user.role === "ADMIN" && (
                    <span className="hidden sm:inline px-1.5 py-0.5 bg-red-600 text-white text-[9px] rounded font-black">
                      ADMIN
                    </span>
                  )}
                  {user.role === "SELLER" && (
                    <span className="hidden sm:inline px-1.5 py-0.5 bg-emerald-600 text-white text-[9px] rounded font-black">
                      SELLER
                    </span>
                  )}
                  <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center text-xs font-black shadow-md shrink-0 bg-red-600 text-white">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#0F1218] border border-[#1C212B] rounded-2xl shadow-2xl py-2 z-50 text-xs font-semibold text-gray-200 space-y-1">
                    <div className="px-4 py-2.5 border-b border-[#1C212B]">
                      <p className="font-bold text-white truncate">{user.name}</p>
                      <p className="text-gray-400 text-[11px] truncate">{user.email}</p>
                    </div>

                    {user.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-[#141822] font-bold"
                      >
                        <Shield className="w-3.5 h-3.5" /> Admin Control Panel
                      </Link>
                    )}

                    {user.role === "SELLER" && (
                      <Link
                        href="/seller"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-emerald-400 hover:bg-[#141822] font-bold"
                      >
                        <Store className="w-3.5 h-3.5" /> Seller Dashboard
                      </Link>
                    )}

                    {user.role === "USER" && (
                      <Link
                        href="/account/become-seller"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-[#141822] font-bold"
                      >
                        <Store className="w-3.5 h-3.5" /> Become a Seller
                      </Link>
                    )}

                    <Link
                      href="/account/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-[#141822] hover:text-white"
                    >
                      <UserIcon className="w-3.5 h-3.5" /> My Profile &amp; Addresses
                    </Link>

                    <Link
                      href="/orders"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-[#141822] hover:text-white"
                    >
                      <Package className="w-3.5 h-3.5" /> Order History
                    </Link>

                    <div className="border-t border-[#1C212B] pt-1">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-600/10 font-bold text-left"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3.5 py-2 text-xs font-bold text-gray-300 hover:text-white hover:bg-[#151922] rounded-xl transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="hidden sm:inline-flex px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-600/25 transition-all"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-[#151922] rounded-xl transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#1A1E26] space-y-2 animate-fade-in">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold ${
                    isActive
                      ? "bg-red-600 text-white"
                      : "text-gray-300 hover:bg-[#151922] hover:text-white"
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              );
            })}

            {!isAuthenticated && (
              <div className="pt-2 border-t border-[#1A1E26] flex gap-2 px-2">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 py-2.5 text-center bg-[#151922] text-white text-xs font-bold rounded-xl"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 py-2.5 text-center bg-red-600 text-white text-xs font-bold rounded-xl"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};