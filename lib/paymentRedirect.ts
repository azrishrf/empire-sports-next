"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface PendingPayment {
  orderId: string;
  billCode: string;
  timestamp: number;
}

/**
 * Hook to redirect users to payment status page if they have a pending payment
 * and are trying to access other pages after returning from ToyyibPay
 */
export function usePaymentRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip redirect logic for payment-related pages
    const paymentPages = ["/payment/status", "/payment/success", "/payment/failure"];
    if (paymentPages.some((page) => pathname.startsWith(page))) {
      return;
    }

    // Check for pending payment in localStorage
    const pendingPaymentStr = localStorage.getItem("pendingPayment");
    if (!pendingPaymentStr) {
      return;
    }

    try {
      const pendingPayment: PendingPayment = JSON.parse(pendingPaymentStr);

      // Check if payment is not too old (e.g., within 1 hour)
      const oneHour = 60 * 60 * 1000;
      const isRecent = Date.now() - pendingPayment.timestamp < oneHour;

      if (isRecent) {
        // User has a recent pending payment, redirect to status page
        console.log("Redirecting to payment status page due to pending payment:", pendingPayment.orderId);
        router.push(`/payment/status?billcode=${pendingPayment.billCode}&order_id=${pendingPayment.orderId}`);
      } else {
        // Payment is too old, clear it
        localStorage.removeItem("pendingPayment");
      }
    } catch (error) {
      console.error("Error parsing pending payment data:", error);
      localStorage.removeItem("pendingPayment");
    }
  }, [pathname, router]);
}

/**
 * Clear pending payment from localStorage
 * Call this when payment is completed or confirmed
 */
export function clearPendingPayment() {
  localStorage.removeItem("pendingPayment");
}

/**
 * Get pending payment info if exists
 */
export function getPendingPayment(): PendingPayment | null {
  if (typeof window === "undefined") return null;

  const pendingPaymentStr = localStorage.getItem("pendingPayment");
  if (!pendingPaymentStr) return null;

  try {
    return JSON.parse(pendingPaymentStr);
  } catch (error) {
    console.error("Error parsing pending payment data:", error);
    localStorage.removeItem("pendingPayment");
    return null;
  }
}
