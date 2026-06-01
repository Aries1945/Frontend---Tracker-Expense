const API_BASE = "http://localhost:5000/api";

export async function getExpenses(username) {
  try {
    const res = await fetch(`${API_BASE}/expenses?username=${encodeURIComponent(username)}`);
    if (!res.ok) throw new Error("Gagal mengambil data pengeluaran");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function addExpense(username, expense) {
  try {
    const res = await fetch(`${API_BASE}/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, expense }),
    });
    if (!res.ok) throw new Error("Gagal menambah pengeluaran");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function deleteExpense(username, id) {
  try {
    const res = await fetch(`${API_BASE}/expenses/${id}?username=${encodeURIComponent(username)}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Gagal menghapus pengeluaran");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

