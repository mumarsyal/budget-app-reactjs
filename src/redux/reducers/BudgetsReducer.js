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
      const newState = { ...state, budgets: updatedBudgets };
      return newState;
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

export default budgetsReducer;
