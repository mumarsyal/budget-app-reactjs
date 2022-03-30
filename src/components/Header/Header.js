import Container from "react-bootstrap/Container";
import { Button, Stack } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

export default function Header(props) {
  return (
    <Container fluid style={{ color: "#fff" }} className="bg-dark py-2">
      <Stack direction="horizontal" gap={2}>
        <h1 className="me-auto">
          <Link to={"/"}>Budgets</Link>
        </h1>
        <Button variant="primary" onClick={props.onAddBudget}>
          Add Budget Modal
        </Button>
        <NavLink to={"/add-budget"}>Add Budget</NavLink>
        <Button variant="outline-primary" onClick={props.onAddExpense}>
          Add Expense Modal
        </Button>
        <NavLink to={"/add-expense"}>Add Expense</NavLink>
      </Stack>
    </Container>
  );
}
