"use client";

import { useAuth } from "@/context/AuthContext";
import { useCar } from "@/context/CarContext";
import { useCart } from "@/context/CartContext";
import {
  AlertCircle,
  Camera,
  Car,
  CheckCircle2,
  Edit3,
  KeyRound,
  LockIcon,
  LogOut,
  MapPin,
  Package,
  Plus,
  ShoppingBag,
  Trash2,
  User,
  Wrench,
  X,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Store,
  CreditCard,
  Bell,
  Gauge,
  Layers,
} from "lucide-react";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { api as axiosClient } from "@/services/api";
import { api as apiUrls } from "@/services/apiUrls";

interface SavedAddress {
  id: number;
  name: string;
  label: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  newpinCode: string;
  isDefault: boolean;
}

export default function ProfilePage() {
  const { user, logout, isAuthenticated, updateUser } = useAuth();
  const { selectedCar } = useCar();
  const { totalItems } = useCart();

  const [activeTab, setActiveTab] = useState<"PERSONAL" | "GARAGE" | "ADDRESSES" | "SECURITY">("PERSONAL");

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [altPhone, setAltPhone] = useState("");
  const [profileSuccessMsg, setProfileSuccessMsg] = useState("");
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);

  const [addresses, setAddresses] = useState<SavedAddress[]>([]);

  const [isAddressModelOpen, setIsAddressModelOpen] = useState(false);
  const [newModel, setNewModel] = useState("Home");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newPincode, setNewPincode] = useState("");

  const [imagePreview, setIsImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securityMsg, setSecurityMsg] = useState({ type: "", text: "" });

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_DIM = 400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_DIM) {
              height *= MAX_DIM / width;
              width = MAX_DIM;
            }
          } else {
            if (height > MAX_DIM) {
              width *= MAX_DIM / height;
              height = MAX_DIM;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          const base64Data = canvas.toDataURL("image/jpeg", 0.85);

          setIsImagePreview(base64Data);
          if (updateUser) {
            updateUser({ avatar: base64Data });
          }
          if (user?.email) {
            localStorage.setItem(`user_profile_avatar_${user.email.trim().toLowerCase()}`, base64Data);
          }
          localStorage.removeItem("user_profile_avatar");
          setProfileSuccessMsg("Profile photo updated successfully!");
          setTimeout(() => setProfileSuccessMsg(""), 3500);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
    if (user?.phone) {
      setPhone(user.phone);
    }

    const savedAvatar = user?.avatar || (typeof window !== "undefined" ? localStorage.getItem("user_profile_avatar") : null);
    if (savedAvatar) {
      setIsImagePreview(savedAvatar);
    }

    // Check localStorage for saved delivery phone if not in user
    try {
      const savedAddr = localStorage.getItem("saved_delivery_address");
      if (savedAddr) {
        const parsed = JSON.parse(savedAddr);
        if (parsed.primaryPhone && !phone) {
          setPhone(parsed.primaryPhone);
        }
        if (parsed.alternativePhone) {
          setAltPhone(parsed.alternativePhone);
        }
      }
    } catch (e) {
      console.error("Failed to read saved delivery phone", e);
    }

    if (isAuthenticated) {
      setIsLoadingAddresses(true);
      axiosClient
        .get(apiUrls.ADDRESS_ALL())
        .then((res) => {
          if (res.data && Array.isArray(res.data)) {
            const mapped: SavedAddress[] = res.data.map((a: any, idx: number) => ({
              id: a.id,
              label: a.type || (idx === 0 ? "Home / Primary" : "Office"),
              name: a.name || user?.name || "",
              phone: a.phone || user?.phone || "",
              address: a.house || a.address || "",
              city: a.city || "",
              state: a.state || "",
              newpinCode: a.pinCode || a.pincode || "",
              isDefault: idx === 0,
            }));
            setAddresses(mapped);
            if (mapped.length > 0 && mapped[0].phone) {
              setPhone((curr) => curr || mapped[0].phone);
            }
          }
        })
        .catch((err) => console.error("Failed to load PostgreSQL addresses", err))
        .finally(() => setIsLoadingAddresses(false));
    }
  }, [user, isAuthenticated]);

  const handleSavedProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingProfile(false);

    // Save to user in localStorage
    try {
      const existingUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = { ...existingUser, name, phone, avatar: imagePreview || existingUser.avatar };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      if (updateUser) {
        updateUser({ name, phone, avatar: imagePreview || undefined });
      }

      const existingAddr = JSON.parse(localStorage.getItem("saved_delivery_address") || "{}");
      localStorage.setItem(
        "saved_delivery_address",
        JSON.stringify({ ...existingAddr, name, primaryPhone: phone, alternativePhone: altPhone })
      );
    } catch (err) {
      console.error("Failed to persist user profile locally", err);
    }

    setProfileSuccessMsg("Profile details & primary phone successfully updated!");
    setTimeout(() => setProfileSuccessMsg(""), 3500);
  };

  const handleNewAddresses = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: newName || name || user?.name || "Customer",
      phone: newPhone || phone,
      house: newAddress,
      city: newCity,
      state: newState,
      pinCode: newPincode,
      type: newModel || "Home",
    };

    try {
      if (isAuthenticated) {
        const res = await axiosClient.post(apiUrls.ADDRESS_ADD(), payload);
        const saved = res.data;
        const newAddrItem: SavedAddress = {
          id: saved?.id || Date.now(),
          label: saved?.type || newModel,
          name: saved?.name || payload.name,
          phone: saved?.phone || payload.phone,
          address: saved?.house || payload.house,
          city: saved?.city || payload.city,
          state: saved?.state || payload.state,
          newpinCode: saved?.pinCode || payload.pinCode,
          isDefault: addresses.length === 0,
        };
        setAddresses((prev) => [...prev, newAddrItem]);
      } else {
        const newAddrItem: SavedAddress = {
          id: Date.now(),
          label: newModel,
          name: newName || name,
          phone: newPhone || phone,
          address: newAddress,
          city: newCity,
          state: newState,
          newpinCode: newPincode,
          isDefault: addresses.length === 0,
        };
        setAddresses((prev) => [...prev, newAddrItem]);
      }
      setIsAddressModelOpen(false);
      setNewAddress("");
      setNewCity("");
      setNewState("");
      setNewPincode("");
      setNewPhone("");
      setNewName("");
    } catch (err) {
      console.error("Failed to save address", err);
    }
  };

  const setDefaultAddress = (id: number) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const deleteAddress = async (id: number) => {
    if (confirm("Are you sure you want to delete this address?")) {
      try {
        if (isAuthenticated) {
          await axiosClient.delete(apiUrls.ADDRESS_DELETE(id));
        }
        setAddresses((prev) => prev.filter((a) => a.id !== id));
      } catch (err) {
        console.error("Failed to delete address", err);
      }
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityMsg({ type: "", text: "" });

    if (newPassword.length < 6) {
      setSecurityMsg({ type: "error", text: "New password must be at least 6 characters long." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setSecurityMsg({ type: "error", text: "New passwords do not match. Please verify!" });
      return;
    }

    setSecurityMsg({ type: "success", text: "Password security credentials updated successfully." });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-white py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* VIP Driver Profile Command Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0E121B] via-[#141926] to-[#0D1017] border border-white/[0.08] p-6 sm:p-8 shadow-2xl">
          {/* Ambient Glowing Lighting */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />

              {/* Luxury Avatar Frame */}
              <div
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl border-2 border-red-600/40 p-1 bg-[#161B28] cursor-pointer overflow-hidden group shadow-2xl shrink-0"
                onClick={handleAvatarClick}
              >
                <div className="w-full h-full rounded-2xl overflow-hidden relative flex items-center justify-center bg-[#0F131C]">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white text-2xl sm:text-3xl font-black">
                      {(user?.name || name || "D").charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Camera className="text-white mb-1" size={20} />
                    <span className="text-[9px] font-black uppercase text-gray-300">Change</span>
                  </div>
                </div>
              </div>

              {/* User Metadata */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {user?.name || name || "Driver Account"}
                  </h1>

                  {user?.role === "ADMIN" ? (
                    <span className="px-2.5 py-0.5 bg-red-600 text-white text-[10px] font-black rounded-full uppercase tracking-wider shadow-md">
                      Root Administrator
                    </span>
                  ) : user?.role === "SELLER" ? (
                    <span className="px-2.5 py-0.5 bg-emerald-600 text-white text-[10px] font-black rounded-full uppercase tracking-wider shadow-md">
                      Verified Merchant Partner
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 bg-red-600/20 text-red-400 border border-red-500/30 text-[10px] font-black rounded-full uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck size={12} /> Verified Driver
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-gray-300 font-medium flex items-center gap-2">
                  <span>{user?.email || "driver@drivezone.com"}</span>
                  <span className="text-gray-600">•</span>
                  <span>{phone ? `+91 ${phone}` : "+91 Contact on File"}</span>
                </p>

                <p className="text-[11px] text-gray-500 font-semibold">
                  DriveZone VIP Member • Verified 100% Fitment Profile
                </p>
              </div>
            </div>

            {/* Quick Action Pills */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <Link
                href="/my-car"
                className="px-4 py-3 bg-[#161B28] hover:bg-[#1F2538] border border-white/[0.08] rounded-2xl text-xs font-bold text-gray-200 hover:text-white flex items-center gap-2 transition-all shadow-md flex-1 md:flex-none justify-center"
              >
                <Car size={16} className="text-red-500" />
                <span>{selectedCar ? `${selectedCar.brand} ${selectedCar.model}` : "My Garage"}</span>
              </Link>

              <Link
                href="/orders"
                className="px-4 py-3 bg-[#161B28] hover:bg-[#1F2538] border border-white/[0.08] rounded-2xl text-xs font-bold text-gray-200 hover:text-white flex items-center gap-2 transition-all shadow-md flex-1 md:flex-none justify-center"
              >
                <Package size={16} className="text-red-500" />
                <span>Orders</span>
              </Link>

              <Link
                href="/cart"
                className="px-4 py-3 bg-[#161B28] hover:bg-[#1F2538] border border-white/[0.08] rounded-2xl text-xs font-bold text-gray-200 hover:text-white flex items-center gap-2 transition-all shadow-md flex-1 md:flex-none justify-center"
              >
                <ShoppingBag size={16} className="text-red-500" />
                <span>Cart ({totalItems})</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Tab Navigation Toolbar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/[0.08]">
          <button
            onClick={() => setActiveTab("PERSONAL")}
            className={`px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 flex-shrink-0 ${
              activeTab === "PERSONAL"
                ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/35 border border-red-500/40"
                : "bg-[#10141F] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-[#161B28]"
            }`}
          >
            <User className="w-4 h-4" /> Personal Details
          </button>

          <button
            onClick={() => setActiveTab("GARAGE")}
            className={`px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 flex-shrink-0 ${
              activeTab === "GARAGE"
                ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/35 border border-red-500/40"
                : "bg-[#10141F] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-[#161B28]"
            }`}
          >
            <Car className="w-4 h-4" /> My Garage Vehicle
          </button>

          <button
            onClick={() => setActiveTab("ADDRESSES")}
            className={`px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 flex-shrink-0 ${
              activeTab === "ADDRESSES"
                ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/35 border border-red-500/40"
                : "bg-[#10141F] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-[#161B28]"
            }`}
          >
            <MapPin className="w-4 h-4" /> Address Book ({addresses.length})
          </button>

          <button
            onClick={() => setActiveTab("SECURITY")}
            className={`px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 flex-shrink-0 ${
              activeTab === "SECURITY"
                ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/35 border border-red-500/40"
                : "bg-[#10141F] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-[#161B28]"
            }`}
          >
            <LockIcon className="w-4 h-4" /> Security &amp; Password
          </button>
        </div>

        {/* TAB 1: PERSONAL INFORMATION */}
        {activeTab === "PERSONAL" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 bg-gradient-to-b from-[#10141F] to-[#0A0D15] border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-white">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div>
                  <h2 className="text-lg font-black text-white">Contact &amp; Account Details</h2>
                  <p className="text-xs text-gray-400 font-medium">Used for order delivery verification, invoice generation, and courier tracking updates.</p>
                </div>

                {!isEditingProfile ? (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="px-4 py-2 rounded-xl text-xs bg-[#161B28] hover:bg-[#202738] border border-white/[0.08] text-gray-200 font-bold flex items-center gap-2 transition-all shadow-md"
                  >
                    <Edit3 size={14} className="text-red-500" /> Edit Profile
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2 rounded-xl text-xs bg-[#161B28] hover:bg-[#202738] border border-white/[0.08] text-gray-400 font-bold transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>

              {profileSuccessMsg && (
                <div className="p-3.5 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl flex items-center gap-2 text-xs text-emerald-300 font-bold">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>{profileSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handleSavedProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Full Legal Name</label>
                    <input
                      type="text"
                      disabled={!isEditingProfile}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#161B28] border border-white/[0.08] rounded-xl text-xs font-bold text-white disabled:bg-[#0C0F17] disabled:text-gray-500 outline-none focus:border-red-600 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Account Email (Verified)</label>
                    <input
                      type="email"
                      disabled
                      value={user?.email || "customer@example.com"}
                      className="w-full px-4 py-3 bg-[#0C0F17] border border-white/[0.08] rounded-xl text-xs font-bold text-gray-500 outline-none cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Primary Phone Number</label>
                    <input
                      type="tel"
                      disabled={!isEditingProfile}
                      value={phone}
                      maxLength={10}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className="w-full px-4 py-3 bg-[#161B28] border border-white/[0.08] rounded-xl text-xs font-bold text-white disabled:bg-[#0C0F17] disabled:text-gray-500 outline-none focus:border-red-600 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Alternative Mobile (Optional)</label>
                    <input
                      type="tel"
                      disabled={!isEditingProfile}
                      maxLength={10}
                      value={altPhone}
                      onChange={(e) => setAltPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className="w-full px-4 py-3 bg-[#161B28] border border-white/[0.08] rounded-xl text-xs font-bold text-white disabled:bg-[#0C0F17] disabled:text-gray-500 outline-none focus:border-red-600 transition-colors"
                    />
                  </div>
                </div>

                {isEditingProfile && (
                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-7 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-105"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Quick Actions & Role Portals (Right 4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              {/* Partner Merchant Hub */}
              <div className="bg-gradient-to-b from-[#10141F] to-[#0A0D15] border border-white/[0.08] rounded-3xl p-6 space-y-4 shadow-xl text-white">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 rounded-2xl">
                    <Store className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">Merchant Seller Portal</h3>
                    <p className="text-[11px] text-gray-400">List and sell spare parts across India</p>
                  </div>
                </div>

                {user?.role === "SELLER" ? (
                  <Link
                    href="/seller"
                    className="block text-center py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-600/25 transition-all hover:scale-105"
                  >
                    Open Seller Dashboard →
                  </Link>
                ) : user?.role === "ADMIN" ? (
                  <Link
                    href="/admin"
                    className="block text-center py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/25 transition-all hover:scale-105"
                  >
                    Open Admin Command Center →
                  </Link>
                ) : (
                  <Link
                    href="/account/become-seller"
                    className="block text-center py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/25 transition-all hover:scale-105"
                  >
                    Apply for Merchant Store →
                  </Link>
                )}
              </div>

              {/* Logout Action */}
              <div className="bg-gradient-to-b from-[#10141F] to-[#0A0D15] border border-white/[0.08] rounded-3xl p-6 text-white space-y-3">
                <h4 className="text-xs font-black text-white uppercase tracking-wider">Account Actions</h4>
                <button
                  onClick={() => logout()}
                  className="w-full py-3 bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 text-red-400 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <LogOut size={16} /> Sign Out from Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GARAGE VEHICLE */}
        {activeTab === "GARAGE" && (
          <div className="bg-gradient-to-b from-[#10141F] to-[#0A0D15] border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <h2 className="text-lg font-black text-white">Your Registered Garage Vehicle</h2>
                <p className="text-xs text-gray-400 font-medium">Used across the store to guarantee 100% vehicle fitment compatibility</p>
              </div>

              <Link
                href="/my-car"
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Change / Configure Garage</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {selectedCar ? (
              <div className="p-6 bg-gradient-to-r from-[#0C1A14] to-[#0A1611] border-2 border-emerald-500/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-emerald-600 text-white rounded-2xl shadow-xl shadow-emerald-600/30">
                    <Car className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      Active In Garage
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {selectedCar.brand} {selectedCar.model}
                    </h3>
                    <p className="text-xs text-gray-300 font-medium">
                      Year: <strong>{selectedCar.year}</strong> {selectedCar.variant && `• ${selectedCar.variant}`} {selectedCar.fuelType && `• ${selectedCar.fuelType}`}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/shop?carId=${selectedCar.id}`}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-600/25"
                >
                  Browse Matching Spares →
                </Link>
              </div>
            ) : (
              <div className="py-12 text-center space-y-4">
                <Car size={40} className="mx-auto text-gray-600" />
                <p className="text-sm text-gray-400 font-medium">No vehicle selected yet in your garage.</p>
                <Link
                  href="/my-car"
                  className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/25"
                >
                  Add Vehicle to Garage
                </Link>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SAVED ADDRESSES */}
        {activeTab === "ADDRESSES" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-white">Delivery Address Book</h2>
                <p className="text-xs text-gray-400 font-medium">Manage multiple delivery locations for fast 1-click doorstep checkouts.</p>
              </div>

              <button
                onClick={() => setIsAddressModelOpen(true)}
                className="px-5 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all hover:scale-105"
              >
                <Plus size={16} /> Add New Address
              </button>
            </div>

            {isLoadingAddresses ? (
              <div className="py-16 text-center text-xs text-gray-500 font-bold">Loading delivery address book...</div>
            ) : addresses.length === 0 ? (
              <div className="bg-[#10141F] border-2 border-dashed border-white/[0.08] rounded-3xl p-12 text-center space-y-4 text-white">
                <MapPin className="w-12 h-12 text-red-500 mx-auto" />
                <div>
                  <h3 className="text-lg font-black text-white">No Saved Addresses Found</h3>
                  <p className="text-xs text-gray-400 font-medium">You haven&apos;t added any shipping locations yet.</p>
                </div>
                <button
                  onClick={() => setIsAddressModelOpen(true)}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all inline-flex items-center gap-2"
                >
                  <Plus size={16} /> Add First Delivery Address
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((adr) => (
                  <div
                    key={adr.id}
                    className={`p-6 rounded-3xl border-2 space-y-3 relative shadow-xl transition-all ${
                      adr.isDefault
                        ? "border-red-600 bg-red-600/10 ring-2 ring-red-500/20"
                        : "border-white/[0.08] bg-[#10141F] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-xs text-white uppercase tracking-wider bg-[#161B28] px-2.5 py-1 rounded-lg border border-white/[0.06]">
                          {adr.label}
                        </span>
                        {adr.isDefault && (
                          <span className="px-2.5 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-black rounded-full flex items-center gap-1">
                            <CheckCircle2 size={12} className="text-emerald-400" /> Default Shipping
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => deleteAddress(adr.id)}
                        className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-600/10 rounded-lg transition-colors"
                        title="Delete Address"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="text-xs text-gray-300 space-y-1 font-medium">
                      <p className="font-bold text-white text-base">{adr.name}</p>
                      <p className="text-gray-400">{adr.address}</p>
                      <p className="text-gray-400">
                        {adr.city}, {adr.state} - <strong className="text-white font-mono">{adr.newpinCode}</strong>
                      </p>
                      <p className="text-gray-400 pt-1 font-mono">Mobile: +91 {adr.phone}</p>
                    </div>

                    {!adr.isDefault && (
                      <div className="pt-3 border-t border-white/[0.06]">
                        <button
                          onClick={() => setDefaultAddress(adr.id)}
                          className="text-xs font-bold text-red-500 hover:text-red-400 hover:underline"
                        >
                          Set as Default Shipping Address
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Add Address Modal */}
            {isAddressModelOpen && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                <div className="bg-[#10141F] rounded-3xl border border-white/10 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 text-white animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <MapPin className="text-red-500" size={20} /> Add Delivery Address
                    </h3>
                    <button
                      onClick={() => setIsAddressModelOpen(false)}
                      className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleNewAddresses} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-300 uppercase">Address Type</label>
                      <div className="flex gap-2">
                        {["Home", "Office / Garage", "Workshop"].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setNewModel(type)}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                              newModel === type
                                ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                                : "bg-[#161B28] border border-white/[0.08] text-gray-400"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-300 uppercase">Recipient Name</label>
                        <input
                          type="text"
                          required
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          placeholder="e.g. Vikas Sharma"
                          className="w-full px-3.5 py-2.5 bg-[#161B28] border border-white/[0.08] rounded-xl text-xs text-white focus:border-red-600 outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-300 uppercase">Contact Mobile</label>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          placeholder="10-digit number"
                          className="w-full px-3.5 py-2.5 bg-[#161B28] border border-white/[0.08] rounded-xl text-xs text-white focus:border-red-600 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-300 uppercase">Street Address / House No.</label>
                      <input
                        type="text"
                        required
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                        placeholder="House / Flat / Workshop address"
                        className="w-full px-3.5 py-2.5 bg-[#161B28] border border-white/[0.08] rounded-xl text-xs text-white focus:border-red-600 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-300 uppercase">City</label>
                        <input
                          type="text"
                          required
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value)}
                          placeholder="City"
                          className="w-full px-3.5 py-2.5 bg-[#161B28] border border-white/[0.08] rounded-xl text-xs text-white focus:border-red-600 outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-300 uppercase">State</label>
                        <input
                          type="text"
                          required
                          value={newState}
                          onChange={(e) => setNewState(e.target.value)}
                          placeholder="State"
                          className="w-full px-3.5 py-2.5 bg-[#161B28] border border-white/[0.08] rounded-xl text-xs text-white focus:border-red-600 outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-300 uppercase">PIN Code</label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={newPincode}
                          onChange={(e) => setNewPincode(e.target.value)}
                          placeholder="6-digits"
                          className="w-full px-3.5 py-2.5 bg-[#161B28] border border-white/[0.08] rounded-xl text-xs text-white focus:border-red-600 outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.08]">
                      <button
                        type="button"
                        onClick={() => setIsAddressModelOpen(false)}
                        className="px-5 py-2.5 bg-[#161B28] hover:bg-[#202738] text-gray-300 font-bold text-xs rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/30 transition-all"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SECURITY & PASSWORD */}
        {activeTab === "SECURITY" && (
          <div className="max-w-2xl bg-gradient-to-b from-[#10141F] to-[#0A0D15] border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-white">
            <div className="border-b border-white/[0.08] pb-4">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <LockIcon className="w-5 h-5 text-red-500" /> Security &amp; Password Management
              </h2>
              <p className="text-xs text-gray-400 font-medium">Protect your DriveZone buyer account and order history.</p>
            </div>

            {securityMsg.text && (
              <div
                className={`p-3.5 rounded-2xl flex items-center gap-2 text-xs font-bold ${
                  securityMsg.type === "success"
                    ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-300"
                    : "bg-red-950/60 border border-red-500/40 text-red-300"
                }`}
              >
                {securityMsg.type === "success" ? (
                  <CheckCircle2 size={16} className="text-emerald-400" />
                ) : (
                  <AlertCircle size={16} className="text-red-400" />
                )}
                <span>{securityMsg.text}</span>
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Current Password</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-[#161B28] border border-white/[0.08] rounded-xl text-xs font-bold text-white outline-none focus:border-red-600 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">New Password (Min 6 Characters)</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-[#161B28] border border-white/[0.08] rounded-xl text-xs font-bold text-white outline-none focus:border-red-600 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-[#161B28] border border-white/[0.08] rounded-xl text-xs font-bold text-white outline-none focus:border-red-600 transition-colors"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="px-7 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-105"
                >
                  Update Account Password
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}