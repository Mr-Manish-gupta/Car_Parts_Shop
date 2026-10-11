"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/utils/formatPrice";
import {
  ShieldCheck,
  Users,
  Store,
  Package,
  Car,
  Check,
  X,
  ArrowUpRight,
  Search,
  Plus,
  Wrench,
  TrendingUp,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Layers,
  ChevronRight,
  Boxes,
} from "lucide-react";
import {
  AdminCarItem,
  AdminOrderItem,
  adminService,
  SellerRequestItem,
} from "@/services/admin";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"SELLERS" | "CARS" | "ORDERS">("SELLERS");
  const [isLoading, setIsLoading] = useState(false);

  const [sellerRequest, setSellerRequest] = useState<SellerRequestItem[]>([]);
  const [carList, setCarList] = useState<AdminCarItem[]>([]);
  const [orders, setOrders] = useState<AdminOrderItem[]>([]);
  const [totalProductCount, setTotalProductCount] = useState(0);

  const [newBrand, setNewBrand] = useState("");
  const [newModel, setNewModel] = useState("");
  const [newYear, setNewYear] = useState<number>(2024);
  const [newVariant, setNewVariant] = useState("SUV");
  const [newFuelType, setNewFuelType] = useState("Petrol");
  const [isSubmittingCar, setIsSubmittingCar] = useState(false);

  const loadAdminData = async () => {
    setIsLoading(true);
    try {
      const [sellersData, carsData, ordersData, prodsData] = await Promise.allSettled([
        adminService.getPendingSellers(),
        adminService.getAllCars(),
        adminService.getAllOrder(),
        adminService.getAllProducts(),
      ]);

      if (sellersData.status === "fulfilled" && Array.isArray(sellersData.value)) {
        setSellerRequest(sellersData.value);
      }
      if (carsData.status === "fulfilled" && Array.isArray(carsData.value)) {
        setCarList(carsData.value);
      }
      if (ordersData.status === "fulfilled" && Array.isArray(ordersData.value)) {
        setOrders(ordersData.value);
      }
      if (prodsData.status === "fulfilled" && Array.isArray(prodsData.value)) {
        setTotalProductCount(prodsData.value.length);
      }
    } catch (e) {
      console.error("Failed to load admin data", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleAppoveSeller = async (id: number) => {
    try {
      await adminService.approveSeller(id);
      alert("Seller Request Approved Successfully! User is now an authorized seller.");
      setSellerRequest((prev) => prev.filter((s) => s.id !== id));
    } catch (err: any) {
      alert("Failed to approve seller: " + (err.response?.data?.message || err.message));
    }
  };

  const handleRejectSeller = async (id: number) => {
    try {
      await adminService.rejectSeller(id);
      alert("Seller application rejected.");
      setSellerRequest((prev) => prev.filter((s) => s.id !== id));
    } catch (err: any) {
      alert("Failed to reject seller: " + (err.response?.data?.message || err.message));
    }
  };

  const handleAddCar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrand || !newModel) return;

    setIsSubmittingCar(true);

    try {
      const savedCar = await adminService.addCar({
        brand: newBrand,
        model: newModel,
        year: Number(newYear),
        variant: newVariant,
        fuelType: newFuelType,
      });

      alert(`Car "${newBrand} ${newModel}" added to database!`);
      setCarList((prev) => [...prev, savedCar]);
      setNewBrand("");
      setNewModel("");
    } catch (err: any) {
      alert("Failed to save car: " + (err.response?.data?.message || err.message));
    } finally {
      setIsSubmittingCar(false);
    }
  };

  const handleOrderStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await adminService.updateOrderStatus(orderId, newStatus);
      alert(`Order #${orderId} status updated to ${newStatus}`);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus as any } : o))
      );
    } catch (err: any) {
      alert("Failed to update status: " + (err.response?.data?.message || err.message));
    }
  };

  const realGMV = orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
  const pendingSellersCount = sellerRequest.filter((s) => s.status === "PENDING").length;

  return (
    <div className="min-h-screen bg-[#07080B] text-white py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1C212B] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-red-600/10 border border-red-600/30 text-red-400 text-[10px] font-black rounded-full uppercase tracking-wider">
                DriveZone Administrator
              </span>
              <span className="text-xs text-gray-500 font-mono font-bold">Root Command Access</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <ShieldCheck className="w-7 h-7 text-red-600" />
              Platform Operations Center
            </h1>
            <p className="text-xs text-gray-400 font-medium mt-1">
              Live GMV analytics, seller KYC approvals, universal car compatibility catalog, and order dispatch workflows.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAdminData}
              disabled={isLoading}
              className="px-4 py-2.5 flex items-center gap-2 bg-[#141822] hover:bg-[#1C212B] border border-[#222734] text-gray-300 text-xs font-bold rounded-xl transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
              <span>Refresh Metrics</span>
            </button>

            <Link
              href="/"
              className="px-4 py-2.5 bg-red-600 text-white text-xs font-black rounded-xl hover:bg-red-700 shadow-lg shadow-red-600/25 transition-all"
            >
              Exit to Customer Store
            </Link>
          </div>
        </div>

        {/* Real-time KPI Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-[#0F1218] border border-[#1C212B] rounded-2xl space-y-2 relative overflow-hidden group hover:border-[#2A3242] transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-600/5 rounded-full blur-xl group-hover:bg-emerald-600/10 transition-all" />
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Total Platform GMV</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">{formatPrice(realGMV)}</div>
            <p className="text-[11px] text-emerald-500 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Gross Transaction Value
            </p>
          </div>

          <div className="p-5 bg-[#0F1218] border border-[#1C212B] rounded-2xl space-y-2 relative overflow-hidden group hover:border-[#2A3242] transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full blur-xl group-hover:bg-blue-600/10 transition-all" />
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Total Orders Handled</span>
            <div className="text-2xl sm:text-3xl font-black text-white">{orders.length}</div>
            <p className="text-[11px] text-gray-500 font-medium">Pan-India buyer shipments</p>
          </div>

          <div className="p-5 bg-[#0F1218] border border-[#1C212B] rounded-2xl space-y-2 relative overflow-hidden group hover:border-[#2A3242] transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-full blur-xl group-hover:bg-red-600/10 transition-all" />
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Live Catalog Parts</span>
            <div className="text-2xl sm:text-3xl font-black text-white">{totalProductCount}</div>
            <p className="text-[11px] text-red-400 font-bold">Active SKUs listed</p>
          </div>

          <div className="p-5 bg-[#0F1218] border border-[#1C212B] rounded-2xl space-y-2 relative overflow-hidden group hover:border-[#2A3242] transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-600/5 rounded-full blur-xl group-hover:bg-amber-600/10 transition-all" />
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Pending KYC Approvals</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 flex items-center gap-2">
              {pendingSellersCount > 0 && <AlertCircle className="w-5 h-5 text-amber-500 animate-pulse" />}
              {pendingSellersCount}
            </div>
            <p className="text-[11px] text-amber-500 font-medium">Awaiting merchant review</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-[#1C212B] pb-2">
          <button
            onClick={() => setActiveTab("SELLERS")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === "SELLERS"
                ? "bg-red-600 text-white shadow-lg shadow-red-600/25"
                : "text-gray-400 hover:text-white hover:bg-[#141822]"
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Seller KYC ({pendingSellersCount})</span>
          </button>

          <button
            onClick={() => setActiveTab("ORDERS")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === "ORDERS"
                ? "bg-red-600 text-white shadow-lg shadow-red-600/25"
                : "text-gray-400 hover:text-white hover:bg-[#141822]"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>All Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("CARS")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === "CARS"
                ? "bg-red-600 text-white shadow-lg shadow-red-600/25"
                : "text-gray-400 hover:text-white hover:bg-[#141822]"
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Vehicle Master Database ({carList.length})</span>
          </button>
        </div>

        {/* SELLER APPLICATIONS TAB */}
        {activeTab === "SELLERS" && (
          <div className="bg-[#0F1218] border border-[#1C212B] rounded-2xl overflow-hidden p-6 space-y-4">
            <div>
              <h2 className="text-base font-black text-white">Seller Partnership Applications</h2>
              <p className="text-xs text-gray-400">Verify business credentials, GSTIN, PAN, and activate seller stores.</p>
            </div>

            {sellerRequest.length === 0 ? (
              <div className="text-center py-16 text-gray-400 text-xs font-bold bg-[#141822] rounded-2xl border border-[#222734] space-y-2">
                <ShieldCheck size={32} className="mx-auto text-emerald-500/50" />
                <p>No pending seller requests right now. All merchant applications are reviewed!</p>
              </div>
            ) : (
              <div className="divide-y divide-[#1C212B]">
                {sellerRequest.map((seller) => (
                  <div
                    key={seller.id}
                    className="py-5 first:pt-2 last:pb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-white">{seller.businessName}</h3>
                        <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold rounded-md">
                          {seller.status}
                        </span>
                      </div>

                      <p className="text-xs text-gray-300">
                        Applicant: <strong className="text-white">{seller.uses?.name || "Merchant"}</strong> • Phone:{" "}
                        <span className="text-gray-400">{seller.user?.phoneNumber || "N/A"}</span> • Email:{" "}
                        <span className="text-gray-400">{seller.user?.email || "N/A"}</span>
                      </p>
                      <p className="text-[11px] text-gray-400 font-mono">
                        GSTIN: <strong className="text-white">{seller.gstin}</strong> • PAN:{" "}
                        <strong className="text-white">{seller.panNumber}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRejectSeller(seller.id)}
                        className="px-4 py-2 bg-red-600/10 hover:bg-red-600/20 border border-red-600/30 text-red-400 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" /> Reject
                      </button>
                      <button
                        onClick={() => handleAppoveSeller(seller.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl flex items-center gap-1.5 shadow-lg shadow-emerald-600/25 transition-all hover:scale-105"
                      >
                        <Check className="w-4 h-4" /> Approve Merchant
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ALL ORDERS TAB */}
        {activeTab === "ORDERS" && (
          <div className="bg-[#0F1218] border border-[#1C212B] rounded-2xl overflow-hidden p-6 space-y-4">
            <h2 className="text-base font-black text-white">Marketplace Customer Orders</h2>

            {orders.length === 0 ? (
              <div className="text-center py-16 text-gray-400 text-xs font-bold bg-[#141822] rounded-2xl border border-[#222734]">
                No orders placed yet in the marketplace.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#1C212B] text-gray-400 uppercase font-black tracking-wider text-[10px] bg-[#141822]">
                      <th className="py-3.5 px-4 rounded-l-xl">Order ID</th>
                      <th className="py-3.5 px-4">Customer</th>
                      <th className="py-3.5 px-4">Total Amount</th>
                      <th className="py-3.5 px-4">Payment</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 rounded-r-xl">Override Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C212B]">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-[#141822]/60 transition-colors">
                        <td className="py-4 px-4 font-mono font-bold text-white">#{o.id}</td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-white">{o.user?.name || "Customer"}</p>
                          <span className="text-[10px] text-gray-500">{o.user?.email}</span>
                        </td>
                        <td className="py-4 px-4 font-black text-emerald-400">{formatPrice(o.totalAmount)}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2.5 py-1 rounded text-[10px] font-black ${
                              o.paymentStatus === "COMPLETED"
                                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                                : "bg-amber-500/10 border border-amber-500/30 text-amber-400"
                            }`}
                          >
                            {o.paymentStatus}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2.5 py-1 rounded text-[10px] font-black uppercase ${
                              o.orderStatus === "DELEVERED" || o.orderStatus === "DELIVERED"
                                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                                : o.orderStatus === "SHIPPING" || o.orderStatus === "SHIPPED"
                                ? "bg-blue-500/10 border border-blue-500/30 text-blue-400"
                                : o.orderStatus === "CANCELLED"
                                ? "bg-red-500/10 border border-red-500/30 text-red-400"
                                : "bg-amber-500/10 border border-amber-500/30 text-amber-400"
                            }`}
                          >
                            {o.orderStatus === "DELEVERED" ? "DELIVERED" : o.orderStatus === "SHIPPING" ? "IN TRANSIT" : o.orderStatus}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={o.orderStatus}
                            onChange={(e) => handleOrderStatusChange(o.id, e.target.value)}
                            className="px-3 py-1.5 border border-[#222734] rounded-xl text-xs font-bold bg-[#141822] text-white outline-none focus:border-red-600 transition-colors"
                          >
                            <option value="PENDING">PENDING (Placed)</option>
                            <option value="PROGRESSED">PROGRESSED (Packing)</option>
                            <option value="SHIPPING">SHIPPING (In Transit)</option>
                            <option value="DELEVERED">DELEVERED (Delivered)</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* CARS MASTER CATALOG TAB */}
        {activeTab === "CARS" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Cars List */}
            <div className="lg:col-span-7 bg-[#0F1218] border border-[#1C212B] rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-black text-white">Registered Car Models ({carList.length})</h2>
              <div className="divide-y divide-[#1C212B] max-h-[600px] overflow-y-auto pr-1">
                {carList.map((car) => (
                  <div key={car.id} className="py-3.5 first:pt-0 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-[#141822] border border-[#222734] text-red-500 rounded-xl">
                        <Car className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">
                          {car.brand} {car.model}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          Year: {car.year} • Variant: {car.variant} • Fuel: {car.fuelType}
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold rounded-lg text-[10px]">
                      Active in Garage
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Add Car Form */}
            <div className="lg:col-span-5 bg-[#0F1218] border border-[#1C212B] rounded-2xl p-6 sm:p-7 space-y-4 sticky top-24">
              <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-[#1C212B] pb-3">
                <Plus className="w-5 h-5 text-red-600" /> Add New Vehicle Model
              </h3>

              <form onSubmit={handleAddCar} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300">Car Brand / Make *</label>
                  <input
                    type="text"
                    required
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    placeholder="e.g. Toyota, Mahindra, Tata, Hyundai"
                    className="w-full px-3.5 py-2 bg-[#141822] border border-[#222734] rounded-xl text-xs font-bold text-white placeholder-gray-600 focus:border-red-600 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300">Model Name *</label>
                  <input
                    type="text"
                    required
                    value={newModel}
                    onChange={(e) => setNewModel(e.target.value)}
                    placeholder="e.g. Fortuner, Thar, Creta, Safari"
                    className="w-full px-3.5 py-2 bg-[#141822] border border-[#222734] rounded-xl text-xs font-bold text-white placeholder-gray-600 focus:border-red-600 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-300">Model Year</label>
                    <input
                      type="number"
                      value={newYear}
                      required
                      onChange={(e) => setNewYear(Number(e.target.value))}
                      placeholder="e.g. 2024"
                      className="w-full px-3.5 py-2 bg-[#141822] border border-[#222734] rounded-xl text-xs font-bold text-white placeholder-gray-600 focus:border-red-600 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-300">Variant</label>
                    <input
                      required
                      value={newVariant}
                      onChange={(e) => setNewVariant(e.target.value)}
                      placeholder="e.g. 4x4, VXi, ZX"
                      className="w-full px-3.5 py-2 bg-[#141822] border border-[#222734] rounded-xl text-xs font-bold text-white placeholder-gray-600 focus:border-red-600 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300">Fuel Type</label>
                  <select
                    value={newFuelType}
                    onChange={(e) => setNewFuelType(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#141822] border border-[#222734] rounded-xl text-xs font-bold text-white focus:border-red-600 outline-none"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="CNG">CNG</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingCar}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-800 disabled:text-gray-500 text-white font-black text-xs rounded-xl shadow-lg shadow-red-600/25 transition-all mt-2"
                >
                  {isSubmittingCar ? "Saving to Database..." : "Save Vehicle to Master Catalog"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}