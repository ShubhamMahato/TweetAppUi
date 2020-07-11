import React from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import "./signup.css";
import { Alert } from "react-bootstrap";
import userService from "../../service/user-service";
import { Redirect } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
const SIGNUP_SUCCESS = "Signup successful.";

const SIGNUP_ERROR = "Please try again later.";

function passwordValidate(pass) {
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})"
  );
  if (strongRegex.test(pass)) {
    return false;
  } else {
    return true;
  }
}

function validate(state) {
  const errors = [];

  if (state.name === "") {
    errors.push("First name is required");
  }
  if (state.mobile === "") {
    errors.push("Mobile Number is required");
  }
  if (state.email.length < 5) {
    errors.push("Email should be at least 5 charcters long");
  }
  if (state.email.split("").filter((x) => x === "@").length !== 1) {
    errors.push("Email should contain a @");
  }
  if (state.email.indexOf(".") === -1) {
    errors.push("Email should contain at least one dot");
  }

  if (state.password.length < 6 || passwordValidate(state.password)) {
    errors.push("Password should be at least 6 characters long");
  }

  return errors;
}
export default class SignupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      hiddenPassword: true,
      signupSuccess: false,
      signupError: false,
      name: "",
    };
  }
  handleEmailChange = (eve) => {
    this.setState({ email: eve.target.value });
  };
  handleCityChange = (eve) => {
    this.setState({ city: eve.target.value });
  };
  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };
  handleFirstNameChange = (e) => {
    if (e.target.value.match("^[A-Za-z]*$") != null) {
      this.setState({ name: e.target.value });
    } else {
      this.setState({ error: "Enter a valid firstname" });
    }
  };

  togglePassword = (e) => {
    this.setState({ hiddenPassword: !this.state.hiddenPassword });
  };

  submitSignUpRequest = (event) => {
    event.preventDefault();
    const state = this.state;
    const errors = validate(state);
    event.target.className += " was-validated";

    if (errors.length > 0) {
      return;
    } else {
      var signupData = {
        name: this.state.name,
        city: this.state.city,
        email: this.state.email,
        password: this.state.password,
      };
      console.log(signupData);
      trackPromise(
        userService.signup(signupData).then((response) => {
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
    }
  };

  render() {
    const hideiconstyle = this.state.hiddenPassword ? { display: "none" } : {};
    const showiconstyle = !this.state.hiddenPassword ? { display: "none" } : {};
    if (this.state.signupSuccess)
      return (
        <Redirect
          to={{
            pathname: "/validate",
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
                <h3>Sign Up</h3>
                <br />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formSignUpFirstName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    onChange={this.handleFirstNameChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide First Name
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formSignUpLastName">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter city"
                    onChange={this.handleCityChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide city Name
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formSignUpEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={this.handleEmailChange}
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
                  Sign Up
                </Button>
              </Col>
            </Row>
          </form>
        </Container>
      </React.Fragment>
    );
  }
}
