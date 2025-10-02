"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { OrderService } from "@/lib/orderService";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  newlyAddedItem?: {
    id: string;
    name: string;
    image: string;
    price: string;
    size: string;
  } | null;
}

export default function CartSidebar({ isOpen, onClose, newlyAddedItem }: CartSidebarProps) {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [animatingItems, setAnimatingItems] = useState<Set<string>>(new Set());
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set());
  const [showNewItemNotification, setShowNewItemNotification] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Show notification for newly added item
  useEffect(() => {
    if (newlyAddedItem && isOpen) {
      setShowNewItemNotification(true);
      const timer = setTimeout(() => {
        setShowNewItemNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [newlyAddedItem, isOpen]);

  // Animate newly added items
  useEffect(() => {
    if (newlyAddedItem && isOpen) {
      const itemKey = `${newlyAddedItem.id}-${newlyAddedItem.size}`;
      setAnimatingItems((prev) => new Set(prev).add(itemKey));

      const timer = setTimeout(() => {
        setAnimatingItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(itemKey);
          return newSet;
        });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [newlyAddedItem, isOpen]);

  const handleQuantityChange = (id: string, size: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      // Add removal animation
      const itemKey = `${id}-${size}`;
      setRemovingItems((prev) => new Set(prev).add(itemKey));

      // Remove item after animation
      setTimeout(() => {
        removeItem(id, size);
        setRemovingItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(itemKey);
          return newSet;
        });
      }, 300);
    } else {
      updateQuantity(id, size, newQuantity);
    }
  };

  const handleRemoveItem = (id: string, size: string) => {
    const itemKey = `${id}-${size}`;
    setRemovingItems((prev) => new Set(prev).add(itemKey));

    // Remove item after animation
    setTimeout(() => {
      removeItem(id, size);
      setRemovingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemKey);
        return newSet;
      });
    }, 300);
  };

  const handleCheckout = async () => {
    if (!user) {
      router.push("/auth");
      return;
    }

    if (items.length === 0) {
      return;
    }

    setIsProcessing(true);

    try {
      const orderId = `ORDER-${Date.now()}`;

      // Calculate totals
      const itemsWithSubtotal = items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        subtotal: item.price * item.quantity,
      }));

      const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
      const shippingFee = 0.0;
      const discount = 0.0;
      const estimatedTotal = subtotal + shippingFee - discount;

      const customerPhone = "01141231312"; // You might want to collect this from user profile

      // Create payment request
      const paymentData = {
        orderId,
        amount: estimatedTotal,
        customerName: user.displayName || user.email || "Customer",
        customerEmail: user.email || "",
        customerPhone,
        items: itemsWithSubtotal,
      };

      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();

      if (result.success && result.data.billCode) {
        // Create order in Firestore client-side
        try {
          await OrderService.createOrder({
            orderId,
            userId: user.uid,
            customerName: user.displayName || user.email || "Customer",
            customerEmail: user.email || "",
            customerPhone,
            items: itemsWithSubtotal,
            subtotal,
            shippingFee,
            discount,
            totalAmount: estimatedTotal,
            status: "pending",
            paymentStatus: "pending",
            billCode: result.data.billCode,
            paymentUrl: result.data.paymentUrl,
          });

          // Store pending payment info in localStorage
          localStorage.setItem(
            "pendingPayment",
            JSON.stringify({
              orderId,
              billCode: result.data.billCode,
              timestamp: Date.now(),
            }),
          );
          window.location.href = result.data.paymentUrl;
        } catch (orderError) {
          console.error("Failed to create order in Firestore:", orderError);
          alert("Failed to create order. Please try again.");
        }
      } else {
        alert(`Payment error: ${result.message || "Failed to create payment"}`);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred during checkout. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
          isOpen ? "opacity-50" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md transform bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>
              Shopping Cart ({items.length})
            </h2>
            <button onClick={onClose} className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Newly Added Item Notification */}
          {showNewItemNotification && newlyAddedItem && (
            <div className="animate-slide-down border-b border-gray-200 bg-green-50 p-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500">
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800">New Item Added to Cart</p>
                  {/* <div className="mt-1 flex items-center space-x-2">
                    <Image
                      src={newlyAddedItem.image}
                      alt={newlyAddedItem.name}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded object-cover"
                    />
                    <div>
                      <p className="text-xs font-medium text-green-700">{newlyAddedItem.name}</p>
                      <p className="text-xs text-green-600">
                        Size {newlyAddedItem.size} • {newlyAddedItem.price}
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          )}

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <svg className="mb-4 h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <p className="text-gray-500" style={{ fontFamily: "var(--font-poppins)" }}>
                  Your bag is empty
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => {
                  const itemKey = `${item.id}-${item.size}`;
                  const isAnimating = animatingItems.has(itemKey);
                  const isRemoving = removingItems.has(itemKey);

                  return (
                    <div
                      key={itemKey}
                      className={`flex space-x-3 border-b border-gray-100 pb-4 transition-all duration-300 ${
                        isAnimating ? "animate-bounce-in bg-green-50" : ""
                      } ${isRemoving ? "animate-fade-out-scale scale-95 opacity-0" : "scale-100 opacity-100"}`}
                    >
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between space-y-3">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-500">Size {item.size}</p>
                          <p className="text-sm font-semibold text-gray-900">RM {item.price}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-l-xl border-t border-b border-l border-gray-300 text-black transition-colors hover:bg-gray-100"
                              disabled={isRemoving}
                            >
                              -
                            </button>
                            <div className="flex h-8 w-6 items-center justify-center border-t border-b border-gray-300 text-sm font-medium">
                              {item.quantity}
                            </div>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-r-xl border-t border-r border-b border-gray-300 text-black transition-colors hover:bg-gray-100"
                              disabled={isRemoving}
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id, item.size)}
                            className="text-red-500 transition-colors hover:text-red-700"
                            disabled={isRemoving}
                          >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-medium text-gray-900">SUBTOTAL</span>
                <span className="text-xl font-semibold text-gray-900">RM {getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="space-y-3">
                <Link href="/cart" onClick={onClose}>
                  <button className="mb-2 w-full cursor-pointer rounded-2xl border border-gray-300 bg-white py-3 text-center text-sm font-medium text-gray-900 transition-colors duration-300 hover:bg-gray-100">
                    View Cart ({items.length})
                  </button>
                </Link>
                <button
                  onClick={handleCheckout}
                  disabled={items.length === 0 || isProcessing}
                  className="bg-dark-green w-full cursor-pointer rounded-2xl py-3 text-center text-sm font-medium text-black transition-colors duration-300 hover:bg-black hover:text-white disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    "Checkout"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
