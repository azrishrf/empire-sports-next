"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { OrderService } from "@/lib/orderService";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { PropagateLoader } from "react-spinners";

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

  const handleQuantityChange = (id: string, size: string, change: number) => {
    const item = cartItems.find((item) => item.id === id && item.size === size);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      updateQuantity(id, size, newQuantity);
    }
  };

  const handleRemoveItem = (id: string, size: string) => {
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
      <div className="min-h-screen bg-white">
        <div className="bg-gray-50">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <PropagateLoader
              color="var(--color-primary-green)"
              loading={loading}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-[1400px] px-4 !pt-4 pb-16">
        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="py-16 text-center" data-aos="fade-up">
            <div className="mx-auto max-w-md">
              <FiShoppingBag className="mx-auto mb-6 text-6xl text-gray-400" />
              <h2 className="mb-4 text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>
                Your cart is empty
              </h2>
              <p className="mb-8 text-gray-600">
                Looks like you haven&apos;t added any items to your cart yet. Start shopping to fill it up!
              </p>
              <Link
                href="/collections"
                className="inline-flex items-center rounded-lg bg-gray-900 px-8 py-3 text-lg font-medium text-white transition-colors duration-300 hover:bg-gray-800"
              >
                <FiShoppingBag className="mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                {/* Header */}
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                  <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>
                    Cart Items ({cartItems.length})
                  </h2>
                </div>

                {/* Items */}
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => {
                    const itemKey = `${item.id}-${item.size}`;
                    const isRemoving = removingItems.has(itemKey);

                    return (
                      <div
                        key={itemKey}
                        className={`px-6 transition-all duration-300 ease-in-out ${
                          isRemoving ? "-translate-x-full scale-95 opacity-0" : "translate-x-0 scale-100 opacity-100"
                        }`}
                      >
                        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-6">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <div className="h-24 w-24 overflow-hidden rounded-xl bg-gray-100 md:h-32 md:w-32">
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={128}
                                height={128}
                                className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                              />
                            </div>
                          </div>

                          {/* Product Details */}
                          <div className="min-w-0 flex-1">
                            <h3
                              className="mb-1 text-sm font-bold text-gray-900"
                              style={{ fontFamily: "var(--font-syne)" }}
                            >
                              {item.name}
                            </h3>
                            <p className="mb-3 text-xs text-gray-600">{item.category}</p>

                            <div className="flex items-center justify-between space-x-3 md:justify-start">
                              {/* Stock Status */}
                              {item.inStock ? (
                                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                  In Stock
                                </span>
                              ) : (
                                <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
                                  Out of Stock
                                </span>
                              )}

                              {/* Size */}
                              <span className="text-xs text-gray-600">
                                Size: <span className="font-medium">{item.size}</span>
                              </span>

                              {/* Mobile Price */}
                              <div className="block md:hidden">
                                <span className="font-bold text-gray-900">RM{item.subtotal.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex max-w-20 items-center justify-between space-x-6 md:justify-center">
                            <div className="flex items-center rounded-lg bg-gray-100">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.size, -1)}
                                className="flex h-8 w-8 items-center justify-center rounded-l-lg text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900"
                              >
                                <FiMinus size={16} />
                              </button>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => {
                                  const newQuantity = Math.max(1, parseInt(e.target.value) || 1);
                                  updateQuantity(item.id, item.size, newQuantity);
                                }}
                                className="h-8 w-10 border-0 bg-transparent text-center text-sm font-medium text-gray-900 [-webkit-appearance:textfield] focus:ring-0 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                              />
                              <button
                                onClick={() => handleQuantityChange(item.id, item.size, 1)}
                                className="flex h-8 w-8 items-center justify-center rounded-r-lg text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900"
                              >
                                <FiPlus size={16} />
                              </button>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => handleRemoveItem(item.id, item.size)}
                              disabled={isRemoving}
                              className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                                isRemoving
                                  ? "cursor-not-allowed bg-gray-100 text-gray-300"
                                  : "text-gray-400 hover:bg-red-50 hover:text-red-600"
                              }`}
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>

                          {/* Desktop Price */}
                          <div className="hidden min-w-32 text-right md:block">
                            <span className="text-lg font-bold text-gray-900">RM{item.subtotal.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 overflow-hidden rounded-2xl bg-white">
                {/* Header */}
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                  <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>
                    Order Summary
                  </h2>
                </div>

                {/* Summary Details */}
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium">RM{subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Shipping Fee</span>
                      <span className="font-medium text-green-600">FREE</span>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Discount</span>
                      <span className="font-medium">RM{discount.toFixed(2)}</span>
                    </div>

                    <hr className="border-gray-200" />

                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>RM{estimatedTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="mt-6 flex w-full cursor-pointer items-center justify-center rounded-xl bg-gray-900 px-6 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={cartItems.length === 0 || isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FiShoppingBag className="mr-2" size={20} />
                        Proceed to Checkout
                      </>
                    )}
                  </button>

                  {/* Continue Shopping */}
                  <Link
                    href="/collections"
                    className="mt-4 flex w-full items-center justify-center rounded-xl border-2 border-gray-300 px-6 py-4 text-sm font-medium text-gray-700 transition-colors duration-300 hover:border-gray-400 hover:bg-gray-50"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
