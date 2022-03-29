import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { useBudgets } from "../../contexts/BudgetsContext";

function AddBudgetModal(props) {
  const { addBudget } = useBudgets();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <Form.Group controlId="title" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              {...register("title", { required: "*This field is Required" })}
              className={errors.title ? "error-field" : ""}
            ></Form.Control>
            <span className="error-message">{errors.title?.message}</span>
          </Form.Group>
          <Form.Group controlId="max" className="mb-3">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              type="number"
              min={1}
              step={1}
              {...register("max", { required: "*This field is Required" })}
              className={errors.max ? "error-field" : ""}
            ></Form.Control>
            <span className="error-message">{errors.max?.message}</span>
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

export default AddBudgetModal;
