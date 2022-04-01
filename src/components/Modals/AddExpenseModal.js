import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

import { ExpenseActions } from "../../redux/actions";
import AddExpenseForm from "../Forms/AddExpenseForm";

function AddExpenseModal(props) {
  const { reset } = useForm();

  function handleFormSubmit(data, e) {
    e.preventDefault();
    props.addExpense({
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
        <AddExpenseForm defaultBudgetId={props.defaultBudgetId} onSubmit={handleFormSubmit}></AddExpenseForm>
      </Modal.Body>
    </Modal>
  );
}

// Mapping the component's props to the related actions
const mapDispatchToProps = (dispatch) => ({
  addExpense: (data) => dispatch(ExpenseActions.addExpense(data)),
});

export default connect(null, mapDispatchToProps)(AddExpenseModal);
