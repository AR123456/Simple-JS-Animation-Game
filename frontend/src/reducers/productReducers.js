// create function and export it
// a reducer takes in initial state and an action
// will dispatch an action to the reducer
// action is an object with type
// type evaluated here and do a certain thing depending on what type it is
// action  may also contain a payload
// Now improrting the consts so they no
//longer are strings below, just use the const
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";
export const productListReducer = (state = { products: [] }, action) => {
  // use switch to evaluate the action types request,success,failure
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// to use this reducer add it to store.js
