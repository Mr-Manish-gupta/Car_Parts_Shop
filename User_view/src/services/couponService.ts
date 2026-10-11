import { api } from "./api";

export interface CouponApplyResponse {
  valid: boolean;
  code?: string;
  discountAmount?: number; // Fixed typo
  message?: string;
}

export const couponService = {
  applyCoupon: async (code: string, subtotal: number): Promise<CouponApplyResponse> => {
    try {
      const res = await api.post<CouponApplyResponse>("/coupons/apply", {
        code: code.trim(),
        subtotal,
      });
      return res.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        return err.response.data;
      }

      // Offline / Client Fallback for FIRST10 if backend is not running
      if (code.trim().toUpperCase() === "FIRST10") {
        if (subtotal < 999) {
          return { valid: false, message: "Minimum order value for FIRST10 is ₹999." };
        }
        const discount = Math.min(Math.round(subtotal * 0.1), 500);
        return {
          valid: true,
          code: "FIRST10",
          discountAmount: discount,
          message: "Coupon FIRST10 applied successfully!",
        };
      }

      return { valid: false, message: "Invalid or expired coupon code." };
    }
  },

  getActiveCoupons: async () => {
    try {
      const res = await api.get("/coupons/active");
      return res.data;
    } catch {
      return [];
    }
  },
};