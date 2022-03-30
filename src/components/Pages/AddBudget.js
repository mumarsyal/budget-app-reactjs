
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useBudgets } from "../../contexts/BudgetsContext";
import AddBudgetForm from "../Forms/AddBudgetForm";

function AddBudget(props) {
  const navigate = useNavigate();
  const { addBudget } = useBudgets();

  function handleFormSubmit(data, e) {
    e.preventDefault();
    addBudget({
      title: data.title,
      max: +data.max,
    });
    navigate("/");
  }

  return (
    <Container>
      <h3>New Budget</h3>
      <AddBudgetForm onSubmit={handleFormSubmit}></AddBudgetForm>
    </Container>
  );
}

export default AddBudget;
