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
