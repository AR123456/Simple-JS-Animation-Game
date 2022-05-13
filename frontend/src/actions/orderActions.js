import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from "../constants/orderConstants";
// pass in the order
export const createOrder = (order) => async (dispatch, getState) => {
  // this will me similar to updateUserProfile
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    // need to get the user info
    const {
      userLogin: { userInfo },
    } = getState();
    // to headers pass in authorization for token
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    // pass in the order object post request
    const { data } = await axios.post(`/api/orders`, order, config);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      // payload is data that comes back, the newly created order
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
