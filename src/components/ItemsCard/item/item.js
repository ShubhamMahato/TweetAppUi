import React, { Component, useState } from "react";
import {
  Card,
  Container,
  CardColumns,
  Button,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import TweetService from "../../../service/tweet-service";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class Item extends Component {
  state = {
    items: [],
    username: "",
    id: "",
    reply: false,
    isOpen: false,
  };
  componentDidMount() {
    TweetService.getAllTweets(cookie.load("username")).then((res) => {
      console.log(res);
      const items = res.data;
      this.setState({ items });
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  handleReply(id) {
    console.log("jkhgdfsdfghjkj");
    this.setState({
      id: id,
      reply: true,
    });
  }

  handleOnLike(id) {
    TweetService.likeUsersTweets(cookie.load("username"), id).then((res) => {
      if (res.status === 200) {
        TweetService.getAllUsersTweets(cookie.load("username")).then((res) => {
          console.log(res);
          const items = res.data;
          this.setState({ items });
        });
      }
    });
  }

  render() {
    if (this.state.reply)
      return (
        <Redirect
          to={{
            pathname: "/replyTweet",
            state: {
              isLoggedIn: true,
              id: this.state.id,
            },
          }}
        />
      );
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
              <Card.Body>
                <Card.Title>{items.message}</Card.Title>
                <Card.Text>{items.likes}</Card.Text>
                {items.replyTweets &&
                  items.replyTweets.map((replyTweet) => (
                    <Container>
                      <Row>
                        <Col>
                          <Card.Title>Replies</Card.Title>
                        </Col>
                        <Col>
                          <Card.Text>{replyTweet.username}</Card.Text>
                        </Col>
                        <Row>
                          <Card.Text>{replyTweet.message}</Card.Text>
                          <Col>
                            <Card.Text>{replyTweet.postDate}</Card.Text>
                          </Col>
                        </Row>
                      </Row>
                    </Container>
                  ))}
              </Card.Body>
              <Card.Body>
                <Button onClick={() => this.handleReply(items.id)}>
                  Reply
                </Button>
                <Button
                  disabled={items.liked}
                  onClick={() => {
                    this.handleOnLike(items.id);
                  }}
                >
                  Like
                </Button>
              </Card.Body>
            </Card>
          ))}
        </CardColumns>
      </Container>
    );
  }
}

export default Item;
