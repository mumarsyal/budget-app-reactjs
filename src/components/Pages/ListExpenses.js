import { Button, Container, Stack } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { BudgetActions, ExpenseActions } from "../../redux/actions";
import ExpensesTable from "../ExpensesTable";
import { getBudgetExpenses, UNCATEGORIZED_BUDGET_ID } from "../../utils/utils";

function ListExpenses(props) {
  const navigate = useNavigate();
  const routeParams = useParams();

  const curBudget =
    UNCATEGORIZED_BUDGET_ID === routeParams.budgetId
      ? { title: UNCATEGORIZED_BUDGET_ID, id: UNCATEGORIZED_BUDGET_ID }
      : props.budgets.find((budget) => budget.id === routeParams.budgetId);

  const expenses = getBudgetExpenses(props.expenses, routeParams.budgetId);

  return (
    <Container>
      <h3 className="mt-3">
        <Stack direction="horizontal" gap={2}>
          <div>Expenses - {curBudget?.title}</div>
          {routeParams.budgetId !== UNCATEGORIZED_BUDGET_ID && (
            <Button
              className="ms-auto"
              variant="outline-danger"
              onClick={() => {
                props.deleteBudget(routeParams.budgetId);
                navigate("/");
              }}
            >
              Delete
            </Button>
          )}
        </Stack>
      </h3>
      <ExpensesTable
        expenses={expenses}
        deleteExpense={(id) => props.deleteExpense(id)}
      ></ExpensesTable>
    </Container>
  );
}

// Mapping the component's props to the reducer's state
const mapStateToProps = (state) => ({
  budgets: state.budgetsReducer.budgets,
  expenses: state.budgetsReducer.expenses,
});

// Mapping the component's props to the related actions
const mapDispatchToProps = (dispatch) => ({
  deleteBudget: (budgetId) => dispatch(BudgetActions.deleteBudget(budgetId)),
  deleteExpense: (expenseId) =>
    dispatch(ExpenseActions.deleteExpense(expenseId)),
});

// mapping action and store the function via props
export default connect(mapStateToProps, mapDispatchToProps)(ListExpenses);
