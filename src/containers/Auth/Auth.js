import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Auth.css";

import Input from "../../component/UI/Input/Input";
import Button from "../../component/UI/Button/Button";
import * as actionCreators from "../../store/actions/index";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "password",
        elementConfig: {
          type: "text",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 7,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true,
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
    const updatedControls = {
      ...this.state.controls,
      [inputIdentifier]: {
        ...this.state.controls[inputIdentifier],
        touched: true,
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[inputIdentifier].validation
        ),
      },
    };

    let validForm = true;
    for (let inputElement in updatedControls) {
      validForm = updatedControls[inputElement].valid && validForm;
    }
    this.setState({ controls: updatedControls, isvalidForm: validForm });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const email = this.state.controls.email.value;
    const password = this.state.controls.password.value;
    this.props.onAuth(email, password, this.state.isSignUp);
  };

  switchAuthHandler = () => {
    console.log("[Switch Auth]");
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let input = formElementArray.map((input) => (
      <Input
        changed={(event) => this.inputChangeHandler(event, input.id)}
        key={input.id}
        elementType={input.config.elementType}
        elementConfig={input.config.elementConfig}
        value={input.config.value}
        invalid={!input.config.valid}
        isTouched={input.config.touched}
      />
    ));
    return (
      <div className={classes.Auth}>
        <h2>SIGN UP </h2>
        <form onSubmit={this.submitHandler} noValidate>
          {input}
          <Button
            btnType="Success"
            clicked={this.orderHandler}
            //disabled={!this.state.isvalidForm}
          >
            SUBMIT
          </Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthHandler}>
          Switch to {this.state.isSignUp ? "Sign In" : "Sign Up"}
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actionCreators.auth(email, password, isSignup)),
  };
};

export default connect(null, mapDispatchToProps)(Auth);
