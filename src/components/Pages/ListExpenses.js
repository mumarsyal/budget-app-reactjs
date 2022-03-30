import { Button, Container, Stack, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../../contexts/BudgetsContext";
import { currencyFormatter } from "../../utils";

function ListExpenses(props) {
  const navigate = useNavigate();
  const routeParams = useParams();

  const { budgets, getBudgetExpenses, deleteBudget, deleteExpense } =
    useBudgets();

  const curBudget =
    UNCATEGORIZED_BUDGET_ID === routeParams.budgetId
      ? { title: UNCATEGORIZED_BUDGET_ID, id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((budget) => budget.id === routeParams.budgetId);

  const expenses = getBudgetExpenses(routeParams.budgetId);

  return (
    <Container>
      <h3>
        <Stack direction="horizontal" gap={2}>
          <div>Expenses - {curBudget?.title}</div>
          {routeParams.budgetId !== UNCATEGORIZED_BUDGET_ID && (
            <Button
              variant="outline-danger"
              onClick={() => {
                deleteBudget(routeParams.budgetId);
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
              <td style={{textAlign: "center"}}>
                <Button
                  variant="outline-danger"
                  size="sm"
                  style={{width: "50%"}}
                  onClick={() => deleteExpense(expense.id)}
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

export default ListExpenses;
