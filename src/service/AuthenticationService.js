import Cookies from "js-cookie";

class AuthService {
  isUserLoggedIn() {
    let user = Cookies.get("user_id");
    if (user == null) return false;
    return true;
  }
}

export default new AuthService();
