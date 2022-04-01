import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import AllReducers from "./reducers";
import { loadState, saveState } from "../utils";

const reducer = combineReducers({
  ...AllReducers,
});

const persistedState = loadState();

const store = createStore(reducer, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
