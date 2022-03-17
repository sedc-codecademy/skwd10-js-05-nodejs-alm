const results = document.getElementById("results");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productDate = document.getElementById("productDate");
const myBtn = document.getElementById("myBtn");

const PRODUCTS_URL = "http://localhost:3000/products";

const fetchProducts = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    printProducts(result);
  } catch (error) {
    console.log(`Error occured my friiiend :(`);
  }
};

window.addEventListener("load", () => {
  fetchProducts(PRODUCTS_URL);
});

const printProducts = (data) => {
  results.innerHTML = "";

  data.products.forEach((product) => {
    results.innerHTML += `
            <ul>
                <li>${product.productName}</li>
                <li>${product.productPrice}</li>
                <li>${product.date}</li>
            
            </ul>
        
        `;
  });
};

class Product {
  constructor(productName, productPrice, productDate) {
    this.productName = productName;
    this.productPrice = productPrice;
    this.date = productDate;
  }
}

const createProduct = (productName, productPrice, productDate) => {
  return new Product(productName, productPrice, productDate);
};

myBtn.addEventListener("click", async (event) => {
  console.log(event);
  //the default event of a button is SUBMIT
  event.preventDefault();

  const product = createProduct(
    productName.value,
    productPrice.value,
    productDate.value
  );

  await createProductOnServer(product);
  // RE-FETCH THE LATEST DATA AGAIN =) ON EVERY ADDITION OF A PRODUCT
  fetchProducts(PRODUCTS_URL);
});

const createProductOnServer = async (product) => {
  await fetch(PRODUCTS_URL, {
    method: "POST",
    body: JSON.stringify(product),
  });
};
