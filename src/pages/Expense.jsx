import { createSignal, createMemo, For, Show, onMount } from "solid-js";
import DashboardNavbar from "../components/DashboardNavbar";
import ExpenseForm from "../components/ExpenseForm";
import { apiFetch } from "../lib/api";

const KATEGORI_LIST = [
  "Semua",
  "Makanan",
  "Transportasi",
  "Hiburan",
  "Belanja",
  "Pendidikan",
  "Kesehatan",
  "Lainnya",
];

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
  const [showForm, setShowForm] = createSignal(false);
  const [loading, setLoading] = createSignal(true);
  const [saving, setSaving] = createSignal(false);
  const [error, setError] = createSignal("");

  const [search, setSearch] = createSignal("");
  const [filterKategori, setFilterKategori] = createSignal("Semua");
  const [dateFrom, setDateFrom] = createSignal("");
  const [dateTo, setDateTo] = createSignal("");

  const loadExpenses = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch("/api/expenses");
      setExpenses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  onMount(loadExpenses);

  const filteredExpenses = createMemo(() => {
    return expenses().filter((exp) => {
      const matchSearch = exp.nama.toLowerCase().includes(search().toLowerCase());
      const matchKategori = filterKategori() === "Semua" || exp.kategori === filterKategori();

      let matchDate = true;
      if (dateFrom()) matchDate = matchDate && exp.tanggal >= dateFrom();
      if (dateTo()) matchDate = matchDate && exp.tanggal <= dateTo();

      return matchSearch && matchKategori && matchDate;
    });
  });

  const totalPengeluaran = createMemo(() => {
    return filteredExpenses().reduce((sum, exp) => sum + exp.harga, 0);
  });

  const rataRata = createMemo(() => {
    const list = filteredExpenses();
    if (!list.length) return 0;
    return Math.round(totalPengeluaran() / list.length);
  });

  const kategoriTerbanyak = createMemo(() => {
    const summary = {};
    filteredExpenses().forEach((exp) => {
      summary[exp.kategori] = (summary[exp.kategori] || 0) + exp.harga;
    });
    const entries = Object.entries(summary);
    if (!entries.length) return "-";
    return entries.sort((a, b) => b[1] - a[1])[0][0];
  });

  const kategoriSummary = createMemo(() => {
    const summary = {};
    filteredExpenses().forEach((exp) => {
      if (!summary[exp.kategori]) summary[exp.kategori] = 0;
      summary[exp.kategori] += exp.harga;
    });
    return summary;
  });

  const kategoriPercent = (amount) => {
    const total = totalPengeluaran();
    if (!total) return 0;
    return Math.round((amount / total) * 100);
  };

  const handleResetFilter = () => {
    setSearch("");
    setFilterKategori("Semua");
    setDateFrom("");
    setDateTo("");
  };

  const handleSaveExpense = async (payload) => {
    setSaving(true);
    try {
      const created = await apiFetch("/api/expenses", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setExpenses((prev) => [created, ...prev]);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div class="min-h-screen bg-[#f3f3f0]">
      <div classList={{ "blur-sm pointer-events-none select-none": showForm() }}>
        <DashboardNavbar />

        <main class="max-w-6xl mx-auto px-10 py-10">
          <div class="flex items-center justify-between mb-10">
            <div>
              <h1 class="text-4xl font-bold text-[#1a1a2e]">Pengeluaran</h1>
              <p class="text-gray-500 mt-2">Kelola dan pantau semua pengeluaranmu</p>
            </div>

            <button
              onClick={() => setShowForm(true)}
              class="bg-[#1baa6a] text-white font-semibold px-5 py-3 rounded-xl shadow cursor-pointer"
            >
              + Tambah Pengeluaran
            </button>
          </div>

          <Show when={error()}>
            <p class="mb-6 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {error()}
            </p>
          </Show>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="bg-white rounded-2xl p-6 shadow-md">
              <p class="text-gray-500 text-sm">Total Pengeluaran</p>
              <h2 class="text-2xl font-bold text-[#1a1a2e] mt-2">
                {formatRupiah(totalPengeluaran())}
              </h2>
            </div>

            <div class="bg-white rounded-2xl p-6 shadow-md">
              <p class="text-gray-500 text-sm">Jumlah Transaksi</p>
              <h2 class="text-2xl font-bold text-[#1a1a2e] mt-2">{filteredExpenses().length}</h2>
            </div>

            <div class="bg-white rounded-2xl p-6 shadow-md">
              <p class="text-gray-500 text-sm">Rata-rata / Transaksi</p>
              <h2 class="text-2xl font-bold text-[#1a1a2e] mt-2">{formatRupiah(rataRata())}</h2>
            </div>

            <div class="bg-white rounded-2xl p-6 shadow-md">
              <p class="text-gray-500 text-sm">Kategori Terbanyak</p>
              <h2 class="text-2xl font-bold text-[#1a1a2e] mt-2">{kategoriTerbanyak()}</h2>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-md mb-8">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-[#1a1a2e]">Filter</h2>
              <button
                onClick={handleResetFilter}
                class="text-sm text-[#1baa6a] font-medium cursor-pointer"
              >
                Reset Filter
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Cari Pengeluaran</label>
                <input
                  type="text"
                  placeholder="Ketik nama pengeluaran..."
                  value={search()}
                  onInput={(e) => setSearch(e.target.value)}
                  class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Kategori</label>
                <select
                  value={filterKategori()}
                  onChange={(e) => setFilterKategori(e.target.value)}
                  class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none"
                >
                  <For each={KATEGORI_LIST}>{(kat) => <option value={kat}>{kat}</option>}</For>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Dari Tanggal</label>
                <input
                  type="date"
                  value={dateFrom()}
                  onInput={(e) => setDateFrom(e.target.value)}
                  class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Sampai Tanggal</label>
                <input
                  type="date"
                  value={dateTo()}
                  onInput={(e) => setDateTo(e.target.value)}
                  class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md min-h-[320px]">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold text-[#1a1a2e]">Daftar Pengeluaran</h2>
                <span class="text-sm text-gray-500">{filteredExpenses().length} transaksi</span>
              </div>

              <Show
                when={!loading()}
                fallback={<p class="text-gray-400 text-center py-16">Memuat data...</p>}
              >
                <Show
                  when={filteredExpenses().length > 0}
                  fallback={
                    <div class="flex items-center justify-center h-48">
                      <p class="text-gray-400 text-lg">Tidak ada pengeluaran ditemukan</p>
                    </div>
                  }
                >
                  <div class="space-y-4">
                    <For each={filteredExpenses()}>
                      {(exp) => (
                        <div class="flex items-center justify-between border-b pb-3">
                          <div>
                            <p class="font-semibold text-[#1a1a2e]">{exp.nama}</p>
                            <p class="text-sm text-gray-500">
                              {formatTanggal(exp.tanggal)} · {exp.kategori}
                            </p>
                          </div>
                          <p class="font-bold text-[#1a1a2e]">{formatRupiah(exp.harga)}</p>
                        </div>
                      )}
                    </For>
                  </div>
                </Show>
              </Show>

              <div class="mt-6 pt-4 border-t-2 border-gray-200 flex items-center justify-between">
                <p class="text-lg font-bold text-[#1a1a2e]">Total Pengeluaran</p>
                <p class="text-xl font-bold text-[#1baa6a]">{formatRupiah(totalPengeluaran())}</p>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-6 shadow-md min-h-[320px]">
              <h2 class="text-xl font-bold text-[#1a1a2e] mb-4">Per Kategori</h2>

              <Show
                when={Object.keys(kategoriSummary()).length > 0}
                fallback={
                  <div class="flex items-center justify-center h-48">
                    <p class="text-gray-400">Belum ada data</p>
                  </div>
                }
              >
                <div class="space-y-4">
                  <For each={Object.entries(kategoriSummary())}>
                    {([kat, amount]) => (
                      <div>
                        <div class="flex justify-between text-sm mb-1">
                          <span>{kat}</span>
                          <span>{kategoriPercent(amount)}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                          <div
                            class="bg-[#1baa6a] h-3 rounded-full"
                            style={{ width: `${kategoriPercent(amount)}%` }}
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

      <Show when={showForm()}>
        <div class="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <ExpenseForm
            loading={saving()}
            onSave={handleSaveExpense}
            onCancel={() => setShowForm(false)}
          />
        </div>
      </Show>
    </div>
  );
};
