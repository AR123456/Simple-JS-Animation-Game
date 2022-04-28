import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {};
    case USER_LOGIN_SUCCESS:
      return {};
    case USER_LOGIN_FAIL:
      return {};
    default:
      return state;
  }
};
export const userLogoutReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};
