import { Button, Modal, Stack } from "react-bootstrap";

import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../../contexts/BudgetsContext";
import { currencyFormatter } from "../../utils";

function ViewExpensesModal(props) {
  const { budgets, getBudgetExpenses, deleteBudget, deleteExpense } =
    useBudgets();

  const curBudget =
    UNCATEGORIZED_BUDGET_ID === props.budgetId
      ? { title: UNCATEGORIZED_BUDGET_ID, id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((budget) => budget.id === props.budgetId);

  const expenses = getBudgetExpenses(props.budgetId);

  return (
    <Modal show={props.budgetId != null} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap={2}>
            <div>Expenses - {curBudget?.title}</div>
            {props.budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                variant="outline-danger"
                onClick={() => {
                  deleteBudget(props.budgetId);
                  props.handleClose();
                }}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap={3}>
          {expenses.map((expense) => (
            <Stack direction="horizontal" gap={2} key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => deleteExpense(expense.id)}
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

export default ViewExpensesModal;
