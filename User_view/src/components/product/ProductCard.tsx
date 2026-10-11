"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { ShoppingCart, Wrench, Star, Heart, Check, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export const ProductCard: React.FC<{
  product: Product;
  onAddToCart?: (product: Product) => void;
}> = ({ product, onAddToCart }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isAdded, setIsAdded] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const backendImageUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:8087";
  const imageSrc = product.imageUrl
    ? product.imageUrl.startsWith("http")
      ? product.imageUrl
      : `${backendImageUrl}${product.imageUrl}`
    : null;

  const originalPrice = Math.round(product.price * 1.25);
  const savings = originalPrice - product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addToCart(product, 1);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative bg-[#0D1017] hover:bg-[#111622] rounded-2xl sm:rounded-3xl border border-white/[0.08] hover:border-red-600/50 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(229,9,20,0.25)] flex flex-col justify-between overflow-hidden p-2.5 sm:p-3.5">
      
      {/* Top Floating Badge (Discount / Stock) */}
      <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20 pointer-events-none">
        {product.stock <= 0 ? (
          <span className="px-2 py-0.5 bg-red-600/90 text-white text-[9px] font-black rounded-md uppercase tracking-wider shadow">
            Out of Stock
          </span>
        ) : (
          <span className="px-2 py-0.5 bg-red-600 text-white text-[9px] font-black rounded-md uppercase tracking-wider shadow shadow-red-600/30">
            20% OFF
          </span>
        )}
      </div>

      {/* Wishlist Heart Button - Compact & Clean */}
      <button
        type="button"
        onClick={handleWishlistToggle}
        className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0A0D14]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:scale-110 active:scale-95 transition-all shadow-md"
        title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
      >
        <Heart
          size={13}
          className={isWishlisted ? "fill-red-600 text-red-600" : "text-gray-300"}
        />
      </button>

      {/* Clean Image Showcase (No Cluttered Bottom Overlays) */}
      <Link href={`/products/${product.id}`} className="block relative">
        <div className="h-32 sm:h-44 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#141824] to-[#0A0D15] border border-white/[0.04] flex items-center justify-center relative overflow-hidden group-hover:border-red-600/20 transition-all duration-300">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              unoptimized
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-contain p-2.5 sm:p-4 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-600 group-hover:text-red-500 transition-colors">
              <Wrench className="w-8 h-8 sm:w-10 sm:h-10 opacity-70" />
              <span className="text-[9px] font-black uppercase tracking-wider mt-1 text-gray-500">Auto Part</span>
            </div>
          )}
        </div>
      </Link>

      {/* Product Content Details */}
      <div className="pt-2.5 sm:pt-3 space-y-1.5 sm:space-y-2 flex-1 flex flex-col justify-between">
        <div>
          {/* Subtle Category & Rating Row */}
          <div className="flex items-center justify-between gap-1 text-[10px] text-gray-400 pb-0.5">
            <span className="truncate max-w-[90px] text-gray-400 font-semibold uppercase tracking-wider text-[9px]">
              {product.categoryName || "Automotive"}
            </span>

            {/* Compact Mini Rating */}
            <div className="flex items-center gap-0.5 text-amber-400 font-bold text-[10px]">
              <Star size={10} className="fill-amber-400 text-amber-400" />
              <span>{product.sellerRating || "4.8"}</span>
            </div>
          </div>

          {/* Product Title */}
          <Link href={`/products/${product.id}`} className="block mt-0.5">
            <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Pricing Section */}
        <div className="pt-1.5 border-t border-white/[0.05]">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-black text-white">
                {formatPrice(product.price)}
              </span>
              <span className="text-[10px] sm:text-xs text-gray-500 line-through font-medium">
                {formatPrice(originalPrice)}
              </span>
            </div>
            <span className="hidden sm:inline-flex text-[9px] font-bold text-emerald-400 items-center gap-0.5">
              <ShieldCheck size={10} /> OEM
            </span>
          </div>
          <p className="text-[9px] sm:text-[10px] font-bold text-emerald-400 truncate">
            Save {formatPrice(savings)}
          </p>
        </div>
      </div>

      {/* Streamlined Add to Cart Action Button */}
      <div className="pt-2">
        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className={`w-full py-2 sm:py-2.5 text-[11px] sm:text-xs font-black rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md ${
            isAdded
              ? "bg-emerald-600 text-white shadow-emerald-600/30"
              : product.stock <= 0
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 text-white shadow-red-600/20 active:scale-98"
          }`}
        >
          {isAdded ? (
            <>
              <Check size={13} className="stroke-[3]" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingCart size={13} />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};