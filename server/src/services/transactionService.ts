import { createStripePaymentIntent } from "./stripeService";
import Transaction from "../models/models";
import { ITransaction } from "../interfaces/transaction";

export const createTransaction = async (
  amount: number,
  currency: string
): Promise<ITransaction> => {
  const paymentIntent = await createStripePaymentIntent(amount, currency);
  const { id, client_secret } = paymentIntent;

  const transaction = new Transaction({
    operationId: id,
    amount,
    currency,
    status: "Created",
    stripePaymentIntentId: id,
    paymentMethodType: [],
    clientSecret: client_secret,
  });

  return transaction.save();
};

export const updateTransactionStatus = async (
  transaction: any,
  newStatus: string
) => {
  transaction.status = newStatus;
  transaction.statusChanges.push({
    status: newStatus,
    timestamp: new Date(),
  });
  await transaction.save();
};
