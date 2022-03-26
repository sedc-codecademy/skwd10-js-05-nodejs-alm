const animalsContainer = document.querySelector(".row");

let deleteButtons = [];
let editButtons = [];

const animalCard = (id, imgSrc, animalName, description) => {
  return `
    <div class="col-md-6">
        <div class="card" style="width: 18rem;">
            <img src="${imgSrc}" class="card-img-top" alt="${animalName}">
            <div class="card-body">
            <h5 class="card-title">${animalName}</h5>
            <p class="card-text">${description}</p>
            <button type="button" class="btn btn-danger" id="delete__${id}">Delete</button>
            <button type="button" class="btn btn-warning" id="edit__${id}">Edit</button>
            </div>
        </div>
    </div>
`;
};

const getAnimals = (queryParams = "") => {
  // Express expects query parameters that further define the request
  // Query params can be found in the URL, after the ? mark
  // Express keeps these query parameters in the request object, under the Request.query parameter stored as key-value pairs.
  fetch(`http://localhost:5000/animals?${queryParams}`)
    .then((res) => res.json())
    .then((animals) => {
      animalsContainer.innerHTML = "";

      animals.forEach((animal) => {
        const { id, imgSrc, animalName, description } = animal;
        animalsContainer.innerHTML += animalCard(
          id,
          imgSrc,
          animalName,
          description
        );

        deleteButtons = document.querySelectorAll(".btn-danger");
        editButtons = document.querySelectorAll(".btn-warning");
      });

      Array.from(deleteButtons).forEach((button) => {
        button.addEventListener("click", (e) => {
          deleteAnimal(e.target.id.split("__")[1]);
        });
      });

      Array.from(editButtons).forEach((button) => {
        button.addEventListener("click", (e) => {
          editAnimal(e.target.id.split("__")[1]);
        });
      });
    });
};

getAnimals("pageSize=5");

document.querySelector("#get-all").addEventListener("click", () => {
  getAnimals();
});

document.querySelector("#sort-by-name").addEventListener("click", () => {
  getAnimals("sortBy=animalName");
});

document.querySelector("#sort-by-description").addEventListener("click", () => {
  getAnimals("sortBy=description");
});

const deleteAnimal = (id) => {
  console.log("Delete:", id);
};

const editAnimal = (id) => {
  console.log("Edit:", id);
};
