import actionTypes from "./actionTypes";

export const addBudget = (data) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.ADD_BUDGET, data: data });
  };
};

export const deleteBudget = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_BUDGET, id: id });
  };
};

export const getBudgetExpenses = (budgetId) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_BUDGET_EXPENSES, budgetId: budgetId });
  };
};

export const getBudgetExpenseList = (budgetId) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_BUDGET_EXPENSE_LIST, budgetId: budgetId });
  };
};

const actions = {
  addBudget,
};

export default actions;
