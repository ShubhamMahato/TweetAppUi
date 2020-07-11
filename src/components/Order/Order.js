import React, { Component } from "react";
import { FormControl, Form, Button, Container } from "react-bootstrap";

class Order extends Component {
  state = {};
  render() {
    return (
      <Container>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-md-12 mr-lg-12"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Container>
    );
  }
}

export default Order;
