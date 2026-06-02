import { createSignal, createMemo, For, Show, onMount } from "solid-js";
import DashboardNavbar from "../components/DashboardNavbar";
import { A } from "@solidjs/router";
import { apiFetch } from "../lib/api";
import { user } from "../stores/auth";

const formatRupiah = (angka) => "Rp " + angka.toLocaleString("id-ID");

const formatTanggal = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default () => {
  const [expenses, setExpenses] = createSignal([]);
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    try {
      const data = await apiFetch("/api/expenses");
      setExpenses(data);
    } catch {
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  });

  const total = createMemo(() => expenses().reduce((s, e) => s + e.harga, 0));

  const bulanIni = createMemo(() => {
    const now = new Date();
    const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    return expenses()
      .filter((e) => e.tanggal.startsWith(ym))
      .reduce((s, e) => s + e.harga, 0);
  });

  const kategoriTerbesar = createMemo(() => {
    const summary = {};
    expenses().forEach((e) => {
      summary[e.kategori] = (summary[e.kategori] || 0) + e.harga;
    });
    const entries = Object.entries(summary);
    if (!entries.length) return "-";
    return entries.sort((a, b) => b[1] - a[1])[0][0];
  });

  const kategoriSummary = createMemo(() => {
    const summary = {};
    expenses().forEach((e) => {
      summary[e.kategori] = (summary[e.kategori] || 0) + e.harga;
    });
    return summary;
  });

  const percent = (amount) => {
    const t = total();
    if (!t) return 0;
    return Math.round((amount / t) * 100);
  };

  const recent = createMemo(() => expenses().slice(0, 5));

  return (
    <div class="min-h-screen bg-[#f3f3f0]">
      <DashboardNavbar />

      <main class="max-w-6xl mx-auto px-10 py-10">
        <div class="flex items-center justify-between mb-10">
          <div>
            <h1 class="text-4xl font-bold text-[#1a1a2e]">Dashboard</h1>
            <p class="text-gray-500 mt-2">
              Halo {user()?.username}, pantau pengeluaranmu dengan lebih mudah
            </p>
          </div>

          <A
            href="/expense"
            class="bg-[#1baa6a] text-white font-semibold px-5 py-3 rounded-xl shadow transition-colors"
          >
            + Catat Pengeluaran
          </A>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-2xl p-6 shadow-md">
            <p class="text-gray-500 text-sm">Total Pengeluaran</p>
            <h2 class="text-2xl font-bold text-[#1a1a2e] mt-2">
              {loading() ? "..." : formatRupiah(total())}
            </h2>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-md">
            <p class="text-gray-500 text-sm">Bulan Ini</p>
            <h2 class="text-2xl font-bold text-[#1a1a2e] mt-2">
              {loading() ? "..." : formatRupiah(bulanIni())}
            </h2>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-md">
            <p class="text-gray-500 text-sm">Jumlah Transaksi</p>
            <h2 class="text-2xl font-bold text-[#1a1a2e] mt-2">
              {loading() ? "..." : expenses().length}
            </h2>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-md">
            <p class="text-gray-500 text-sm">Kategori Terbesar</p>
            <h2 class="text-2xl font-bold text-[#1a1a2e] mt-2">
              {loading() ? "..." : kategoriTerbesar()}
            </h2>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md min-h-[320px]">
            <h2 class="text-xl font-bold text-[#1a1a2e] mb-4">Transaksi Terbaru</h2>

            <Show
              when={!loading()}
              fallback={<p class="text-gray-400">Memuat...</p>}
            >
              <Show
                when={recent().length > 0}
                fallback={<p class="text-gray-400">Belum ada transaksi</p>}
              >
                <div class="space-y-4">
                  <For each={recent()}>
                    {(exp) => (
                      <div class="flex items-center justify-between border-b pb-3">
                        <div>
                          <p class="font-semibold text-[#1a1a2e]">{exp.nama}</p>
                          <p class="text-sm text-gray-500">{formatTanggal(exp.tanggal)}</p>
                        </div>
                        <p class="font-bold text-[#1a1a2e]">{formatRupiah(exp.harga)}</p>
                      </div>
                    )}
                  </For>
                </div>
              </Show>
            </Show>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-md min-h-[320px]">
            <h2 class="text-xl font-bold text-[#1a1a2e] mb-4">Per Kategori</h2>

            <Show
              when={Object.keys(kategoriSummary()).length > 0}
              fallback={<p class="text-gray-400">Belum ada data</p>}
            >
              <div class="space-y-4">
                <For each={Object.entries(kategoriSummary())}>
                  {([kat, amount]) => (
                    <div>
                      <div class="flex justify-between text-sm mb-1">
                        <span>{kat}</span>
                        <span>{percent(amount)}%</span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-3">
                        <div
                          class="bg-[#1baa6a] h-3 rounded-full"
                          style={{ width: `${percent(amount)}%` }}
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
