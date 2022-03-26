const formValues = () => {
  return {
    animalName: document.querySelector("#name").value,
    description: document.querySelector("#description").value,
    imgSrc: document.querySelector("#imgSrc").value,
  };
};

let id = null;

document.querySelector("#submit").addEventListener("click", () => {
  const animal = formValues();
  if (id) {
    animal.id = id;
  }

  // A POST Request. We use this to send some kind of data to the backend.
  // The body itself is the data we provide.
  // Headers give additional info about the request. Content Type tells the backend what type of format the data (body) is.
  fetch("http://localhost:5000/animals", {
    method: "POST",
    body: JSON.stringify(animal),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((message) => {
      console.log(message);
      setTimeout(() => {
        window.location.href = "../animals/index.html";
      }, 1000);
    });
});
