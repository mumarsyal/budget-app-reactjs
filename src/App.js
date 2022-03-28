import BudgetCard from "./components/BudgetCard/BudgetCard";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header></Header>
      <BudgetCard amountSpent={500} max={1000}>Entertainment</BudgetCard>
    </>
  );
}

export default App;
