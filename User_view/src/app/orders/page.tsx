"use client";

import Link from "next/link";
import { ChevronRight, MapPin, Package, Printer, Truck, Wrench, Copy, CheckCircle2, ExternalLink, ShieldCheck, Check, ArrowLeft, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import { api as axiosClient } from "@/services/api";
import { api as apiUrls } from "@/services/apiUrls";

type OrderStatus = "CONFIRMED" | "PACKED" | "IN_TRANSIT" | "DELIVERED";

interface OrderItem {
  id: number;
  name: string;
  partNumber: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  categoryName?: string;
}

interface Order {
  orderId: string;
  date: string;
  status: OrderStatus;
  statusText: string;
  currentLocation: string;
  estimatedDelivery: string;
  items: OrderItem[];
  subtotal: number;
  discountAmount?: number;
  couponCode?: string;
  deliveryFee: number;
  totalPrice: number;
  paymentMethod: "COD" | "ONLINE";
  shippingAddress: {
    name: string;
    primaryPhone: string;
    alternatePhone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
}

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [copiedAwb, setCopiedAwb] = useState(false);

  const handleCopyAwb = (awb: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(awb);
      setCopiedAwb(true);
      setTimeout(() => setCopiedAwb(false), 2500);
    }
  };

  useEffect(() => {
    const loadOrders = async () => {
      setIsLoading(true);
      let fetchedOrders: Order[] = [];

      try {
        const res = await axiosClient.get(apiUrls.MY_ORDERS());
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          fetchedOrders = res.data.map((o: any) => {
            let uiStatus: OrderStatus = "CONFIRMED";
            let statusText = "Order confirmed with seller, packing in progress";
            let currentLocation = "DriveZone Central Warehouse";
            let estimatedDelivery = "Within 2-3 Business Days";

            if (o.orderStatus === "PENDING") {
              uiStatus = "CONFIRMED";
              statusText = "Order placed, awaiting seller confirmation";
              currentLocation = "Processing Center";
            } else if (o.orderStatus === "PROGRESSED") {
              uiStatus = "PACKED";
              statusText = "Order packed and verified by seller, ready for courier pickup";
              currentLocation = "DriveZone Central Warehouse (Bhopal Hub)";
              estimatedDelivery = "Within 2 Business Days";
            } else if (o.orderStatus === "SHIPPING") {
              uiStatus = "IN_TRANSIT";
              statusText = "Dispatched via Express Courier, out for delivery";
              currentLocation = "In Transit - Regional Hub / Out for Delivery";
              estimatedDelivery = "Expected Today / Tomorrow";
            } else if (o.orderStatus === "DELEVERED" || o.orderStatus === "DELIVERED") {
              uiStatus = "DELIVERED";
              statusText = "Package successfully delivered to recipient at doorstep.";
              currentLocation = "Delivered at Doorstep";
              estimatedDelivery = "Delivered";
            }

            const rawPrice = Number(o.totalAmount ?? o.totalPrice ?? 0);
            const addr = o.shippingAddress || o.address || {};
            const rawItemsList = o.orderItem || o.orderItems || [];

            return {
              orderId: `CP-${o.id}`,
              date: o.createdAt ? new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Recently",
              status: uiStatus,
              statusText: statusText,
              currentLocation: currentLocation,
              estimatedDelivery: estimatedDelivery,
              paymentMethod: (o.paymentStatus === "COMPLETED" ? "ONLINE" : "COD") as "COD" | "ONLINE",
              subtotal: rawPrice,
              deliveryFee: 0,
              totalPrice: rawPrice,
              shippingAddress: {
                name: addr.name || o.user?.name || "Customer",
                primaryPhone: addr.phone || o.user?.phone || "",
                alternatePhone: "",
                address: addr.house || addr.address || "Address on file",
                city: addr.city || "",
                state: addr.state || "",
                pincode: addr.pinCode || addr.pincode || "",
              },
              items: rawItemsList.map((item: any) => ({
                id: item.id || item.product?.id || Math.random(),
                name: item.product?.name || "Automotive Component",
                partNumber: item.product?.partNumber || "OEM-PART",
                price: Number(item.price || item.product?.price || 0),
                quantity: Number(item.quantity || 1),
                imageUrl: item.product?.imageUrl,
                categoryName: item.product?.categoryName,
              })),
            };
          });
        }
      } catch (err) {
        console.error("Failed to load PostgreSQL orders", err);
      }

      // Map to strictly prevent duplicate order IDs
      const ordersMap = new Map<string, Order>();

      // 1. Add backend orders to Map
      fetchedOrders.forEach((ord) => {
        if (ord && ord.orderId) {
          ordersMap.set(ord.orderId, ord);
        }
      });

      // 2. Add local receipts only if not already loaded from backend
      try {
        const saved = localStorage.getItem("placed_orders");
        if (saved) {
          const parsedList = JSON.parse(saved);
          if (Array.isArray(parsedList) && parsedList.length > 0) {
            parsedList.forEach((parsed: any) => {
              if (!parsed || !parsed.orderId) return;

              const existing = ordersMap.get(parsed.orderId);
              if (!existing) {
                const localItems = (parsed.items || []).map((i: any) => ({
                  id: i.product?.id || i.id || Math.random(),
                  name: i.product?.name || i.name || "Automotive Component",
                  partNumber: i.product?.partNumber || i.partNumber || "OEM-PART",
                  price: Number(i.product?.price || i.price || 0),
                  quantity: Number(i.quantity || 1),
                  imageUrl: i.product?.imageUrl || i.imageUrl,
                  categoryName: i.product?.categoryName || i.categoryName,
                }));
                const localPrice = Number(parsed.totalPrice || parsed.subtotal || 0);

                if (localPrice > 0 || localItems.length > 0) {
                  ordersMap.set(parsed.orderId, {
                    orderId: parsed.orderId,
                    date: parsed.date || "Recently",
                    status: "CONFIRMED",
                    statusText: "Order placed, awaiting seller dispatch",
                    currentLocation: "DriveZone Sorting Facility",
                    estimatedDelivery: "Within 2-3 Business Days",
                    paymentMethod: parsed.paymentMethod || "COD",
                    subtotal: Number(parsed.subtotal || localPrice),
                    discountAmount: parsed.discountAmount,
                    couponCode: parsed.couponCode,
                    deliveryFee: Number(parsed.deliveryFee || 0),
                    totalPrice: localPrice,
                    shippingAddress: parsed.customer || {
                      name: "Customer",
                      primaryPhone: "",
                      alternatePhone: "",
                      address: "",
                      city: "",
                      state: "",
                      pincode: "",
                    },
                    items: localItems,
                  });
                }
              } else {
                // Merge if backend record has empty items due to lazy load
                if (existing.items.length === 0 && parsed.items && parsed.items.length > 0) {
                  existing.items = parsed.items.map((i: any) => ({
                    id: i.product?.id || i.id || Math.random(),
                    name: i.product?.name || i.name || "Automotive Component",
                    partNumber: i.product?.partNumber || i.partNumber || "OEM-PART",
                    price: Number(i.product?.price || i.price || 0),
                    quantity: Number(i.quantity || 1),
                    imageUrl: i.product?.imageUrl || i.imageUrl,
                    categoryName: i.product?.categoryName || i.categoryName,
                  }));
                }
                if (existing.totalPrice === 0 && parsed.totalPrice > 0) {
                  existing.totalPrice = Number(parsed.totalPrice);
                  existing.subtotal = Number(parsed.subtotal || parsed.totalPrice);
                }
                if (parsed.couponCode) existing.couponCode = parsed.couponCode;
                if (parsed.discountAmount) existing.discountAmount = parsed.discountAmount;
              }
            });
          }
        }
      } catch (e) {
        console.error("Failed to load local receipts", e);
      }

      // Filter out any ghost orders with zero items and zero price
      const validOrders = Array.from(ordersMap.values()).filter(
        (o) => (o.items && o.items.length > 0) || o.totalPrice > 0
      );

      setOrders(validOrders);
      if (validOrders.length > 0) {
        setSelectedOrderId(validOrders[0].orderId);
      }
      setIsLoading(false);
    };

    loadOrders();
  }, []);

  const activeOrder = orders.find((o) => o.orderId === selectedOrderId) || orders[0];

  const getStepStatus = (currentStatus: OrderStatus, step: "CONFIRMED" | "PACKED" | "IN_TRANSIT" | "DELIVERED") => {
    const orderRanks: Record<OrderStatus, number> = {
      CONFIRMED: 1,
      PACKED: 2,
      IN_TRANSIT: 3,
      DELIVERED: 4,
    };
    return orderRanks[currentStatus] >= orderRanks[step];
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#07080B]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 bg-[#07080B] text-white p-4">
        <div className="w-16 h-16 rounded-full bg-[#141822] border border-[#222734] flex items-center justify-center text-gray-500">
          <Package size={32} />
        </div>
        <h2 className="text-xl font-black text-white">No Orders Placed Yet</h2>
        <p className="text-xs text-gray-400 max-w-sm text-center">
          You haven&apos;t placed any orders yet. Browse our verified genuine accessories & spare parts catalog and place your first order.
        </p>
        <Link href="/shop" className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-600/25 transition-all">
          Explore Spare Parts Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07080B] text-white py-8 px-4 sm:px-6 space-y-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Page Header */}
        <div className="flex items-center justify-between border-b border-[#1C212B] pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <Package size={24} className="text-red-500" /> My Orders &amp; Live Tracking
            </h1>
            <p className="text-xs text-gray-400 font-medium mt-1">
              Track parcel transit progress, view invoice receipts, and review delivery details
            </p>
          </div>

          <Link href="/shop" className="hidden sm:flex text-sm font-bold text-red-500 hover:text-red-400 hover:underline items-center gap-1 transition-colors">
            Continue Shopping
          </Link>
        </div>

        {/* Orders Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Order Cards List (Full width on Mobile, 4 Cols on Desktop) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Your Placed Orders ({orders.length})
              </h3>
              <span className="text-[10px] text-gray-500 font-bold lg:hidden">
                Tap order to track parcel
              </span>
            </div>

            <div className="space-y-3.5">
              {orders.map((ord) => {
                const isSelected = ord.orderId === activeOrder?.orderId;
                const isDelivered = ord.status === "DELIVERED";

                const handleOrderClick = () => {
                  setSelectedOrderId(ord.orderId);
                  setIsMobileDetailOpen(true);
                };

                return (
                  <div
                    key={ord.orderId}
                    onClick={handleOrderClick}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all space-y-3 ${
                      isSelected
                        ? "border-red-600 bg-red-600/10 ring-2 ring-red-500/20 shadow-xl"
                        : "border-[#222734] bg-[#0F1218] hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-black text-sm text-white">#{ord.orderId}</span>
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                          isDelivered
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                            : "bg-red-600 text-white animate-pulse"
                        }`}
                      >
                        {isDelivered ? "Delivered" : "In Transit"}
                      </span>
                    </div>

                    {/* Order Items Preview */}
                    <div className="flex items-center gap-3">
                      {ord.items[0]?.imageUrl ? (
                        <div className="w-12 h-12 bg-[#141822] border border-[#222734] rounded-xl relative overflow-hidden flex-shrink-0">
                          <Image
                            src={ord.items[0].imageUrl}
                            alt={ord.items[0].name}
                            fill
                            unoptimized
                            className="object-contain p-1"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-[#141822] border border-[#222734] rounded-xl flex items-center justify-center text-gray-500 flex-shrink-0">
                          <Wrench className="w-5 h-5 text-red-500" />
                        </div>
                      )}

                      <div className="text-xs space-y-0.5 flex-1 min-w-0">
                        <p className="font-bold text-gray-200 line-clamp-1">
                          {ord.items.map((i) => i.name).join(", ")}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          {ord.items.length} {ord.items.length === 1 ? "Item" : "Items"} • {ord.paymentMethod === "COD" ? "Cash On Delivery" : "Prepaid"}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[11px] text-gray-400 font-bold pt-2 border-t border-[#1C212B]">
                      <span>{ord.date}</span>
                      <span className="font-black text-sm text-white">{formatPrice(ord.totalPrice)}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-red-400 font-black pt-1 bg-red-600/5 px-2.5 py-1.5 rounded-xl border border-red-500/10">
                      <span>📦 Track Parcel &amp; Details</span>
                      <ChevronRight size={15} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop Active Order Tracker (Right 8 Cols, Hidden on Mobile) */}
          {activeOrder && (
            <div className="hidden lg:block lg:col-span-8 space-y-6">
              {renderActiveOrderTracker(activeOrder)}
            </div>
          )}

        </div>

        {/* Mobile Full-Screen Live Tracking Modal / Drawer */}
        {isMobileDetailOpen && activeOrder && (
          <div className="lg:hidden fixed inset-0 z-50 bg-[#07080B] overflow-y-auto flex flex-col">
            {/* Sticky Mobile Modal Header */}
            <div className="sticky top-0 z-50 bg-[#0A0C10]/95 backdrop-blur-md border-b border-[#1A1E26] px-4 py-3 flex items-center justify-between shadow-xl">
              <button
                onClick={() => setIsMobileDetailOpen(false)}
                className="flex items-center gap-1.5 text-xs font-black text-white bg-[#141822] hover:bg-[#1E2538] px-3.5 py-2 rounded-xl border border-white/10 active:scale-95 transition-all"
              >
                <ArrowLeft size={15} className="text-red-500" />
                <span>Back to Orders List</span>
              </button>

              <button
                onClick={() => setIsMobileDetailOpen(false)}
                className="w-8 h-8 rounded-full bg-[#141822] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Mobile Order Content Details */}
            <div className="p-4 space-y-6 pb-24">
              {renderActiveOrderTracker(activeOrder)}
            </div>
          </div>
        )}

      </div>
    </div>
  );

  // Modular helper to render the live tracking timeline, courier card, items and invoice
  function renderActiveOrderTracker(order: Order) {
    return (
      <div className="space-y-6">
        <div className="bg-[#0F1218] border border-[#1C212B] rounded-3xl p-5 sm:p-8 space-y-6 shadow-xl text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#1C212B] pb-4">
            <div>
              <span className="text-[10px] font-black text-red-500 uppercase tracking-wider">Live Package Status</span>
              <h2 className="text-xl font-black text-white">
                Order #{order.orderId}
              </h2>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                Estimated Delivery: <strong className="text-white">{order.estimatedDelivery}</strong>
              </p>
            </div>

            <button
              onClick={() => setIsInvoiceOpen(true)}
              className="w-full sm:w-auto px-3.5 py-2 bg-[#141822] hover:bg-[#1C212B] text-gray-200 hover:text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 border border-[#222734] transition-colors"
            >
              <Printer size={16} className="text-red-500" /> Print Tax Bill
            </button>
          </div>

          {/* Live Tracking Timeline */}
          <div className="py-4">
            <div className="grid grid-cols-4 relative text-center text-sm">
              <div className="absolute top-4 left-0 right-0 h-1 bg-[#222734] -z-0"></div>

              {/* Step 1: Placed */}
              <div className="relative z-10 flex flex-col items-center space-y-1.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    getStepStatus(order.status, "CONFIRMED")
                      ? "bg-red-600 text-white ring-4 ring-red-500/20 shadow-md"
                      : "bg-[#141822] text-gray-500 border border-[#222734]"
                  }`}
                >
                  ✓
                </div>
                <span className="font-bold text-[10px] sm:text-[11px] text-gray-300">Placed</span>
              </div>

              {/* Step 2: Packed */}
              <div className="relative z-10 flex flex-col items-center space-y-1.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    getStepStatus(order.status, "PACKED")
                      ? "bg-red-600 text-white ring-4 ring-red-500/20 shadow-md"
                      : "bg-[#141822] text-gray-500 border border-[#222734]"
                  }`}
                >
                  ✓
                </div>
                <span className="font-bold text-[10px] sm:text-[11px] text-gray-300">Packed</span>
              </div>

              {/* Step 3: In Transit */}
              <div className="relative z-10 flex flex-col items-center space-y-1.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    getStepStatus(order.status, "IN_TRANSIT")
                      ? "bg-red-600 text-white ring-4 ring-red-500/20 shadow-md"
                      : "bg-[#141822] text-gray-500 border border-[#222734]"
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-[10px] sm:text-[11px] text-gray-300">In Transit</span>
              </div>

              {/* Step 4: Delivered */}
              <div className="relative z-10 flex flex-col items-center space-y-1.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    getStepStatus(order.status, "DELIVERED")
                      ? "bg-emerald-600 text-white ring-4 ring-emerald-500/20 shadow-md"
                      : "bg-[#141822] text-gray-500 border border-[#222734]"
                  }`}
                >
                  ✓
                </div>
                <span className="font-bold text-[10px] sm:text-[11px] text-gray-300">Delivered</span>
              </div>
            </div>
          </div>

          {/* Status Callout Box */}
          <div className="p-4 bg-[#141822] border border-[#222734] rounded-2xl flex items-start gap-3 text-xs">
            <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-black text-white">{order.statusText}</p>
              <p className="text-gray-400 text-[11px] mt-0.5">
                Current Location: <strong className="text-white">{order.currentLocation}</strong>
              </p>
            </div>
          </div>

          {/* Courier Logistics & AWB Tracking Card */}
          {(() => {
            const awbNumber = `BD-${(order.orderId.replace(/\D/g, "") || "847291").padStart(6, "0")}IN`;
            return (
              <div className="p-4 bg-gradient-to-r from-[#141822] to-[#10141F] border border-white/[0.08] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-md">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-red-600/10 border border-red-500/20 text-red-500 rounded-xl">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">BlueDart Priority Air Express</span>
                      <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[9px] font-black rounded-full">
                        Verified Courier
                      </span>
                    </div>
                    <p className="text-gray-400 text-[11px] mt-0.5 font-mono">
                      AWB No: <strong className="text-white">{awbNumber}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-1 sm:pt-0">
                  <button
                    onClick={() => handleCopyAwb(awbNumber)}
                    className="flex-1 sm:flex-none px-3 py-1.5 bg-[#1A202C] hover:bg-[#232B3B] border border-white/[0.08] text-gray-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all"
                    title="Copy AWB Tracking Number"
                  >
                    {copiedAwb ? (
                      <>
                        <Check size={13} className="text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} className="text-gray-400" />
                        <span>Copy AWB</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`https://www.bluedart.com/tracking?track=${awbNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ExternalLink size={13} />
                    <span>Track Live</span>
                  </a>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Components in this order */}
        <div className="bg-[#0F1218] border border-[#1C212B] rounded-3xl p-5 sm:p-7 space-y-4 shadow-xl text-white">
          <h3 className="text-base font-black text-white border-b border-[#1C212B] pb-3">
            Components in this Order ({order.items.length})
          </h3>
          <div className="divide-y divide-[#1C212B] space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#141822] border border-[#222734] rounded-2xl flex items-center justify-center relative overflow-hidden flex-shrink-0">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        unoptimized
                        className="object-contain p-1.5"
                      />
                    ) : (
                      <Wrench className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-wider">
                      {item.categoryName || "Genuine Part"}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-white line-clamp-1">{item.name}</h4>
                    <p className="text-[11px] text-gray-400">Part No: {item.partNumber}</p>
                    <p className="text-xs font-semibold text-gray-300">
                      Qty: {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>
                </div>
                <div className="text-sm font-black text-white text-right">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Address & Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {/* Shipping Details Box */}
          <div className="p-5 bg-[#0F1218] border border-[#1C212B] rounded-3xl space-y-2 text-xs shadow-xl text-white">
            <h4 className="font-black text-white flex items-center gap-1.5 border-b border-[#1C212B] pb-2">
              <MapPin className="w-4 h-4 text-red-500" /> Delivery Address
            </h4>
            <p className="font-bold text-white">{order.shippingAddress.name}</p>
            <p className="text-gray-300">{order.shippingAddress.address}</p>
            <p className="text-gray-300">
              {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
            </p>
            <p className="text-gray-400 pt-1">
              Phone: <strong className="text-white">{order.shippingAddress.primaryPhone}</strong>
              {order.shippingAddress.alternatePhone && ` • Alt: ${order.shippingAddress.alternatePhone}`}
            </p>
          </div>

          {/* Final Price Summary Box */}
          <div className="p-5 bg-[#0F1218] border border-[#1C212B] rounded-3xl space-y-2 text-xs shadow-xl text-white">
            <h4 className="font-black text-white border-b border-[#1C212B] pb-2">
              Payment Summary
            </h4>
            <div className="flex justify-between text-gray-300">
              <span>Payment Mode:</span>
              <strong className="text-white">
                {order.paymentMethod === "COD" ? "Cash on Delivery" : "Online Prepaid"}
              </strong>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Items Subtotal:</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            {order.discountAmount && order.discountAmount > 0 ? (
              <div className="flex justify-between text-emerald-400 font-bold">
                <span>Coupon Discount {order.couponCode ? `(${order.couponCode})` : ""}:</span>
                <span>-{formatPrice(order.discountAmount)}</span>
              </div>
            ) : null}
            <div className="flex justify-between text-gray-300">
              <span>Express Shipping:</span>
              {order.deliveryFee === 0 ? (
                <span className="text-emerald-400 font-bold">FREE</span>
              ) : (
                <span className="text-white font-bold">{formatPrice(order.deliveryFee)}</span>
              )}
            </div>
            <div className="pt-2 border-t border-[#1C212B] flex justify-between font-black text-sm text-white">
              <span>Total Paid / Payable:</span>
              <span>{formatPrice(order.totalPrice)}</span>
            </div>
          </div>
        </div>

        {/* Invoice Modal */}
        {isInvoiceOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#0F1218] border border-[#1C212B] text-white max-w-2xl w-full rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl print:bg-white print:text-black">
              <div className="flex justify-between items-center border-b border-[#1C212B] pb-4 print:hidden">
                <h3 className="font-black text-lg text-white">Tax Invoice / Bill of Supply</h3>

                <div className="flex gap-2">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 bg-[#141822] hover:bg-[#1C212B] border border-[#222734] text-white rounded-xl px-3 py-1.5 text-xs font-bold"
                  >
                    <Printer size={16} /><span>Print A4 Invoice</span>
                  </button>

                  <button 
                    onClick={() => setIsInvoiceOpen(false)}
                    className="px-3 py-1.5 bg-[#141822] hover:bg-[#1C212B] text-gray-300 hover:text-white text-xs font-bold rounded-xl border border-[#222734]"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="border border-[#1C212B] rounded-2xl p-6 space-y-5 text-gray-300 print:border-black print:text-black">
                <div className="flex justify-between items-start border-b border-[#1C212B] pb-4">
                  <div>
                    <h1 className="text-xl font-black text-white tracking-tight print:text-black">DriveZone Automotive Ltd.</h1>
                    <p className="text-gray-400 print:text-gray-600">Automotive Logistics Center, Bhopal, MP - 462001</p>
                    <p className="font-mono text-gray-400 print:text-gray-600">GSTIN: 23AABCC1234D1Z8</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-white print:text-black">INVOICE #{order.orderId}</p>
                    <p className="text-gray-400 print:text-gray-600">Date: {order.date}</p>
                    <p className="text-emerald-400 font-bold uppercase">{order.paymentMethod === "ONLINE" ? "PAID ONLINE" : "CASH ON DELIVERY"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-2 border-b border-[#1C212B]">
                  <div>
                    <span className="font-bold text-gray-400 uppercase text-[10px]">Billed &amp; Shipped To:</span>
                    <p className="font-black text-white print:text-black">{order.shippingAddress.name}</p>
                    <p className="text-gray-400 print:text-gray-600">{order.shippingAddress.address}</p>
                    <p className="text-gray-400 print:text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                    <p className="text-gray-400 print:text-gray-600">Contact: {order.shippingAddress.primaryPhone}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-400 uppercase text-[10px]">Authorized Courier:</span>
                    <p className="font-black text-white print:text-black">Express Logistics Air</p>
                    <p className="text-gray-400 print:text-gray-600">Dispatch Status: {order.status}</p>
                  </div>
                </div>

                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#1C212B] font-black text-white text-[11px] print:text-black print:border-black">
                      <th className="py-2">Item Description</th>
                      <th className="py-2">HSN</th>
                      <th className="py-2 text-center">Qty</th>
                      <th className="py-2 text-right">Unit Price</th>
                      <th className="py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C212B]">
                    {order.items.map((it) => (
                      <tr key={it.id}>
                        <td className="py-2 font-bold text-white print:text-black">
                          {it.name} <br/>
                          <span className="text-[10px] text-gray-400 font-mono">Part: {it.partNumber}</span>
                        </td>
                        <td className="py-2 text-gray-400 font-mono">8708</td>
                        <td className="py-2 text-center font-bold text-white print:text-black">{it.quantity}</td>
                        <td className="py-2 text-right text-gray-300 print:text-black">{formatPrice(it.price)}</td>
                        <td className="py-2 text-right font-black text-white print:text-black">{formatPrice(it.price * it.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="pt-3 border-t border-[#1C212B] flex justify-between">
                  <div className="text-[11px] text-gray-400 space-y-0.5">
                    <p>• Goods once sold are covered under 7-day replacement guarantee.</p>
                    <p>• GST 18% inclusive (CGST 9% + SGST 9%) as per Automotive Parts Schedule.</p>
                    <p>• This is a computer generated tax invoice.</p>
                  </div>
                  <div className="w-56 space-y-1 text-right text-xs">
                    <div className="flex justify-between"><span>Subtotal:</span><span>{formatPrice(order.subtotal)}</span></div>
                    {order.discountAmount ? (
                      <div className="flex justify-between text-emerald-400 font-bold"><span>Discount:</span><span>-{formatPrice(order.discountAmount)}</span></div>
                    ) : null}
                    <div className="flex justify-between"><span>Delivery:</span><span>{order.deliveryFee === 0 ? "FREE" : formatPrice(order.deliveryFee)}</span></div>
                    <div className="flex justify-between font-black text-sm border-t border-[#1C212B] pt-1 text-white print:text-black">
                      <span>Total Amount:</span><span>{formatPrice(order.totalPrice)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}