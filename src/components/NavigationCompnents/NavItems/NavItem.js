import React, { Component } from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AuthService from "../../../service/AuthenticationService";
class NavItem extends Component {
  constructor(props) {
    super(props);
    this.state = { isUserLogged: AuthService.isUserLoggedIn() };
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="https://png.pngtree.com/png-vector/20190115/ourlarge/pngtree-supermarket-the-mall-grocery-store-cartoon-png-image_370349.jpg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          Groceries Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {!this.state.isUserLogged && (
              <Nav.Link as={Link} to="/Login">
                Login
              </Nav.Link>
            )}
            {this.state.isUserLogged && (
              <Nav.Link as={Link} to="/order">
                Order
              </Nav.Link>
            )}
          </Nav>
          {this.state.isUserLogged && (
            <Form inline>
              <FormControl type="text" placeholder="Search" />

              <Button variant="outline-success">Search</Button>
            </Form>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavItem;
