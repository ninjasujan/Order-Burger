import React from 'react';
import Logo from '../../component/Logo/Logo';
import NavigatioItems from '../Navigation/NavigationItems/NavigationItems';
import classes from './SideDrawer.css';

const sideDrawer = (proos) => {
  return (
    <div className={classes.SideDrawer}>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigatioItems />
      </nav>
    </div>
  );
};

export default sideDrawer;
