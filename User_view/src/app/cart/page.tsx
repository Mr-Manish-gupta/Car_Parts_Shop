"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import { 
  Trash2, Plus, Minus, ArrowRight, ShoppingBag, 
  ShieldCheck, Truck, ArrowLeft, Wrench, Zap, Tag, Sparkles, CheckCircle2, Lock, Gift
} from "lucide-react";
import { couponService } from "@/services/couponService";

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, subtotal, deliveryFee } = useCart();

  const backendImageUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:8087";

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number } | null>(null);
  const [couponMsg, setCouponMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("applied_coupon");
    if (saved && subtotal > 0) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.code) {
          couponService.applyCoupon(parsed.code, subtotal).then((res) => {
            if (res.valid && res.discountAmount) {
              setAppliedCoupon({
                code: res.code || parsed.code,
                discountAmount: res.discountAmount,
              });
            } else {
              localStorage.removeItem("applied_coupon");
              setAppliedCoupon(null);
            }
          });
        }
      } catch (e) {
        console.error("Failed to load applied coupon", e);
      }
    }
  }, [subtotal]);

  const handleApplyCoupon = async (customCode?: string) => {
    const code = (customCode || couponInput).trim();
    if (!code) return;
    setIsApplyingCoupon(true);
    setCouponMsg(null);

    const res = await couponService.applyCoupon(code, subtotal);
    setIsApplyingCoupon(false);

    if (res.valid && res.discountAmount) {
      const couponData = { code: res.code || code.toUpperCase(), discountAmount: res.discountAmount };
      setAppliedCoupon(couponData);
      localStorage.setItem("applied_coupon", JSON.stringify(couponData));
      setCouponMsg({ type: "success", text: res.message || "Coupon applied successfully!" });
      setCouponInput("");
    } else {
      setCouponMsg({ type: "error", text: res.message || "Invalid coupon code" });
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    localStorage.removeItem("applied_coupon");
    setCouponMsg(null);
  };

  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount) + deliveryFee;

  const freeDeliveryThreshold = 999;
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <div className="min-h-screen bg-[#07080B] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-red-600/20 border border-red-500/30 text-red-400 text-[10px] font-black rounded-full uppercase tracking-widest">
                DriveZone Express Checkout
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1">
              Your Shopping Cart ({items.length} {items.length === 1 ? "Item" : "Items"})
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 font-medium mt-1">
              Review selected automotive spares, configure quantities, and unlock coupon discounts.
            </p>
          </div>

          <Link
            href="/shop"
            className="hidden sm:flex text-xs sm:text-sm font-bold text-red-500 hover:text-red-400 hover:underline items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-gradient-to-b from-[#10141F] to-[#0A0D15] border border-white/[0.08] rounded-3xl p-12 sm:p-16 text-center space-y-5 max-w-lg mx-auto shadow-2xl">
            <div className="w-20 h-20 bg-[#161B28] border border-white/[0.08] text-gray-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <ShoppingBag className="w-10 h-10 text-red-500" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-2xl font-black text-white">Your Cart is Empty</h2>
              <p className="text-xs text-gray-400 font-medium max-w-xs mx-auto">
                Looks like you haven&apos;t added any compatible automotive parts or styling upgrades yet.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-105"
            >
              <span>Explore Spare Parts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Cart Grid: Left List + Right Summary */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Cart Items List (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Free Delivery Milestone Progress Meter */}
              <div className="bg-gradient-to-r from-[#10141F] to-[#0D101A] border border-white/[0.08] rounded-2xl p-4 sm:p-5 space-y-2 shadow-lg">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-2 text-white">
                    <Truck size={16} className="text-red-500" />
                    {subtotal >= freeDeliveryThreshold ? (
                      <strong className="text-emerald-400">🎉 Congratulations! You qualify for FREE Express Delivery</strong>
                    ) : (
                      <span>Add <strong className="text-red-400">{formatPrice(freeDeliveryThreshold - subtotal)}</strong> more to unlock <strong>FREE Delivery!</strong></span>
                    )}
                  </span>
                  <span className="text-[11px] font-black text-gray-400">{progressPercent}%</span>
                </div>

                <div className="h-2 w-full bg-[#161B28] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-emerald-500 transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              {items.map((item) => {
                const imageSrc = item.product.imageUrl
                  ? item.product.imageUrl.startsWith("http")
                    ? item.product.imageUrl
                    : `${backendImageUrl}${item.product.imageUrl}`
                  : null;

                return (
                  <div
                    key={item.product.id}
                    className="bg-gradient-to-r from-[#10141F] via-[#0E121B] to-[#10141F] border border-white/[0.08] rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-xl hover:border-red-600/40 transition-all duration-300"
                  >
                    {/* Image & Title */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#161B28] border border-white/[0.08] rounded-2xl flex items-center justify-center relative overflow-hidden flex-shrink-0 shadow-inner">
                        {imageSrc ? (
                          <Image
                            src={imageSrc}
                            alt={item.product.name}
                            fill
                            unoptimized
                            className="object-contain p-2"
                          />
                        ) : (
                          <Wrench className="w-8 h-8 text-gray-600" />
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-red-400 bg-red-600/20 border border-red-500/30 px-2 py-0.5 rounded-md uppercase tracking-wider">
                            {item.product.categoryName || "Genuine Spare"}
                          </span>
                          <span className="text-[10px] font-mono text-gray-500">
                            OEM: {item.product.partNumber}
                          </span>
                        </div>

                        <Link href={`/products/${item.product.id}`}>
                          <h3 className="font-bold text-sm sm:text-base text-white hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                            {item.product.name}
                          </h3>
                        </Link>

                        <div className="text-sm font-black text-white pt-0.5 sm:hidden">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                      </div>
                    </div>

                    {/* Quantity Stepper & Price & Delete */}
                    <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-white/[0.06]">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-white/[0.1] rounded-xl bg-[#161B28] p-1 shadow-inner">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-black text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Item Total Price */}
                      <div className="text-right hidden sm:block min-w-[100px]">
                        <div className="text-base font-black text-white">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                        <div className="text-[10px] text-gray-400 font-medium">
                          {formatPrice(item.product.price)} each
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-600/10 rounded-xl transition-all"
                        title="Remove from cart"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {/* Quick Buy Now */}
                      <button
                        onClick={() => router.push(`/checkout?productId=${item.product.id}&qty=${item.quantity}`)}
                        className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-red-600/25 transition-all hover:scale-105"
                        title="Buy only this item right now"
                      >
                        <Zap size={14} />
                        <span>Buy Now</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Right: Order Summary Card (4 Cols) */}
            <div className="lg:col-span-4">
              <div className="bg-gradient-to-b from-[#10141F] to-[#0A0D15] border border-white/[0.08] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 sticky top-24 text-white">
                
                <h2 className="text-lg font-black text-white border-b border-white/[0.08] pb-4 flex items-center justify-between">
                  <span>Order Summary</span>
                  <span className="text-xs text-gray-400 font-normal">{items.length} items</span>
                </h2>

                {/* Pricing Breakdown */}
                <div className="space-y-3 text-xs font-medium text-gray-300">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span className="font-bold text-white text-sm">{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Doorstep Express Delivery</span>
                    {deliveryFee === 0 ? (
                      <span className="font-black text-emerald-400 uppercase text-[11px] bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                        FREE Delivery
                      </span>
                    ) : (
                      <span className="font-bold text-white">{formatPrice(deliveryFee)}</span>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <span>GST & Vehicle Tax</span>
                    <span className="font-bold text-emerald-400">Included (18% GST)</span>
                  </div>
                </div>

                {/* Coupon Code Section */}
                <div className="space-y-3 border-t border-white/[0.08] pt-4">
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Tag size={13} className="text-red-500" /> Apply Promo Code
                  </label>

                  {appliedCoupon ? (
                    <div className="p-3 bg-emerald-950/50 border border-emerald-500/40 rounded-2xl flex items-center justify-between shadow-inner">
                      <div className="flex items-center gap-2 text-xs text-emerald-300 font-bold">
                        <CheckCircle2 size={15} className="text-emerald-400" />
                        <span>{appliedCoupon.code} Applied (-{formatPrice(discountAmount)})</span>
                      </div>
                      <button onClick={handleRemoveCoupon} className="text-xs text-red-400 font-bold hover:underline">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter Promo (e.g. FIRST10)"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          className="flex-1 px-3.5 py-2.5 bg-[#161B28] border border-white/[0.08] rounded-xl text-xs font-bold uppercase text-white outline-none focus:border-red-600 transition-colors placeholder-gray-500"
                        />
                        <button
                          onClick={() => handleApplyCoupon()}
                          disabled={isApplyingCoupon || !couponInput.trim()}
                          className="px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-black uppercase rounded-xl transition-all shadow-md shadow-red-600/25"
                        >
                          {isApplyingCoupon ? "..." : "Apply"}
                        </button>
                      </div>

                      {/* Quick Coupon Suggestions */}
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <span className="text-gray-500 font-bold">Popular:</span>
                        {["FIRST10", "DRIVEZONE", "FREESHIP"].map((code) => (
                          <button
                            key={code}
                            type="button"
                            onClick={() => handleApplyCoupon(code)}
                            className="px-2 py-0.5 bg-[#161B28] hover:bg-red-600/20 border border-white/[0.06] hover:border-red-500/30 text-gray-300 hover:text-red-400 rounded-md font-mono font-bold transition-all"
                          >
                            +{code}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {appliedCoupon && (
                    <div className="flex justify-between text-xs text-emerald-400 font-bold pt-1">
                      <span>Discount Savings</span>
                      <span>-{formatPrice(appliedCoupon.discountAmount)}</span>
                    </div>
                  )}

                  {couponMsg && (
                    <p className={`text-[11px] font-bold ${couponMsg.type === "success" ? "text-emerald-400" : "text-red-400"}`}>
                      {couponMsg.text}
                    </p>
                  )}
                </div>

                {/* Final Total */}
                <div className="pt-4 border-t border-white/[0.08] flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-black text-white">Grand Total</span>
                    <p className="text-[10px] text-gray-400 font-medium">Inclusive of all taxes & warranty</p>
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-white">
                    {formatPrice(finalTotal)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-red-600/35 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Trust Badges */}
                <div className="space-y-2 pt-2 border-t border-white/[0.06] text-[11px] text-gray-400 font-medium">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>100% Genuine OEM & Aftermarket Spares</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span>256-bit Encrypted Secure Transactions</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}