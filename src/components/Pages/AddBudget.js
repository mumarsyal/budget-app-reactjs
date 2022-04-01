import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import AddBudgetForm from "../Forms/AddBudgetForm";
import { BudgetActions } from "../../redux/actions";

function AddBudget(props) {
  const navigate = useNavigate();

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
      <h3 className="mt-3">New Budget</h3>
      <AddBudgetForm onSubmit={handleFormSubmit}></AddBudgetForm>
    </Container>
  );
}

// Mapping the component's props to the related actions
const mapDispatchToProps = (dispatch) => ({
  addBudget: (data) => dispatch(BudgetActions.addBudget(data)),
});

export default connect(null, mapDispatchToProps)(AddBudget);
