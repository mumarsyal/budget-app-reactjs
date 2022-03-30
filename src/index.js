import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./App";
import { BudgetsProvider } from "./contexts/BudgetsContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BudgetsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BudgetsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
