"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useCar } from "@/context/CarContext";
import { Home, ShoppingBag, Car, ShoppingCart, User, Shield, Store } from "lucide-react";

export const MobileNav = () => {
  const pathname = usePathname();

  const { totalItems } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { selectedCar } = useCar();

  // Determine user account target link
  const accountLink = !isAuthenticated
    ? "/login"
    : user?.role === "ADMIN"
    ? "/admin"
    : user?.role === "SELLER"
    ? "/seller"
    : "/account/profile";

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Shop", href: "/shop", icon: ShoppingBag },
    { 
      label: selectedCar ? selectedCar.model : "My Car", 
      href: "/my-car", 
      icon: Car,
      hasBadge: !!selectedCar 
    },
    { 
      label: "Cart", 
      href: "/cart", 
      icon: ShoppingCart, 
      count: totalItems 
    },
    { 
      label: isAuthenticated ? (user?.role === "ADMIN" ? "Admin" : user?.role === "SELLER" ? "Seller" : "Profile") : "Sign In", 
      href: accountLink, 
      icon: user?.role === "ADMIN" ? Shield : user?.role === "SELLER" ? Store : User 
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0A0C10]/95 border-t border-[#1A1E26] py-2 px-3 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-[10px] font-black transition-all relative py-1 px-2.5 rounded-xl ${
                isActive ? "text-red-500 scale-105" : "text-gray-400 hover:text-white"
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                
                {/* 🛒 Live Cart Counter Badge */}
                {item.count !== undefined && item.count > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-scale">
                    {item.count}
                  </span>
                )}

                {/* 🚗 Selected Car Active Dot */}
                {item.hasBadge && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#0A0C10]" />
                )}
              </div>

              <span className="truncate max-w-[64px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};