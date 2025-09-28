"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface PaymentStatus {
  status: string;
  billCode?: string;
  orderId?: string;
  amount?: string;
  transactionId?: string;
}

export default function PaymentSuccessPage() {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const billCode = searchParams.get("billcode");
    const status = searchParams.get("status");
    const orderId = searchParams.get("order_id");

    if (billCode) {
      // Check payment status
      checkPaymentStatus(billCode);
    } else if (status && orderId) {
      // Direct callback from ToyyibPay
      setPaymentStatus({
        status: status === "1" ? "success" : status === "2" ? "pending" : "failed",
        orderId,
        billCode: searchParams.get("billcode") || undefined,
      });
      setLoading(false);
    } else {
      // No payment info, redirect to cart
      router.push("/cart");
    }
  }, [searchParams, router]);

  const checkPaymentStatus = async (billCode: string) => {
    try {
      const response = await fetch(`/api/payment/status?billcode=${billCode}`);
      const data = await response.json();

      if (data.success && data.data) {
        setPaymentStatus({
          status: data.data.status,
          billCode: data.data.billCode,
          orderId: data.data.transaction?.billName?.replace("Order #", "") || undefined,
          amount: data.data.transaction?.billAmount || undefined,
          transactionId: data.data.transaction?.billpaymentInvoiceNo || undefined,
        });
      } else {
        setPaymentStatus({ status: "unknown" });
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      setPaymentStatus({ status: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="rounded-lg bg-white p-8 text-center shadow-md">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">Verifying Payment...</h2>
          <p className="text-gray-600">Please wait while we confirm your payment status.</p>
        </div>
      </div>
    );
  }

  if (!paymentStatus || paymentStatus.status === "failed" || paymentStatus.status === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-md">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Payment Failed</h1>
          <p className="mb-6 text-gray-600">Unfortunately, your payment could not be processed. Please try again.</p>
          {paymentStatus?.orderId && <p className="mb-4 text-sm text-gray-500">Order ID: {paymentStatus.orderId}</p>}
          <div className="space-y-3">
            <Link
              href="/cart"
              className="block w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              Try Again
            </Link>
            <Link
              href="/"
              className="block w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStatus.status === "pending") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-md">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
            <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Payment Pending</h1>
          <p className="mb-6 text-gray-600">
            Your payment is being processed. You will receive a confirmation email once completed.
          </p>
          {paymentStatus?.orderId && <p className="mb-4 text-sm text-gray-500">Order ID: {paymentStatus.orderId}</p>}
          <div className="space-y-3">
            <button
              onClick={() => paymentStatus.billCode && checkPaymentStatus(paymentStatus.billCode)}
              className="block w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              Check Status
            </button>
            <Link
              href="/"
              className="block w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className="container flex min-h-screen items-center justify-center bg-gray-50">
      <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Payment Successful!</h1>
        <p className="mb-6 text-gray-600">
          Thank you for your purchase. Your order has been confirmed and you will receive an email confirmation shortly.
        </p>

        <div className="mb-6 rounded-lg bg-gray-50 p-4 text-left">
          {paymentStatus.orderId && (
            <div className="mb-2 flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-semibold">{paymentStatus.orderId}</span>
            </div>
          )}
          {paymentStatus.transactionId && (
            <div className="mb-2 flex justify-between">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-semibold">{paymentStatus.transactionId}</span>
            </div>
          )}
          {paymentStatus.amount && (
            <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
              <span className="font-semibold">RM {(parseFloat(paymentStatus.amount) / 100).toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Link
            href="/orders"
            className="block w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            View Orders
          </Link>
          <Link
            href="/"
            className="block w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
