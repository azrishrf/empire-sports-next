"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { useAuth } from "@/contexts/AuthContext";
import { Order, OrderService } from "@/lib/orderService";
import AOS from "aos";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { FiBox, FiClock, FiCreditCard, FiPackage, FiShoppingBag } from "react-icons/fi";
import PropagateLoader from "react-spinners/PropagateLoader";

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "My Orders", href: "/orders" },
  ];

  const loadOrders = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const userOrders = await OrderService.getOrdersByUserId(user.uid);
      setOrders(userOrders);
    } catch (err) {
      console.error("Error loading orders:", err);
      setError("Failed to load your orders. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth");
      return;
    }

    if (user) {
      loadOrders();
    }
  }, [user, authLoading, router, loadOrders]);

  const formatDate = (timestamp: { toDate?: () => Date } | null | undefined) => {
    if (!timestamp?.toDate) return "N/A";
    return timestamp.toDate().toLocaleDateString("en-MY", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "failed":
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
      case "delivered":
        return <FiPackage className="h-4 w-4" />;
      case "processing":
      case "shipped":
        return <FiBox className="h-4 w-4" />;
      case "pending":
        return <FiClock className="h-4 w-4" />;
      case "failed":
      case "cancelled":
        return <FiCreditCard className="h-4 w-4" />;
      default:
        return <FiBox className="h-4 w-4" />;
    }
  };

  if (authLoading || loading) {
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
      <div className="container mx-auto max-w-[1400px] px-4 py-16">
        {error && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6 shadow-lg" data-aos="fade-up">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <p className="font-medium text-red-800">{error}</p>
                <button
                  onClick={loadOrders}
                  className="mt-2 text-red-600 underline transition-colors hover:text-red-800"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        )}

        {orders.length === 0 ? (
          /* Empty Orders State */
          <div className="py-16 text-center" data-aos="fade-up">
            <div className="mx-auto max-w-md">
              <FiShoppingBag className="mx-auto mb-6 text-6xl text-gray-400" />
              <h2 className="mb-4 text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>
                No orders yet
              </h2>
              <p className="mb-8 text-gray-600">
                You haven&apos;t placed any orders yet. Start shopping to see your orders here.
              </p>
              <Link
                href="/collections"
                className="bg-dark-green inline-flex items-center rounded-lg px-8 py-3 font-medium text-black transition-colors duration-300 hover:bg-black hover:text-white"
              >
                <FaShoppingBag className="mr-2 hover:text-white" />
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order, index) => (
              <div
                key={order.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Order Header */}
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-3 md:mb-0">
                      <h3 className="text-xl font-bold text-gray-900">{order.orderId}</h3>
                      <p className="mt-1 flex items-center text-sm text-gray-600">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
                      >
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{order.status.toUpperCase()}</span>
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(order.paymentStatus)}`}
                      >
                        <FiCreditCard className="mr-1 h-3 w-3" />
                        Payment: {order.paymentStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-4 md:gap-10 lg:grid-cols-2">
                    {/* Items Section */}
                    <div>
                      <h4 className="mb-4 font-bold text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>
                        Items ({order.items.length})
                      </h4>
                      <div className="space-y-3">
                        {order.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {item.name} x {item.quantity}
                              </p>
                              {item.size && <p className="text-sm text-gray-600">Size: {item.size}</p>}
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">
                                RM{(item.subtotal || item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                      <h4 className="mb-4 font-bold text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>
                        Order Summary
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between text-gray-600">
                          <span>Subtotal:</span>
                          <span className="font-medium">RM{order.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Shipping:</span>
                          <span className="font-medium text-green-600">
                            {order.shippingFee === 0 ? "FREE" : `RM${order.shippingFee.toFixed(2)}`}
                          </span>
                        </div>
                        {order.discount > 0 && (
                          <div className="flex justify-between text-gray-600">
                            <span>Discount:</span>
                            <span className="font-medium text-green-600">-RM{order.discount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="border-t border-gray-200 pt-3">
                          <div className="flex justify-between text-lg font-bold text-gray-900">
                            <span>Total:</span>
                            <span>RM{order.totalAmount.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Transaction Reference */}
                      {order.transactionId && (
                        <div className="mt-4 rounded-lg bg-blue-50 p-3">
                          <p className="text-sm text-blue-800">
                            <span className="font-medium">Reference:</span> {order.transactionId}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  {(order.paymentStatus === "pending" || order.paymentStatus === "failed") && order.paymentUrl && (
                    <div className="mt-6 border-t border-gray-200 pt-6">
                      <div className="text-end">
                        <a
                          href={order.paymentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-gray-800"
                        >
                          <FiCreditCard className="mr-2" />
                          Complete Payment
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
