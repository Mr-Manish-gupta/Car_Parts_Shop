import { api } from "./api";
import { Cart, CartItemRequest } from "@/types/cart";

export const cartService = {
  // 1. Get logged-in user's cart from backend
  getCart: async (): Promise<Cart> => {
    const response = await api.get<Cart>("/cart");
    return response.data;
  },

  // 2. Add item to backend cart
  addToCart: async (productId: number, quantity: number = 1): Promise<Cart> => {
    const request: CartItemRequest = { productId, quantity };
    const response = await api.post<Cart>("/cart", request);
    return response.data;
  },

  // 3. Remove item from backend cart
  removeFromCart: async (cartItemId: number): Promise<Cart> => {
    const response = await api.delete<Cart>(`/cart/items/${cartItemId}`);
    return response.data;
  },
};
