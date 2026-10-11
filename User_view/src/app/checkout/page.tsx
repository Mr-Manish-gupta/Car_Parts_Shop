"use client";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Banknote, CreditCard, Lock, Receipt, Truck, Wrench, Tag, X } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
import { couponService } from "@/services/couponService";
import { productService } from "@/services/productService";
import { api as axiosClient } from "@/services/api";
import { api as apiUrls } from "@/services/apiUrls";
import { Product } from "@/types/product";
import { paymentService } from "@/services/paymentService";
import { cartService } from "@/services/cartService";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const singleProductId = searchParams.get("productId");
  const singleQty = Number(searchParams.get("qty")) || 1;
  const hasInstallation = searchParams.get("installation") === "true";

  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number } | null>(null);
  const [couponMsg, setCouponMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isCheckingCoupon, setIsCheckingCoupon] = useState(false);

  const { items: cartItems, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (singleProductId) {
      productService.getProductById(Number(singleProductId))
        .then((prod) => {
          if (prod && prod.id) {
            setSingleProduct(prod);
          }
        })
        .catch((e) => console.error("Failed to load single product", e));
    }
  }, [singleProductId]);

  const checkoutItems = singleProductId
    ? singleProduct
      ? [{ product: singleProduct, quantity: singleQty }]
      : []
    : cartItems;

  const subtotal = checkoutItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  const deliveryFee = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const installationFee = hasInstallation ? 399 : 0;
  const totalPrice = Math.max(0, subtotal - discountAmount) + deliveryFee + installationFee;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponMsg(null);
    setIsCheckingCoupon(true);

    const codeToApply = couponCode.trim().toUpperCase();
    const res = await couponService.applyCoupon(codeToApply, subtotal);
    setIsCheckingCoupon(false);

    if (res.valid && res.discountAmount) {
      const couponData = { code: res.code || codeToApply, discountAmount: res.discountAmount };
      setAppliedCoupon(couponData);
      try {
        localStorage.setItem("applied_coupon", JSON.stringify(couponData));
      } catch (e) {
        console.error("Failed to save coupon to localStorage", e);
      }
      setCouponMsg({ type: "success", text: res.message || "Coupon Applied Successfully!" });
      setCouponCode("");
    } else {
      setCouponMsg({ type: "error", text: res.message || "Invalid or Expired Coupon Code!" });
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    try {
      localStorage.removeItem("applied_coupon");
    } catch (e) {
      console.error("Failed to remove coupon from localStorage", e);
    }
    setCouponMsg(null);
    setCouponCode("");
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [primaryPhone, setPrimaryPhone] = useState("");
  const [alterNativePhone, setAlterNativePhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPinCode] = useState("");
  const [isSavedAddressLoaded, setIsSavedAddressLoaded] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<"COD" | "ONLINE">("COD");
  const [showCodeModel, setShowCodeModel] = useState(false);
  const [formError, setFormError] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const [savedAddressId, setSavedAddressId] = useState<number | null>(null);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
    if (user?.name) {
      setName(user.name);
    }

    if (isAuthenticated) {
      axiosClient.get(apiUrls.ADDRESS_ALL())
        .then((res) => {
          if (res.data && Array.isArray(res.data) && res.data.length > 0) {
            const latestAddr = res.data[0];
            setSavedAddressId(latestAddr.id || null);
            setName(latestAddr.name || user?.name || "");
            setPrimaryPhone(latestAddr.phone || latestAddr.primaryPhone || "");
            setAlterNativePhone(latestAddr.alternativePhone || "");
            setAddress(latestAddr.house || latestAddr.address || latestAddr.street || "");
            setCity(latestAddr.city || "");
            setState(latestAddr.state || "");
            setPinCode(latestAddr.pinCode || latestAddr.pincode || "");
            setIsSavedAddressLoaded(true);
            return;
          }
        })
        .catch((e) => console.error("Failed to load PostgreSQL addresses", e));
    }

    try {
      const saved = localStorage.getItem("saved_delivery_address");
      if (saved) {
        const parsed = JSON.parse(saved);
        setName(parsed.name || user?.name || "");
        setPrimaryPhone(parsed.primaryPhone || "");
        setAlterNativePhone(parsed.alternativePhone || "");
        setAddress(parsed.address || parsed.house || "");
        setCity(parsed.city || "");
        setState(parsed.state || "");
        setPinCode(parsed.pinCode || parsed.pincode || "");
        setIsSavedAddressLoaded(true);
      }
    } catch (e) {
      console.error("Failed to load saved address.");
    }
  }, [user, isAuthenticated]);

  const validateForm = () => {
    setFormError("");

    if (!isAuthenticated) {
      setFormError("Please Sign In or Create an Account to complete your order.");
      router.push("/login?redirect=/checkout");
      return false;
    }

    if (!name.trim() || !address.trim() || !city.trim() || !state.trim() || !pincode.trim()) {
      setFormError("Please fill out all mandatory address fields.");
      return false;
    }

    if (primaryPhone.trim().length !== 10 || !/^\d{10}$/.test(primaryPhone.trim())) {
      setFormError("Primary Phone Number must be exactly 10 digits.");
      return false;
    }
    if (alterNativePhone.trim().length !== 10 || !/^\d{10}$/.test(alterNativePhone.trim())) {
      setFormError("Alternative Phone Number must be exactly 10 digits.");
      return false;
    }

    if (primaryPhone.trim() === alterNativePhone.trim()) {
      setFormError("Primary and Alternative Phone numbers cannot be the same! Please provide 2 different contact numbers.");
      return false;
    }

    if (pincode.trim().length !== 6 || !/^\d{6}$/.test(pincode.trim())) {
      setFormError("Pin code must be exactly 6 digits.");
      return false;
    }

    return true;
  };

  const savedAddressLocally = async () => {
    const addressData = {
      name,
      primaryPhone,
      alternativePhone: alterNativePhone,
      address,
      city,
      state,
      pincode,
    };
    try {
      localStorage.setItem("saved_delivery_address", JSON.stringify(addressData));
    } catch (e) {
      console.error(e);
    }

    if (isAuthenticated) {
      try {
        const dbPayload = {
          name,
          phone: primaryPhone,
          house: address,
          city,
          state,
          pinCode: pincode,
          type: "Home",
        };
        const res = await axiosClient.post(apiUrls.ADDRESS_ADD(), dbPayload);
        if (res.data?.id) {
          setSavedAddressId(res.data.id);
          return res.data.id;
        }
      } catch (e) {
        console.error("Failed to save address to PostgreSQL, checking fallback id", e);
      }

      if (savedAddressId) {
        return savedAddressId;
      }
    }
    return null;
  };

  const handleProceedOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    savedAddressLocally();

    if (paymentMethod === "COD") {
      setShowCodeModel(true);
    } else {
      executeOrderPlacement("ONLINE");
    }
  };

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && (window as any).Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const executeOrderPlacement = async (method: "COD" | "ONLINE") => {
    setIsPlacingOrder(true);
    setShowCodeModel(false);
    setFormError("");

    try {
      const savedAddrId = await savedAddressLocally();
      if (!savedAddrId) {
        setFormError("Failed to save delivery address. Please try again.");
        setIsPlacingOrder(false);
        return;
      }

      if (singleProductId) {
        try {
          await cartService.addToCart(Number(singleProductId), singleQty);
        } catch (e) {
          console.error("Cart sync error", e);
        }
      }

      const orderRes = await axiosClient.post(apiUrls.ORDER_PLACE(savedAddrId));
      if (!orderRes.data || !orderRes.data.id) {
        throw new Error("Failed to initialize order on server.");
      }

      const backendOrderId = orderRes.data.id;
      const displayOrderId = `CP-${backendOrderId}`;

      const finalizeLocalOrder = () => {
        const orderReceipt = {
          orderId: displayOrderId,
          items: checkoutItems,
          customer: { name, email, primaryPhone, alterNativePhone, address, city, state, pincode },
          subtotal,
          deliveryFee,
          discountAmount,
          couponCode: appliedCoupon?.code,
          totalPrice,
          paymentMethod: method,
          date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
          status: "Order Confirmed",
        };
        try {
          const existingOrders = JSON.parse(localStorage.getItem("placed_orders") || "[]");
          existingOrders.unshift(orderReceipt);
          localStorage.setItem("placed_orders", JSON.stringify(existingOrders));
        } catch (e) {
          console.error("Failed to store receipt locally", e);
        }

        if (!singleProductId) {
          clearCart();
        }
        localStorage.removeItem("applied_coupon");
        setIsPlacingOrder(false);
        router.push(`/orders?placed=true&orderId=${displayOrderId}`);
      };

      if (method === "COD") {
        finalizeLocalOrder();
        return;
      }

      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        alert("Razorpay SDK failed to load. Please check your internet connection.");
        setIsPlacingOrder(false);
        return;
      }

      const paymentInit = await paymentService.createOnlineOrder(backendOrderId);

      const options = {
        key: paymentInit.razorpayKeyId,
        amount: Math.round(totalPrice * 100),
        currency: "INR",
        name: "DriveZone Automotive",
        description: `Order #${displayOrderId} Payment`,
        order_id: paymentInit.razorpayOrderId,
        handler: async function (response: any) {
          try {
            await paymentService.verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            finalizeLocalOrder();
          } catch (e: any) {
            alert("Payment verification failed. Please contact support.");
            setIsPlacingOrder(false);
          }
        },
        prefill: {
          name: name,
          email: email,
          contact: primaryPhone,
        },
        theme: {
          color: "#E50914",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
      paymentObject.on("payment.failed", function (response: any) {
        alert("Payment failed: " + response.error.description);
        setIsPlacingOrder(false);
      });
    } catch (err: any) {
      console.error("Failed to place order:", err);
      setFormError(err.response?.data?.message || err.message || "An error occurred while placing your order.");
      setIsPlacingOrder(false);
    }
  };

  useEffect(() => {
    const savedCoupon = localStorage.getItem("applied_coupon");
    if (savedCoupon && subtotal > 0) {
      try {
        const parsed = JSON.parse(savedCoupon);
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
        console.error("Failed to load applied coupon.", e);
      }
    }
  }, [subtotal]);

  return (
    <div className="min-h-screen bg-[#07080B] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1C212B] pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Checkout & Payment</h1>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Enter shipping details and choose your preferred payment option</p>
          </div>

          <Link href="/cart" className="hidden sm:flex text-red-500 text-sm font-bold hover:text-red-400 hover:underline items-center gap-1 transition-colors">
            <ArrowLeft size={15} /> Back To Cart
          </Link>
        </div>

        {formError && (
          <div className="p-4 bg-[#220B0B] border border-red-500/40 rounded-2xl flex items-center gap-3 text-sm text-red-300 font-bold">
            <AlertCircle size={20} className="text-red-500 flex-shrink-0" /> <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleProceedOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Shipping & Delivery Form (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#0F1218] border border-[#1C212B] rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl text-white">
              <div className="flex items-center justify-between border-b border-[#1C212B] pb-3">
                <h2 className="text-base font-black text-white flex items-center gap-2">
                  <Truck size={18} className="text-red-500" /> Shipping & Delivery Details
                </h2>
                
                {isSavedAddressLoaded && (
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-md border border-emerald-500/30">
                    Saved Address Loaded
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vikas Sharma"
                    className="w-full px-3.5 py-2.5 bg-[#141822] border border-[#222734] rounded-xl text-xs font-bold text-white placeholder-gray-500 focus:border-red-600 outline-none"
                  />
                </div>

                {/* Email */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Account Email *</label>
                  <div className="w-full px-3.5 py-2.5 bg-[#141822] border border-[#222734] rounded-xl text-xs font-bold text-gray-400">
                    {email || "guest@example.com"}
                  </div>
                </div>

                {/* Primary Number */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Primary Mobile *</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={primaryPhone}
                    onChange={(e) => setPrimaryPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="9876543210"
                    className="w-full px-3.5 py-2.5 bg-[#141822] border border-[#222734] rounded-xl text-xs font-bold text-white placeholder-gray-500 focus:border-red-600 outline-none"
                  />
                </div>

                {/* Alternative Number */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Alternative Mobile *</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={alterNativePhone}
                    onChange={(e) => setAlterNativePhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="9123456780"
                    className="w-full px-3.5 py-2.5 bg-[#141822] border border-[#222734] rounded-xl text-xs font-bold text-white placeholder-gray-500 focus:border-red-600 outline-none"
                  />
                </div>

                {/* Address */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Street Address / House No. *</label>
                  <textarea 
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House No., Building Name, Street, Landmark"
                    className="w-full px-3.5 py-2.5 bg-[#141822] border border-[#222734] rounded-xl text-xs font-bold text-white placeholder-gray-500 focus:border-red-600 outline-none"
                  />
                </div>

                {/* City */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">City / Town *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Bhopal"
                    className="w-full px-3.5 py-2.5 bg-[#141822] border border-[#222734] rounded-xl text-xs font-bold text-white placeholder-gray-500 focus:border-red-600 outline-none"
                  />
                </div>

                {/* State */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">State *</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="e.g. Madhya Pradesh"
                    className="w-full px-3.5 py-2.5 bg-[#141822] border border-[#222734] rounded-xl text-xs font-bold text-white placeholder-gray-500 focus:border-red-600 outline-none"
                  />
                </div>

                {/* Pincode */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">6-Digit PIN Code *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPinCode(e.target.value)}
                    placeholder="484001"
                    className="w-full px-3.5 py-2.5 bg-[#141822] border border-[#222734] rounded-xl text-xs font-bold text-white placeholder-gray-500 focus:border-red-600 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-[#0F1218] border border-[#1C212B] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl text-white">
              <h2 className="text-base font-black text-white flex items-center gap-2 border-b border-[#1C212B] pb-3">
                <CreditCard size={18} className="text-red-500" /> Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <label className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === "COD"
                    ? "border-red-600 bg-red-600/10 ring-2 ring-red-500/20"
                    : "border-[#222734] bg-[#141822] hover:border-gray-600"
                }`}>
                  <input 
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                    className="mt-0.5 accent-red-600"
                  />
                  <div>
                    <p className="text-sm font-black text-white flex items-center gap-1.5">
                      <Banknote size={18} className="text-emerald-400" /> Cash on Delivery (COD)
                    </p>
                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                      Pay cash at your doorstep upon delivery
                    </p>
                  </div>
                </label>

                <label className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === "ONLINE"
                    ? "border-red-600 bg-red-600/10 ring-2 ring-red-500/20"
                    : "border-[#222734] bg-[#141822] hover:border-gray-600"
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="ONLINE"
                    checked={paymentMethod === "ONLINE"}
                    onChange={() => setPaymentMethod("ONLINE")}
                    className="mt-0.5 accent-red-600"
                  />
                  <div>
                    <p className="text-sm font-black text-white flex items-center gap-1.5">
                      <CreditCard size={18} className="text-red-500" /> Online Payment
                    </p>
                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                      UPI, GooglePay, PhonePe, Cards, NetBanking
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Items in Order & Price Summary (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0F1218] border border-[#1C212B] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 sticky top-24 text-white">
              <h3 className="text-base font-black text-white border-b border-[#1C212B] pb-3 flex items-center gap-2">
                <Receipt size={18} className="text-red-500" /> Order Items ({checkoutItems.length})
              </h3>

              <div className="divide-y divide-[#1C212B] max-h-64 overflow-y-auto pr-1 space-y-3">
                {checkoutItems.map((item) => (
                  <div className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs" key={item.product.id}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-12 h-12 rounded-xl border border-[#222734] bg-[#141822] relative overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {item.product.imageUrl ? (
                          <Image
                            src={item.product.imageUrl} 
                            alt={item.product.name} 
                            fill 
                            unoptimized 
                            className="object-contain p-1"
                          />
                        ) : (
                          <Wrench className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-bold text-white line-clamp-1 max-w-[180px]">{item.product.name}</p>
                        <p className="font-medium text-gray-400 text-[11px]">
                          Qty: {item.quantity} × {formatPrice(item.product.price)}
                        </p>
                      </div>
                    </div>

                    <div className="font-black text-white">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Free delivery badge */}
              {deliveryFee === 0 ? (
                <div className="p-3 bg-[#061810] border border-emerald-500/30 rounded-2xl flex items-center gap-2 text-xs text-emerald-300 font-bold">
                  <Tag size={16} className="text-emerald-400 flex-shrink-0" />
                  <span>Offer Applied: FREE Express Doorstep Shipping</span>
                </div>
              ) : (
                <div className="p-3 bg-[#141822] border border-[#222734] rounded-2xl flex items-center gap-2 text-xs text-red-400 font-bold">
                  <Tag size={16} className="text-red-500 flex-shrink-0" />
                  <span>Add {formatPrice(1000 - subtotal)} more to get FREE Delivery!</span>
                </div>
              )}

              {/* Coupon Box */}
              <div className="p-3.5 bg-[#141822] rounded-2xl space-y-3 border border-[#222734]">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span className="flex items-center gap-1.5">
                    <Tag size={14} className="text-red-500" /> Have a Coupon Code?
                  </span>
                </div>

                {!appliedCoupon ? (
                  <div className="flex items-center gap-2">
                    <input 
                      type="text"
                      placeholder="Enter coupon (e.g. FIRST10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleApplyCoupon();
                        }
                      }}
                      className="flex-1 px-3 py-2 bg-[#0A0C10] border border-[#222734] rounded-xl text-xs font-bold text-white uppercase outline-none focus:border-red-600"
                    />
                    <button 
                      type="button"
                      disabled={isCheckingCoupon || !couponCode.trim()}
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 text-xs font-bold bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-40 transition-all"
                    >
                      {isCheckingCoupon ? "..." : "Apply"}
                    </button>
                  </div>
                ) : (
                  <div className="p-2.5 bg-[#061C14] border border-emerald-500/40 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-bold">
                      <Tag className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Code {appliedCoupon.code} Applied</span>
                      <span className="text-emerald-400">(-{formatPrice(discountAmount)})</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={handleRemoveCoupon} 
                      className="text-xs text-red-400 font-bold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {couponMsg && (
                  <p className={`text-[11px] font-bold ${couponMsg.type === "success" ? "text-emerald-400" : "text-red-400"}`}>
                    {couponMsg.text}
                  </p>
                )}
              </div>

              {/* Billing Breakdown */}
              <div className="space-y-2.5 text-sm text-gray-300 font-medium pt-3 border-t border-[#1C212B]">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="text-white font-bold">{formatPrice(subtotal)}</span>
                </div>

                {appliedCoupon && discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold bg-[#061C14] px-2.5 py-1.5 rounded-xl border border-emerald-500/30">
                    <span className="flex items-center gap-1.5">
                      <Tag size={14} className="text-emerald-400" /> Coupon Discount ({appliedCoupon.code})
                    </span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span>Delivery Charges</span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-400 font-bold uppercase text-xs">FREE Delivery</span>
                  ) : (
                    <span className="text-white font-bold">{formatPrice(deliveryFee)}</span>
                  )}
                </div>

                {hasInstallation && (
                  <div className="flex justify-between items-center text-red-400 font-bold bg-red-600/10 px-2.5 py-1.5 rounded-xl border border-red-500/20">
                    <span className="flex items-center gap-1.5 text-xs">
                      <Wrench size={13} className="text-red-500" /> Doorstep Mechanic Fitment
                    </span>
                    <span>+{formatPrice(399)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Taxes & GST</span>
                  <span className="text-emerald-400 font-bold">Included</span>
                </div>
              </div>

              {/* Final Amount */}
              <div className="pt-3 border-t border-[#1C212B] flex justify-between items-center">
                <div>
                  <span className="text-sm font-black text-white">Total Amount</span>
                  <p className="text-[11px] text-gray-400">Inclusive of all taxes</p>
                </div>

                <span className="text-2xl font-black text-white">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isPlacingOrder || checkoutItems.length === 0}
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 disabled:opacity-40 transition-all"
              >
                {isPlacingOrder ? (
                  <span>Processing Order...</span>
                ) : paymentMethod === "COD" ? (
                  <span>Confirm Cash on Delivery Order</span>
                ) : (
                  <span>Pay Now via Razorpay</span>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 font-medium">
                <Lock size={14} className="text-emerald-400" />
                <span>100% Secure 256-Bit Encrypted Checkout</span>
              </div>
            </div>
          </div>
        </form>

        {/* COD Confirmation Modal */}
        {showCodeModel && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0F1218] border border-[#1C212B] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center relative text-white space-y-4">
              <button
                onClick={() => setShowCodeModel(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full"
              >
                <X size={16} />
              </button>

              <div className="w-16 h-16 bg-[#141822] border border-[#222734] text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Banknote size={24} className="text-emerald-400" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-white">
                  Confirm Cash on Delivery?
                </h3>
                <p className="text-xs text-gray-400 font-medium leading-relaxed">
                  Are you sure you want to place this order? You will need to pay{" "}
                  <strong className="text-white font-black">{formatPrice(totalPrice)}</strong> in cash to the delivery executive when your package arrives at:
                </p>
                <p className="text-xs font-bold text-white bg-[#141822] border border-[#222734] p-3 rounded-xl mt-2 text-left">
                  📍 {address}, {city}, {state} - {pincode}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCodeModel(false)}
                  className="py-3 bg-[#141822] hover:bg-[#1C212B] text-gray-300 font-bold text-xs rounded-xl border border-[#222734] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => executeOrderPlacement("COD")}
                  className="py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl shadow-lg shadow-red-600/25 transition-all"
                >
                  Yes, Place Order!
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#07080B] flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-red-600 border-t-transparent"></div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}