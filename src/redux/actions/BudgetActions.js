import actionTypes from "./actionTypes";

export const addBudget = (data) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.ADD_BUDGET, data: data });
  };
};

export const getBudgetExpenses = (budgetId) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_BUDGET_EXPENSES, budgetId: budgetId });
  };
};

const actions = {
  addBudget,
};

export default actions;
