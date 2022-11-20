import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { reducer } from "./Reducer";
import thunk from "redux-thunk";
const enhancer = applyMiddleware(thunk);

export const store = createStore(reducer, enhancer);
