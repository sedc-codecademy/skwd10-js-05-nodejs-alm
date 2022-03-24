const fs = require("fs");

// *** WRITE TO FILES ***

function writeToFileSync(path, content) {
  fs.writeFileSync(path, content);
  console.log("We wrote in file");
}

// *** APPEND TO FILES ***
function appendToFileSync(path, content) {
  fs.appendFileSync(path, content);
}

// *** DELETE FILES ***
function deleteFileSync(path) {
  fs.unlinkSync(path);
}

// *** RENAME FILES ***
function renameFileSync(path, newPath) {
  fs.renameSync(path, newPath);
}

// *** READ FILES **
function readFileSync(path) {
  return fs.readFileSync(path, { encoding: "utf-8" });
}

module.exports = {
  writeToFileSync,
  appendToFileSync,
  deleteFileSync,
  readFileSync,
  renameFileSync,
};
