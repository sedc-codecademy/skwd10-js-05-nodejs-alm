const AuthModel = require("../models/auth.model");
const authModel = new AuthModel();

class AuthController {
  loginUser(credentials) {
    return authModel.loginWithUsernameAndPassword(credentials);
  }
}

module.exports = AuthController;
