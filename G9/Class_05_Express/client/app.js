const carouselContainer = document.querySelector(".carousel-inner");

const carouselImage = (imgSrc, label, description, active) => {
  return `<div class="carousel-item ${active ? "active" : ""}">
    <img src="${imgSrc}" alt="${label}" class="d-block w-100">
    <div class="carousel-caption d-none d-md-block">
        <h5>${label}</h5>
        <p>${description}</p>
    </div>
</div>`;
};

fetch("http://localhost:5000")
  .then((res) => res.json())
  .then((slides) => {
    console.log(slides);
    carouselContainer.innerHTML = "";
    slides.forEach((slide, index) => {
      const { imgSrc, label, description } = slide;
      const active = index === 0;
      carouselContainer.innerHTML += carouselImage(
        imgSrc,
        label,
        description,
        active
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
