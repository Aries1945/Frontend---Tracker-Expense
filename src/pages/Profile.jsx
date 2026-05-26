import DashboardNavbar from "../components/DashboardNavbar";

export default () => {
  return (
    <div class="min-h-screen bg-[#f3f3f0]">
      <DashboardNavbar />

      <main class="max-w-5xl mx-auto px-10 py-10">
        
        {/* Header */}
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-[#1a1a2e]">
            Profile
          </h1>

          <p class="text-gray-500 mt-2">
            Kelola informasi akunmu
          </p>
        </div>

        {/* Card Profile */}
        <div class="bg-white rounded-3xl shadow-md p-10 border border-gray-100">
          
          <div class="flex flex-col md:flex-row gap-10">
            
            {/* Foto */}
            <div class="flex justify-center">
              <div class="w-36 h-36 rounded-full bg-[#d9d9d9] flex items-center justify-center text-[#1a1a2e] font-semibold text-center shadow-inner">
                Foto Profile
              </div>
            </div>

            {/* Form */}
            <div class="flex-1 space-y-6">
              
              <div>
                <label class="block text-sm font-semibold text-[#1a1a2e] mb-2">
                  Nama
                </label>

                <input
                  type="text"
                  value="Ivory Iverson"
                  class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1baa6a]"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-[#1a1a2e] mb-2">
                  Email
                </label>

                <input
                  type="email"
                  value="ivory@example.com"
                  class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1baa6a]"
                />
              </div>

              {/* Button */}
              <div class="flex justify-end gap-4 pt-4">
                
                <button class="px-5 py-2.5 rounded-xl border border-gray-300 text-[#1a1a2e] font-medium">
                  Edit
                </button>

                <button class="px-5 py-2.5 rounded-xl bg-[#1baa6a]  text-white font-medium transition-colors shadow">
                  Save
                </button>

              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
};