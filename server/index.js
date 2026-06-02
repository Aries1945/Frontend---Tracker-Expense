import express from "express";
import cors from "cors";
import { randomUUID } from "crypto";
import {
  users,
  sessions,
  expenses,
  nextUserId,
  nextExpenseId,
} from "./data.js";

const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
    credentials: true,
  })
);
app.use(express.json());

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Harus login dulu" });
  }

  const token = header.slice(7);
  const session = sessions.find((s) => s.token === token);
  if (!session) {
    return res.status(401).json({ error: "Sesi tidak valid, silakan login lagi" });
  }

  req.userId = session.userId;
  req.token = token;
  next();
}

function findUser(userId) {
  const user = users.find((u) => u.id === userId);
  if (!user) return null;
  return { id: user.id, username: user.username, email: user.email };
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username?.trim() || !email?.trim() || !password?.trim()) {
    return res.status(400).json({ error: "Username, email, dan password wajib diisi" });
  }

  if (users.some((u) => u.username === username.trim())) {
    return res.status(400).json({ error: "Username sudah dipakai" });
  }

  if (users.some((u) => u.email === email.trim())) {
    return res.status(400).json({ error: "Email sudah terdaftar" });
  }

  const user = {
    id: nextUserId++,
    username: username.trim(),
    email: email.trim(),
    password,
  };

  users.push(user);
  res.status(201).json({ message: "Pendaftaran berhasil" });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username?.trim() && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Username atau password salah" });
  }

  const token = randomUUID();
  sessions.push({ token, userId: user.id });

  res.json({
    token,
    user: findUser(user.id),
  });
});

app.post("/api/logout", authMiddleware, (req, res) => {
  const index = sessions.findIndex((s) => s.token === req.token);
  if (index >= 0) sessions.splice(index, 1);
  res.json({ message: "Logout berhasil" });
});

app.get("/api/me", authMiddleware, (req, res) => {
  res.json(findUser(req.userId));
});

app.get("/api/expenses", authMiddleware, (req, res) => {
  const list = expenses
    .filter((e) => e.userId === req.userId)
    .sort((a, b) => b.tanggal.localeCompare(a.tanggal));
  res.json(list);
});

app.post("/api/expenses", authMiddleware, (req, res) => {
  const { nama, kategori, harga, tanggal } = req.body;

  if (!nama?.trim() || !kategori?.trim() || !tanggal) {
    return res.status(400).json({ error: "Nama, kategori, dan tanggal wajib diisi" });
  }

  const amount = Number(harga);
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Nominal harus lebih dari 0" });
  }

  const item = {
    id: nextExpenseId++,
    userId: req.userId,
    nama: nama.trim(),
    kategori: kategori.trim(),
    harga: amount,
    tanggal,
  };

  expenses.push(item);
  res.status(201).json(item);
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Spendly API berjalan di http://127.0.0.1:${PORT}`);
});
