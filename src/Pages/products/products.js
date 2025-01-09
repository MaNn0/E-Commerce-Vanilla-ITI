import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./products.css";

// Fetch data from the server
export const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3000/products");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    // Display an error message to the user
    const productsContainer = document.querySelector(".products");
    if (productsContainer) {
      productsContainer.innerHTML = `<p class="text-danger">Failed to load products. Please try again later.</p>`;
    }
    return []; // Return an empty array to avoid breaking the app
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
            <h5 class="card-title">${product.price} $</h5>
          </div>
          <div class="hiddenBody">
            <h5 class="card-title">${product.title}</h5>
            <a href="/src/Pages/products/productdetails/productdetails.html?id=${product.id}" class="btn btn-primary">View Details</a>
            <button type="button" class="btn btn-success btnCart" productData=${product.id} aria-label="Add to Cart">
              Add to Cart
            </button>     
          </div>
        </div>
      `
    )
    .join("");
};

// Add product to cart
const addToCart = (productId, products) => {
  const product = products.find((p) => p.id == productId);

  const existingProducts =
    JSON.parse(localStorage.getItem("cartProducts")) || [];

  const productIndex = existingProducts.findIndex((p) => p.id === productId);
  if (productIndex !== -1) {
    existingProducts[productIndex].quantity += 1;
  } else {
    product.quantity = 1;
    existingProducts.push(product);
  }

  localStorage.setItem("cartProducts", JSON.stringify(existingProducts));
  console.log("Product added to cart:", product);
};

// Initialize the app
const initializeApp = async () => {
  const fetchedData = await fetchData();
  const productsContainer = document.querySelector(".products");
  const categorySelect = document.querySelector(".productCategory");
  const brandSelect = document.querySelector(".productBrand");
  const sortSelectByPrice = document.querySelector(".sortProductByPrice");
  const sortSelectByTitle = document.querySelector(".sortProduct");

  // Check if required elements exist
  if (
    !productsContainer ||
    !categorySelect ||
    !brandSelect ||
    !sortSelectByPrice ||
    !sortSelectByTitle
  ) {
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

  // Populate brand dropdown
  const uniqueBrands = [
    ...new Set(fetchedData.map((product) => product.brand)),
  ];
  uniqueBrands.forEach((brand) => {
    const option = document.createElement("option");
    option.value = brand;
    option.textContent = brand;
    brandSelect.appendChild(option);
  });

  // Handle filtering and sorting
  const updateProducts = () => {
    const selectedCategory = categorySelect.value;
    const selectedBrand = brandSelect.value;
    const sortPrice = sortSelectByPrice.value;
    const sortTitle = sortSelectByTitle.value;

    let filteredProducts = fetchedData.filter((product) => {
      return (
        (!selectedCategory || product.category === selectedCategory) &&
        (!selectedBrand || product.brand === selectedBrand)
      );
    });

    filteredProducts.sort((a, b) => {
      if (sortPrice === "ascending") return a.price - b.price;
      if (sortPrice === "descending") return b.price - a.price;
      if (sortTitle === "A-Z") return a.title.localeCompare(b.title);
      if (sortTitle === "Z-A") return b.title.localeCompare(a.title);
      return 0;
    });

    renderProducts(filteredProducts, productsContainer);
  };

  // Add event listeners for filtering and sorting
  categorySelect.addEventListener("change", updateProducts);
  brandSelect.addEventListener("change", updateProducts);
  sortSelectByPrice.addEventListener("change", updateProducts);
  sortSelectByTitle.addEventListener("change", updateProducts);

  // Set default category from URL params
  const categoryParams = new URLSearchParams(window.location.search);
  const paramsValue = categoryParams.get("category");
  if (paramsValue && uniqueCategories.includes(paramsValue)) {
    categorySelect.value = paramsValue;
    updateProducts(); // Apply the filter immediately
  }
};

// Check if the current page is the products page
const currentPath = window.location.pathname;
if (currentPath.endsWith("products.html")) {
  document.addEventListener("DOMContentLoaded", initializeApp);
}
