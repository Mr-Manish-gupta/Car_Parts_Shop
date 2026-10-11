import { api } from "./api";

export interface SellerRequestItem {
  uses: any;
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
    phoneNumber?: string;
  };
  businessName: string;
  businessAddress: string;
  gstin: string;
  panNumber: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

export interface AdminCarItem {
  id: number;
  brand: string;
  model: string;
  year: number;
  variant: string;
  fuelType: string;
}

export interface AdminOrderItem {
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  totalAmount: number;
  orderStatus: "PENDING" | "PROGRESSED" | "SHIPPING" | "DELEVERED" | "CANCELLED" | string;
  paymentStatus: "PENDING" | "COMPLETED" | "FAILED" | string;
  orderItem?: any[];
  shippingAddress?: {
    id?: number;
    name?: string;
    phone?: string;
    house?: string;
    city?: string;
    state?: string;
    pinCode?: string;
  };
  createdAt?: string;
}

export const adminService = {
  getPendingSellers: async (): Promise<SellerRequestItem[]> => {
    const res = await api.get<SellerRequestItem[]>("/admin/sellers/request");
    return res.data;
  },

  approveSeller: async (requestId: number) => {
    const res = await api.put(`/admin/sellers/${requestId}/approve`);
    return res.data;
  },

  rejectSeller: async (requestId: number) => {
    const res = await api.put(`/admin/sellers/${requestId}/rejected`);
    return res.data;
  },

  getAllCars: async (): Promise<AdminCarItem[]> => {
    const res = await api.get<AdminCarItem[]>("/cars");
    return res.data;
  },

  addCar: async (carData: {
    brand: string;
    model: string;
    year: number;
    variant: string;
    fuelType: string;
  }) => {
    const res = await api.post("/cars", carData);
    return res.data;
  },

  getAllOrder: async (): Promise<AdminOrderItem[]> => {
    const res = await api.get<AdminOrderItem[]>("/admin/orders");
    return res.data;
  },

  updateOrderStatus: async (orderId: number, status: string) => {
    const res = await api.put(`/orders/${orderId}/status?status=${status}`);
    return res.data;
  },

  getAllProducts: async () => {
    const res = await api.get("/admin/products");
    return res.data;
  },

  getAllUser: async () => {
    const res = await api.get("/admin/users");
    return res.data;
  },
};