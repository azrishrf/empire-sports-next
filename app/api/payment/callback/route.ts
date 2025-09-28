import { ServerOrderService } from "@/lib/serverOrderService.mock";
import { ToyyibPayService } from "@/lib/toyyibpay";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("Payment callback received:", body);

    // Extract callback data
    const { refno, status, billcode, order_id, amount, signature, msg, transaction_time } = body;

    // Log callback data for debugging
    console.log("Callback data:", { billcode, amount, transaction_time });

    // Verify callback signature (implement based on ToyyibPay documentation)
    const isValidSignature = ToyyibPayService.verifyCallback(body, signature);

    if (!isValidSignature) {
      console.error("Invalid callback signature");
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
    }

    // Process payment based on status
    if (status === "1") {
      // Payment successful
      console.log(`Payment successful for order ${order_id}: ${refno}`);

      try {
        // Find and update order in Firestore
        const order = await ServerOrderService.getOrderByOrderId(order_id);
        if (order) {
          await ServerOrderService.updateOrderPaymentStatus(order.id!, {
            status: "paid",
            transactionId: refno,
            billCode: billcode,
            notes: `Payment completed at ${transaction_time}. Amount: ${amount}`,
          });
          console.log(`Order ${order_id} updated with payment success`);
        } else {
          console.warn(`Order ${order_id} not found in database`);
        }
      } catch (error) {
        console.error(`Failed to update order ${order_id}:`, error);
        // Continue processing even if database update fails
      }

      return NextResponse.json({
        success: true,
        message: "Payment processed successfully",
        data: {
          orderId: order_id,
          transactionId: refno,
          status: "success",
        },
      });
    } else if (status === "2") {
      // Payment pending
      console.log(`Payment pending for order ${order_id}: ${refno}`);

      return NextResponse.json({
        success: true,
        message: "Payment is pending",
        data: {
          orderId: order_id,
          transactionId: refno,
          status: "pending",
        },
      });
    } else if (status === "3") {
      // Payment failed
      console.log(`Payment failed for order ${order_id}: ${msg}`);

      try {
        // Find and update order in Firestore
        const order = await ServerOrderService.getOrderByOrderId(order_id);
        if (order) {
          await ServerOrderService.updateOrderPaymentStatus(order.id!, {
            status: "failed",
            billCode: billcode,
            notes: `Payment failed: ${msg}`,
          });
          console.log(`Order ${order_id} updated with payment failure`);
        } else {
          console.warn(`Order ${order_id} not found in database`);
        }
      } catch (error) {
        console.error(`Failed to update order ${order_id}:`, error);
        // Continue processing even if database update fails
      }

      return NextResponse.json({
        success: true,
        message: "Payment failed",
        data: {
          orderId: order_id,
          status: "failed",
          reason: msg,
        },
      });
    } else {
      // Unknown status
      console.log(`Unknown payment status ${status} for order ${order_id}`);

      return NextResponse.json({
        success: false,
        message: "Unknown payment status",
        data: {
          orderId: order_id,
          status: "unknown",
        },
      });
    }
  } catch (error) {
    console.error("Payment callback error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// Handle GET requests (ToyyibPay might send GET requests for some callbacks)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status");
  const billcode = searchParams.get("billcode");
  const order_id = searchParams.get("order_id");

  console.log("Payment callback GET:", { status, billcode, order_id });

  return NextResponse.json({
    success: true,
    message: "Callback received via GET",
    data: { status, billcode, order_id },
  });
}
