import { A, useNavigate } from "@solidjs/router";
import { user, logout } from "../stores/auth";

export default () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <nav class="bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-6xl mx-auto px-10 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-[#1baa6a] flex items-center justify-center shadow">
            <span class="text-white font-bold">S</span>
          </div>

          <A href="/dashboard" class="text-2xl font-bold text-[#1a1a2e]">
            Spendly
          </A>
        </div>

        <div class="hidden md:flex items-center gap-8">
          <A href="/dashboard" class="text-[#1a1a2e] font-medium">
            Dashboard
          </A>

          <A href="/expense" class="text-[#1a1a2e] font-medium">
            Pengeluaran
          </A>
        </div>

        <div class="flex items-center gap-4">
          <span class="text-sm text-gray-500 hidden sm:inline">{user()?.username}</span>

          <A href="/profile" class="text-[#1a1a2e] font-medium">
            Profile
          </A>

          <button
            type="button"
            onClick={handleLogout}
            class="bg-red-500 text-white px-4 py-2 rounded-xl font-medium transition-colors"
          >
            Keluar
          </button>
        </div>
      </div>
    </nav>
  );
};
