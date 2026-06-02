import { createSignal, For } from "solid-js";

const KATEGORI_OPTIONS = [
  "Makanan",
  "Transportasi",
  "Hiburan",
  "Belanja",
  "Pendidikan",
  "Kesehatan",
  "Lainnya",
];

const ExpenseForm = (props) => {
  const isEdit = () => props.mode === "edit";
  const [nama, setNama] = createSignal("");
  const [harga, setHarga] = createSignal("");
  const [tanggal, setTanggal] = createSignal("");
  const [kategori, setKategori] = createSignal("Makanan");
  const [error, setError] = createSignal("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const amount = Number(harga());
    if (!nama().trim()) {
      setError("Nama pengeluaran wajib diisi");
      return;
    }
    if (!amount || amount <= 0) {
      setError("Nominal harus lebih dari 0");
      return;
    }
    if (!tanggal()) {
      setError("Tanggal wajib diisi");
      return;
    }

    props.onSave?.({
      nama: nama().trim(),
      kategori: kategori(),
      harga: amount,
      tanggal: tanggal(),
    });
  };

  return (
    <div class="max-w-md bg-white rounded-lg p-6 shadow-md">
      <h2 class="text-xl font-semibold text-gray-800 mb-6">
        {isEdit() ? "Ubah pengeluaran" : "Tambah pengeluaran"}
      </h2>

      <form onSubmit={handleSubmit} class="space-y-4">
        {error() && (
          <p class="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error()}
          </p>
        )}

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama pengeluaran</label>
          <input
            type="text"
            required
            value={nama()}
            onInput={(e) => setNama(e.target.value)}
            class="w-full px-4 py-3 bg-gray-200 border border-transparent rounded-full focus:outline-none focus:bg-gray-100 focus:border-blue-500 transition-colors"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nominal</label>
            <input
              type="number"
              required
              min="1"
              value={harga()}
              onInput={(e) => setHarga(e.target.value)}
              class="w-full px-4 py-3 bg-gray-200 border border-transparent rounded-full focus:outline-none focus:bg-gray-100 focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
            <input
              type="date"
              required
              value={tanggal()}
              onInput={(e) => setTanggal(e.target.value)}
              class="w-full px-4 py-3 bg-gray-200 border border-transparent rounded-full focus:outline-none focus:bg-gray-100 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
          <select
            value={kategori()}
            onChange={(e) => setKategori(e.target.value)}
            class="w-full px-4 py-3 bg-gray-200 border border-transparent rounded-full focus:outline-none focus:bg-gray-100 focus:border-blue-500 transition-colors"
          >
            <For each={KATEGORI_OPTIONS}>{(kat) => <option value={kat}>{kat}</option>}</For>
          </select>
        </div>

        <div class="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={props.onCancel}
            class="px-6 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 active:scale-95 transition-all"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={props.loading}
            class="px-6 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 active:scale-95 transition-all disabled:opacity-60"
          >
            {props.loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
