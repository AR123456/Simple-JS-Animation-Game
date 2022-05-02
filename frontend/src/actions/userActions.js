import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/userConstants";
export const login = (email, password) => async (dispatch) => {
  // log in and get token
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    // send in header data with content type of application .json
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      // data we get back from "/api/users/login"
      payload: data,
    });
    // set local storage - make it a string data here is the user object
    //  _id: user._id,
    // name: user.name,
    // email: user.email,
    //  isAdmin: user.isAdmin,
    //  token: generateToken(user._id),
    localStorage.setItem("userInfo", JSON.stringify(data));
    // go back to store.js and load as initial value if its there
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  // remove from local storage
  localStorage.removeItem("userInfo");
  // dispatch the logout action
  dispatch({ type: USER_LOGOUT });
};
