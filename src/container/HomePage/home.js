import React, { Component } from "react";
import Crousel from "../Crousel/Crousel";
import { Container } from "react-bootstrap";
import AuthService from "../../service/AuthenticationService";
class Home extends Component {
  state = {};
  render() {
    AuthService.isUserLoggedIn();
    return (
      <Container fluid>
        <Crousel />
      </Container>
    );
  }
}

export default Home;
