

import React from 'react';
import classes from './Order.css';

const Order = (props) => (
  <div className={classes.Order}>
    <h3>Ingredients</h3>
    <p>Salad: 1</p>
    <p>Bacon: 1</p>
    <p>Cheese: 1</p>
    <p>Meat: 1</p>
    <h3>Price: 5</h3>
  </div>
);


export default Order;