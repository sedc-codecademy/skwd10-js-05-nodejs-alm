const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const emitter = new MyEmitter();

//BASICS OF EVENTS

//Adding listeners
emitter.on("event", () => {
  console.log("Event Emitted");
});

//Emitting an event
// emitter.emit("event");

emitter.on("data", data => {
  console.log(data);
});

// emitter.emit("data", "this is a string");
// emitter.emit("data", ["Boris", "Slavko", "George"]);

//Async event
// setTimeout(() => {
//   emitter.emit("event");
// }, 2500);

//Event listeners can be chained
emitter
  .on("event-one", () => console.log("event one fired"))
  .on("event-two", () => console.log("event two fired"));

// emitter.emit("event-two");
// emitter.emit("event-one");

//Multiple arguments in event listeners and event emitters
const fullNameListener = (firstName, lastName) => {
  console.log(`Fullname is: ${firstName} ${lastName}`);
};

emitter.on("full-name", fullNameListener);

// emitter.emit("full-name", "George", "Dimitrov");

emitter.on("sum-three", (a, b, c) => {
  console.log(a + b + c);
});

// emitter.emit("sum-three", 3, 2);

//This in event listener custom function

// emitter.on("function", function () {
//   console.log(this);
// });
// emitter.on("arrow", () => {
//   console.log(this);
// });

// emitter.emit("function");
// emitter.emit("arrow");

//Different ways of listening to events
emitter.once("once", () => {
  console.log("Once event fired");
});

//Same named events are fired in order of how they are written in the file from top to bottom
emitter
  .on("message", () => {
    console.log("first msg event listener");
  })
  .on("message", () => {
    console.log("second msg event listener");
  })
  .on("message", () => {
    console.log("third msg event listner");
  })
  .prependListener("message", () => {
    console.log("prepend listener fired");
  })
  .on("message", () => {
    console.log("forth msg event listener");
  })
  .prependOnceListener("message", () => {
    console.log("prepend once listener");
  });
// emitter.emit("message");

//Nested events
emitter.on("inside", () => {
  console.log("from the inside listener");
});
emitter.on("outside", () => {
  emitter.emit("inside");
});

emitter.emit("outside");
