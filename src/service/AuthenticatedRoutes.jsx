import React, { Component } from "react";
import AuthSerivce from "./AuthenticationService";
import { Route, Redirect } from "react-router";
class AuthenticatedRoute extends Component {
  render() {
    if (AuthSerivce.isUserLoggedIn()) {
      return <Route {...this.props} />;
    } else {
      return <Redirect to="/Login"></Redirect>;
    }
  }
}

export default AuthenticatedRoute;
