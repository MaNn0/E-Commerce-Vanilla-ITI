import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./productdetails.css";
import { fetchedData } from "../products";
// http://localhost:5174/src/Pages/products/productdetails/productdetails.html?id=1
const urlParams = new URLSearchParams(window.location.search);
const productdetails = fetchedData;

const productid = urlParams.get("id"); //id
console.log("🚀 ~ productid:", productid);
const dataToMap = fetchedData.filter((product) => product.id === productid);
document.querySelector(".products").innerHTML = dataToMap.length
  ? dataToMap
      .map((product) => {
        return `
        <div class="col-12 product-container">
  <!-- Product Image -->
  <div class="imgContainer col-6">
    <img src="${product.image}" class="card-img-top" alt="${product.title}">
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
  </div>
</div>

      `;
      })
      .join("")
  : `<h1>404 Not Found</h1>`;
