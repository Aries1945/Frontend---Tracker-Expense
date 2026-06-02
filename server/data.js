export let nextUserId = 3;
export let nextExpenseId = 4;

export const users = [
  { id: 1, username: "admin", password: "admin", email: "admin@example.com" },
  { id: 2, username: "user", password: "user", email: "user@example.com" },
];

export const sessions = [];

export const expenses = [
  {
    id: 1,
    userId: 1,
    nama: "Makan Siang",
    kategori: "Makanan",
    harga: 45000,
    tanggal: "2026-05-24",
  },
  {
    id: 2,
    userId: 1,
    nama: "Transportasi",
    kategori: "Transportasi",
    harga: 20000,
    tanggal: "2026-05-23",
  },
  {
    id: 3,
    userId: 2,
    nama: "Netflix",
    kategori: "Hiburan",
    harga: 54000,
    tanggal: "2026-05-20",
  },
];
