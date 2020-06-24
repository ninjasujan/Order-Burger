import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  orders: [],
};

const orderReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
      };

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      state;
  }
};

export default orderReducer;
