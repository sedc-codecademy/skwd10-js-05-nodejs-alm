const mathService = require("./mathService.js");
const path = require("path");
const fs = require("fs");
const crudOperations = require("./crud.js");

// let number1 = 10;
// let num2 = 5;
// console.log(mathService);
// console.log(mathService.sumTwoNumbers(number1, num2));
// console.log(mathService.substructTwoNumbers(number1, num2));
// console.log(mathService.multiplyTwoNumbers(number1, num2));
// console.log(__dirname);
// console.log(__filename);

if (!fs.existsSync(path.join(__dirname, "database"))) {
  fs.mkdirSync(path.join(__dirname, "database"));
}

crudOperations.insertRecord({ toDo: "Clean the house!", id: 1 });
// crudOperations.removeRecord("979d835c-12f1-4952-87a4-ae6b58f530aa");
// crudOperations.readRecords().then((response) => {
//   console.log(response);
// });
