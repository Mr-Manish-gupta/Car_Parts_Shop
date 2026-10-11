import { Product } from "./product";

export interface CartItem {
  id?: number; // Backend cart_item id if present
  product: Product;
  quantity: number;
}

export interface Cart {
  id?: number;
  cartItems: CartItem[];
}

export interface CartItemRequest {
  productId: number;
  quantity: number;
}
