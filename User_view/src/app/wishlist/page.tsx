"use client";

import React from "react";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/product/ProductCard";
import { Heart, ShoppingBag, Trash2, ArrowLeft, ShoppingCart } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveAllToCart = () => {
    wishlist.forEach((product) => {
      addToCart(product, 1);
    });
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1C212B] pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-red-600/20 text-red-500 rounded-xl border border-red-500/30">
                <Heart size={20} className="fill-red-500" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                My Saved Wishlist ({wishlist.length})
              </h1>
            </div>
            <p className="text-xs text-gray-400 font-medium">
              Save your favorite automotive components and transfer them to cart anytime.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="hidden sm:flex px-4 py-2.5 bg-[#141822] hover:bg-[#1D2230] border border-white/[0.08] text-gray-300 font-bold text-xs rounded-xl transition-all items-center gap-1.5"
            >
              <ArrowLeft size={14} /> Back to Shop
            </Link>

            {wishlist.length > 0 && (
              <>
                <button
                  onClick={handleMoveAllToCart}
                  className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center gap-1.5"
                >
                  <ShoppingCart size={14} /> Move All to Cart
                </button>

                <button
                  onClick={clearWishlist}
                  className="p-2.5 bg-[#141822] hover:bg-red-600/20 text-gray-400 hover:text-red-400 border border-white/[0.08] rounded-xl transition-colors"
                  title="Clear All Wishlist"
                >
                  <Trash2 size={16} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Wishlist Content */}
        {wishlist.length === 0 ? (
          <div className="bg-[#0E121B] border border-white/[0.08] rounded-3xl p-12 text-center space-y-5 max-w-md mx-auto shadow-2xl">
            <div className="w-16 h-16 bg-red-600/10 text-red-500 border border-red-500/20 rounded-full flex items-center justify-center mx-auto">
              <Heart size={30} />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-black text-white">Your Wishlist is Empty</h2>
              <p className="text-xs text-gray-400">
                Explore our catalog of genuine spare parts and accessories to save your favorites here.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-105"
            >
              <ShoppingBag size={16} /> Start Exploring Parts
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}