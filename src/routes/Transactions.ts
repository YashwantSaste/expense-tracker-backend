import express from "express";
import { addTransaction, getTransactions, updateTransaction, deleteTransaction } from "../controllers/TransactionsController";
import { authenticateUser } from "../middlewares/authMiddleware";
const router = express.Router();

router.post("/",authenticateUser,addTransaction);

router.get("/", authenticateUser, getTransactions);

router.put("/:transactionId",authenticateUser, updateTransaction);

router.delete("/:transactionId",authenticateUser, deleteTransaction);

export default router;
