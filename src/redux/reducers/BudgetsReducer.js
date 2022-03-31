import { v4 } from "uuid";

import actionTypes from "../actions/actionTypes";

const initialState = {
  budgets: [],
  expenses: [],
};

const budgetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_BUDGET:
      const updatedBudgets = addBudget(state.budgets, { ...action.data });
      return { ...state, budgets: updatedBudgets };
    case actionTypes.DELETE_BUDGET:
      return deleteBudget({ ...state }, action.id);
    case actionTypes.ADD_EXPENSE:
      const updatedExpenses = addExpense(state.expenses, { ...action.data });
      return { ...state, expenses: updatedExpenses };
    case actionTypes.DELETE_EXPENSE:
      return deleteExpense({ ...state }, action.id);
    case actionTypes.GET_BUDGET_EXPENSES:
      return getBudgetExpenses({ ...state }, action.budgetId);
    case actionTypes.GET_BUDGET_EXPENSE_LIST:
      return getBudgetExpensesList({ ...state }, action.budgetId);
    default:
      return state;
  }
};

function addBudget(prevBudgets, newBudget) {
  if (
    prevBudgets.find(
      (budget) => budget.title.toLowerCase() === newBudget.title.toLowerCase()
    )
  ) {
    return prevBudgets;
  }
  return [
    ...prevBudgets,
    {
      id: v4(),
      title: newBudget.title,
      max: newBudget.max,
    },
  ];
}

function deleteBudget(state, id) {
  const expenses = state.expenses.filter((expense) => expense.budgetId !== id);
  const budgets = state.budgets.filter((budget) => budget.id !== id);

  return { ...state, budgets: [...budgets], expenses: [...expenses] };
}

function addExpense(prevExpenses, { budgetId, amount, description }) {
  return [
    ...prevExpenses,
    {
      id: v4(),
      budgetId: budgetId,
      amount: amount,
      description: description,
    },
  ];
}

function deleteExpense(state, id) {
  const expenses = state.expenses.filter((expense) => expense.id !== id);

  return { ...state, expenses: [...expenses] };
}

function getBudgetExpenses(state, budgetId) {
  const budgetExpenses = state.expenses
    .filter((expense) => expense.budgetId === budgetId)
    .reduce((total, expense) => total + expense.amount, 0);
  const budgetIndex = state.budgets.findIndex(
    (budget) => budget.id === budgetId
  );
  if (budgetIndex >= 0) {
    state.budgets[budgetIndex].expenses = budgetExpenses;
  }
  return state;
}

function getBudgetExpensesList(state, budgetId) {
  const budgetExpenses = state.expenses
    .filter((expense) => expense.budgetId === budgetId);
  const budgetIndex = state.budgets.findIndex(
    (budget) => budget.id === budgetId
  );
  if (budgetIndex >= 0) {
    state.budgets[budgetIndex].expenseList = budgetExpenses;
  }
  return state;
}

export default budgetsReducer;
