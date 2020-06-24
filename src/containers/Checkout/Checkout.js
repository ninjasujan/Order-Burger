import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

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
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      summary = (
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
    return <div>{summary}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);
