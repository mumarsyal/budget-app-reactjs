import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import AddBudgetModal from "./components/Modals/AddBudgetModal";
import AddExpenseModal from "./components/Modals/AddExpenseModal";
import BudgetCard from "./components/BudgetCard/BudgetCard";
import TotalBudgetCard from "./components/BudgetCard/TotalBudgetCard";
import UncategorizedBudgetCard from "./components/BudgetCard/UncategorizedBudgetCard";
import Header from "./components/Header/Header";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import ViewExpensesModal from "./components/Modals/ViewExpensesModal";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModalBudgetId(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  function closeAddExpenseModal() {
    setShowAddExpenseModal(false);
    setAddExpenseModalBudgetId(null);
  }

  return (
    <>
      <Header
        onAddBudget={() => setShowAddBudgetModal(true)}
        onAddExpense={() => setShowAddExpenseModal(true)}
      ></Header>

      <Container>
        <Row>
          {budgets.map((budget) => {
            const amountSpent = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <Col lg={6} key={budget.id}>
                <BudgetCard
                  title={budget.title}
                  max={budget.max}
                  amountSpent={amountSpent}
                  onAddExpense={() => openAddExpenseModalBudgetId(budget.id)}
                  onViewExpenses={() => setViewExpensesModalBudgetId(budget.id)}
                  showButtons={true}
                ></BudgetCard>
              </Col>
            );
          })}
          <Col lg={6}>
            <UncategorizedBudgetCard
              onAddExpense={() => openAddExpenseModalBudgetId()}
              onViewExpenses={() =>
                setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
              }
              showButtons={true}
            ></UncategorizedBudgetCard>
          </Col>
          <Col lg={6}>
            <TotalBudgetCard></TotalBudgetCard>
          </Col>
        </Row>
      </Container>

      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      ></AddBudgetModal>

      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={closeAddExpenseModal}
      ></AddExpenseModal>

      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      ></ViewExpensesModal>
    </>
  );
}

export default App;
