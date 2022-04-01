import { Button, Modal, Stack } from "react-bootstrap";
import { connect } from "react-redux";

import { BudgetActions, ExpenseActions } from "../../redux/actions";
import ExpensesTable from "../ExpensesTable";
import { getBudgetExpenses, UNCATEGORIZED_BUDGET_ID } from "../../utils/utils";

function ViewExpensesModal(props) {
  const curBudget =
    UNCATEGORIZED_BUDGET_ID === props.budgetId
      ? { title: UNCATEGORIZED_BUDGET_ID, id: UNCATEGORIZED_BUDGET_ID }
      : props.budgets.find((budget) => budget.id === props.budgetId);

  const expenses = getBudgetExpenses(props.expenses, props.budgetId);

  return (
    <Modal show={props.budgetId != null} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap={2}>
            <div>Expenses - {curBudget?.title}</div>
            {props.budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                variant="outline-danger"
                onClick={() => {
                  props.deleteBudget(props.budgetId);
                  props.handleClose();
                }}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ExpensesTable
          expenses={expenses}
          deleteExpense={(id) => props.deleteExpense(id)}
        ></ExpensesTable>
      </Modal.Body>
    </Modal>
  );
}

// Mapping the component's props to the reducer's state
const mapStateToProps = (state) => ({
  budgets: state.budgetsReducer.budgets,
  expenses: state.budgetsReducer.expenses,
});

// Mapping the component's props to the related actions
const mapDispatchToProps = (dispatch) => ({
  deleteBudget: (budgetId) => dispatch(BudgetActions.deleteBudget(budgetId)),
  deleteExpense: (expenseId) =>
    dispatch(ExpenseActions.deleteExpense(expenseId)),
});

// mapping action and store the function via props
export default connect(mapStateToProps, mapDispatchToProps)(ViewExpensesModal);
