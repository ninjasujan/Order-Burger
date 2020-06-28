import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_ORDER_BURGER,
});

export default instance;
