import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./validateotp.css";
import { Alert } from "react-bootstrap";
import userService from "../../service/user-service";
import { Redirect } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";

const SIGNUP_ERROR = "Please try again later.";

export default class ValidateOtp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.location.state.email,
      otp: "",
    };
  }
  handleOtpChange = (eve) => {
    this.setState({ otp: eve.target.value });
  };

  submitSignUpRequest = (event) => {
    event.preventDefault();

    var validateData = {
      email: this.state.email,
      otp: this.state.otp,
    };
    trackPromise(
      userService.validate(validateData).then((response) => {
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
            pathname: "/",
            state: {
              isLoggedIn: true,
            },
          }}
        />
      );

    return (
      <React.Fragment>
        <Container>
          <form
            className="signup-form"
            onSubmit={this.submitSignUpRequest}
            noValidate
          >
            <Row>
              <Col>
                <h3>Validated Otp</h3>
                <Alert variant="success">
                  Enter the Otp sent to your email
                </Alert>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formSignUpEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={this.state.email}
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide a valid email
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formSignUpLastName">
                  <Form.Label>Otp</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter otp"
                    onChange={this.handleOtpChange}
                    required
                  />
                  <div className="invalid-feedback">Please provide otp</div>
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
                  Submit
                </Button>
              </Col>
            </Row>
          </form>
        </Container>
      </React.Fragment>
    );
  }
}
