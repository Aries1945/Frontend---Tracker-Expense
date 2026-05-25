export default () => (
  <nav class="flex items-center justify-between px-10 py-5 max-w-7xl mx-auto">
    <div class="flex items-center gap-2">
      <div class="w-9 h-9 rounded-xl bg-[#1baa6a] flex items-center justify-center">
        <span class="text-white font-bold text-sm">S</span>
      </div>
      <A href="/" class="text-[#1a1a2e] font-bold text-lg tracking-tight">
        Spendly
      </A>
    </div>

    <div class="flex items-center gap-3">
      <A href="/login" class="text-sm font-semibold text-[#1a1a2e] hover:text-[#1baa6a] transition-colors">
        Masuk
      </A>
      <A href="/register" class="bg-[#1baa6a] hover:bg-[#159758] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"> Daftar </A>
    </div>
  </nav>
);