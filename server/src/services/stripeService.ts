import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const createStripePaymentIntent = async (
  amount: number,
  currency: string
) => {
  return stripe.paymentIntents.create({
    amount,
    currency,
    automatic_payment_methods: {
      enabled: true,
    },
  });
};

export const getIntentPaymentDetails = async (paymentIntentId: string) => {
  return stripe.paymentIntents.retrieve(paymentIntentId);
};
