import actionTypes from "./actionTypes";

export const addExpense = (data) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.ADD_EXPENSE, data: data });
  };
};

const actions = {
  addExpense,
};

export default actions;
