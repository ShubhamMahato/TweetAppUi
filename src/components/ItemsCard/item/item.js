import React, { Component } from "react";
import { Card, Container, CardColumns, Button } from "react-bootstrap";
import axios from "axios";
class Item extends Component {
  state = {
    items: [],
  };
  componentDidMount() {
    axios
      .get(
        `https://raw.githubusercontent.com/ShubhamMahato/groceries/master/items.json`
      )
      .then((res) => {
        const items = res.data;
        this.setState({ items });
      });
  }
  render() {
    return (
      <Container>
        <CardColumns>
          {this.state.items.map((items) => (
            <Card
              key={items.id}
              style={{
                margin: "10px",
                padding: "20px",
                boxShadow: "1px 1px 1px 1px #ccc",
              }}
            >
              <Container style={{ width: "80%", height: "60%" }}>
                <Card.Img
                  style={{
                    padding: "20px",
                  }}
                  variant="top"
                  src={items.img}
                />
              </Container>
              <Card.Body>
                <Card.Title>{items.value}</Card.Title>
                <Card.Text>Rs {items.price}</Card.Text>
              </Card.Body>
              <Card.Body>
                <Button>Add</Button>

                <Button>Delete</Button>
              </Card.Body>
            </Card>
          ))}
        </CardColumns>
      </Container>
    );
  }
}

export default Item;
