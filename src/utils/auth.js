const API_BASE = "http://localhost:5000/api";
const SESSION_KEY = "spendly_session";

export async function register(username, email, password) {
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: data.error || "Gagal melakukan registrasi." };
    }
    return { success: true };
  } catch (err) {
    return { error: "Koneksi ke server gagal. Pastikan server backend menyala." };
  }
}

export async function login(username, password) {
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: data.error || "Gagal masuk." };
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
    return { success: true };
  } catch (err) {
    return { error: "Koneksi ke server gagal. Pastikan server backend menyala." };
  }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
}

export async function updateUser(oldUsername, newUsername, newEmail) {
  try {
    const res = await fetch(`${API_BASE}/update-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldUsername, newUsername, newEmail }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: data.error || "Gagal memperbarui profil." };
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
    return { success: true, user: data.user };
  } catch (err) {
    return { error: "Koneksi ke server gagal. Pastikan server backend menyala." };
  }
}

