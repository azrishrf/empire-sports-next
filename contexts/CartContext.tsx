"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Product } from "@/data/products";
import { CartService } from "@/lib/cartService";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import Toastify from "toastify-js";

export interface CartItem {
  id: number;
  name: string;
  image: string;
  category: string;
  size: string;
  quantity: number;
  price: number;
  subtotal: number;
  inStock: boolean;
}

interface CartContextType {
  items: CartItem[];
  loading: boolean;
  addItem: (product: Product, size: string, quantity: number) => void;
  removeItem: (id: number, size: string) => void;
  updateQuantity: (id: number, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoadingFromFirestore, setIsLoadingFromFirestore] = useState(false);
  const { user, loading: authLoading } = useAuth();

  const loadCartFromFirestore = useCallback(async () => {
    if (!user) {
      setLoading(false);
      setIsInitialized(true);
      return;
    }

    try {
      setLoading(true);
      setIsLoadingFromFirestore(true);
      const cartItems = await CartService.loadCart(user.uid);
      console.log("Loaded cart from Firestore:", cartItems);
      setItems(cartItems);
    } catch (error) {
      console.error("Error loading cart:", error);
      Toastify({
        text: "Error loading your cart",
        duration: 3000,
        backgroundColor: "#EF4444",
      }).showToast();
    } finally {
      setLoading(false);
      setIsInitialized(true);
      setIsLoadingFromFirestore(false);
    }
  }, [user]);

  const saveCartToFirestore = useCallback(async () => {
    if (!user) return;

    try {
      await CartService.saveCart(user.uid, items);
    } catch (error) {
      console.error("Error saving cart:", error);
      // Don't show error toast for save operations to avoid spam
    }
  }, [user, items]);

  // Initialize cart when auth is ready
  useEffect(() => {
    if (!authLoading) {
      if (user) {
        // User is logged in, load their cart
        loadCartFromFirestore();
      } else {
        // User is not logged in, clear cart and mark as initialized
        setItems([]);
        setLoading(false);
        setIsInitialized(true);
      }
    }
  }, [user, authLoading, loadCartFromFirestore]);

  // Save cart to Firestore whenever items change (and user is logged in)
  useEffect(() => {
    // Only save if:
    // 1. User is logged in
    // 2. Cart is initialized (finished loading)
    // 3. Not currently loading
    // 4. Not currently loading from Firestore (prevent overwriting during load)
    if (user && isInitialized && !loading && !isLoadingFromFirestore) {
      console.log("Saving cart changes to Firestore:", items.length, "items");
      saveCartToFirestore();
    }
  }, [items, user, isInitialized, loading, isLoadingFromFirestore, saveCartToFirestore]);

  const addItem = (product: Product, size: string, quantity: number) => {
    setItems((currentItems) => {
      // Check if item with same product and size already exists
      const existingItemIndex = currentItems.findIndex((item) => item.id === product.id && item.size === size);

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const updatedItems = [...currentItems];
        const existingItem = updatedItems[existingItemIndex];
        existingItem.quantity += quantity;
        existingItem.subtotal = existingItem.quantity * existingItem.price;
        return updatedItems;
      } else {
        // Add new item
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          image: product.image,
          category: product.category,
          size: size,
          quantity: quantity,
          price: parseFloat(product.price.replace("RM", "")),
          subtotal: parseFloat(product.price.replace("RM", "")) * quantity,
          inStock: product.availability === "IN STOCK" || true,
        };
        return [...currentItems, newItem];
      }
    });
  };

  const removeItem = (id: number, size: string) => {
    setItems((currentItems) => currentItems.filter((item) => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id: number, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id, size);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id && item.size === size
          ? {
              ...item,
              quantity: quantity,
              subtotal: quantity * item.price,
            }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.subtotal, 0);
  };

  const value = {
    items,
    loading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
