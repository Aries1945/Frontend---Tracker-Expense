import { createContext, createSignal, useContext } from "solid-js";
import {
  login as authLogin,
  logout as authLogout,
  register as authRegister,
  getCurrentUser,
  updateUser as authUpdateUser,
} from "../utils/auth";

const AuthContext = createContext();

export function AuthProvider(props) {
  const [user, setUser] = createSignal(getCurrentUser());

  async function login(username, password) {
    const result = await authLogin(username, password);
    if (result.success) {
      setUser(getCurrentUser());
    }
    return result;
  }

  function logout() {
    authLogout();
    setUser(null);
  }

  async function register(username, email, password) {
    return await authRegister(username, email, password);
  }

  async function updateUser(newUsername, newEmail) {
    const result = await authUpdateUser(user().username, newUsername, newEmail);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
