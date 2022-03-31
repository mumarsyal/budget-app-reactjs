import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./App";
import { BudgetsProvider } from "./contexts/BudgetsContext";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    {/* <BudgetsProvider> */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    {/* </BudgetsProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
