export const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: "usd",
  style: "currency",
  minimumFractionDigits: 0,
});

export const getBudgetExpenses = (expenses, budgetId) => {
  return expenses.filter((expense) => expense.budgetId === budgetId);
};
