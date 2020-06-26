import * as actionTypes from "../../store/actions/actionTypes";
import axios from "../../axios-orders";

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILURE,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        console.log("[PurchaseBurgerStart]", response);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((err) => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};

export const fetchOrderInit = () => {
  return {
    type: actionTypes.FETCH_ORDER_INIT,
  };
};

export const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders: orders,
  };
};

export const fetchOrderFail = (error) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    error: error,
  };
};

export const fetchOrders = (token) => {
  return (dispatch) => {
    dispatch(fetchOrderInit());
    axios
      .get("/orders.json?auth=" + token)
      .then((response) => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key,
          });
        }
        dispatch(fetchOrderSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(fetchOrderFail(err));
      });
  };
};
