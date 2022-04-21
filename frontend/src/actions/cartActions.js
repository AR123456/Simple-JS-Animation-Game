// bring in axios to make request to API products id
// to get the data for the product to add to cart
import axios from "axios";
// import the constants so we dont have to put them in parens
// the constants are the reducer actions that get fired off
// on the component
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

// much like useEffect , redux thunk to pass function within function
// need to pass in the id and quantity which we are getting out of the url
// in addition to dispatch using getState so that we can add this to local storage
// getState allows us to get entire state tree
export const addToCart = (id, qty) => async (dispatch, getState) => {
  // destructure data
  const { data } = await axios.get(`/api/products/${id}`);
  // pass what is being dispatched type:  payload:
  // this s the stuff we want to display in the cart
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  // using getState(). then whatever we want.  Grab cart items
  // after dispatch want to save what all the cart data that was dispatched
  // to local storage
  localStorage.setItem(
    "cartItems",
    // this returns a JS object so need to stringigy to add to localStorage
    // to use this later will need to use JSON.parse to put it back into an object
    JSON.stringify(getState().cart.cartItems)
  );
  // now have this in local storage so need to get into store in  store.js
};
// need to pass in id need dispatch to be able to dispatch to reducer
//  and getState to get all the items in cart  and reset local
// storage to whatever is in cart less what we are removing
export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  // reset local storage to what cart items are now, getState is getting
  // the entire state tree, from it we want cartItems
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
