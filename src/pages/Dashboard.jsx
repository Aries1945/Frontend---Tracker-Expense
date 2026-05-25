import DashboardNavbar from "../components/DashboardNavbar";
import { A } from "@solidjs/router";

export default () => {
  return (
    <div class="min-h-screen bg-[#f3f3f0]">
      <DashboardNavbar />

      <main class="max-w-6xl mx-auto px-10 py-10">
        
        {/* header */}
        <div class="flex items-center justify-between mb-10">
          <div>
            <h1 class="text-4xl font-bold text-[#1a1a2e]">
              Dashboard
            </h1>
            <p class="text-gray-500 mt-2">
              Pantau pengeluaranmu dengan lebih mudah
            </p>
          </div>

          <A
            href="/expense"
            class="bg-[#1baa6a]  text-white font-semibold px-5 py-3 rounded-xl shadow transition-colors"
          >
            + Catat Pengeluaran
          </A>
        </div>

        {/* statistik */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          <div class="bg-white rounded-2xl p-6 shadow-md">
            <p class="text-gray-500 text-sm">Total Pengeluaran</p>
            <h2 class="text-2xl font-bold text-[#1a1a2e] mt-2">
              Rp 2.500.000
            </h2>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-md">
            <p class="text-gray-500 text-sm">Bulan Ini</p>
            <h2 class="text-2xl font-bold text-[#1a1a2e] mt-2">
              Rp 850.000
            </h2>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-md">
            <p class="text-gray-500 text-sm">Jumlah Transaksi</p>
            <h2 class="text-2xl font-bold text-[#1a1a2e] mt-2">
              24
            </h2>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-md">
            <p class="text-gray-500 text-sm">Kategori Terbesar</p>
            <h2 class="text-2xl font-bold text-[#1a1a2e] mt-2">
              Makanan
            </h2>
          </div>
        </div>

        {/* Section bawah */}
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Transaksi terbaru */}
          <div class="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md min-h-[320px]">
            <h2 class="text-xl font-bold text-[#1a1a2e] mb-4">
              Transaksi Terbaru
            </h2>

            <div class="space-y-4">
              
              <div class="flex items-center justify-between border-b pb-3">
                <div>
                  <p class="font-semibold text-[#1a1a2e]">
                    Makan Siang
                  </p>
                  <p class="text-sm text-gray-500">
                    24 Mei 2026
                  </p>
                </div>

                <p class="font-bold text-500">
                  Rp 45.000
                </p>
              </div>

              <div class="flex items-center justify-between border-b pb-3">
                <div>
                  <p class="font-semibold text-[#1a1a2e]">
                    Transportasi
                  </p>
                  <p class="text-sm text-gray-500">
                    23 Mei 2026
                  </p>
                </div>

                <p class="font-bold text-500">
                  Rp 20.000
                </p>
              </div>

            </div>
          </div>

          {/* Kategori */}
          <div class="bg-white rounded-2xl p-6 shadow-md min-h-[320px]">
            <h2 class="text-xl font-bold text-[#1a1a2e] mb-4">
              Per Kategori
            </h2>

            <div class="space-y-4">
              
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span>Makanan</span>
                  <span>45%</span>
                </div>

                <div class="w-full bg-gray-200 rounded-full h-3">
                  <div class="bg-[#1baa6a] h-3 rounded-full w-[45%]"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span>Transportasi</span>
                  <span>25%</span>
                </div>

                <div class="w-full bg-gray-200 rounded-full h-3">
                  <div class="bg-[#1baa6a] h-3 rounded-full w-[25%]"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span>Hiburan</span>
                  <span>15%</span>
                </div>

                <div class="w-full bg-gray-200 rounded-full h-3">
                  <div class="bg-[#1baa6a] h-3 rounded-full w-[15%]"></div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
};