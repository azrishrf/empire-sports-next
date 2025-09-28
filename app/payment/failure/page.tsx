"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface PaymentError {
  orderId?: string;
  billCode?: string;
  errorMessage?: string;
  status?: string;
}

function PaymentFailureContent() {
  const [paymentError, setPaymentError] = useState<PaymentError>({});
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get error details from URL parameters
    const orderId = searchParams.get("order_id");
    const billCode = searchParams.get("billcode");
    const errorMessage = searchParams.get("msg");
    const status = searchParams.get("status");

    setPaymentError({
      orderId: orderId || undefined,
      billCode: billCode || undefined,
      errorMessage: errorMessage || undefined,
      status: status || undefined,
    });
  }, [searchParams]);

  return (
    <div className="container flex min-h-screen items-center justify-center bg-gray-50">
      <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-900">Payment Failed</h1>

        <p className="mb-6 text-gray-600">We&apos;re sorry, but your payment could not be processed at this time.</p>

        {paymentError.errorMessage && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">
              <strong>Error:</strong> {paymentError.errorMessage}
            </p>
          </div>
        )}

        <div className="mb-6 rounded-lg bg-gray-50 p-4 text-left">
          {paymentError.orderId && (
            <div className="mb-2 flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-semibold">{paymentError.orderId}</span>
            </div>
          )}
          {paymentError.billCode && (
            <div className="mb-2 flex justify-between">
              <span className="text-gray-600">Reference:</span>
              <span className="font-semibold">{paymentError.billCode}</span>
            </div>
          )}
          {paymentError.status && (
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-semibold text-red-600">Failed</span>
            </div>
          )}
        </div>

        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h3 className="mb-2 font-semibold text-blue-900">What can you do?</h3>
          <ul className="space-y-1 text-left text-sm text-blue-700">
            <li>• Check your payment details and try again</li>
            <li>• Ensure you have sufficient funds</li>
            <li>• Try using a different payment method</li>
            <li>• Contact your bank if the issue persists</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Link
            href="/cart"
            className="block w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Try Payment Again
          </Link>

          <Link
            href="/"
            className="block w-full rounded-lg bg-gray-100 px-4 py-3 text-gray-700 transition-colors hover:bg-gray-200"
          >
            Continue Shopping
          </Link>

          <div className="border-t border-gray-200 pt-4">
            <p className="mb-2 text-sm text-gray-500">Need help? Contact our support team:</p>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">📧 support@empiresports.com</p>
              <p className="text-sm text-gray-600">📞 +60 3-1234 5678</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailurePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="rounded-lg bg-white p-8 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-red-600"></div>
            <p className="mt-4 text-gray-600">Loading payment details...</p>
          </div>
        </div>
      }
    >
      <PaymentFailureContent />
    </Suspense>
  );
}
