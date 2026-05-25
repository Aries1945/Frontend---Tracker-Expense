import { createSignal } from 'solid-js';

const ExpenseForm = (props) => {
  // Menentukan mode berdasarkan props (default: 'add')
  const isEdit = () => props.mode === 'edit';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.onSave) props.onSave();
  };

  return (
    <div 
      class={`max-w-md bg-white rounded-lg p-6 shadow-md`}
    >
      {/* Form Header Title */}
      <h2 class="text-xl font-semibold text-gray-800 mb-6">
        {isEdit() ? 'Ubah pengeluaran' : 'Tambah pengeluaran'}
      </h2>

      <form onSubmit={handleSubmit} class="space-y-4">
        {/* Nama Pengeluaran */}
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Nama pengeluaran
          </label>
          <input
            type="text"
            class="w-full px-4 py-3 bg-gray-200 border border-transparent rounded-full focus:outline-none focus:bg-gray-100 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Nominal & Tanggal */}
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nominal
            </label>
            <input
              type="number"
              class="w-full px-4 py-3 bg-gray-200 border border-transparent rounded-full focus:outline-none focus:bg-gray-100 focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Tanggal
            </label>
            <input
              type="date"
              class="w-full px-4 py-3 bg-gray-200 border border-transparent rounded-full focus:outline-none focus:bg-gray-100 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Kategori */}
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Kategori
          </label>
          <input
            type="text"
            class="w-full px-4 py-3 bg-gray-200 border border-transparent rounded-full focus:outline-none focus:bg-gray-100 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Action Buttons */}
        <div class="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={props.onCancel}
            class="px-6 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 active:scale-95 transition-all"
          >
            batal
          </button>
          <button
            type="submit"
            class="px-6 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 active:scale-95 transition-all"
          >
            simpan
          </button>
          
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
