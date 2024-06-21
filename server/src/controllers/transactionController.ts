import { Request, Response } from "express";
import {
  createTransaction,
  updateTransactionStatus,
} from "../services/transactionService";
import Transaction from "../models/models";

export const createTransactionHandler = async (req: Request, res: Response) => {
  const { amount, currency } = req.body;
  try {
    const transaction = await createTransaction(amount, currency);
    res.status(201).json(transaction);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const configHandler = async (req: Request, res: Response) => {
  try {
    const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    res.status(201).json({ publishableKey });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTransactionStatusHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { operationId } = req.params;
    const { newStatus } = req.body;

    if (!operationId || typeof operationId !== "string") {
      return res.status(400).json({ message: "Invalid operationId format" });
    }

    const transaction = await Transaction.findOne({ operationId });
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    await updateTransactionStatus(transaction, newStatus);

    return res.status(200).json(transaction);
  } catch (error) {
    console.error("Error updating transaction status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
