import React, { Component } from "react";
import {  Container, CardColumns, Card } from "react-bootstrap";
import userService from "../../service/user-service";

import NavBarLogged from "../../components/NavigationCompnents/LoggedInNav/NavBarLogged";
class Order extends Component {
  state = {
    items: [],
    username:""
  };
  componentDidMount() {

    userService.getAllUsers().then((res) => {
      const items = res.data;
      this.setState({ items });
    });
    console.log(this.state.items);
  }
  componentWillUnmount() {
    this._isMounted = false;
  
  }

  render() {
    return (
      <Container fluid>
        <NavBarLogged />
      <Container>
        
        
        <CardColumns>
          {this.state.items.map((items) => (
            <Card
              key={items.email}
              style={{
                margin: "10px",
                padding: "20px",
                boxShadow: "1px 1px 1px 1px #ccc",
              }}
            >
              <Card.Body>
                <Card.Title>{items}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </CardColumns>
      </Container>
      </Container>
    );
  }
}

export default Order;
