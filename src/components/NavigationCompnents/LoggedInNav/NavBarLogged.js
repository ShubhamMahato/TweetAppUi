import React, { Component } from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Cookies from "js-cookie";
class NavItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: Cookies.get("user_id"),
    };
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/loggedin">
          <img
            alt=""
            src="https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-twitter-1.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          Twitter
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/loggedin">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/order">
              Users
            </Nav.Link>
            <Nav.Link as={Link} to="/myTweets">
              MyTweets
            </Nav.Link>
            <Nav.Link as={Link} to="/postTweet">
              Post Tweet
            </Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">{this.state.isLoggedIn}</a>
            </Navbar.Text>
          </Navbar.Collapse>
          <Form inline>
            <FormControl type="text" placeholder="Search" />

            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavItem;
