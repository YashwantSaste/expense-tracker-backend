import express from "express";
import { addBudget,getBudgets,updateBudget,deleteBudget } from "../controllers/BudgetController";
import { authenticateUser } from "../middlewares/authMiddleware";
const router = express.Router();
router.post("/add",authenticateUser,addBudget);
router.get("/get",authenticateUser,getBudgets);
router.put("/update/:budgetId",authenticateUser,updateBudget);
router.delete("/delete/:budgetId", authenticateUser, deleteBudget);

export default router;