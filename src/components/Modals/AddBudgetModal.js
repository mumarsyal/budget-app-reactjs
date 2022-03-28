import { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import { useBudgets } from "../../contexts/BudgetsContext";

function AddBudgetModal(props) {
  const titleRef = useRef();
  const maxRef = useRef();
  const { addBudget } = useBudgets();

  function handleSubmit(e) {
    e.preventDefault();
    addBudget({
      title: titleRef.current.value,
      max: +maxRef.current.value,
    });
    props.handleClose();
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Budget</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control ref={titleRef} type="text" required></Form.Control>
          </Form.Group>
          <Form.Group controlId="max" className="mb-3">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              min={0}
              step={1}
              required
            ></Form.Control>
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
