import Stripe from "stripe";
import handler from "../util/handler";
import { calculateCost } from "../util/cost";

export const main = handler(async (event) => {
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = "Scratch charge";

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  await stripe.charges.create({
    source: source,
    amount: amount,
    description: description,
    currency: "usd",
    shipping: {
      name: "Harsh Keshri",
      address: {
        line1: "Lamloi",
        postal_code: "770017",
        city: "Rourkela",
        state: "Odisha",
        country: "India",
      },
    },
  });

  return { status: true };
});
