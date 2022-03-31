import actionTypes from "./actionTypes";

export const addExpense = (data) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.ADD_EXPENSE, data: data });
  };
};

export const deleteExpense = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_EXPENSE, id: id });
  };
};

const actions = {
  addExpense,
};

export default actions;
