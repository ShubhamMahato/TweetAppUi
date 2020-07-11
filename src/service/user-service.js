import Axios from "axios";

const USER_API_BASE_URL = "http://localhost:8001/userdetails/";
const LOGIN = "Login";
const SIGNUP = "signUp";
const VALIDATE = "validateOtp";
// const HEADERS = {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer '
//   }

class UserService {
  login(email, password) {
    var loginObj = {
      username: email,
      password: password,
    };
    return Axios.post(USER_API_BASE_URL + LOGIN, loginObj);
  }

  signup(userData) {
    return Axios.post(USER_API_BASE_URL + SIGNUP, userData);
  }
  validate(validateData) {
    console.log(validateData);
    return Axios.post(USER_API_BASE_URL + VALIDATE, validateData);
  }
}

export default new UserService();
