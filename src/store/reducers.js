import * as actionTypes from "./actions";

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
};

const INGREDIENT_PRICE = {
  salad: 0.9,
  bacon: 0.4,
  cheese: 0.7,
  meat: 0.3,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: INGREDIENT_PRICE[action.ingredientName] + state.totalPrice,
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: INGREDIENT_PRICE[action.ingredientName] - state.totalPrice,
      };
    default:
      return state;
  }
};

export default reducer;
