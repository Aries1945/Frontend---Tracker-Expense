import { Router, Route } from "@solidjs/router";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Expense from "./pages/Expense";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

const App = () => {
  return (
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
  );
};

export default App;
