import React, { Component } from "react";

import { Redirect } from "react-router";
import {
  Card,
  Container,
  CardColumns,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import TweetService from "../../service/tweet-service";
import cookie from "react-cookies";
import NavBarLogged from "../NavigationCompnents/LoggedInNav/NavBarLogged";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
class MyTweets extends Component {
  state = {
    items: [],
    username: "",
    redirect: false,
    reply: false,
    message: "",
  };
  handleDelete(id) {
    this.setState({
      items: this.state.items.filter((x) => x.id != id),
    });

    TweetService.deleteUsersTweets(cookie.load("username"), id).then((res) => {
      if (res.status === 200) {
        alert("deleted the post");
      }
    });
  }

  handleOnLike(id) {
    TweetService.likeUsersTweets(cookie.load("username"), id).then((res) => {
      if (res.status === 200) {
        alert("liked the post");
        TweetService.getAllUsersTweets(cookie.load("username")).then((res) => {
          console.log(res);
          const items = res.data;
          this.setState({ items });
        });
      }
    });
  }
  handleReply(id) {
    console.log("jkhgdfsdfghjkj");
    this.setState({
      id: id,
      reply: true,
    });
  }

  handleEdit(id, tweet) {
    console.log("jkhgdfsdfghjkj");
    this.setState({
      id: id,
      redirect: true,
      message: tweet,
    });
  }

  componentDidMount() {
    TweetService.getAllUsersTweets(cookie.load("username")).then((res) => {
      console.log(res);
      const items = res.data;
      this.setState({ items });
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
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
    if (this.state.redirect)
      return (
        <Redirect
          to={{
            pathname: "/editPost",
            state: {
              message: this.state.message,
              id: this.state.id,
            },
          }}
        />
      );
    return (
      <Container fluid>
        <NavBarLogged />

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
                      <Container key={replyTweet.id}>
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
                  <Button
                    onClick={() => this.handleEdit(items.id, items.message)}
                  >
                    Edit
                  </Button>
                </Card.Body>
                <Card.Footer>
                  <Button
                    onClick={() => {
                      this.handleDelete(items.id);
                    }}
                  >
                    Delete
                  </Button>
                </Card.Footer>
              </Card>
            ))}
          </CardColumns>
        </Container>
      </Container>
    );
  }
}

export default MyTweets;
