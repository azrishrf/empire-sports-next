import { Order } from "@/lib/orderService";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK
if (!getApps().length) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  } catch (error) {
    console.error("Failed to initialize Firebase Admin SDK:", error);
  }
}

const db = getFirestore();

export class ServerOrderService {
  /**
   * Get an order by its orderId (not the document ID)
   */
  static async getOrderByOrderId(orderId: string): Promise<(Order & { id: string }) | null> {
    try {
      console.log("Searching for order with orderId:", orderId);

      const ordersRef = db.collection("orders");
      const snapshot = await ordersRef.where("orderId", "==", orderId).limit(1).get();

      if (snapshot.empty) {
        console.log("No order found with orderId:", orderId);
        return null;
      }

      const doc = snapshot.docs[0];
      const orderData = doc.data() as Order;

      console.log("Found order:", { id: doc.id, orderId: orderData.orderId });

      return {
        id: doc.id,
        ...orderData,
      };
    } catch (error) {
      console.error("Error getting order by orderId:", error);
      throw new Error(`Failed to get order: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  /**
   * Update order payment status
   */
  static async updateOrderPaymentStatus(
    documentId: string,
    paymentData: {
      status: string;
      transactionId?: string;
      billCode?: string;
      notes?: string;
    },
  ): Promise<void> {
    try {
      console.log("Updating order payment status:", { documentId, paymentData });

      const orderRef = db.collection("orders").doc(documentId);

      await orderRef.update({
        paymentStatus: paymentData.status,
        ...(paymentData.transactionId && { transactionId: paymentData.transactionId }),
        ...(paymentData.billCode && { billCode: paymentData.billCode }),
        ...(paymentData.notes && { notes: paymentData.notes }),
        updatedAt: new Date(),
      });

      // Also update main status if payment is successful
      if (paymentData.status === "paid") {
        await orderRef.update({
          status: "confirmed",
        });
      }

      console.log("Order payment status updated successfully");
    } catch (error) {
      console.error("Error updating order payment status:", error);
      throw new Error(`Failed to update order: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}
