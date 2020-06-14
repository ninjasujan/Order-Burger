import React, { Component } from 'react';
import Order from '../../component/Order/Order';

class Orders extends Component {
  render() {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
};


export default Orders;