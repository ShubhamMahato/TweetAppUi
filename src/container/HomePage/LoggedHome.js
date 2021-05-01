import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Items from "../../components/ItemsCard/item/item";
import NavBarLogged from "../../components/NavigationCompnents/LoggedInNav/NavBarLogged";
class Home extends Component {
  state = {};
  render() {
    return (
      <Container fluid>
        <NavBarLogged />
        <Items />
      </Container>
    );
  }
}

export default Home;
