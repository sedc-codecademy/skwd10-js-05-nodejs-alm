const fileService = require("../services/data.service");
const path = require("path");

const userPath = path.join(__dirname, "..", "data", "users.json");

class AuthModel {
  loginUser(credentials) {
    return new Promise((resolve, reject) => {
      const usersDb = JSON.parse(fileService.readDataFromDb(userPath));

      const user = usersDb.users.find(
        (userOfDb) =>
          userOfDb.username === credentials.username &&
          userOfDb.password === credentials.password
      );

      if (user) {
        resolve({
          message: "User is logged in",
          user,
        });
      } else {
        reject({
          message: "User not found with those credentials",
        });
      }
    });
  }
}

module.exports = AuthModel;
