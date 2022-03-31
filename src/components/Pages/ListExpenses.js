import { Button, Container, Stack, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../../contexts/BudgetsContext";
import { BudgetActions, ExpenseActions } from "../../redux/actions";
import { currencyFormatter } from "../../utils";

function ListExpenses(props) {
  const navigate = useNavigate();
  const routeParams = useParams();

  const { budgets, getBudgetExpenses, deleteBudget, deleteExpense } =
    useBudgets();

  const curBudget =
    UNCATEGORIZED_BUDGET_ID === routeParams.budgetId
      ? { title: UNCATEGORIZED_BUDGET_ID, id: UNCATEGORIZED_BUDGET_ID }
      : props.budgets.find((budget) => budget.id === routeParams.budgetId);

  const expenses = props.expenses; //getBudgetExpenses(routeParams.budgetId);

  return (
    <Container>
      <h3>
        <Stack direction="horizontal" gap={2}>
          <div>Expenses - {curBudget?.title}</div>
          {routeParams.budgetId !== UNCATEGORIZED_BUDGET_ID && (
            <Button
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={expense.id}>
              <td>{index + 1}</td>
              <td>{expense.description}</td>
              <td>{currencyFormatter.format(expense.amount)}</td>
              <td style={{ textAlign: "center" }}>
                <Button
                  variant="outline-danger"
                  size="sm"
                  style={{ width: "50%" }}
                  onClick={() => props.deleteExpense(expense.id)}
                >
                  &times;
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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
  deleteExpense: (expenseId) => dispatch(ExpenseActions.deleteExpense(expenseId)),
});

// mapping action and store the function via props
export default connect(mapStateToProps, mapDispatchToProps)(ListExpenses);
