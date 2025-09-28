"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { useAuth } from "@/contexts/AuthContext";
import { Order, OrderService } from "@/lib/orderService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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
      case "paid":
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Breadcrumb items={breadcrumbItems} />
        <div className="container mx-auto px-4 py-8">
          <div className="flex min-h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading your orders...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="mt-2 text-gray-600">Track and manage your order history</p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-red-700">{error}</p>
            <button onClick={loadOrders} className="mt-2 text-red-600 underline hover:text-red-800">
              Try again
            </button>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow-sm">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">No orders yet</h3>
            <p className="mb-4 text-gray-600">
              You haven&apos;t placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link
              href="/collections"
              className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Order {order.orderId}</h3>
                    <p className="text-sm text-gray-600">Placed on {formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.toUpperCase()}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(order.paymentStatus)}`}
                    >
                      Payment: {order.paymentStatus.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-medium text-gray-900">Items ({order.items.length})</h4>
                    <div className="space-y-1">
                      {order.items.slice(0, 3).map((item, index) => (
                        <div key={index} className="text-sm text-gray-600">
                          {item.name} {item.size && `(${item.size})`} × {item.quantity}
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="text-sm text-gray-500">+{order.items.length - 3} more items</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 font-medium text-gray-900">Order Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>RM {order.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>RM {order.shippingFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>RM {order.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {order.notes && (
                  <div className="mb-4 rounded-lg bg-gray-50 p-3">
                    <p className="text-sm text-gray-600">{order.notes}</p>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <div className="text-sm text-gray-600">
                    {order.billCode && <span>Bill Code: {order.billCode}</span>}
                    {order.transactionId && <span className="ml-4">Transaction: {order.transactionId}</span>}
                  </div>

                  <div className="flex gap-2">
                    {order.paymentStatus === "pending" && order.paymentUrl && (
                      <a
                        href={order.paymentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
                      >
                        Complete Payment
                      </a>
                    )}
                    <button
                      onClick={loadOrders}
                      className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200"
                    >
                      Refresh
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
