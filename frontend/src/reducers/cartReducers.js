// import constants
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";
// export the cartReducer const - it takes in initial state
// in the state object are cart items in the form of an array, also pass in action
export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    // need to handle adding and item and if clicked even though it is already there
    case CART_ADD_ITEM:
      // put the payload in item
      const item = action.payload;
      // checking to see if item is already in the cart - get the cart items from
      // state compare x.product ( the id) to the current item.product
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        // it does exits so return mapped cart items
        // if the current iteration item ID is = to the existItem.product
        // return the item for this iteration
        // if it is not then its just x (it stays the same)
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        // dosent exist to push it to the array, get it into state
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        //return state , filter out the one being removed x.product
        // if not === to action.payload , show it.
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    // by default just return state
    default:
      return state;
  }
};
