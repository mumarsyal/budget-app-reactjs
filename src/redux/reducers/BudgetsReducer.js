import { v4 } from "uuid";

import { UNCATEGORIZED_BUDGET_ID } from "../../utils";
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
  const expenses = state.expenses.map((expense) => {
    if (expense.budgetId !== id) return expense;
    return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
  });

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

export default budgetsReducer;
