import { connect } from "react-redux";

import { getBudgetExpenses, UNCATEGORIZED_BUDGET_ID } from "../../utils/utils";
import BudgetCard from "./BudgetCard";

function UncategorizedBudgetCard(props) {
  const amount = getBudgetExpenses(
    props.expenses,
    UNCATEGORIZED_BUDGET_ID
  ).reduce((total, expense) => total + expense.amount, 0);

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

// Mapping the component's props to the reducer's state
const mapStateToProps = (state) => ({
  budgets: state.budgetsReducer.budgets,
  expenses: state.budgetsReducer.expenses,
});

// mapping action and store the function via props
export default connect(mapStateToProps)(UncategorizedBudgetCard);
