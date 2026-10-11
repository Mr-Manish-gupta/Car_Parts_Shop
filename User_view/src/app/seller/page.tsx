"use client";

import { Product, Category } from "@/types/product";
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";
import React, { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Car,
  Plus,
  Search,
  ShoppingBag,
  Store,
  Trash2,
  Wrench,
  X,
  Package,
  Truck,
  CheckCircle2,
  Layers,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Boxes,
} from "lucide-react";
import Link from "next/link";
import { api as axiosClient } from "@/services/api";
import { api as apiUrls } from "@/services/apiUrls";
import { productService } from "@/services/productService";
import { carService } from "@/services/carService";
import { Car as CarType } from "@/types/car";

export default function SellerDashboardPage() {
  const [product, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [name, setName] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [categoryId, setCategoryId] = useState<number>(1);
  const [price, setPrice] = useState<number>(999);
  const [stock, setStock] = useState<number>(10);
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState<string[]>(["", "", "", ""]);
  const [description, setDescription] = useState("");
  const [selectedCarIds, setSelectedCarIds] = useState<number[]>([]);
  const [availableCars, setAvailableCars] = useState<CarType[]>([]);

  const handleImageChange = (index: number, val: string) => {
    setImages((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  const handleAddImageSlot = () => {
    setImages((prev) => [...prev, ""]);
  };

  const handleRemoveImageSlot = (index: number) => {
    if (images.length <= 4) return;
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const popularColors = [
    "OEM Matte Black",
    "Pearl Gloss White",
    "Metallic Silver",
    "Smoke Grey",
    "Racing Red",
    "Nexa Blue",
    "Beige / Tan",
    "Carbon Fiber Pattern",
  ];

  const [colorList, setColorsList] = useState<string[]>([]);
  const [customColorsText, setCustomColorsText] = useState("");

  const handleAddColor = (colorName: string) => {
    const trimmed = colorName.trim();
    if (trimmed && !colorList.includes(trimmed)) {
      setColorsList([...colorList, trimmed]);
    }
  };

  const hanldeCustomColorSubmit = () => {
    if (customColorsText.trim()) {
      handleAddColor(customColorsText.trim());
      setCustomColorsText("");
    }
  };

  const handleRemoveColor = (colorName: string) => {
    setColorsList(colorList.filter((c) => c !== colorName));
  };

  const [activeTab, setActiveTab] = useState<"INVENTORY" | "ORDERS">("INVENTORY");
  const [sellerOrders, setIsSellerOrders] = useState<any[]>([]);

  useEffect(() => {
    const loadSellerData = async () => {
      try {
        const cats = await productService.getCategories();
        if (Array.isArray(cats)) {
          setCategories(cats);
          if (cats.length > 0) {
            setCategoryId(cats[0].id);
          }
        }
      } catch (e) {
        console.error("Failed to load categories", e);
      }

      try {
        const cars = await carService.getAllCars();
        if (Array.isArray(cars) && cars.length > 0) {
          setAvailableCars(cars);
          setSelectedCarIds([cars[0].id]);
        }
      } catch (e) {
        console.error("Failed to load cars from backend.", e);
      }

      try {
        const res = await axiosClient.get(apiUrls.SELLER_PRODUCTS_MY());
        if (res.data && Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setProducts([]);
        }
      } catch (e) {
        console.error("Failed to load seller products from PostgreSQL", e);
        setProducts([]);
      }

      try {
        const ordersRes = await axiosClient.get(apiUrls.SELLER_ORDERS());
        if (ordersRes.data && Array.isArray(ordersRes.data)) {
          setIsSellerOrders(ordersRes.data);
        }
      } catch (e) {
        console.error("Failed to load seller orders", e);
      }
    };

    loadSellerData();
  }, []);

  const toggleCarSelection = (carId: number) => {
    setSelectedCarIds((prev) =>
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]
    );
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const validImages = images.map((img) => img.trim()).filter(Boolean);
    if (validImages.length < 4) {
      alert("Please provide at least 4 photos for the product (Front, Side, Back, Details/Label) before publishing.");
      return;
    }

    const matchedCars = availableCars.filter((c) => selectedCarIds.includes(c.id));
    const selectedCategory = categories.find((c) => c.id === Number(categoryId));

    const productPayload = {
      name,
      partNumber,
      categoryId: Number(categoryId),
      price: Number(price),
      stock: Number(stock),
      imageUrl: validImages[0],
      images: validImages,
      description,
      compatibleCarIds: selectedCarIds,
      availableColors: colorList,
    };

    try {
      const res = await axiosClient.post(apiUrls.SELLER_PRODUCT_CREATE(), productPayload);
      if (res.data && res.data.id) {
        setProducts([res.data, ...product]);
      }
    } catch (err) {
      console.error("Failed to save product in PostgreSQL backend", err);
      const localProduct: Product = {
        id: Date.now(),
        name,
        partNumber,
        categoryId: Number(categoryId),
        categoryName: selectedCategory?.name || "Spare Part",
        price: Number(price),
        stock: Number(stock),
        imageUrl: validImages[0],
        images: validImages,
        description,
        sellerId: 101,
        sellerName: "My Official Parts Store",
        compatibleCars: matchedCars,
        availableColors: colorList,
      };
      setProducts([localProduct, ...product]);
    }

    setName("");
    setPartNumber("");
    setPrice(999);
    setStock(10);
    setImageUrl("");
    setImages(["", "", "", ""]);
    setDescription("");
    setSelectedCarIds(availableCars.length > 0 ? [availableCars[0].id] : []);
    setIsAddModalOpen(false);
    setColorsList([]);
    setCustomColorsText("");
  };

  const handleStockChange = (productId: number, delta: number) => {
    setProducts((prev: Product[]) =>
      prev.map((p) =>
        p.id === productId ? { ...p, stock: Math.max(0, p.stock + delta) } : p
      )
    );
  };

  const handleDeleteProduct = (productId: number) => {
    if (confirm("Are you sure you want to remove this component from your DriveZone store catalog?")) {
      setProducts((prev: Product[]) => prev.filter((p) => p.id !== productId));
    }
  };

  const filterProducts = product.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.partNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnitInStock = product.reduce((sum, p) => sum + p.stock, 0);
  const lowStockCount = product.filter((p) => p.stock <= 5).length;

  const handleUpdateDispatchStatus = async (orderId: number, newStatus: string) => {
    if (!orderId) {
      alert("Order ID not found for this item.");
      return;
    }
    try {
      await axiosClient.put(apiUrls.ORDER_UPDATE_STATUS(orderId, newStatus));
      alert(`Order #${orderId} marked as ${newStatus}!`);
      setIsSellerOrders((prev) =>
        prev.map((item) =>
          item.orderId === orderId ? { ...item, orderStatus: newStatus } : item
        )
      );
    } catch (e: any) {
      console.error("Failed to update order status", e);
      alert("Failed to update status: " + (e.response?.data?.message || e.message));
    }
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-white py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1C212B] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-black rounded-full uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 size={12} /> Verified DriveZone Partner
              </span>
              <span className="text-xs text-gray-400 font-mono font-bold">Store ID: #DZ-8821</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <Store className="w-7 h-7 text-red-600" />
              Seller Merchant Center
            </h1>
            <p className="text-xs text-gray-400 font-medium mt-1">
              Publish authentic components, configure vehicle fitment, manage live warehouse inventory, and dispatch orders.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all hover:scale-105 duration-200"
            >
              <Plus size={18} />
              <span>List New Spare Part</span>
            </button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-[#0F1218] border border-[#1C212B] rounded-2xl space-y-2 relative overflow-hidden group hover:border-[#2A3242] transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-full blur-xl group-hover:bg-red-600/10 transition-all" />
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Listed Parts</span>
              <Boxes size={18} className="text-red-500" />
            </div>
            <div className="text-3xl font-black text-white">{product.length}</div>
            <p className="text-[11px] text-gray-500 font-medium">Active in public catalog</p>
          </div>

          <div className="p-5 bg-[#0F1218] border border-[#1C212B] rounded-2xl space-y-2 relative overflow-hidden group hover:border-[#2A3242] transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-600/5 rounded-full blur-xl group-hover:bg-emerald-600/10 transition-all" />
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Available Stock Units</span>
              <Layers size={18} className="text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">{totalUnitInStock}</div>
            <p className="text-[11px] text-gray-500 font-medium">Ready for immediate dispatch</p>
          </div>

          <div className="p-5 bg-[#0F1218] border border-[#1C212B] rounded-2xl space-y-2 relative overflow-hidden group hover:border-[#2A3242] transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-600/5 rounded-full blur-xl group-hover:bg-amber-600/10 transition-all" />
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Inventory Health</span>
              <AlertTriangle size={18} className={lowStockCount > 0 ? "text-amber-500 animate-pulse" : "text-gray-500"} />
            </div>
            <div className={`text-3xl font-black ${lowStockCount > 0 ? "text-amber-400" : "text-white"}`}>
              {lowStockCount} <span className="text-sm font-semibold text-gray-400">Parts Low</span>
            </div>
            <p className="text-[11px] text-gray-500 font-medium">Stock levels &le; 5 units</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C212B] pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("INVENTORY")}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                activeTab === "INVENTORY"
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/25"
                  : "text-gray-400 hover:text-white hover:bg-[#141822]"
              }`}
            >
              <Boxes size={15} />
              <span>Components Catalog ({product.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("ORDERS")}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                activeTab === "ORDERS"
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/25"
                  : "text-gray-400 hover:text-white hover:bg-[#141822]"
              }`}
            >
              <ShoppingBag size={15} />
              <span>Orders Received ({sellerOrders.length})</span>
            </button>
          </div>

          {activeTab === "INVENTORY" && (
            <div className="relative max-w-sm w-full">
              <input
                type="text"
                placeholder="Search part name or OEM number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#141822] border border-[#222734] rounded-xl text-xs text-white placeholder-gray-500 focus:border-red-600 outline-none transition-all"
              />
              <Search size={16} className="text-gray-400 absolute left-3.5 top-2.5" />
            </div>
          )}
        </div>

        {/* ORDERS RECEIVED TAB */}
        {activeTab === "ORDERS" && (
          <div className="bg-[#0F1218] border border-[#1C212B] rounded-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-white">Customer Orders for Your Spare Parts</h2>
                <p className="text-xs text-gray-400">Review buyer details, update fulfillment lifecycle, and initiate couriers.</p>
              </div>
            </div>

            {sellerOrders.length === 0 ? (
              <div className="text-center py-16 text-gray-400 text-xs font-bold bg-[#141822] rounded-2xl border border-[#222734] space-y-2">
                <ShoppingBag size={32} className="mx-auto text-gray-600" />
                <p>No customer orders received for your components yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#1C212B] text-gray-400 uppercase font-black text-[10px] tracking-wider bg-[#141822]">
                      <th className="py-3.5 px-4 rounded-l-xl">Part Details</th>
                      <th className="py-3.5 px-4">Unit Price</th>
                      <th className="py-3.5 px-4">Sold Qty</th>
                      <th className="py-3.5 px-4">Total Payout</th>
                      <th className="py-3.5 px-4 text-right rounded-r-xl">Dispatch Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C212B]">
                    {sellerOrders.map((item: any) => (
                      <tr key={item.id} className="hover:bg-[#141822]/60 transition-colors">
                        <td className="py-4 px-4">
                          <p className="font-bold text-white text-sm">{item.product?.name || "Automotive Component"}</p>
                          <span className="text-[10px] text-gray-400 font-mono">OEM: {item.product?.partNumber}</span>
                        </td>
                        <td className="py-4 px-4 font-bold text-gray-200">{formatPrice(item.price)}</td>
                        <td className="py-4 px-4 font-black text-red-500">{item.quantity} units</td>
                        <td className="py-4 px-4 font-black text-emerald-400">
                          {formatPrice(item.subtotal || item.price * item.quantity)}
                        </td>
                        <td className="py-4 px-4 text-right">
                          {(!item.orderStatus || item.orderStatus === "PENDING") && (
                            <button
                              type="button"
                              onClick={() => handleUpdateDispatchStatus(item.orderId, "PROGRESSED")}
                              className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-black text-[11px] rounded-xl shadow-sm transition-all inline-flex items-center gap-1.5"
                            >
                              <Package size={13} /> Mark as Packed
                            </button>
                          )}
                          {item.orderStatus === "PROGRESSED" && (
                            <button
                              type="button"
                              onClick={() => handleUpdateDispatchStatus(item.orderId, "SHIPPING")}
                              className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-black text-[11px] rounded-xl shadow-sm transition-all inline-flex items-center gap-1.5"
                            >
                              <Truck size={13} /> Handover to Courier
                            </button>
                          )}
                          {item.orderStatus === "SHIPPING" && (
                            <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold text-[10px] rounded-lg">
                              In Transit
                            </span>
                          )}
                          {(item.orderStatus === "DELIVERED" || item.orderStatus === "DELEVERED") && (
                            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold text-[10px] rounded-lg inline-flex items-center gap-1">
                              <CheckCircle2 size={12} /> Delivered
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* INVENTORY TAB */}
        {activeTab === "INVENTORY" && (
          <div className="space-y-4">
            {filterProducts.length === 0 ? (
              <div className="p-12 text-center bg-[#0F1218] border border-[#1C212B] rounded-2xl text-gray-400 text-xs font-bold space-y-3">
                <Wrench size={32} className="mx-auto text-gray-600" />
                <p>No components found matching your search.</p>
              </div>
            ) : (
              <div className="bg-[#0F1218] border border-[#1C212B] rounded-2xl overflow-hidden divide-y divide-[#1C212B]">
                {filterProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#141822]/70 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#141822] border border-[#222734] rounded-2xl relative overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {p.imageUrl ? (
                          <Image src={p.imageUrl} alt={p.name} fill unoptimized className="object-cover" />
                        ) : (
                          <Wrench size={22} className="text-gray-600" />
                        )}
                      </div>

                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-red-600/10 border border-red-600/30 text-red-400 text-[10px] font-black rounded-md uppercase tracking-wider">
                            {p.categoryName || "Automotive"}
                          </span>
                          <span className="text-[10px] font-mono text-gray-400">OEM: {p.partNumber}</span>
                        </div>

                        <Link href={`/products/${p.id}`}>
                          <h3 className="text-sm font-bold text-white hover:text-red-400 transition-colors">
                            {p.name}
                          </h3>
                        </Link>

                        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                          <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                            <Car size={12} className="text-red-500" /> Compatible:
                          </span>
                          {p.compatibleCars?.slice(0, 3).map((car, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-[#141822] border border-[#222734] text-gray-300 text-[10px] font-medium rounded-md"
                            >
                              {car.brand} {car.model}
                            </span>
                          ))}
                          {p.compatibleCars && p.compatibleCars.length > 3 && (
                            <span className="text-[10px] text-gray-500 font-bold">
                              +{p.compatibleCars.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-[#1C212B]">
                      <div className="text-left sm:text-right min-w-[90px]">
                        <div className="text-base text-white font-black">{formatPrice(p.price)}</div>
                        <div className="text-[10px] text-gray-400">Selling Price</div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#222734] rounded-xl bg-[#141822] p-1">
                        <button
                          onClick={() => handleStockChange(p.id, -1)}
                          title="Reduce Stock"
                          className="w-7 h-7 flex items-center justify-center text-xs font-black text-gray-400 hover:text-white hover:bg-[#1C212B] rounded-lg transition-colors"
                        >
                          -
                        </button>
                        <span
                          className={`px-3 text-xs font-black ${
                            p.stock <= 5 ? "text-amber-400" : "text-white"
                          }`}
                        >
                          {p.stock}
                        </span>
                        <button
                          onClick={() => handleStockChange(p.id, +1)}
                          title="Increase Stock"
                          className="w-7 h-7 flex items-center justify-center text-xs font-black text-gray-400 hover:text-white hover:bg-[#1C212B] rounded-lg transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-2.5 text-gray-400 hover:text-red-400 hover:bg-red-600/10 rounded-xl transition-all"
                        title="Remove Component"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Modal: ADD New Component */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center p-4 overflow-y-auto animate-fade-in">
            <div className="bg-[#0F1218] rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-[#1C212B] space-y-6 my-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#1C212B] pb-4">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <Plus className="text-red-600" size={20} /> List New Automotive Spare Part
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Configure OEM specifications, vehicle compatibility, multi-angle images, and pricing.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-[#141822] rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-gray-300">Part Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Bosch Front Ceramic Brake Pad Set"
                      className="w-full px-3.5 py-2.5 bg-[#141822] border border-[#222734] rounded-xl text-xs font-bold text-white placeholder-gray-600 focus:border-red-600 outline-none"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-300">Category *</label>
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-[#141822] border border-[#222734] rounded-xl text-xs font-bold text-white focus:border-red-600 outline-none"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id} className="bg-[#141822] text-white">
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* OEM Part Number */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-300">OEM Part Number *</label>
                    <input
                      type="text"
                      required
                      value={partNumber}
                      onChange={(e) => setPartNumber(e.target.value)}
                      placeholder="e.g. BP-BSH-9921"
                      className="w-full px-3.5 py-2.5 bg-[#141822] border border-[#222734] rounded-xl text-xs font-bold text-white placeholder-gray-600 focus:border-red-600 outline-none"
                    />
                  </div>

                  {/* Price */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-300">Selling Price (₹) *</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-[#141822] border border-[#222734] rounded-xl text-xs font-bold text-white placeholder-gray-600 focus:border-red-600 outline-none"
                    />
                  </div>

                  {/* Stock */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-300">Available Stock Quantity *</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={stock}
                      onChange={(e) => setStock(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-[#141822] border border-[#222734] rounded-xl text-xs font-bold text-white placeholder-gray-600 focus:border-red-600 outline-none"
                    />
                  </div>

                  {/* Product Photos */}
                  <div className="sm:col-span-2 space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                          Product Photos (Minimum 4 Images Required) *
                        </label>
                        <p className="text-[11px] text-gray-400">
                          Provide high-quality URLs for different angles so buyers can inspect fitment and quality.
                        </p>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-black ${
                          images.filter((img) => img.trim()).length >= 4
                            ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                            : "bg-amber-500/10 border border-amber-500/30 text-amber-400"
                        }`}
                      >
                        {images.filter((img) => img.trim()).length} / {images.length} added (Min 4)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {images.map((imgUrl, idx) => {
                        const slotLabels = [
                          "1. Front View (Main Cover)",
                          "2. Side / Angle View",
                          "3. Back / Mounting Points",
                          "4. Part Label / OEM Stamp",
                        ];
                        const slotTitle = slotLabels[idx] || `${idx + 1}. Additional Angle`;

                        return (
                          <div
                            key={idx}
                            className="p-3 border border-[#222734] rounded-2xl bg-[#141822] space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-gray-300">{slotTitle}</span>
                              {idx >= 4 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImageSlot(idx)}
                                  className="text-gray-500 hover:text-red-400 text-xs font-bold"
                                >
                                  Remove
                                </button>
                              )}
                            </div>

                            <div className="flex gap-2 items-center">
                              <div className="relative w-12 h-12 rounded-xl border border-[#222734] bg-[#0F1218] flex items-center justify-center overflow-hidden flex-shrink-0">
                                {imgUrl.trim() ? (
                                  <img
                                    src={imgUrl.trim()}
                                    alt={`Preview ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLElement).style.display = "none";
                                    }}
                                  />
                                ) : (
                                  <span className="text-[10px] text-gray-500 font-mono">#{idx + 1}</span>
                                )}
                              </div>

                              <input
                                type="url"
                                required={idx < 4}
                                value={imgUrl}
                                onChange={(e) => handleImageChange(idx, e.target.value)}
                                placeholder={`Image URL for ${slotTitle.toLowerCase()}`}
                                className="flex-1 px-3 py-2 bg-[#0F1218] border border-[#222734] rounded-xl text-xs font-bold text-white placeholder-gray-600 focus:border-red-600 outline-none"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={handleAddImageSlot}
                      className="text-xs font-bold text-red-500 hover:text-red-400 flex items-center gap-1 mt-1"
                    >
                      + Add Another Photo Angle (Optional)
                    </button>
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-gray-300">Description</label>
                    <textarea
                      rows={2}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Technical details, material specifications, warranty info..."
                      className="w-full px-3.5 py-2 bg-[#141822] border border-[#222734] rounded-xl text-xs font-bold text-white placeholder-gray-600 focus:border-red-600 outline-none"
                    />
                  </div>

                  {/* Colors */}
                  <div className="sm:col-span-2 space-y-3 pt-3 border-t border-[#1C212B]">
                    <label className="text-xs font-bold text-gray-300">Available Colors / Finishes (Optional)</label>

                    {colorList.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 p-3 bg-[#141822] rounded-xl border border-[#222734]">
                        <span className="text-[10px] font-black text-gray-400 uppercase mr-1">
                          Added Colors ({colorList.length}):
                        </span>
                        {colorList.map((c) => (
                          <span
                            key={c}
                            className="px-2.5 py-1 bg-red-600/20 border border-red-600/40 text-red-300 text-xs font-bold rounded-xl flex items-center gap-1.5"
                          >
                            <span>{c}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveColor(c)}
                              className="text-red-400 hover:text-white font-black text-xs"
                            >
                              &times;
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={customColorsText}
                        onChange={(e) => setCustomColorsText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            hanldeCustomColorSubmit();
                          }
                        }}
                        placeholder="Type custom finish (e.g. Carbon Grey, Gloss Black)..."
                        className="flex-1 px-3.5 py-2.5 bg-[#141822] border border-[#222734] rounded-xl text-xs font-bold text-white placeholder-gray-600 focus:border-red-600 outline-none"
                      />
                      <button
                        type="button"
                        onClick={hanldeCustomColorSubmit}
                        className="px-4 py-2.5 bg-[#1C212B] hover:bg-red-600 text-white font-black text-xs rounded-xl transition-all flex-shrink-0"
                      >
                        + Add Color
                      </button>
                    </div>

                    <div className="space-y-1 pt-1">
                      <span className="text-[11px] font-bold text-gray-400">Quick Suggestions:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {popularColors.map((col) => {
                          const isAlreadyAdded = colorList.includes(col);
                          return (
                            <button
                              key={col}
                              type="button"
                              disabled={isAlreadyAdded}
                              onClick={() => handleAddColor(col)}
                              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                                isAlreadyAdded
                                  ? "bg-[#141822] text-gray-600 cursor-not-allowed"
                                  : "bg-[#141822] border border-[#222734] text-gray-300 hover:border-red-600 hover:text-white"
                              }`}
                            >
                              + {col}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* CAR COMPATIBILITY */}
                  <div className="sm:col-span-2 space-y-2 pt-2 border-t border-[#1C212B]">
                    <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                      <Car className="w-4 h-4 text-red-500" /> Compatible Vehicle Models *
                    </label>
                    <p className="text-[11px] text-gray-400">
                      Select all car models this component is verified to fit:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 max-h-48 overflow-y-auto p-1">
                      {availableCars.map((car) => {
                        const isChecked = selectedCarIds.includes(car.id);
                        return (
                          <div
                            key={car.id}
                            onClick={() => toggleCarSelection(car.id)}
                            className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center gap-2 text-xs font-bold ${
                              isChecked
                                ? "border-red-600 bg-red-600/10 text-white"
                                : "border-[#222734] bg-[#141822] text-gray-400 hover:border-gray-600"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              readOnly
                              className="accent-red-600"
                            />
                            <span className="truncate">
                              {car.brand} {car.model}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Modal Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-[#1C212B]">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2.5 bg-[#141822] hover:bg-[#1C212B] text-gray-300 font-bold text-xs rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={images.filter((img) => img.trim()).length < 4}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-black text-xs rounded-xl shadow-lg shadow-red-600/25 transition-all"
                  >
                    {images.filter((img) => img.trim()).length < 4
                      ? `Add ${4 - images.filter((img) => img.trim()).length} More Photo(s) to Publish`
                      : "Publish to DriveZone Marketplace"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}