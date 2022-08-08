import handler from "../../util/handler";
import crypto from "crypto";
import { orderGet } from "./orderGet";

export const main = handler(async (event) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    emailId,
  } = JSON.parse(event.body);

  const data = await orderGet({ emailId });
  const orderId = JSON.parse(data.body).orderIdValue;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
    .update(orderId + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature == razorpay_signature) {
    console.log("SUCCESS");
    return { signatureIsValid: true };
  }

  return { signatureIsValid: false };
});
