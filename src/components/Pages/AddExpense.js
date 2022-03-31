import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useBudgets } from "../../contexts/BudgetsContext";
import { ExpenseActions } from "../../redux/actions";
import AddExpenseForm from "../Forms/AddExpenseForm";

function AddExpense(props) {
  const navigate = useNavigate();
  const { addExpense } = useBudgets();

  function handleFormSubmit(data, e) {
    e.preventDefault();
    props.addExpense({
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

// Mapping the component's props to the related actions
const mapDispatchToProps = (dispatch) => ({
  addExpense: (data) => dispatch(ExpenseActions.addExpense(data)),
});

export default connect(null, mapDispatchToProps)(AddExpense);
