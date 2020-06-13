
import React from 'react';
import Button from '../../../component/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends React.Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postal: ''
    }
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data..</h4>
        <form>
          <input type="text" name="name" placeholder="Your Name.." />
          <input type="email" name="email" placeholder="Your Email.." />
          <input type="text" name="street" placeholder="Your street.." />
          <input type="text" name="postal" placeholder="Your Postal.." />
          <Button btnType="Success">ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;