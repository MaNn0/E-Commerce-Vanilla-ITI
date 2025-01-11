import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./productdetails.css";
// import { addToCart } from "../products";
import { NavBar, fetchData, changeBtn } from "../../../assets/reusable";
document.addEventListener("DOMContentLoaded", async () => {
  // Navbar Dry  Dynamic
  NavBar("navbar");
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  console.log("🚀 ~ document.addEventListener ~ urlParams:", urlParams);
  const productid = urlParams.get("id"); // id
  console.log("🚀 ~ productid:", productid);

  // Fetch data
  const fetchedData = await fetchData();

  // Filter product by ID
  const dataToMap = fetchedData.filter((product) => product.id == productid); // Use == for loose comparison

  // Render product details
  const productsContainer = document.querySelector(".products");
  if (!productsContainer) {
    console.error("The .products element does not exist in the DOM.");
    return;
  }

  // Render the product details first
  productsContainer.innerHTML = dataToMap.length
    ? dataToMap
        .map((product) => {
          return `
          <div class="col-12 product-container">
            <!-- Product Image -->
            <div class="imgContainer col-6">
              <img src="${product.image}" class="card-img-top w-75" alt="${product.title}">
            </div>

            <!-- Product Details -->
            <div class="productDetails col-5">
              <h5 class="card-title productTitle">${product.title}</h5>
              <p class="productDescription">Description: ${product.description}</p>

              <!-- Product Specifications Table -->
              <table class="table">
                <tbody>
                  <tr>
                    <td><strong>Brand</strong></td>
                    <td>${product.brand}</td>
                  </tr>
                  <tr>
                    <td><strong>Model</strong></td>
                    <td>${product.model}</td>
                  </tr>
                  <tr>
                    <td><strong>Category</strong></td>
                    <td>${product.category}</td>
                  </tr>
                </tbody>
              </table>
              <!-- Product Price -->
              <h5 class="card-title">Price: ${product.price} LE</h5>
              <button class="btn mt-auto btn-success btnCart addToCart " productdata="${product.id}">Add to cart</button>
                 <button type="button" class="btn btn-warning btnWishlist" productData=${product.id} aria-label="Add to Wishlist">
      Add to Wishlist
    </button>
            </div>
          </div>
        `;
        })
        .join("")
    : `<h1>404 Not Found</h1>`;
  changeBtn("productDetails", "addToCart", fetchedData, "productCart");
  changeBtn("productDetails", "btnWishlist", fetchedData, "wishlist");

  // Attach event listeners to the dynamically created "Add to cart" buttons
  const btnCart = document.querySelectorAll(".btnCart");
});

const currentPath = window.location.pathname;
//
