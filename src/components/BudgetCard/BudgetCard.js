import { Button, Card, ProgressBar, Stack } from "react-bootstrap";

import { currencyFormatter } from "../../utils";

export default function BudgetCard(props) {
  const classNames = ["mt-3"];
  if (props.amountSpent > props.max) {
    classNames.push("bg-danger", "bg-opacity-25");
  } else if (props.gray) {
    classNames.push("bg-light");
  }

  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title
          className="d-flex justify-content-between
          align-items-baseline fw-normal mb-3"
        >
          <div>{props.title}</div>
          <div>
            {currencyFormatter.format(props.amountSpent)}{" "}
            {props.max && <span className="text-muted fs-6">
              / {currencyFormatter.format(props.max)}
            </span>}
          </div>
        </Card.Title>

        {props.max && <ProgressBar
          variant={getProgressBarVariant(props.amountSpent, props.max)}
          min={0}
          max={props.max}
          now={props.amountSpent}
        ></ProgressBar>}

        {props.showButtons && <Stack direction="horizontal" gap={2} className="mt-4">
          <Button
            variant="outline-primary"
            className="ms-auto"
            onClick={props.onAddExpense}
          >
            Add Expense
          </Button>
          <Button variant="outline-secondary">View Expenses</Button>
        </Stack>}
      </Card.Body>
    </Card>
  );
}

function getProgressBarVariant(amountSpent, max) {
  const ratio = amountSpent / max;
  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";
  return "danger";
}
