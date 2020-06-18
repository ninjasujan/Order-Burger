
import React from 'react';
import Button from '../../../component/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../component/UI/Spinner/Spinner';
import Input from '../../../component/UI/Input/Input';

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zioCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP-Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'cheapest', displayValue: 'Cheapest' },
            { value: 'fastest', displayValue: 'Fastest' }
          ]
        },
        value: ''
      },
    }
  };

  orderHandler = (event) => {
    event.preventDefault();
    console.log('[ContactData.js] order Handler', this.props);
    this.setState({
      loading: true,
    });
    const formData = {};
    for (let inputIdentifier in this.state.orderForm) {
      formData[inputIdentifier] = this.state.orderForm[inputIdentifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
    };
    axios
      .post('/orders.json', order)
      .then((response) => {
        this.setState({
          loading: false,
        });
        console.log(response);
        this.props.history.push('/');
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
        console.log(err);
      });
  }

  inputChangeHandler = (event, inputIdentifier) => {
    console.log(event.target.value);
    const updatedForm = { ...this.state.orderForm };
    const updatedFormElement = {
      ...updatedForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: updatedForm });
  }

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form onSubmit={this.props.orderHandler}>
        {formElementArray.map(input => (
          <Input
            changed={(event) => this.inputChangeHandler(event, input.id)}
            key={input.id}
            elementType={input.config.elementType}
            elementConfig={input.config.elementConfig}
            value={input.config.value} />
        ))}
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data..</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;