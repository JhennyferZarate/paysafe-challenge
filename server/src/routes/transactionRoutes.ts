import { Router } from "express";
import {
  configHandler,
  createTransactionHandler,
  updateTransactionStatusHandler,
} from "../controllers/transactionController";

const router = Router();

router.get("/config", configHandler);
router.post("/create", createTransactionHandler);
router.post("/update/:id", updateTransactionStatusHandler);

export default router;
