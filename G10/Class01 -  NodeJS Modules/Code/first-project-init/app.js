import fromIndexJs from "./index.js";
import { personOne, printPerson } from "./random.js";

const fullName = fromIndexJs.printFullName("John Doe");
console.log(fullName);

const personPrinted = printPerson(personOne);
console.log(personPrinted);

console.log("Huraraayyy I will execute from nodemon");

console.log(fromIndexJs.sumOfNumbers(19, 5));
