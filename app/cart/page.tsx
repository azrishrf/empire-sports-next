"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { OrderService } from "@/lib/orderService";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartPage() {
  const { items: cartItems, loading, updateQuantity, removeItem } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set());

  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      router.push("/auth");
      return;
    }

    if (cartItems.length === 0) {
      return;
    }

    setIsProcessing(true);

    try {
      const orderId = `ORDER-${Date.now()}`;

      // Calculate totals
      const itemsWithSubtotal = cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        subtotal: item.price * item.quantity,
      }));

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
        console.log("Payment created successfully, now creating order in Firestore...");

        // Create order in Firestore client-side
        try {
          const orderDocId = await OrderService.createOrder({
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

          console.log("Order created in Firestore with ID:", orderDocId);

          // Clear cart and redirect to payment
          // Note: You might want to clear the cart here or after successful payment
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

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shopping Cart", href: "/cart" },
  ];

  const handleQuantityChange = (id: number, size: string, change: number) => {
    const item = cartItems.find((item) => item.id === id && item.size === size);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      updateQuantity(id, size, newQuantity);
    }
  };

  const handleRemoveItem = (id: number, size: string) => {
    const itemKey = `${id}-${size}`;
    setRemovingItems((prev) => new Set(prev).add(itemKey));

    // Wait for animation to complete before actually removing the item
    setTimeout(() => {
      removeItem(id, size);
      setRemovingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemKey);
        return newSet;
      });
    }, 300); // 300ms to match the CSS transition duration
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  const shippingFee = 0.0;
  const discount = 0.0;
  const estimatedTotal = subtotal + shippingFee - discount;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Breadcrumb items={breadcrumbItems} />
        <div className="container mx-auto px-4 py-8">
          <div className="flex min-h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading your cart...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="cart-container rounded-lg bg-white shadow-sm">
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 border-b border-gray-200 p-6 text-sm font-semibold tracking-wide text-gray-700 uppercase">
                <div className="col-span-5">PRODUCT</div>
                <div className="col-span-2 text-center">SIZE</div>
                <div className="col-span-2 text-center">QUANTITY</div>
                <div className="col-span-3 text-right">SUBTOTAL</div>
              </div>

              {/* Cart Items */}
              {cartItems.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p className="text-lg">Your cart is empty</p>
                  <Link
                    href="/collections"
                    className="mt-4 inline-block rounded bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                cartItems.map((item) => {
                  const itemKey = `${item.id}-${item.size}`;
                  const isRemoving = removingItems.has(itemKey);

                  return (
                    <div
                      key={itemKey}
                      className={`grid grid-cols-12 items-center gap-4 overflow-hidden border-b border-gray-100 p-6 transition-all duration-300 ease-in-out ${
                        isRemoving ? "cart-item-removing" : "translate-y-0 scale-100 transform opacity-100"
                      }`}
                    >
                      {/* Product Info */}
                      <div className="col-span-5 flex items-center space-x-4">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm leading-5 font-medium text-gray-900">{item.name}</h3>
                          <div className="mt-2 flex items-center">
                            {item.inStock ? (
                              <span className="inline-block rounded bg-green-500 px-2 py-1 text-xs font-bold text-white">
                                IN STOCK
                              </span>
                            ) : (
                              <span className="inline-block rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
                                OUT OF STOCK
                              </span>
                            )}
                            <span className="ml-3 text-sm text-gray-600">{item.category}</span>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id, item.size)}
                            disabled={isRemoving}
                            className={`mt-2 text-xs font-bold transition-all duration-200 ${
                              isRemoving
                                ? "cursor-not-allowed text-gray-300"
                                : "cursor-pointer rounded px-2 py-1 text-gray-500 hover:bg-red-50 hover:text-red-600"
                            }`}
                          >
                            {isRemoving ? "Removing..." : "Remove"}
                          </button>
                        </div>
                      </div>

                      {/* Size */}
                      <div className="col-span-2 text-center">
                        <span className="text-base font-medium">{item.size}</span>
                      </div>

                      {/* Quantity */}
                      <div className="col-span-2 flex justify-center">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.size, -1)}
                            className="flex h-8 w-8 items-center justify-center rounded-l bg-gray-400 text-white transition-colors hover:bg-gray-500"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const newQuantity = Math.max(1, parseInt(e.target.value) || 1);
                              updateQuantity(item.id, item.size, newQuantity);
                            }}
                            className="h-8 w-12 border-t border-b border-gray-300 text-center text-sm focus:outline-none"
                          />
                          <button
                            onClick={() => handleQuantityChange(item.id, item.size, 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-r bg-gray-400 text-white transition-colors hover:bg-gray-500"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="col-span-3 text-right">
                        <span className="text-lg font-semibold text-gray-900">RM{item.subtotal.toFixed(2)}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-lg bg-gray-100 p-6">
              <h2 className="mb-6 text-center text-xl font-bold text-gray-900">SUMMARY</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">RM{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Fee</span>
                  <span className="font-medium">RM{shippingFee.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium">RM{discount.toFixed(2)}</span>
                </div>

                <hr className="border-gray-300" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Estimated Total Price</span>
                  <span>RM{estimatedTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-8 flex w-full items-center justify-center rounded-lg bg-blue-800 px-6 py-3 font-bold text-white transition-colors hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={cartItems.length === 0 || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    PROCESSING...
                  </>
                ) : (
                  <>
                    <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zM8 6a2 2 0 114 0v1H8V6zm0 3a1 1 0 012 0 1 1 0 11-2 0zm4 0a1 1 0 10-2 0 1 1 0 102 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    CHECKOUT
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
