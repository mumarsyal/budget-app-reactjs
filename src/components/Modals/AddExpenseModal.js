import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { useBudgets } from "../../contexts/BudgetsContext";
import AddExpenseForm from "../Forms/AddExpenseForm";

function AddExpenseModal(props) {
  const { addExpense } = useBudgets();
  const { reset } = useForm();

  function handleFormSubmit(data, e) {
    e.preventDefault();
    addExpense({
      amount: +data.amount,
      description: data.description,
      budgetId: data.budgetId,
    });
    reset();
    props.handleClose();
  }

  function handleModalClose() {
    reset();
    props.handleClose();
  }

  return (
    <Modal show={props.show} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddExpenseForm onSubmit={handleFormSubmit}></AddExpenseForm>
      </Modal.Body>
    </Modal>
  );
}

export default AddExpenseModal;
