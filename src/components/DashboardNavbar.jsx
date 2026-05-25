import { A } from "@solidjs/router";

export default () => {
  return (
    <nav class="bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-6xl mx-auto px-10 py-4 flex items-center justify-between">


        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-[#1baa6a] flex items-center justify-center shadow">
            <span class="text-white font-bold">
              S
            </span>
          </div>

          <A
            href="/dashboard"
            class="text-2xl font-bold text-[#1a1a2e]"
          >
            Spendly
          </A>
        </div>


        <div class="hidden md:flex items-center gap-8">
          <A
            href="/dashboard"
            class="text-[#1a1a2e] font-medium "
          >
            Dashboard
          </A>

          <A
            href="/expense"
            class="text-[#1a1a2e] font-medium "
          >
            Pengeluaran
          </A>
        </div>


        <div class="flex items-center gap-4">


          <A
            href="/profile"
            class="text-[#1a1a2e] font-medium"
          >
            Profile
          </A>

          {/* Bypass logout sementara  */}
          <A href="/">
            <button class="bg-red-500  text-white px-4 py-2 rounded-xl font-medium transition-colors">
              Keluar
            </button>
          </A>
        </div>
      </div>
    </nav>
  );
};
