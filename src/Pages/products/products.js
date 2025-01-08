import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./products.css";

// Fetch data from the server
export const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3000/products");
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Render products to the DOM
const renderProducts = (data, container) => {
  container.innerHTML = data
    .map(
      (product) => `
      <div class="card productCards" style="width: 18rem;">
        <img src="${product.image}" class="card-img-top" alt="${product.title}">
        <div class="card-body visibleBody">
          <h5 class="card-title">${product.title}</h5>
          <h5 class="card-title">${product.price} LE</h5>
        </div>
        <div class="hiddenBody">
          <h5 class="card-title">${product.title}</h5>
          <a href="/src/Pages/products/productdetails/productdetails.html?id=${product.id}" class="btn btn-primary">View Details</a>
          <button type="button" class="btn btn-success btnCart" productData=${product.id}>Add to Cart</button>     
        </div>
      </div>`
    )
    .join("");
};

// Add product to cart
//Local Storage set we get
const addToCart = (productId, products) => {
  const product = products.find((p) => p.id == productId);

  //brg3o mn string le object local storage msh bt2ra object [object object]

  const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

  //add al product al new + old by Spread Operator

  const productIndex = existingProducts.findIndex((p) => p.id === productId);
  if (productIndex !== -1) {
    existingProducts[productIndex].quantity += 1;
  } else {
    product.quantity = 1;
    existingProducts.push(product);
  }

  localStorage.setItem("products", JSON.stringify(existingProducts));
  console.log("Product added to cart:", product);
};

// Initialize the app
// So i can put a validation an law al current Page hya .form-select 3shan error an lma agyb al fetch bysh7l al model kolo
// fe .form-select  bt3ml error 3mlt rap le kol haga

const initializeApp = async () => {
  const fetchedData = await fetchData();
  const productsContainer = document.querySelector(".products");
  const categorySelect = document.querySelector(".form-select");

  // Check if required elements exist
  //3shan kan bygyly Error ano msh Loaded or msh mwgood SomeHow

  if (!productsContainer || !categorySelect) {
    console.error("Required DOM elements not found.");
    return;
  }

  // Render all products initially

  renderProducts(fetchedData, productsContainer);

  // Add event listener for cart buttons

  productsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("btnCart")) {
      const productId = event.target.getAttribute("productData");
      addToCart(productId, fetchedData);
    }
  });

  // Populate category dropdown
  const uniqueCategories = [
    ...new Set(fetchedData.map((product) => product.category)),
  ];
  uniqueCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });

  // Filter products by category
  // if Category ==
  categorySelect.addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    const filteredProducts = selectedCategory
      ? fetchedData.filter((product) => product.category === selectedCategory)
      : fetchedData;
    renderProducts(filteredProducts, productsContainer);
  });
};

// Check if the current page is the products page
// 3shan law m3mltsh keda bygyly .selectform Not found 3shan ana bgyb al data bta3t al product mn al export fa al model bysht8l
const currentPath = window.location.pathname;

if (currentPath === "/src/Pages/products/products.html") {
  // Initialize the app after the DOM is loaded
  // 3shan bygyly Bug ano msh byt3mlo Load ref:=>https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event

  document.addEventListener("DOMContentLoaded", initializeApp);
}
