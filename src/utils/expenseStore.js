const key = (username) => `spendly_expenses_${username}`;

export function getExpenses(username) {
  return JSON.parse(localStorage.getItem(key(username)) || "[]");
}

export function addExpense(username, expense) {
  const list = getExpenses(username);
  const item = { ...expense, id: Date.now() };
  list.push(item);
  localStorage.setItem(key(username), JSON.stringify(list));
  return item;
}

export function deleteExpense(username, id) {
  const list = getExpenses(username).filter((e) => e.id !== id);
  localStorage.setItem(key(username), JSON.stringify(list));
  return list;
}
