import React, { useContext } from "react";
import { v4 } from "uuid";

import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = React.createContext({
  budgets: [],
  expenses: [],
  addBudget: () => {},
  deleteBudget: () => {},
  addExpense: () => {},
  deleteExpense: () => {},
  getBudgetExpenses: () => {},
});

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  function addBudget({ title, max }) {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.title === title)) {
        return prevBudgets;
      }
      return [
        ...prevBudgets,
        {
          id: v4(),
          title: title,
          max: max,
        },
      ];
    });
  }

  function deleteBudget(id) {
    setBudgets(prevBudgets => {
      return prevBudgets.filter(budget => budget.id !== id);
    });
  }

  function addExpense({ budgetId, amount, description }) {
    setExpenses((prevExpenses) => [
      ...prevExpenses,
      {
        id: v4(),
        budgetId: budgetId,
        amount: amount,
        description: description,
      },
    ]);
  }

  function deleteExpense(id) {
    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== id);
    });
  }

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        addBudget,
        deleteBudget,
        addExpense,
        deleteExpense,
        getBudgetExpenses,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
