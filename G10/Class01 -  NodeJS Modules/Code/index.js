console.log("Connected");

// const firstName = "George";
// const lastName = "Dimitrov";

// console.log(`Fullname is: ${firstName} ${lastName}`);

console.log("Result: ", 25 * 2);

// let is the fix for var

function printFullName() {
  var firstName = "Slavko";
  var lastName = "Stojchevski";

  console.log(`Fullname from function: ${firstName} ${lastName}`);
}
printFullName();
let firstName = "George";
let lastName = "Dimitrov";

console.log(`Fullname is from global scope: ${firstName} ${lastName}`);

const multiplyNumbers = (numberOne, numberTwo) => {
  return numberOne * numberTwo;
};

console.log(`Result of mulply is:`, multiplyNumbers(3, 5));

const favouriteMovies = ["Harry Potter", "Lord of the rings", "The Hobbit"];

const printMovies = (movieArray) => {
  movieArray.forEach((movie) => console.log(movie));
};

printMovies(favouriteMovies);

// used when we require only one export =)
// const sumNumbers = require("./calculator");

// const calculator = require("./calculator");

// const resultOfTwoNumbers = calculator.sumNumbers(2, 6);

// console.log(resultOfTwoNumbers);

// const resultOfDividedNumbers = calculator.divideNumbers(10, 5);
// console.log(resultOfDividedNumbers);

const { sumNumbers, divideNumbers } = require("./calculator");

const resultOne = sumNumbers(2, 4);
const resultTwo = divideNumbers(10, 3);

console.log(resultOne);
console.log(resultTwo);

// function printRandom() {
//   if (true) {
//     let a = "Hello World";
//     var b = "Hello World with VAR";
//   }
//   console.log(b);
//   console.log(a);
// }

// printRandom();
