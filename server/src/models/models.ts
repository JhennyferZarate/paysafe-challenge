import mongoose, { Schema } from "mongoose";
import { ITransaction } from "../interfaces/transaction";

const transactionSchema: Schema = new Schema(
  {
    operationId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, required: true },
    stripePaymentIntentId: { type: String, required: true },
    clientSecret: { type: String, required: true },
    statusChanges: { type: [{ status: String, timestamp: Date }], default: [] },
  },
  { timestamps: true }
);

const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema
);

export default Transaction;
