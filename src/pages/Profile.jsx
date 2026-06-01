import { createSignal } from "solid-js";
import DashboardNavbar from "../components/DashboardNavbar";
import { useAuth } from "../context/AuthContext";
import { getExpenses } from "../utils/expenseStore";

export default () => {
  const { user, updateUser } = useAuth();

  const [isEdit, setIsEdit] = createSignal(false);
  const [username, setUsername] = createSignal(user()?.username || "");
  const [email, setEmail] = createSignal(user()?.email || "");
  const [error, setError] = createSignal("");

  const jumlahTransaksi = () =>
    user() ? getExpenses(user().username).length : 0;

  const totalPengeluaran = () => {
    if (!user()) return 0;
    return getExpenses(user().username).reduce((sum, e) => sum + e.harga, 0);
  };

  function handleSave() {
    setError("");
    const result = updateUser(username(), email());
    if (result.error) {
      setError(result.error);
    } else {
      setIsEdit(false);
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
                {user()?.username?.[0]?.toUpperCase() || "?"}
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
                  onInput={(e) => setUsername(e.target.value)}
                  class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1baa6a] disabled:bg-gray-100 disabled:text-gray-500"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-[#1a1a2e] mb-2">Email</label>
                <input
                  type="email"
                  value={email()}
                  disabled={!isEdit()}
                  onInput={(e) => setEmail(e.target.value)}
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
