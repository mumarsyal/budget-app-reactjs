import Container from "react-bootstrap/Container";
import { Button, Stack } from "react-bootstrap";

export default function Header() {
  return (
    <Container
      fluid
      style={{ color: "#fff" }}
      className="bg-dark py-2"
    >
      <Stack direction="horizontal" gap={2}>
        <h1 className="me-auto">Budgets</h1>
        <Button variant="primary">Add Budget</Button>
        <Button variant="outline-primary">Add Expense</Button>
      </Stack>
    </Container>
  );
}
