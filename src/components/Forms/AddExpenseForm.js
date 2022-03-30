import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../../contexts/BudgetsContext";

function AddExpenseForm(props) {
  const { budgets } = useBudgets();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const routeParams = useParams();

  return (
    <Form onSubmit={handleSubmit(props.onSubmit)}>
      <Form.Group controlId="description" className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          {...register("description", {
            required: "*This field is Required",
          })}
          className={errors.description ? "error-field" : ""}
        ></Form.Control>
        <span className="error-message">{errors.description?.message}</span>
      </Form.Group>
      <Form.Group controlId="amount" className="mb-3">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          min={1}
          step={1}
          {...register("amount", { required: "*This field is Required" })}
          className={errors.amount ? "error-field" : ""}
        ></Form.Control>
        <span className="error-message">{errors.amount?.message}</span>
      </Form.Group>
      <Form.Group controlId="budgetId" className="mb-3">
        <Form.Label>Budget ID</Form.Label>
        <Form.Select
          defaultValue={props.defaultBudgetId || routeParams.budgetId}
          {...register("budgetId", { required: "*This field is Required" })}
          className={errors.budgetId ? "error-field" : ""}
        >
          <option id={UNCATEGORIZED_BUDGET_ID} value={UNCATEGORIZED_BUDGET_ID}>
            {UNCATEGORIZED_BUDGET_ID}
          </option>
          {budgets.map((budget) => (
            <option key={budget.id} value={budget.id}>
              {budget.title}
            </option>
          ))}
        </Form.Select>
        <span className="error-message">{errors.budgetId?.message}</span>
      </Form.Group>
      <div className="d-flex justify-content-end">
        <Button type="submit" variant="primary">
          Add
        </Button>
      </div>
    </Form>
  );
}

export default AddExpenseForm;
