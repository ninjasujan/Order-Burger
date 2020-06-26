import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import { fetchOrderFail } from "./orders";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (token, userId) => {
  console.log("[Auth Success]");
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const authLogout = (expiresIn) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, 3600 * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDz5hrvEGYf0Pe0Iy2iNn-TG0f5YjrRGrQ";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDz5hrvEGYf0Pe0Iy2iNn-TG0f5YjrRGrQ";
    }
    axios
      .post(url, authData)
      .then((response) => {
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(authLogout(response.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error.message));
      });
  };
};
