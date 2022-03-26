const formValues = () => {
  return {
    animalName: document.querySelector("#name").value,
    description: document.querySelector("#description").value,
    imgSrc: document.querySelector("#imgSrc").value,
  };
};

let id = null;

document.querySelector("#submit").addEventListener("click", (e) => {
  e.preventDefault();
  const animal = formValues();
  if (id) {
    animal.id = id;
  }

  // A POST Request. We use this to send some kind of data to the backend.
  // The body itself is the data we provide.
  // Headers give additional info about the request. Content Type tells the backend what type of format the data (body) is.
  // http://localhost:5000/animals/5 OR http://localhost:5000/animals/
  fetch(`http://localhost:5000/animals/${id || ''}`, {
    method: !id? "POST" : "PUT",
    body: JSON.stringify(animal),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((message) => {
      console.log(message);
        window.location.href = "../animals/index.html";
    });
});

(() => {
  let queryParams = window.location.search;
  if (queryParams) {
    id = queryParams.split("=")[1];

    fetch(`http://localhost:5000/animals/${id}`)
      .then((res) => res.json())
      .then((animal) => {
        document.querySelector("#name").value = animal.animalName;
        document.querySelector("#description").value = animal.description;
        document.querySelector("#imgSrc").value = animal.imgSrc;
        id = animal.id;
      });
  }
})();
