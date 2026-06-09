import pool  from "./db.js";
import bcrypt from "bcrypt";

// 1. REGISTER
export const registerController = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Semua field harus diisi." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [username.toLowerCase(), email.toLowerCase(), hashedPassword] // Gunakan hashedPassword
    );
    res.status(201).json({ success: true });
  } catch (err) {
    if (err.code === "23505") {
      if (err.constraint.includes("users_pkey")) {
        return res.status(400).json({ error: "Email atau username sudah digunakan." });
      }
    }
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};

// 2. LOGIN
export const loginController = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username dan password harus diisi." });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1",[username.toLowerCase()]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Username atau password salah." });
    }

    const user = result.rows[0];

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Username atau password salah." });
    }

    res.json({ success: true, user: { username: user.username, email: user.email } });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};

// 3. GET EXPENSES
export const getExpensesController = async (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ error: "Username parameter diperlukan." });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM expenses WHERE username = $1 ORDER BY id ASC",
      [username.toLowerCase()]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Get Expenses Error:", err);
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};

// 4. ADD EXPENSE
export const addExpenseController = async (req, res) => {
  const { username, expense } = req.body;
  if (!username || !expense || !expense.nama || !expense.kategori || !expense.harga || !expense.tanggal) {
    return res.status(400).json({ error: "Data pengeluaran tidak lengkap." });
  }

  try {
    const result = await pool.query(
      `INSERT INTO expenses (username, nama, kategori, harga, tanggal) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [username.toLowerCase(), expense.nama, expense.kategori, Number(expense.harga), expense.tanggal]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Add Expense Error:", err);
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};

// 5. DELETE EXPENSE
export const deleteExpenseController = async (req, res) => {
  const { id } = req.params;
  const { username } = req.query;

  if (!username || !id) {
    return res.status(400).json({ error: "Username dan ID pengeluaran diperlukan." });
  }

  try {
    await pool.query(
      "DELETE FROM expenses WHERE id = $1 AND username = $2",
      [Number(id), username.toLowerCase()]
    );

    const result = await pool.query(
      "SELECT * FROM expenses WHERE username = $1 ORDER BY id ASC",
      [username.toLowerCase()]
    );
    
    res.json(result.rows);

  } catch (err) {
    console.error("Delete Expense Error:", err);
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};

// 6. UPDATE PROFILE
export const updateProfileController = async (req, res) => {
  const { oldUsername, newUsername, newEmail } = req.body;
  if (!oldUsername || !newUsername || !newEmail) {
    return res.status(400).json({ error: "Data tidak lengkap." });
  }

  try {
    if (oldUsername.toLowerCase() !== newUsername.toLowerCase()) {
      const checkUser = await pool.query("SELECT username FROM users WHERE username = $1", [newUsername.toLowerCase()]);
      if (checkUser.rows.length > 0) {
        return res.status(400).json({ error: "Username sudah digunakan." });
      }
    }

    const result = await pool.query(
      "UPDATE users SET username = $1, email = $2 WHERE username = $3 RETURNING username, email",
      [newUsername.toLowerCase(), newEmail.toLowerCase(), oldUsername.toLowerCase()]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User tidak ditemukan." });
    }

    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    if (err.code === "23505" && err.constraint.includes("users_email_key")) {
      return res.status(400).json({ error: "Email sudah digunakan oleh user lain." });
    }
    console.error("Update Profile Error:", err);
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};