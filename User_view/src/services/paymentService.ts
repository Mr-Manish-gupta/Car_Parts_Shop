import { api as axiosClient } from "./api";
import { api as apiUrls } from "./apiUrls";

export interface PaymentOrderResponse {
  orderId: number;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  razorpayKeyId: string;
}

export interface PaymentVerifyRequest {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export const paymentService = {
  // 1. Create Razorpay Order
  createOnlineOrder: async (orderId: number | string): Promise<PaymentOrderResponse> => {
    const res = await axiosClient.post<PaymentOrderResponse>(apiUrls.PAYMENT_CREATE_ORDER(orderId));
    return res.data;
  },

  // 2. Verify Payment Signature
  verifyPayment: async (data: PaymentVerifyRequest): Promise<{ message: string }> => {
    const res = await axiosClient.post<{ message: string }>(apiUrls.PAYMENT_VERIFY(), data);
    return res.data;
  },

  // 3. Confirm Cash On Delivery
  createCodPayment: async (orderId: number | string): Promise<{ message: string }> => {
    const res = await axiosClient.post<{ message: string }>(apiUrls.PAYMENT_COD(orderId));
    return res.data;
  },
};