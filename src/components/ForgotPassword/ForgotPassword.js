import React from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import "./signup.css";
import { Alert } from "react-bootstrap";
import userService from "../../service/user-service";
import { Redirect } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
const SIGNUP_SUCCESS = "Signup successful.";

const SIGNUP_ERROR = "Please try again later.";

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginId: "",
      password: "",
      hiddenPassword: true,
      signupSuccess: false,
      signupError: false,
      signupMessage: "",
      confirmPassword: "",
    };
  }
  handleLoginIdChange = (eve) => {
    this.setState({ loginId: eve.target.value });
  };
  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };
  handleConfirmPasswordChange = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };

  togglePassword = (e) => {
    this.setState({ hiddenPassword: !this.state.hiddenPassword });
  };

  submitSignUpRequest = (event) => {
    event.preventDefault();
    event.target.className += " was-validated";

    console.log(
      this.state.loginId,
      this.state.password,
      this.state.confirmPassword
    );
    trackPromise(
      userService
        .forgotpassword(
          this.state.loginId,
          this.state.password,
          this.state.confirmPassword
        )
        .then((response) => {
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
    const hideiconstyle = this.state.hiddenPassword ? { display: "none" } : {};
    const showiconstyle = !this.state.hiddenPassword ? { display: "none" } : {};
    if (this.state.signupSuccess)
      return (
        <Redirect
          to={{
            pathname: "/Login",
            state: {
              isLoggedIn: true,
              email: this.state.email,
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
                <h3>ForgotPassword</h3>
                <br />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formUserName">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    onChange={this.handleLoginIdChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide username
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formSignUpPassword">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="Password"
                      type={this.state.hiddenPassword ? "password" : "text"}
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                      required
                    />
                    <InputGroup.Append>
                      <InputGroup.Text
                        onClick={this.togglePassword}
                        style={showiconstyle}
                      >
                        <i className="fa fa-eye" aria-hidden="true"></i>
                      </InputGroup.Text>
                      <InputGroup.Text
                        onClick={this.togglePassword}
                        style={hideiconstyle}
                      >
                        <i className="fa fa-eye-slash" aria-hidden="true"></i>
                      </InputGroup.Text>
                    </InputGroup.Append>
                    <div className="invalid-feedback">
                      Password must be 6 characters long It should contain a
                      number and <br></br> contain , uppercase and lowercase
                      letter
                    </div>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formSignUpPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="Password"
                      type={this.state.hiddenPassword ? "password" : "text"}
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      value={this.state.confirmPassword}
                      onChange={this.handleConfirmPasswordChange}
                      required
                    />
                    <InputGroup.Append>
                      <InputGroup.Text
                        onClick={this.togglePassword}
                        style={showiconstyle}
                      >
                        <i className="fa fa-eye" aria-hidden="true"></i>
                      </InputGroup.Text>
                      <InputGroup.Text
                        onClick={this.togglePassword}
                        style={hideiconstyle}
                      >
                        <i className="fa fa-eye-slash" aria-hidden="true"></i>
                      </InputGroup.Text>
                    </InputGroup.Append>
                    <div className="invalid-feedback">
                      Password must be 8 characters long It should contain a
                      number and <br></br> contain , uppercase and lowercase
                      letter
                    </div>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Alert
                  variant="success"
                  className={!this.state.signupSuccess ? "hidden" : ""}
                >
                  {this.state.signupSuccess || SIGNUP_SUCCESS}
                </Alert>
                <Alert
                  variant="danger"
                  className={!this.state.signupError ? "hidden" : ""}
                >
                  {this.state.errorMessage || SIGNUP_ERROR}
                </Alert>
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
                  Change
                </Button>
              </Col>
            </Row>
          </form>
        </Container>
      </React.Fragment>
    );
  }
}
