import { connect } from "react-redux";

import BudgetCard from "./BudgetCard";

function TotalBudgetCard(props) {
  const max = props.budgets.reduce((total, budget) => total + budget.max, 0);
  const amountSpent = props.expenses.reduce(
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

// Mapping the component's props to the reducer's state
const mapStateToProps = (state) => ({
  budgets: state.budgetsReducer.budgets,
  expenses: state.budgetsReducer.expenses,
});

// mapping action and store the function via props
export default connect(mapStateToProps)(TotalBudgetCard);