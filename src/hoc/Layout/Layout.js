import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../Auxiliary/Auxiliary";
import classes from "./Layout.css";
import Toolbar from "../../component/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../component/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
    console.log("[Layout.js]", this.state.showSideDrawer);
  };

  render() {
    console.log("[IsAuth in layout]", this.props.isAuth);
    return (
      <Aux>
        <Toolbar
          drawerToggleClicked={this.sideDrawerToggleHandler}
          isAuthe={this.props.isAuth}
        />
        <SideDrawer
          isAuthe={this.props.isAuth}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
