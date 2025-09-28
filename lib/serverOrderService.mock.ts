import { Order } from "@/lib/orderService";
import { Timestamp } from "firebase/firestore";

export class ServerOrderService {
  /**
   * Get an order by its orderId (not the document ID)
   * Note: This is a mock implementation for local development
   * In production, this would use Firebase Admin SDK
   */
  static async getOrderByOrderId(orderId: string): Promise<(Order & { id: string }) | null> {
    try {
      console.log("Mock: Searching for order with orderId:", orderId);

      // For local development, we'll simulate finding an order
      // In production, this would query Firestore using Admin SDK
      console.log("Mock: Would search Firestore for order with orderId:", orderId);

      // Return mock order for testing
      return {
        id: "mock-doc-id",
        orderId: orderId,
        userId: "mock-user-id",
        customerName: "Mock Customer",
        customerEmail: "mock@example.com",
        customerPhone: "01141231312",
        items: [],
        subtotal: 0,
        shippingFee: 0,
        discount: 0,
        totalAmount: 0,
        status: "pending",
        paymentStatus: "pending",
        billCode: "",
        paymentUrl: "",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
    } catch (error) {
      console.error("Error getting order by orderId:", error);
      throw new Error(`Failed to get order: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  /**
   * Update order payment status
   * Note: This is a mock implementation for local development
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
      console.log("Mock: Updating order payment status:", { documentId, paymentData });

      // For local development, we'll just log what would happen
      // In production, this would update Firestore using Admin SDK
      console.log("Mock: Would update Firestore document:", documentId);
      console.log("Mock: Would set payment status to:", paymentData.status);

      if (paymentData.transactionId) {
        console.log("Mock: Would set transaction ID:", paymentData.transactionId);
      }

      if (paymentData.status === "paid") {
        console.log("Mock: Would update main status to 'confirmed'");
      }

      console.log("Mock: Order payment status updated successfully");
    } catch (error) {
      console.error("Error updating order payment status:", error);
      throw new Error(`Failed to update order: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}
