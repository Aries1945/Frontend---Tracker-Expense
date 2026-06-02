import { createSignal } from "solid-js";

function loadUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

const [user, setUser] = createSignal(loadUser());
const [token, setToken] = createSignal(localStorage.getItem("token") || "");

export const isLoggedIn = () => Boolean(token());

export function loginSuccess(data) {
  setToken(data.token);
  setUser(data.user);
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
}

export async function logout() {
  const currentToken = token();
  if (currentToken) {
    try {
      await fetch("/api/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${currentToken}` },
      });
    } catch {
      // abaikan jika server mati
    }
  }

  setToken("");
  setUser(null);
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export { user, token };
