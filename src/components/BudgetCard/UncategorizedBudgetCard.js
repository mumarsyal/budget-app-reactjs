import { connect } from "react-redux";

import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../../contexts/BudgetsContext";
import { BudgetActions } from "../../redux/actions";
import BudgetCard from "./BudgetCard";

function UncategorizedBudgetCard(props) {
  const { getBudgetExpenses } = useBudgets();

  // const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
  //   (total, expense) => total + expense.amount,
  //   0
  // );
  props.getBudgetExpenses(UNCATEGORIZED_BUDGET_ID);
  const amount = props.budgets.find(budget => budget.id === UNCATEGORIZED_BUDGET_ID).expenses;

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
});

// Mapping the component's props to the related actions
const mapDispatchToProps = (dispatch) => ({
  getBudgetExpenses: (budgetId) => dispatch(BudgetActions.getBudgetExpenses(budgetId)),
});

// mapping action and store the function via props
export default connect(mapStateToProps, mapDispatchToProps)(UncategorizedBudgetCard);
