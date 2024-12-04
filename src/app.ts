import express,{Application} from "express";
import cors from "cors";
import bodyparser from "body-parser";
import { connectToDatabse } from "./database/connectToDB";
import userRoutes from "./routes/User";
import budgetRoutes from "./routes/Budget";
import transactionRoutes from "./routes/Transactions"

const app:Application = express();

app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use("/api/users", userRoutes);
app.use("/api/budgets",budgetRoutes);
app.use("/api/transactions",transactionRoutes); 

connectToDatabse();

export default app;
