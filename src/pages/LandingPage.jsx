import { A } from "@solidjs/router";


const Navbar = () => (
  <nav class="flex items-center justify-between px-10 py-5 max-w-7xl mx-auto">
    <div class="flex items-center gap-2">
      <div class="w-9 h-9 rounded-xl bg-[#1baa6a] flex items-center justify-center">
        <span class="text-white font-bold text-sm">S</span>
      </div>
      <span class="text-[#1a1a2e] font-bold text-lg tracking-tight">Spendly</span>
    </div>

    <div class="flex items-center gap-3">
      <A href="/login" class="text-sm font-semibold text-[#1a1a2e] hover:text-[#1baa6a] transition-colors">
        Masuk
      </A>
      <A
        href="/register"
        class="bg-[#1baa6a] hover:bg-[#159758] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
      >
        Daftar
      </A>
    </div>
  </nav>
);

// 

const Hero = () => (
  <section class="flex flex-col items-center text-center px-6 pt-20 pb-28 max-w-3xl mx-auto">

    <div class="flex items-center gap-2 text-[#1baa6a] text-sm font-semibold bg-[#e8f7f0] px-4 py-1.5 rounded-full mb-8">
      Kelola uang dengan lebih sadar
    </div>

    <h1 class="text-[#1a1a2e] font-extrabold text-5xl md:text-6xl leading-tight mb-6">
      Pengeluaran harian,
      <br />
      <span class="text-[#1baa6a]">terkontrol penuh.</span>
    </h1>

    <p class="text-gray-500 text-lg leading-relaxed mb-10 max-w-xl">
      Spendly membantu Anda mencatat setiap pengeluaran — dari kopi pagi hingga tagihan bulanan —
      lalu mengubahnya menjadi insight visual yang mudah dipahami.
    </p>

    <div class="flex flex-col sm:flex-row items-center gap-3">
      <A
        href="/register"
        class="bg-[#1baa6a] hover:bg-[#159758] text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors"
      >
        Mulai Gratis →
      </A>
      <A
        href="/login"
        class="border border-[#d0d0c8] hover:border-[#1baa6a] bg-white text-[#1a1a2e] font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors"
      >
        Saya sudah punya akun
      </A>
     
    </div>
  </section>
)

//landing page utama

export default function LandingPage() {
  return (
    <div class="min-h-screen bg-[#f5f5f0]" style={{ "font-family": "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />
      <Hero />
    </div>
  );
}