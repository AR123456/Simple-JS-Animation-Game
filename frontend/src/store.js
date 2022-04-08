import { createStore, combineReducers, applyMiddleware } from "redux";
// making requests
import thunk from "redux-thunk";
// to be able to use the redux dev tools
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer } from "./reducers/productReducers";

const reducer = combineReducers({
  // productList is the piece of state
  productList: productListReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
