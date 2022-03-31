import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

function UncategorizedBudgetCard(props) {
  const { getBudgetExpenses } = useBudgets();

  // const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
  //   (total, expense) => total + expense.amount,
  //   0
  // );
  const amount = 100;

  if (!amount) return null;

  return (
    <BudgetCard
      amountSpent={amount}
      title="Uncategorized"
      gray
      {...props}
    ></BudgetCard>
  );
}

export default UncategorizedBudgetCard;
