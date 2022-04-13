// any actions that have to do with product go here
// pattern
// const reducer action is then fired off on component
// need to bring the const into this action file
import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";

// this will pretty much mirror the useEffect in the home screen
// redudx thunk allows this function within a function passing in dispatch to
// allow dispatching of actions
export const listProducts = () => async (dispatch) => {
  // in here need to get the products from the DB
  try {
    // pass object to dispatch
    dispatch({ type: PRODUCT_LIST_REQUEST });
    // then make request
    // destructuring data
    // will use axios here so import GET request to api/products
    const { data } = await axios.get("/api/products");
    // dispatch the success object , the payload is the data in response from api
    // this gets passed down into state
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    // if something goes wrong need to dispatch an error object
    dispatch({
      type: PRODUCT_LIST_FAIL,
      // this will be a common payload for our requests -want to return error
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// product details
export const listProductDetails = (id) => async (dispatch) => {
  // get the specific product from db
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
