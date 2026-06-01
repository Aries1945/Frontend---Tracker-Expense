import { createMemo, For, Show } from "solid-js";
import DashboardNavbar from "../components/DashboardNavbar";
import { A } from "@solidjs/router";
import { useAuth } from "../context/AuthContext";
import { getExpenses } from "../utils/expenseStore";

const formatRupiah = (angka) =>
  "Rp " + angka.toLocaleString("id-ID");

const formatTanggal = (dateStr) =>
  new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default () => {
  const { user } = useAuth();

  const expenses = createMemo(() =>
    user() ? getExpenses(user().username) : []
  );

  const bulanIni = new Date().toISOString().slice(0, 7);

  const totalSemua = createMemo(() =>
    expenses().reduce((sum, e) => sum + e.harga, 0)
  );

  const totalBulanIni = createMemo(() =>
    expenses()
      .filter((e) => e.tanggal.startsWith(bulanIni))
      .reduce((sum, e) => sum + e.harga, 0)
  );

  const kategoriTerbesar = createMemo(() => {
    const summary = {};
    expenses().forEach((e) => {
      summary[e.kategori] = (summary[e.kategori] || 0) + e.harga;
    });
    const entries = Object.entries(summary);
    if (entries.length === 0) return "-";
    return entries.reduce((a, b) => (b[1] > a[1] ? b : a))[0];
  });

  const transaksiTerbaru = createMemo(() =>
    [...expenses()]
      .sort((a, b) => b.tanggal.localeCompare(a.tanggal))
      .slice(0, 5)
  );

  const kategoriSummary = createMemo(() => {
    const summary = {};
    expenses().forEach((e) => {
      summary[e.kategori] = (summary[e.kategori] || 0) + e.harga;
    });
    const total = totalSemua() || 1;
    return Object.entries(summary)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([nama, jumlah]) => ({
        nama,
        persen: Math.round((jumlah / total) * 100),
      }));
  });

  return (
    <div class="min-h-screen bg-[#f3f3f0]">
      <DashboardNavbar />

      <main class="max-w-6xl mx-auto px-10 py-10">

        {/* Header */}
        <div class="flex items-center justify-between mb-10">
          <div>
            <h1 class="text-4xl font-bold text-[#1a1a2e]">
              Halo, {user()?.username}!
            </h1>
            <p class="text-gray-500 mt-2">Pantau pengeluaranmu dengan lebih mudah</p>
          </div>
          <A
            href="/expense"
            class="bg-[#1baa6a] text-white font-semibold px-5 py-3 rounded-xl shadow transition-colors"
          >
            + Catat Pengeluaran
          </A>
        </div>

        {/* Statistik */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-2xl p-6 shadow-md">
            <p class="text-gray-500 text-sm">Total Pengeluaran</p>
            <h2 class="text-2xl font-bold text-[#1a1a2e] mt-2">{formatRupiah(totalSemua())}</h2>
          </div>
          <div class="bg-white rounded-2xl p-6 shadow-md">
            <p class="text-gray-500 text-sm">Bulan Ini</p>
            <h2 class="text-2xl font-bold text-[#1a1a2e] mt-2">{formatRupiah(totalBulanIni())}</h2>
          </div>
          <div class="bg-white rounded-2xl p-6 shadow-md">
            <p class="text-gray-500 text-sm">Jumlah Transaksi</p>
            <h2 class="text-2xl font-bold text-[#1a1a2e] mt-2">{expenses().length}</h2>
          </div>
          <div class="bg-white rounded-2xl p-6 shadow-md">
            <p class="text-gray-500 text-sm">Kategori Terbesar</p>
            <h2 class="text-2xl font-bold text-[#1a1a2e] mt-2">{kategoriTerbesar()}</h2>
          </div>
        </div>

        {/* Section bawah */}
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Transaksi Terbaru */}
          <div class="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md min-h-80">
            <h2 class="text-xl font-bold text-[#1a1a2e] mb-4">Transaksi Terbaru</h2>

            <Show
              when={transaksiTerbaru().length > 0}
              fallback={
                <div class="flex items-center justify-center h-48">
                  <p class="text-gray-400">Belum ada transaksi. <A href="/expense" class="text-[#1baa6a] underline">Tambah sekarang</A></p>
                </div>
              }
            >
              <div class="space-y-4">
                <For each={transaksiTerbaru()}>
                  {(exp) => (
                    <div class="flex items-center justify-between border-b pb-3">
                      <div>
                        <p class="font-semibold text-[#1a1a2e]">{exp.nama}</p>
                        <p class="text-sm text-gray-500">{formatTanggal(exp.tanggal)} · {exp.kategori}</p>
                      </div>
                      <p class="font-bold text-[#1a1a2e]">{formatRupiah(exp.harga)}</p>
                    </div>
                  )}
                </For>
              </div>
            </Show>
          </div>

          {/* Per Kategori */}
          <div class="bg-white rounded-2xl p-6 shadow-md min-h-80">
            <h2 class="text-xl font-bold text-[#1a1a2e] mb-4">Per Kategori</h2>

            <Show
              when={kategoriSummary().length > 0}
              fallback={
                <div class="flex items-center justify-center h-48">
                  <p class="text-gray-400">Belum ada data</p>
                </div>
              }
            >
              <div class="space-y-4">
                <For each={kategoriSummary()}>
                  {(item) => (
                    <div>
                      <div class="flex justify-between text-sm mb-1">
                        <span>{item.nama}</span>
                        <span>{item.persen}%</span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-3">
                        <div
                          class="bg-[#1baa6a] h-3 rounded-full"
                          style={{ width: `${item.persen}%` }}
                        />
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </Show>
          </div>

        </div>
      </main>
    </div>
  );
};
