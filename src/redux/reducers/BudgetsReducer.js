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
    case actionTypes.ADD_EXPENSE:
      const updatedExpenses = addExpense(state.expenses, { ...action.data });
      return { ...state, expenses: updatedExpenses };
    case actionTypes.GET_BUDGET_EXPENSES:
      return getBudgetExpenses({ ...state }, action.budgetId);
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

export default budgetsReducer;
