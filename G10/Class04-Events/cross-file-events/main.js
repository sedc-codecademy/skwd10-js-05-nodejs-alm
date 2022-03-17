const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const emitter = new MyEmitter();

emitter.on("event", msg => {
  console.log(msg);
  console.log("=".repeat(50));
  console.log("Fired from the main file");
});

module.exports = emitter;
