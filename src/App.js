import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import AddBudgetModal from "./components/Modals/AddBudgetModal";
import AddExpenseModal from "./components/Modals/AddExpenseModal";
import BudgetList from "./components/BudgetList/BudgetList";
import Header from "./components/Header/Header";
import ViewExpensesModal from "./components/Modals/ViewExpensesModal";
import AddBudget from "./components/Pages/AddBudget";
import AddExpense from "./components/Pages/AddExpense";
import ListExpenses from "./components/Pages/ListExpenses";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();

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

      <Routes>
        <Route path="/" element={<BudgetList/>}/>
        <Route path="/add-budget" element={<AddBudget/>}/>
        <Route path="/add-expense" element={<AddExpense/>}/>
        <Route path="/:budgetId/add-expense" element={<AddExpense/>}/>
        <Route path="/:budgetId/view-expenses" element={<ListExpenses/>}/>
      </Routes>

      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      ></AddBudgetModal>

      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={closeAddExpenseModal}
      ></AddExpenseModal>

      {/* <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      ></ViewExpensesModal> */}
    </>
  );
}

export default App;
