const textService = require("../textService.const");

class UserModel {
  getUsers() {
    return new Promise((resolve, reject) => {
      const text = textService.readDataFromDb("db.json");
      const dbData = JSON.parse(text);
      resolve(dbData);
    });
  }
}

module.exports = UserModel;