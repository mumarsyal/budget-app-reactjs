import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

import AddBudgetForm from "../Forms/AddBudgetForm";
import { BudgetActions } from "../../redux/actions";

function AddBudgetModal(props) {
  const { reset } = useForm();

  function handleFormSubmit(data, e) {
    e.preventDefault();
    props.addBudget({
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

// Mapping the component's props to the related actions
const mapDispatchToProps = (dispatch) => ({
  addBudget: (data) => dispatch(BudgetActions.addBudget(data)),
});

export default connect(null, mapDispatchToProps)(AddBudgetModal);
