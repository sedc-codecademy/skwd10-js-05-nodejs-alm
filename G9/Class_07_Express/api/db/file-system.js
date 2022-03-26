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
  // Read the array from the database
  let items = JSON.parse(getData(file));
  // Remove the item we want to delete
  items = items.filter((item) => item.id !== id);
  // Overwrite the items in the database
  return fs.writeFileSync(
    path.join(__dirname, file),
    JSON.stringify(items),
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
};

const updateData = (id, data, file) => {
  let items = JSON.parse(getData(file));
  let index = items.findIndex((item) => item.id === id);
  if (!index && index !== 0) {
    throw new Error("Animal does not exist in the Database!");
  }
  items[index] = { ...items[index], ...data };
  fs.writeFileSync(path.join(__dirname, file), JSON.stringify(items), (err) => {
    if (err) {
      throw err;
    }
  });
  return items[index];
};

module.exports = {
  getData,
  addData,
  deleteData,
  updateData,
};
