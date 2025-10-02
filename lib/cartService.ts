import { CartItem } from "@/contexts/CartContext";
import { db } from "@/lib/firebase";
import { deleteDoc, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";

export interface FirestoreCartItem extends Omit<CartItem, "subtotal"> {
  updatedAt: Date;
}

export class CartService {
  private static getCartDocRef(userId: string) {
    return doc(db, "carts", userId);
  }

  // Save entire cart to Firestore
  static async saveCart(userId: string, items: CartItem[]): Promise<void> {
    try {
      const cartRef = this.getCartDocRef(userId);

      const cartData = {
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          image: item.image,
          category: item.category,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
          inStock: item.inStock,
          updatedAt: new Date(),
        })),
        updatedAt: new Date(),
        totalItems: items.reduce((total, item) => total + item.quantity, 0),
        totalPrice: items.reduce((total, item) => total + item.price * item.quantity, 0),
      };

      await setDoc(cartRef, cartData, { merge: true });
    } catch (error) {
      console.error("Error saving cart to Firestore:", error);
      if (error instanceof Error && error.message.includes("Cloud Firestore API")) {
        console.error(
          "Firestore is not enabled in Firebase Console. Please enable it at: https://console.firebase.google.com/project/empire-sports-a399d/firestore",
        );
      }
      throw error;
    }
  }

  // Load cart from Firestore
  static async loadCart(userId: string): Promise<CartItem[]> {
    try {
      const cartRef = this.getCartDocRef(userId);
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        const cartData = cartSnap.data();
        const items = cartData.items || [];

        // Add subtotal calculation to each item
        return items.map((item: FirestoreCartItem) => ({
          ...item,
          subtotal: item.price * item.quantity,
          updatedAt: undefined, // Remove updatedAt from cart items
        }));
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error loading cart from Firestore:", error);
      if (error instanceof Error && error.message.includes("Cloud Firestore API")) {
        console.error(
          "Firestore is not enabled in Firebase Console. Please enable it at: https://console.firebase.google.com/project/empire-sports-a399d/firestore",
        );
      }
      throw error;
    }
  }

  // Add single item to Firestore cart
  static async addItemToCart(userId: string, item: CartItem): Promise<void> {
    try {
      const cartRef = this.getCartDocRef(userId);
      const cartSnap = await getDoc(cartRef);

      let existingItems: CartItem[] = [];
      if (cartSnap.exists()) {
        const cartData = cartSnap.data();
        existingItems = cartData.items || [];
      }

      // Check if item with same ID and size exists
      const existingItemIndex = existingItems.findIndex(
        (existingItem: CartItem) => existingItem.id === item.id && existingItem.size === item.size,
      );

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        existingItems[existingItemIndex].quantity += item.quantity;
      } else {
        // Add new item
        existingItems.push(item);
      }

      await this.saveCart(userId, existingItems);
    } catch (error) {
      console.error("Error adding item to Firestore cart:", error);
      throw error;
    }
  }

  // Remove item from Firestore cart
  static async removeItemFromCart(userId: string, itemId: string, size: string): Promise<void> {
    try {
      const cartRef = this.getCartDocRef(userId);
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        const cartData = cartSnap.data();
        const items = cartData.items || [];

        const updatedItems = items.filter((item: CartItem) => !(item.id === itemId && item.size === size));

        await this.saveCart(userId, updatedItems);
      }
    } catch (error) {
      console.error("Error removing item from Firestore cart:", error);
      throw error;
    }
  }

  // Update item quantity in Firestore cart
  static async updateItemQuantity(userId: string, itemId: string, size: string, quantity: number): Promise<void> {
    try {
      if (quantity <= 0) {
        await this.removeItemFromCart(userId, itemId, size);
        return;
      }

      const cartRef = this.getCartDocRef(userId);
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        const cartData = cartSnap.data();
        const items = cartData.items || [];

        const updatedItems = items.map((item: CartItem) =>
          item.id === itemId && item.size === size ? { ...item, quantity: quantity } : item,
        );

        await this.saveCart(userId, updatedItems);
      }
    } catch (error) {
      console.error("Error updating item quantity in Firestore cart:", error);
      throw error;
    }
  }

  // Clear entire cart
  static async clearCart(userId: string): Promise<void> {
    try {
      const cartRef = this.getCartDocRef(userId);
      await deleteDoc(cartRef);
    } catch (error) {
      console.error("Error clearing cart from Firestore:", error);
      throw error;
    }
  }

  // Listen to real-time cart updates
  static subscribeToCart(userId: string, callback: (items: CartItem[]) => void): () => void {
    const cartRef = this.getCartDocRef(userId);

    const unsubscribe = onSnapshot(
      cartRef,
      (doc) => {
        if (doc.exists()) {
          const cartData = doc.data();
          const items = cartData.items || [];

          // Add subtotal calculation to each item
          const cartItems = items.map((item: FirestoreCartItem) => ({
            ...item,
            subtotal: item.price * item.quantity,
            updatedAt: undefined,
          }));

          callback(cartItems);
        } else {
          callback([]);
        }
      },
      (error) => {
        console.error("Error listening to cart updates:", error);
      },
    );

    return unsubscribe;
  }
}
