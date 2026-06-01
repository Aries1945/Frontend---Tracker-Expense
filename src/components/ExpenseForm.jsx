import { createSignal } from "solid-js";

const KATEGORI_LIST = [
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

  const [nama, setNama] = createSignal(props.data?.nama || "");
  const [harga, setHarga] = createSignal(props.data?.harga || "");
  const [tanggal, setTanggal] = createSignal(props.data?.tanggal || "");
  const [kategori, setKategori] = createSignal(props.data?.kategori || KATEGORI_LIST[0]);

  function handleSubmit(e) {
    e.preventDefault();
    if (props.onSave) {
      props.onSave({
        nama: nama(),
        harga: Number(harga()),
        tanggal: tanggal(),
        kategori: kategori(),
      });
    }
  }

  return (
    <div class="max-w-md bg-white rounded-lg p-6 shadow-md">
      <h2 class="text-xl font-semibold text-gray-800 mb-6">
        {isEdit() ? "Ubah pengeluaran" : "Tambah pengeluaran"}
      </h2>

      <form onSubmit={handleSubmit} class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Nama pengeluaran
          </label>
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
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nominal
            </label>
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
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Tanggal
            </label>
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
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Kategori
          </label>
          <select
            value={kategori()}
            onChange={(e) => setKategori(e.target.value)}
            class="w-full px-4 py-3 bg-gray-200 border border-transparent rounded-full focus:outline-none focus:bg-gray-100 focus:border-blue-500 transition-colors"
          >
            {KATEGORI_LIST.map((k) => (
              <option value={k}>{k}</option>
            ))}
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
            class="px-6 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 active:scale-95 transition-all"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
