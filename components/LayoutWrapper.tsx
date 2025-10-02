"use client";

import AOSProvider from "@/components/AOSProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { usePaymentRedirect } from "@/lib/paymentRedirect";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  // Check for pending payments and redirect if necessary
  usePaymentRedirect();

  return (
    <AuthProvider>
      <CartProvider>
        <AOSProvider>
          <Header />
          {children}
          <Footer />
        </AOSProvider>
      </CartProvider>
    </AuthProvider>
  );
}
