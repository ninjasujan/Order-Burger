import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import { fetchOrderFail } from "./orders";
import { data } from "autoprefixer";
import logo from "../../component/Logo/Logo";

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

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const authLogout = (expiresIn) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expiresIn * 1000);
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
      process.env.REACT_APP_AUTH +
      ":signUp?key=AIzaSyDz5hrvEGYf0Pe0Iy2iNn-TG0f5YjrRGrQ";
    if (!isSignup) {
      url =
        process.env.REACT_APP_AUTH +
        ":signInWithPassword?key=AIzaSyDz5hrvEGYf0Pe0Iy2iNn-TG0f5YjrRGrQ";
    }
    axios
      .post(url, authData)
      .then((response) => {
        console.log("[Auth.js]", response);
        const expirationdate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationTime", expirationdate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(authLogout(response.data.expiresIn));
      })
      .catch((err) => {
        console.log("[Auth.js] Error Login", err);
        dispatch(authFail(err.response.data.error.message));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  console.log("[AuthCheck state]");
  return (dispatch) => {
    const token = localStorage.getItem("token");
    console.log("[AuthCheckState] token", token);
    if (!token) {
      dispatch(logout());
    } else {
      const expirationTime = new Date(localStorage.getItem("expirationTime"));
      const userId = localStorage.getItem("userId");
      console.log(
        "[AuthCkeckState] expiration Time and userId",
        expirationTime,
        userId
      );
      if (new Date() > expirationTime) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, userId));
        dispatch(
          authLogout((expirationTime.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};
