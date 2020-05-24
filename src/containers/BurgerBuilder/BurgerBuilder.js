import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICE = {
  slad: 0.5,
  bacon: 0.7,
  cheese: 1,
  meat: 0.3,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      cheese: 0,
      salad: 0,
      bacon: 0,
      meat: 0,
    },
    totalPrice: 4,
  };

  addIngredient = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    let updatedPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });
  };

  removeIngredient = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return;
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    let updatedPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });
    this.setState({
      ingredients: updatedIngredients,
    });
  };

  render() {
    const disabeldInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabeldInfo) {
      disabeldInfo[key] = disabeldInfo[key] <= 0;
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          disabled={disabeldInfo}
          ingredientAdded={this.addIngredient}
          ingredientRemoved={this.removeIngredient}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
