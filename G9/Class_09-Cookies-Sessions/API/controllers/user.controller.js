const UserModel = require("../models/user.model");
const userModel = new UserModel();

class UserController {
  getUsers() {
    return userModel.getUsers();
  }
}

module.exports = UserController;
