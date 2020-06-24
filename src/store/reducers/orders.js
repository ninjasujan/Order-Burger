import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  orders: [],
  purchased: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };

    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true,
      };

    case actionTypes.PURCHASE_BURGER_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.FETCH_ORDER_INIT:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.orders,
      };
    case actionTypes.FETCH_ORDER_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default orderReducer;
