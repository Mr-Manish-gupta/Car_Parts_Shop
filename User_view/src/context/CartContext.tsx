"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";
import { cartService } from "@/services/cartService";
import { useAuth } from "./AuthContext";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated) {
        try {
          const backendCart = await cartService.getCart();
          if (backendCart && backendCart.cartItems && Array.isArray(backendCart.cartItems)) {
            setItems(backendCart.cartItems);
            return;
          }
        } catch (e) {
          console.error("Failed to load database cart", e);
        }
      }

      try {
        const saved = localStorage.getItem("cart_items");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setItems(parsed);
            return;
          }
        }
      } catch (e) {
        console.error("Failed to read local cart", e);
      }

      setItems([]);
    };

    loadCart();
  }, [isAuthenticated]);

  useEffect(() => {
    try {
      localStorage.setItem("cart_items", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [items]);

  const addToCart = async (product: Product, quantity: number = 1) => {
    if (isAuthenticated) {
      try {
        await cartService.addToCart(product.id, quantity);
      } catch (e) {
        console.error("failed to add cart!", e);
      }
    }

    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = async (productId: number) => {
    const itemToRemove = items.find((i) => i.product.id === productId);

    if (isAuthenticated && itemToRemove?.id) {
      try {
        await cartService.removeFromCart(itemToRemove.id);
      } catch (e) {
        console.error("failed to remove item!", e);
      }
    }

    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart_items");
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const totalPrice = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
        deliveryFee,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};