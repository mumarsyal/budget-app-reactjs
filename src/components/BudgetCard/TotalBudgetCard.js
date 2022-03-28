import { useBudgets } from "../../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

function TotalBudgetCard() {
  const { budgets, expenses } = useBudgets();

  const max = budgets.reduce((total, budget) => total + budget.max, 0);
  const amountSpent = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  if (!max) return null;

  return (
    <BudgetCard
      amountSpent={amountSpent}
      max={max}
      title="Total"
      gray
    ></BudgetCard>
  );
}

export default TotalBudgetCard;
