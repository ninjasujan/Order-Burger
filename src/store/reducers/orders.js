import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  loading: false,
  orders: [],
  purchased: false,
};

const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
};

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true,
  });
};

const purchaseBurgerFailure = (state, action) => {
  return updateObject(state, { loading: false });
};

const fetchOrderInit = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchOrderSuccess = (state, action) => {
  return updateObject(state, { loading: false, orders: action.orders });
};

const fetchOrderFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);

    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);

    case actionTypes.PURCHASE_BURGER_FAILURE:
      return purchaseBurgerFailure(state, action);

    case actionTypes.FETCH_ORDER_INIT:
      return fetchOrderInit(state, action);

    case actionTypes.FETCH_ORDER_SUCCESS:
      return fetchOrderSuccess(state, action);

    case actionTypes.FETCH_ORDER_FAIL:
      return fetchOrderFail(state, action);

    default:
      return state;
  }
};

export default orderReducer;
