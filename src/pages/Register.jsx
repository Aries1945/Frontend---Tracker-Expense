import { createSignal, Show } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import Navbar from "../components/Navbar";
import { apiFetch } from "../lib/api";

const Main = () => {
  const navigate = useNavigate();
  const [username, setUsername] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiFetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          username: username(),
          email: email(),
          password: password(),
        }),
      });
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="flex flex-col items-center text-center px-6 pt-20 pb-28 max-w-3xl mx-auto">
      <h1 class="text-[#1a1a2e] font-extrabold text-5xl md:text-6xl leading-tight mb-6">
        Daftar Akun
      </h1>

      <div class="bg-white w-full max-w-md text-left rounded-2xl shadow-xl p-8 border border-gray-100">
        <form class="space-y-6" onSubmit={handleSubmit}>
          <Show when={error()}>
            <p class="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              {error()}
            </p>
          </Show>

          <div class="flex flex-col">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <input
              type="text"
              required
              value={username()}
              onInput={(e) => setUsername(e.target.value)}
              class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 transition-all"
              placeholder="Masukkan username"
            />
          </div>

          <div class="flex flex-col">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              required
              value={email()}
              onInput={(e) => setEmail(e.target.value)}
              class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 transition-all"
              placeholder="Masukkan email"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              required
              value={password()}
              onInput={(e) => setPassword(e.target.value)}
              class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 transition-all"
              placeholder="Masukkan password"
            />
          </div>

          <button
            type="submit"
            disabled={loading()}
            class="bg-[#1baa6a] hover:bg-[#159758] disabled:opacity-60 text-white text-sm font-semibold text-lg w-full py-2.5 rounded-xl transition-colors"
          >
            {loading() ? "Memproses..." : "Daftar"}
          </button>
        </form>

        <div class="mt-8 text-center text-gray-600 text-sm">
          Sudah punya akun?{" "}
          <A
            href="/login"
            class="text-blue-600 font-semibold hover:text-blue-800 hover:underline transition-all underline"
          >
            Masuk
          </A>
        </div>
      </div>
    </div>
  );
};

export default function Register() {
  return (
    <div
      class="min-h-screen bg-[#f5f5f0]"
      style={{ "font-family": "'Plus Jakarta Sans', sans-serif" }}
    >
      <Navbar />
      <Main />
    </div>
  );
}
