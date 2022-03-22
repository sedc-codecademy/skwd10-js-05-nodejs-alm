const fs = require("fs");
const path = require("path");

const getData = (file) => {
  return fs.readFileSync(path.join(__dirname, file), (error) => {
    if (error) {
      throw error;
    }
  });
};

const addData = (data, file) => {
  // Take what's in the database, turn into a JS Array
  let items = JSON.parse(getData(file));

  // Add item to the array
  items = [...items, data];

  return fs.writeFileSync(
    path.join(__dirname, file),
    JSON.stringify(items),
    (error) => {
      if (error) {
        throw error;
      }
    }
  );
};

const deleteData = (id, file) => {

};

const updateData = (id, data, file) => {

};

module.exports = {
  getData,
  addData,
  deleteData,
  updateData,
};