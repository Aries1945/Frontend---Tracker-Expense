import DashboardNavbar from "../components/DashboardNavbar";
import { user } from "../stores/auth";

export default () => {
  return (
    <div class="min-h-screen bg-[#f3f3f0]">
      <DashboardNavbar />

      <main class="max-w-5xl mx-auto px-10 py-10">
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-[#1a1a2e]">Profile</h1>
          <p class="text-gray-500 mt-2">Kelola informasi akunmu</p>
        </div>

        <div class="bg-white rounded-3xl shadow-md p-10 border border-gray-100">
          <div class="flex flex-col md:flex-row gap-10">
            <div class="flex justify-center">
              <div class="w-36 h-36 rounded-full bg-[#1baa6a] flex items-center justify-center text-white font-bold text-4xl shadow-inner uppercase">
                {user()?.username?.charAt(0) || "?"}
              </div>
            </div>

            <div class="flex-1 space-y-6">
              <div>
                <label class="block text-sm font-semibold text-[#1a1a2e] mb-2">Username</label>
                <input
                  type="text"
                  readonly
                  value={user()?.username || ""}
                  class="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-[#1a1a2e] mb-2">Email</label>
                <input
                  type="email"
                  readonly
                  value={user()?.email || ""}
                  class="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none"
                />
              </div>

              <p class="text-sm text-gray-500">
                Data akun diambil dari sesi login. Setiap user hanya melihat pengeluaran miliknya sendiri.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
