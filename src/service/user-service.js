import Axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/v1.0/tweets/";
const LOGIN = "login";
const SIGNUP = "register";
const VALIDATE = "validateOtp";
const getAllUser = "users/all";
const FORGOT = "/forgot";

// const HEADERS = {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer '
//   }

class UserService {
  login(email, password) {
    var UserLoginRequest = {
      email: email,
      password: password,
    };
    return Axios.post(USER_API_BASE_URL + LOGIN, UserLoginRequest);
  }

  signup(userData) {
    return Axios.post(USER_API_BASE_URL + SIGNUP, userData);
  }
  validate(validateData) {
    console.log(validateData);
    return Axios.post(USER_API_BASE_URL + VALIDATE, validateData);
  }
  getAllUsers() {
    return Axios.get(USER_API_BASE_URL + getAllUser);
  }

  forgotpassword(username, password, confirmPassword) {
    var changePassword = {
      newPassword: password,
      confirmPassword: confirmPassword,
    };
    return Axios.post(USER_API_BASE_URL + username + FORGOT, changePassword);
  }
}

export default new UserService();
