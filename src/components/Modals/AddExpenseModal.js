import { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../../contexts/BudgetsContext";

function AddExpenseModal(props) {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const budgetIdRef = useRef();
  const { budgets, addExpense } = useBudgets();

  function handleSubmit(e) {
    e.preventDefault();
    addExpense({
      amount: +amountRef.current.value,
      description: descriptionRef.current.value,
      budgetId: budgetIdRef.current.value,
    });
    props.handleClose();
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              ref={descriptionRef}
              type="text"
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="amount" className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              min={0}
              step={1}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="budgetId" className="mb-3">
            <Form.Label>Budget ID</Form.Label>
            <Form.Select ref={budgetIdRef} defaultValue={props.defaultBudgetId}>
              <option
                id={UNCATEGORIZED_BUDGET_ID}
                value={UNCATEGORIZED_BUDGET_ID}
              >
                {UNCATEGORIZED_BUDGET_ID}
              </option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button type="submit" variant="primary">
              Add
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddExpenseModal;
