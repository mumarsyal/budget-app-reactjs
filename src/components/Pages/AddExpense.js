import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useBudgets } from "../../contexts/BudgetsContext";
import AddExpenseForm from "../Forms/AddExpenseForm";

function AddExpense(props) {
  const navigate = useNavigate();
  const { addExpense } = useBudgets();

  function handleFormSubmit(data, e) {
    e.preventDefault();
    addExpense({
      amount: +data.amount,
      description: data.description,
      budgetId: data.budgetId,
    });
    navigate("/");
  }

  return (
    <Container>
      <h3>New Expense</h3>
      <AddExpenseForm onSubmit={handleFormSubmit}></AddExpenseForm>
    </Container>
  );
}

export default AddExpense;
