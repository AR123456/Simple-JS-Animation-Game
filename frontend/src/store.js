import { createStore, combineReducers, applyMiddleware } from "redux";
// making requests
import thunk from "redux-thunk";
// to be able to use the redux dev tools
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
// to make use of cartReducrs add to the store
import { cartReducer } from "./reducers/cartReducers";

const reducer = combineReducers({
  // what is being put into state
  // state name : what its called in reducer
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});
// grabbing the cart items from local storage if  "cartItems" parse it and set if noting then set empty array
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
// putting cart items, token user that were put into
//local state in the actions.js files into state
const initialState = {
  //cart
  cart: { cartItemsFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
