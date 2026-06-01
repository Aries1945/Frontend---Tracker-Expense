import { createSignal, createEffect } from "solid-js";
import DashboardNavbar from "../components/DashboardNavbar";

const API_BASE = "http://localhost:5000/api";

export default () => {
  const user = JSON.parse(localStorage.getItem("spendly_session") || "null");

  const [isEdit, setIsEdit] = createSignal(false);
  const [username, setUsername] = createSignal(user?.username || "");
  const [email, setEmail] = createSignal(user?.email || "");
  const [error, setError] = createSignal("");
  const [expenses, setExpenses] = createSignal([]);

  function handleUsername(event) {
    setUsername(event.target.value);
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  createEffect(async () => {
    if (user) {
      try {
        const res = await fetch(`${API_BASE}/expenses?username=${encodeURIComponent(user.username)}`);
        if (!res.ok) throw new Error("Gagal mengambil data pengeluaran");
        const data = await res.json();
        setExpenses(data);
      } catch (err) {
        console.error(err);
        setExpenses([]);
      }
    } else {
      setExpenses([]);
    }
  });

  const jumlahTransaksi = () => expenses().length;

  const totalPengeluaran = () => expenses().reduce((sum, e) => sum + e.harga, 0);

  async function handleSave() {
    setError("");
    try {
      const res = await fetch(`${API_BASE}/update-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldUsername: user.username, newUsername: username(), newEmail: email() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gagal memperbarui profil.");
      } else {
        localStorage.setItem("spendly_session", JSON.stringify(data.user));
        setIsEdit(false);
        window.location.reload();
      }
    } catch (err) {
      setError("Koneksi ke server gagal. Pastikan server backend menyala.");
    }
  }

  return (
    <div class="min-h-screen bg-[#f3f3f0]">
      <DashboardNavbar />

      <main class="max-w-5xl mx-auto px-10 py-10">

        <div class="mb-8">
          <h1 class="text-4xl font-bold text-[#1a1a2e]">Profile</h1>
          <p class="text-gray-500 mt-2">Kelola informasi akunmu</p>
        </div>


        {/* Card Profile */}
        <div class="bg-white rounded-3xl shadow-md p-10 border border-gray-100">
          <div class="flex flex-col md:flex-row gap-10">

            {/* Avatar */}
            <div class="flex justify-center">
              <div class="w-36 h-36 rounded-full bg-[#1baa6a] flex items-center justify-center text-white font-bold text-5xl shadow-inner">
                {user?.username?.[0]?.toUpperCase() || "?"}
              </div>
            </div>

            {/* Form */}
            <div class="flex-1 space-y-6">

              <div>
                <label class="block text-sm font-semibold text-[#1a1a2e] mb-2">Username</label>
                <input
                  type="text"
                  value={username()}
                  disabled={!isEdit()}
                  onChange={handleUsername}
                  class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1baa6a] disabled:bg-gray-100 disabled:text-gray-500"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-[#1a1a2e] mb-2">Email</label>
                <input
                  type="email"
                  value={email()}
                  disabled={!isEdit()}
                  onChange={handleEmail}
                  class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1baa6a] disabled:bg-gray-100 disabled:text-gray-500"
                />
              </div>

              {error() && (
                <p class="text-red-500 text-sm font-medium">{error()}</p>
              )}

              <div class="flex justify-end gap-4 pt-4">
                {isEdit() ? (
                  <>
                    <button
                      onClick={() => setIsEdit(false)}
                      class="px-5 py-2.5 rounded-xl border border-gray-300 text-[#1a1a2e] font-medium"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleSave}
                      class="px-5 py-2.5 rounded-xl bg-[#1baa6a] text-white font-medium shadow"
                    >
                      Simpan
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEdit(true)}
                    class="px-5 py-2.5 rounded-xl border border-gray-300 text-[#1a1a2e] font-medium"
                  >
                    Edit
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
