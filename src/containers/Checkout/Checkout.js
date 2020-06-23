import { connect } from "react-redux";
import { Route } from "react-router-dom";

import React, { Component } from "react";
import CheckoutSummary from "../../component/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutContinued={this.checkoutContinuedHandler}
          CheckoutCancelled={this.checkoutCancelledHandler}
          ingredients={this.props.ingredients}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {

//   }
// }

export default connect(mapStateToProps)(Checkout);
