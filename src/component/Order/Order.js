

import React from 'react';
import classes from './Order.css';

const Order = (props) => {
  const ingredients = [];
  for (let ingName in props.ingredients) {
    ingredients.push({
      name: ingName,
      qty: props.ingredients[ingName],
    });
  }


  const ingredientsOutput = ingredients.map(ing => {
    return <span style={{
      textTransform: 'capitalize',
      boxShadow: '0 2px 3px #ccc',
      margin: '3px',
      padding: '4px'
    }} key={ing.name}>{ing.name}: ({ing.qty}) </span>
  });

  return (
    <div className={classes.Order}>
      <h3>Ingredients</h3>
      {ingredientsOutput}
      <h3>Price: ${Number.parseFloat(props.price.toFixed(2))}</h3>
    </div>
  );
};


export default Order;