import actionTypes from "./actionTypes";

export const addBudget = (data) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.ADD_BUDGET, data: data });
  };
};

const actions = {
  addBudget,
};

export default actions;
