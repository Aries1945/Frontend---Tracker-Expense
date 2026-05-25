import { A, Router, Route } from "@solidjs/router";

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Expense from './pages/Expense';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <>
      <Router>
        <Route path="/" component={LandingPage}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/expense" component={Expense}/>
        <Route path="*" component={NotFound}/>
      </Router>
    </>
  );
};

export default App;
