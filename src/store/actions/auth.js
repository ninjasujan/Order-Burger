import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import { fetchOrderFail } from "./orders";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (authData) => {
  console.log("[Auth Success]");
  return {
    type: actionTypes.AUTH_START,
    authData: authData,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
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
        console.log("[AUTH DISPAtCH]", isSignup, response);
        dispatch(authSuccess(response.data));
      })
      .catch((err) => {
        dispatch(fetchOrderFail(err));
      });
  };
};
