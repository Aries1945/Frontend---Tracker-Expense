const USERS_KEY = "spendly_users";
const SESSION_KEY = "spendly_session";

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

export function register(username, email, password) {
  const users = getUsers();
  if (users.find((u) => u.username === username)) {
    return { error: "Username sudah digunakan." };
  }
  if (users.find((u) => u.email === email)) {
    return { error: "Email sudah digunakan." };
  }
  const newUser = { username, email, password };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { success: true };
}

export function login(username, password) {
  const users = getUsers();
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return { error: "Username atau password salah." };
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify({ username: user.username, email: user.email }));
  return { success: true };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
}

export function updateUser(oldUsername, newUsername, newEmail) {
  const users = getUsers();
  const idx = users.findIndex((u) => u.username === oldUsername);
  if (idx === -1) return { error: "User tidak ditemukan." };

  if (newUsername !== oldUsername && users.find((u) => u.username === newUsername)) {
    return { error: "Username sudah digunakan." };
  }

  users[idx] = { ...users[idx], username: newUsername, email: newEmail };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  // Migrasi data expense jika username berubah
  if (newUsername !== oldUsername) {
    const oldKey = `spendly_expenses_${oldUsername}`;
    const newKey = `spendly_expenses_${newUsername}`;
    const data = localStorage.getItem(oldKey);
    if (data) {
      localStorage.setItem(newKey, data);
      localStorage.removeItem(oldKey);
    }
  }

  const updated = { username: newUsername, email: newEmail };
  localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
  return { success: true, user: updated };
}
