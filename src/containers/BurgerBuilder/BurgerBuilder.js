import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../component/Burger/Burger";
import BuildControls from "../../component/Burger/BuildControls/BuildControls";
import Modal from "../../component/UI/Modal/Modal";
import OrderSummary from "../../component/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../component/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as acttionTypes from "../../store/actions";

const INGREDIENT_PRICE = {
  salad: 0.9,
  bacon: 0.4,
  cheese: 0.7,
  meat: 0.3,
};

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    // axios
    //   .get('https://burger-app-bc3d2.firebaseio.com/ingredients.json')
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  updatePurchaseState = (ingredients) => {
    console.log("[BuildControl Purchase Button]");
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return (sum = sum + el);
      }, 0);

    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disabeldInfo = {
      ...this.props.ings,
    };
    for (let key in disabeldInfo) {
      disabeldInfo[key] = disabeldInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = <Spinner />;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            disabled={disabeldInfo}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseContinued={this.purchaseContinueHandler}
          purchaseCancelled={this.purchaseCancelHandler}
          price={this.props.price}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({ type: acttionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) =>
      dispatch({
        type: acttionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
