import { A } from "@solidjs/router";

export default () => {
  return (
    <>
      <nav className="w-full flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white shadow-sm">
        <div className="text-xl font-extrabold text-blue-600">Logo</div>
        <A href="/" className="hover:text-blue-600 transition-colors">Beranda</A>
        <div className="flex items-center space-x-6">
            <A href="/login" className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg  shadow-md">Masuk</A>
            <A href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg  shadow-md">Daftar</A>
        </div>
      </nav>

      <main className="min-h-200 bg-gray-50 flex flex-col items-center justify-center p-6">
        
        <div className="mb-8 text-center">
          <div className="text-4xl font-extrabold text-blue-600 mb-3">Logo</div>
          <h1 className="text-3xl font-bold text-gray-900">Masuk ke akun</h1>
        </div>

        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 border border-gray-100">
          <form className="space-y-6">
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 transition-all outline-none"
                placeholder="Masukkan username"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 transition-all outline-none"
                placeholder="Masukkan password"
              />
            </div>

            <button 
              type="button" 
              className="w-full bg-blue-600 text-white font-bold text-lg py-3 rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md mt-4"
            >
              Masuk
            </button>
          </form>

          <div className="mt-8 text-center text-gray-600 text-sm">
            Belum punya akun?{' '}
            <A href="/register" className="text-blue-600 font-semibold hover:text-blue-800 hover:underline transition-all">
              Daftar di sini
            </A>
          </div>
        </div>
      </main>
    </>
  )
};
