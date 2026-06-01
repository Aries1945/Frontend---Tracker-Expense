import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERS_FILE = path.join(__dirname, "users.json");
const EXPENSES_FILE = path.join(__dirname, "expenses.json");

// Helper to safely read and write JSON files
function readJSON(filePath, defaultValue) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  } catch (e) {
    console.error(`Error reading ${filePath}:`, e);
  }
  return defaultValue;
}

function writeJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error(`Error writing to ${filePath}:`, e);
  }
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize files if they don't exist
if (!fs.existsSync(USERS_FILE)) {
  writeJSON(USERS_FILE, []);
}
if (!fs.existsSync(EXPENSES_FILE)) {
  writeJSON(EXPENSES_FILE, {});
}

// 1. REGISTER
app.post("/api/register", (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Semua field harus diisi." });
  }

  const users = readJSON(USERS_FILE, []);
  if (users.find((u) => u.username.toLowerCase() === username.toLowerCase())) {
    return res.status(400).json({ error: "Username sudah digunakan." });
  }
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(400).json({ error: "Email sudah digunakan." });
  }

  const newUser = { username, email, password };
  users.push(newUser);
  writeJSON(USERS_FILE, users);

  res.status(201).json({ success: true });
});

// 2. LOGIN
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username dan password harus diisi." });
  }

  const users = readJSON(USERS_FILE, []);
  const user = users.find(
    (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
  );

  if (!user) {
    return res.status(400).json({ error: "Username atau password salah." });
  }

  res.json({ success: true, user: { username: user.username, email: user.email } });
});

// 3. GET EXPENSES
app.get("/api/expenses", (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ error: "Username parameter diperlukan." });
  }

  const expensesData = readJSON(EXPENSES_FILE, {});
  const userExpenses = expensesData[username] || [];
  res.json(userExpenses);
});

// 4. ADD EXPENSE
app.post("/api/expenses", (req, res) => {
  const { username, expense } = req.body;
  if (!username || !expense || !expense.nama || !expense.kategori || !expense.harga || !expense.tanggal) {
    return res.status(400).json({ error: "Data pengeluaran tidak lengkap." });
  }

  const expensesData = readJSON(EXPENSES_FILE, {});
  if (!expensesData[username]) {
    expensesData[username] = [];
  }

  const item = { ...expense, id: Date.now(), harga: Number(expense.harga) };
  expensesData[username].push(item);
  writeJSON(EXPENSES_FILE, expensesData);

  res.status(201).json(item);
});

// 5. DELETE EXPENSE
app.delete("/api/expenses/:id", (req, res) => {
  const { id } = req.params;
  const { username } = req.query;

  if (!username || !id) {
    return res.status(400).json({ error: "Username dan ID pengeluaran diperlukan." });
  }

  const expenseId = Number(id);
  const expensesData = readJSON(EXPENSES_FILE, {});
  if (expensesData[username]) {
    expensesData[username] = expensesData[username].filter((e) => e.id !== expenseId);
    writeJSON(EXPENSES_FILE, expensesData);
  }
  
  res.json(expensesData[username] || []);
});

// 6. UPDATE PROFILE
app.post("/api/update-profile", (req, res) => {
  const { oldUsername, newUsername, newEmail } = req.body;
  if (!oldUsername || !newUsername || !newEmail) {
    return res.status(400).json({ error: "Data tidak lengkap." });
  }

  const users = readJSON(USERS_FILE, []);
  const idx = users.findIndex((u) => u.username.toLowerCase() === oldUsername.toLowerCase());
  if (idx === -1) {
    return res.status(404).json({ error: "User tidak ditemukan." });
  }

  if (newUsername.toLowerCase() !== oldUsername.toLowerCase() && 
      users.find((u) => u.username.toLowerCase() === newUsername.toLowerCase())) {
    return res.status(400).json({ error: "Username sudah digunakan." });
  }

  // Update user info
  users[idx] = { ...users[idx], username: newUsername, email: newEmail };
  writeJSON(USERS_FILE, users);

  // Migrate expenses if username changed
  const expensesData = readJSON(EXPENSES_FILE, {});
  if (newUsername !== oldUsername) {
    if (expensesData[oldUsername]) {
      expensesData[newUsername] = expensesData[oldUsername];
      delete expensesData[oldUsername];
      writeJSON(EXPENSES_FILE, expensesData);
    }
  }

  res.json({ success: true, user: { username: newUsername, email: newEmail } });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
