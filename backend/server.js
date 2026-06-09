import express from "express";
import cors from "cors";
import { 
  registerController, 
  loginController, 
  getExpensesController, 
  addExpenseController, 
  deleteExpenseController, 
  updateProfileController 
} from "./controller.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// POST
app.post("/api/register", registerController);
app.post("/api/login", loginController);
app.post("/api/update-profile", updateProfileController);
app.post("/api/expenses", addExpenseController);

// GET
app.get("/api/expenses", getExpensesController);

// DELETE
app.delete("/api/expenses/:id", deleteExpenseController);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
