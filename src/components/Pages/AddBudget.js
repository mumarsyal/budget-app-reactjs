import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { useBudgets } from "../../contexts/BudgetsContext";
import AddBudgetForm from "../Forms/AddBudgetForm";
import { addBudget } from "../../redux/actions/BudgetActions";

function AddBudget(props) {
  const navigate = useNavigate();
  const { addBudget } = useBudgets();

  function handleFormSubmit(data, e) {
    e.preventDefault();
    props.addBudget({
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

// Mapping the component's props to the related actions
const mapDispatchToProps = (dispatch) => ({
  addBudget: (data) => dispatch(addBudget(data)),
});

export default connect(null, mapDispatchToProps)(AddBudget);
