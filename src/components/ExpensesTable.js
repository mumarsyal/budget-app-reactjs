import { Button, Table } from "react-bootstrap";
import { currencyFormatter } from "../utils/utils";

function ExpensesTable(props) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {props.expenses.map((expense, index) => (
          <tr key={expense.id}>
            <td>{index + 1}</td>
            <td>{expense.description}</td>
            <td>{currencyFormatter.format(expense.amount)}</td>
            <td style={{ textAlign: "center" }}>
              <Button
                variant="outline-danger"
                size="sm"
                style={{ width: "50%" }}
                onClick={() => props.deleteExpense(expense.id)}
              >
                &times;
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ExpensesTable;
