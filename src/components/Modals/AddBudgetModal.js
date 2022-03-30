import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { useBudgets } from "../../contexts/BudgetsContext";
import AddBudgetForm from "../Forms/AddBudgetForm";

function AddBudgetModal(props) {
  const { addBudget } = useBudgets();
  const {
    reset,
  } = useForm();

  function handleFormSubmit(data, e) {
    e.preventDefault();
    addBudget({
      title: data.title,
      max: +data.max,
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
        <Modal.Title>New Budget</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddBudgetForm onSubmit={handleFormSubmit}></AddBudgetForm>
      </Modal.Body>
    </Modal>
  );
}

export default AddBudgetModal;
