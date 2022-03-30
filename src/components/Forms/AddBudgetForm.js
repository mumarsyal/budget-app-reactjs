import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

function AddBudgetForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Form onSubmit={handleSubmit(props.onSubmit)}>
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
  );
}

export default AddBudgetForm;
