import Cookies from "js-cookie";

class AuthService {
  isUserLoggedIn() {
    let user = Cookies.get("username");
    console.log(user);
    if (user === undefined) return false;
    return true;
  }
}

export default new AuthService();
