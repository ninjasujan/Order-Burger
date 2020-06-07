import React from 'react';
import Logo from '../../component/assets/images/logo.png';
import classes from './Logo.css';

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={Logo} alt="Logo" />
  </div>
);

export default logo;
