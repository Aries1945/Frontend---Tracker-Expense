import { createSignal } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import Navbar from "../components/Navbar";

export default function Login() {
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username(), password: password() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gagal masuk.");
      } else {
        localStorage.setItem("spendly_session", JSON.stringify(data.user));
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setError("Koneksi ke server gagal. Pastikan server backend menyala.");
    }
  }

  return (
    <div class="min-h-screen bg-[#f5f5f0]" style={{ "font-family": "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />
      <div class="flex flex-col items-center text-center px-6 pt-20 pb-28 max-w-3xl mx-auto">
        <h1 class="text-[#1a1a2e] font-extrabold text-5xl md:text-6xl leading-tight mb-6">Masuk Akun</h1>

        <div class="bg-white w-full max-w-md text-left rounded-2xl shadow-xl p-8 border border-gray-100">
          <form class="space-y-6" onSubmit={handleSubmit}>

            <div class="flex flex-col">
              <label class="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <input
                type="text"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 transition-all"
                placeholder="Masukkan username"
                value={username()}
                onInput={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 transition-all"
                placeholder="Masukkan password"
                value={password()}
                onInput={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error() && (
              <p class="text-red-500 text-sm font-medium">{error()}</p>
            )}

            <button
              type="submit"
              class="bg-[#1baa6a] hover:bg-[#159758] text-white text-lg font-semibold py-3 w-full rounded-xl transition-colors"
            >
              Masuk
            </button>
          </form>

          <div class="mt-8 text-center text-gray-600 text-sm">
            Belum punya akun?{" "}
            <A href="/register" class="text-blue-600 font-semibold hover:text-blue-800 hover:underline transition-all underline">
              Daftar di sini
            </A>
          </div>
        </div>
      </div>
    </div>
  );
}
