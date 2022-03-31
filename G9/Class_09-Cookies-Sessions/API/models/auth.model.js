const textService = require("../textService.const");

class AuthModel {
  loginWithUsernameAndPassword(credentials) {
    return new Promise((resolve, reject) => {
        const text = textService.readDataFromDb("db.json");
        const dbData = JSON.parse(text);

      const filtered = dbData.filter((user) => {
        if (
          credentials.username === user.username &&
          credentials.password === user.password
        ) {
          return true;
        }
        return false;
      });

      if (filtered && filtered.length > 0) {
        resolve({
          message: "User logged in!",
        });
      } else {
        reject({
          message: "Unknown username or password!",
        });
      }
    });
  }
}

module.exports = AuthModel;
