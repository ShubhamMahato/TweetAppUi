import React from "react";
import "./App.css";
import NavBar from "./components/NavigationCompnents/NavItems/NavItem";
import Home from "./container/HomePage/home";
import Order from "./components/Order/Order";
import Items from "./components/ItemsCard/item/item";
import SignupComponent from "./components/Registration/registration";
import ValidateOtp from "./components/ValidateOtp/ValidateOtp";
import LoginComponent from "./components/Login/Login";
import { BrowserRouter } from "react-router-dom";

import { Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />

        <Route exact path="/order">
          <Order />
        </Route>
        <Route exact path="/register">
          <SignupComponent />
        </Route>
        <Route exact path="/Login">
          <LoginComponent />
        </Route>
        <Route
          exact
          path="/validate"
          render={(props) => <ValidateOtp {...props} />}
        ></Route>
        <Route exact path="/">
          <Home />
          <Items />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
