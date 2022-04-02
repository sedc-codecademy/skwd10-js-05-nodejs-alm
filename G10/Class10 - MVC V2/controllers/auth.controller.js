const AuthModel = require("../models/auth.model");

const am = new AuthModel();

class AuthController {
  login(credentials) {
    return am.loginUser(credentials);
  }
}

module.exports = AuthController;
