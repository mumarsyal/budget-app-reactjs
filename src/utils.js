export const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: "usd",
  style: "currency",
  minimumFractionDigits: 0,
});

export const getBudgetExpenses = (expenses, budgetId) => {
  return expenses.filter((expense) => expense.budgetId === budgetId);
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("budgetsState");
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {};
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("budgetsState", serializedState);
  } catch {
    // ignore write errors
  }
};
