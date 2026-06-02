import { token } from "../stores/auth";

const API_TIMEOUT_MS = 8000;

export async function apiFetch(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token()) {
    headers.Authorization = `Bearer ${token()}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const res = await fetch(path, {
      ...options,
      headers,
      signal: controller.signal,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.error || "Terjadi kesalahan");
    }

    return data;
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error(
        "Server tidak merespons. Pastikan backend jalan: cd server lalu npm run dev"
      );
    }

    if (err instanceof TypeError) {
      throw new Error(
        "Tidak bisa hubungi server. Jalankan backend di folder server (port 3001) dan frontend dengan npm run dev."
      );
    }

    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}
