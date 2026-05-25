import { A } from "@solidjs/router";
import Navbar from "../components/Navbar";

const Hero = () => (
  <section class="flex flex-col items-center text-center px-6 pt-20 pb-28 max-w-3xl mx-auto">



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
        class="bg-[#1baa6a]  text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors"
      >
        Mulai Gratis
      </A>
      <A
        href="/login"
        class="border border-[#d0d0c8]  bg-white text-[#1a1a2e] font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors"
      >
        Saya sudah punya akun
      </A>
     
    </div>
  </section>
)

export default function LandingPage() {
  return (
    <div class="min-h-screen bg-[#f5f5f0]" style={{ "font-family": "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />
      <Hero />
    </div>
  );
}