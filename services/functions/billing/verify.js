import handler from "../../util/handler";
import crypto from "crypto";

export const main = handler(async (event) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    emailId,
  } = JSON.parse(event.body);


  // generated_signature = hmac_sha256(
  //   order_id + "|" + razorpay_payment_id,
  //   process.env.RAZORPAY_SECRET_KEY
  // );

  // if (generated_signature == razorpay_signature) {
  //   console.log("SUCCESS");
  // }

  return { signatureIsValid: true };
});
