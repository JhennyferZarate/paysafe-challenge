import { Document } from "mongoose";

export interface ITransaction extends Document {
  operationId: string;
  amount: number;
  currency: string;
  status: string;
  stripePaymentIntentId: string;
  createdAt: Date;
  updatedAt: Date;
  clientSecret: string;
  statusChanges: IStatusChange[];
}

interface IStatusChange {
  status: string;
  timestamp: Date;
}
