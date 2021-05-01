import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./signup.css";
import TweetService from "../../service/tweet-service";
import { trackPromise } from "react-promise-tracker";
import cookie from "react-cookies";

import { Redirect } from "react-router";
import NavBarLogged from "../NavigationCompnents/LoggedInNav/NavBarLogged";
const SIGNUP_ERROR = "Please try again later.";

export default class EditTweet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.location.state.id,
      message: this.props.location.state.message,
      error: "",
      hiddenPassword: true,
      signupSuccess: false,
      signupError: false,
    };
  }
  handleMessageHandler = (eve) => {
    this.setState({ message: eve.target.value });
  };
  submitSignUpRequest = (event) => {
    event.preventDefault();
    event.target.className += " was-validated";

    var signupData = {
      message: this.state.message,
    };
    console.log(this.state);
    console.log(this.state.message, signupData);
    trackPromise(
      TweetService.editTweet(
        cookie.load("username"),
        this.state.id,
        signupData
      ).then((response) => {
        if (response.status === 200) {
          this.setState({
            signupSuccess: true,
            signupError: false,
            signupMessage: response.message,
          });
        }
      })
    ).catch((err) => {
      var errorResponse = "";
      if (err.response) errorResponse = err.response.data.message;
      else errorResponse = SIGNUP_ERROR;

      this.setState({
        signupError: true,
        signupSuccess: false,
        errorMessage: errorResponse,
      });
    });
  };

  render() {
    if (this.state.signupSuccess)
      return (
        <Redirect
          to={{
            pathname: "/loggedin",
          }}
        />
      );
    return (
      <React.Fragment>
        <Container fluid>
          <NavBarLogged />
          <Container>
            <form
              className="signup-form"
              onSubmit={this.submitSignUpRequest}
              noValidate
            >
              <Row>
                <Col>
                  <h3>Edit Tweet</h3>
                  <br />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Message"
                      onChange={this.handleMessageHandler}
                      value={this.state.message}
                      required
                    />
                    <div className="invalid-feedback">
                      Please provide Message
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    variant="outline-dark"
                    type="submit"
                    className="btn-signup"
                    size="lg"
                    block
                  >
                    Post Tweet
                  </Button>
                </Col>
              </Row>
            </form>
          </Container>
        </Container>
      </React.Fragment>
    );
  }
}
