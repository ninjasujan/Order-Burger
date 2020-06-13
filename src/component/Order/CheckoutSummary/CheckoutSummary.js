
import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h2>We hope it tastes well.!</h2>
      <div className="Burger">
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked>Cancel</Button>
      <Button btnType="Success" clicked>Continue</Button>
    </div>
  );
}

export default checkoutSummary;