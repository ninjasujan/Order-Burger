import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Auth.css";
import { Redirect } from "react-router-dom";

import Input from "../../component/UI/Input/Input";
import Button from "../../component/UI/Button/Button";
import * as actionCreators from "../../store/actions/index";
import Spinner from "../../component/UI/Spinner/Spinner";

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

  componentDidMount() {
    if (!this.props.building && this.props.redirectPath == "/") {
      this.props.onSetAuthRedirectToPath();
    }
  }

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
    let input = <Spinner />;
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    if (!this.props.loading) {
      input = formElementArray.map((input) => (
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
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p style={{ color: "red", fontSize: "1em" }}>{this.props.error}</p>
      );
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.redirectPath} />;
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        <h2>{this.state.isSignUp ? "Create a new account" : "SIGN-IN"} </h2>
        {errorMessage}
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

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    building: state.auth.building,
    redirectPath: state.auth.redirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actionCreators.auth(email, password, isSignup)),
    onSetAuthRedirectToPath: () =>
      dispatch(actionCreators.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
