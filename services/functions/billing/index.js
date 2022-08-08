import handler from "../../util/handler";
import { calculateCost } from "../../util/cost";
import Razorpay from "razorpay";
import { orderPut } from "./orderPut";
import { orderGet } from "./orderGet";

export const main = handler(async (event) => {
  const { storage, emailId } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = "Scratch charge";

  const instance = await new Razorpay({
    key_id: "rzp_live_VRSEOVqdNxOi5n",
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });

  const options = {
    amount: amount,
    currency: "INR",
    receipt: "receipt1",
    notes: description,
  };

  const data = {};

  await instance.orders.create(options, function (err, order) {
    // console.log(order);
    // console.log(err);

    if (err) {
      return err;
    }

    data.orderId = order.id;
    data.status = order.status;
    data.amount = amount;
    return;
  });
  if (data.orderId) {
    // await orderPut({ emailId, orderId: data.orderId });
    console.log("BILLING");

    // const data1 = await orderPut({ emailId, orderId: data.orderId });
    // const data1 = await orderGet({ emailId });
    // console.log(data1);
  }

  return data;
});
