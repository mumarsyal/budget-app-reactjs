import { Col, Container, Row } from "react-bootstrap";

import BudgetCard from "../BudgetCard/BudgetCard";
import TotalBudgetCard from "../BudgetCard/TotalBudgetCard";
import UncategorizedBudgetCard from "../BudgetCard/UncategorizedBudgetCard";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../../contexts/BudgetsContext";
import { connect } from "react-redux";
import { BudgetActions } from "../../redux/actions";

function BudgetList(props) {
  const { budgets, getBudgetExpenses } = useBudgets();

  return (
    <Container>
      <Row>
        {props.budgets.map((budget) => {
          // const amountSpent = getBudgetExpenses(budget.id).reduce(
          //   (total, expense) => total + expense.amount,
          //   0
          // );
          props.getBudgetExpenses(budget.id);
          return (
            <Col lg={6} key={budget.id}>
              <BudgetCard
                id={budget.id}
                title={budget.title}
                max={budget.max}
                amountSpent={budget.expenses}
                // onAddExpense={() => openAddExpenseModalBudgetId(budget.id)}
                // onViewExpenses={() => setViewExpensesModalBudgetId(budget.id)}
                showButtons={true}
              ></BudgetCard>
            </Col>
          );
        })}
        {props.budgets.findIndex(
          (budget) => budget.id === UNCATEGORIZED_BUDGET_ID
        ) >= 0 && (
          <Col lg={6}>
            <UncategorizedBudgetCard
              id={UNCATEGORIZED_BUDGET_ID}
              // onAddExpense={() => openAddExpenseModalBudgetId()}
              // onViewExpenses={() =>
              //   setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
              // }
              showButtons={true}
            ></UncategorizedBudgetCard>
          </Col>
        )}
        <Col lg={6}>
          <TotalBudgetCard></TotalBudgetCard>
        </Col>
      </Row>
    </Container>
  );
}

// Mapping the component's props to the reducer's state
const mapStateToProps = (state) => ({
  budgets: state.budgetsReducer.budgets,
});

// Mapping the component's props to the related actions
const mapDispatchToProps = (dispatch) => ({
  getBudgetExpenses: (budgetId) =>
    dispatch(BudgetActions.getBudgetExpenses(budgetId)),
});

// mapping action and store the function via props
export default connect(mapStateToProps, mapDispatchToProps)(BudgetList);
