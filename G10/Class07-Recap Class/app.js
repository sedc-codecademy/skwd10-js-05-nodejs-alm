// FILESTYSTEM

/**
 * Read files
 * Create files
 * Update files
 * Delete files
 * Rename files
 */

const fs = require("fs");
const path = require("path");

const pathToSomething = path.join(__dirname, "something.txt");
console.log(pathToSomething);

// *** WRITE TO FILES ***

// SYNCRONUS SYNTAX
// console.log("1");
// function writeToFileSync() {
//   console.log("2");
//   fs.writeFileSync(pathToSomething, "What is going on?");
//   console.log("We wrote in file");
// }
// writeToFileSync();
// console.log("3");

// ASYNC SYNTAX

// console.log("1");
// fs.writeFile(pathToSomething, "What is going on ASYNC?", (error) => {
//   console.log("2");
//   if (error) throw new Error("Something went wrong");
//   console.log("File is written");
// });

// console.log("3");

// *** APPEND TO FILES ***
// fs.appendFileSync(pathToSomething, "\nAnother line");

// *** DELETE FILES ***
// fs.unlinkSync(pathToSomething);

// *** RENAME FILES ***
// fs.renameSync(pathToSomething, "helloworld.txt");

// USING OUR FS MODULE

const fsService = require("./writeToFile.service.js");

// ** APPEND
fsService.appendToFileSync(pathToSomething, "New content");
// ** WRITE
fsService.writeToFileSync("dummy.txt", "Hello world");

// What is the case when using json? =)

const jsonFilePath = path.join(__dirname, "random.json");

fsService.writeToFileSync(
  jsonFilePath,
  JSON.stringify([{ firstName: "George", lastName: "Dimitrov" }])
);

// When we try to append to a JSON file format
// It will create it invalid

// fsService.appendToFileSync(
//   jsonFilePath,
//   JSON.stringify([{ firstName: "Borche", lastName: "Borisovski" }])
// );

/**
 * When we want to use and store in json files,
 * we read the json, mutate it, and save it back
 */

const readFromJson = fsService.readFileSync(jsonFilePath);
const parsedJson = JSON.parse(readFromJson);
console.log(parsedJson);

parsedJson.push({ firstName: "Borche", lastName: "Borisovski" });
console.log("NEW VALUES", parsedJson);

fsService.writeToFileSync(jsonFilePath, JSON.stringify(parsedJson));

// **** CUSTOM EVENTS ****

const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}

const emitter = new MyEmitter();

emitter.on("hello_world", (someText) => {
  console.log("Hello world event is emmited with text:", someText);
});

emitter.emit("hello_world", "Hello beautiful people");

// Event emmiter can trigger a function

const greetings = (greetingsMsg) => `Hello ${greetingsMsg}`;

emitter.on("greet", (msg) => {
  console.log(greetings(msg));
});

emitter.emit("greet", "Hello world folks");

// EXERCISE **

/**
 * Create an event called "write_to_file"
 * Whenever this event is emmited, using the fsService you should write to a file called evenNumbers.txt
 * Create a function that will accept array of numbers as parametar
 * If the number is EVEN then we should write it in the file evenNumbers.txt
 */

// let array = [2 ,4 ,6, 1, 3,7,10]
// 2,
// 4,
// 6,
// 10

let someArr = [4, 6, 7, 5, 9, 3];
emitter.on("write_to_file", (array) => {
  for (let number of array) {
    if (number % 2 === 0) {
      fs.appendFileSync("evenNumbers.txt", `\n${number}`);
    }
  }
});

emitter.emit("write_to_file", someArr);
