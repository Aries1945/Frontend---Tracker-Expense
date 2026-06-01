import { Router, Route, Navigate } from "@solidjs/router";
import { ErrorBoundary } from "solid-js";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Expense from "./pages/Expense";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

function ProtectedRoute(props) {
  const isLoggedIn = !!localStorage.getItem("spendly_session");
  if (!isLoggedIn) return <Navigate href="/login" />;
  return props.children;
}

const App = () => {
  return (
    <ErrorBoundary
      fallback={(error, reset) => (
        <div class="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#f5f5f0]">
          <p class="text-red-600 font-semibold">Terjadi kesalahan: {error.message}</p>
          <button
            onClick={reset}
            class="bg-[#1baa6a] text-white px-4 py-2 rounded-xl font-medium"
          >
            Coba lagi
          </button>
        </div>
      )}
    >
      <Router>
        <Route path="/" component={LandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route
          path="/dashboard"
          component={() => (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/expense"
          component={() => (
            <ProtectedRoute>
              <Expense />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/profile"
          component={() => (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          )}
        />
        <Route path="*" component={NotFound} />
      </Router>
    </ErrorBoundary>
  );
};

export default App;
