import React from "react";
import { connect } from "react-redux";

import Button from "../../../component/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../component/UI/Spinner/Spinner";
import Input from "../../../component/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreators from "../../../store//actions/index";

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zioCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP-Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "cheapest", displayValue: "Cheapest" },
            { value: "fastest", displayValue: "Fastest" },
          ],
        },
        value: "cheapest",
        validation: {
          required: false,
        },
        valid: true,
      },
    },
    isvalidForm: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const formData = {};
    for (let inputIdentifier in this.state.orderForm) {
      formData[inputIdentifier] = this.state.orderForm[inputIdentifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalprice,
      orderData: formData,
    };
    this.props.onOrderBurger(order);
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (isValid && rules.required) {
      isValid = value.trim() !== "";
    }
    if (isValid && rules.minLength) {
      isValid = rules.minLength <= value.trim().length;
    }
    if (isValid && rules.maxLength) {
      isValid = value.trim().length <= rules.minLength;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }

  inputChangeHandler = (event, inputIdentifier) => {
    console.log("[ContactData.js] Input values", event.target.value);
    const updatedForm = { ...this.state.orderForm };
    const updatedFormElement = {
      ...updatedForm[inputIdentifier],
    };
    updatedFormElement.valid = this.checkValidity(
      event.target.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedFormElement.value = event.target.value;
    updatedForm[inputIdentifier] = updatedFormElement;

    let validForm = true;
    for (let inputElement in updatedForm) {
      validForm = updatedForm[inputElement].valid && validForm;
    }

    this.setState({ orderForm: updatedForm, isvalidForm: validForm });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.props.orderHandler}>
        {formElementArray.map((input) => (
          <Input
            changed={(event) => this.inputChangeHandler(event, input.id)}
            key={input.id}
            elementType={input.config.elementType}
            elementConfig={input.config.elementConfig}
            value={input.config.value}
            invalid={!input.config.valid}
            isTouched={input.config.touched}
          />
        ))}
        <Button
          btnType="Success"
          clicked={this.orderHandler}
          disabled={!this.state.isvalidForm}
        >
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data..</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalprice: state.burger.totalPrice,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) =>
      dispatch(actionCreators.purchaseBurger(orderData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
