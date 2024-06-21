import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import connectDB from "./utils/db";
import transactionRoutes from "./routes/transactionRoutes";

const app = express();

// Middlewares
app.use(bodyParser.json({ type: "application/json" }));
app.use(morgan("dev"));

// Connect to database
connectDB();

// Routes
app.use("/api/transactions", transactionRoutes);

export default app;
