
import React from 'react';
import Button from '../../../component/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../component/UI/Spinner/Spinner';
import Input from '../../../component/UI/Input/Input';

class ContactData extends React.Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postal: ''
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    console.log('[ContactData.js] order Handler', this.props);
    this.setState({
      loading: true,
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Sujan',
        address: {
          street: 'street 1',
          zioCode: '4555',
          country: 'India',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
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

  render() {
    let form = (
      <form>
        <Input inputType="input" type="email" name="email" placeholder="Your Email.." />
        <Input inputType="input" type="text" name="street" placeholder="Your street.." />
        <Input inputType="input" type="text" name="name" placeholder="Your Name.." />
        <Input inputType="input" type="text" name="postal" placeholder="Your Postal.." />
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