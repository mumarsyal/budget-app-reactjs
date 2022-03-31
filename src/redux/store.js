import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import AllReducers from "./reducers";

const reducer = combineReducers({
  ...AllReducers,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
