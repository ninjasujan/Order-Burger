import React from "react";

import Logo from "../Logo/Logo";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Backdrop from "../UI/Backdrop/Backdrop";
import Aux from "../../hoc/Auxiliary/Auxiliary";

const sideDrawer = (props) => {
  let assignedClass = [classes.SideDrawer, classes.Close];
  if (props.open) {
    assignedClass = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={assignedClass.join(" ")} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthe} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
