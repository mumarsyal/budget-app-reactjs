import React, { useContext, useState } from "react";
import { v4 } from "uuid";

const BudgetsContext = React.createContext({
  title: "",
  amountSpent: null,
  max: null,
});

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

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
