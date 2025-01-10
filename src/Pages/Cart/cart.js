import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { isLoggedIn, authName, authData, authType, setCookie, getCookie, NavBar, addToCart } from "./../../assets/reusable";

// Retrieve products from cookies
let productCart = getCookie("productCart");
let userDdata = getCookie("Auth");
const products = productCart ? JSON.parse(productCart.value) : [];
const productsName = productCart ? productCart.name : null;
const AuthData = userDdata ? JSON.parse(userDdata.value) : null;

console.log("🚀 ~ AuthData:", AuthData);
console.log("🚀 ~ products:", products);

// Function to update the cart UI and calculations
const updateQuantity = () => {
  // Calculate total price, discount, and quantity
  let totalPrice = 0;
  let discount = 0;
  let quantity = 0;

  if (products && products.length > 0) {
    totalPrice = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
    discount = products.reduce((acc, product) => acc + (product.discount || 0) * product.quantity, 0);
    quantity = products.reduce((acc, product) => acc + product.quantity, 0);
  }

  // Update checkout button event listener
  const checkoutButton = document.querySelector(".checkoutButton");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      if (AuthData) {
        localStorage.setItem("totalPrice", JSON.stringify(totalPrice - discount));
        window.location.href = "../Payment/Payment.html";
      } else {
        alert("You have to log in to proceed!");
        window.location.pathname = "/src/Pages/Register/register.html";
      }
    });
  }

  // Update cart summary
  const titleCount = document.querySelector(".titleCount");
  const subTotal = document.querySelector(".subTotal");
  const discountElement = document.querySelector(".discount");
  const totalPriceElement = document.querySelector(".totalPrice");
  const orderSummary = document.querySelector(".orderSummary");

  if (titleCount) titleCount.textContent = `${quantity} item(s)`;
  if (subTotal) subTotal.innerHTML = `Subtotal: ${quantity} item(s) <span>EGP ${totalPrice.toLocaleString()}</span>`;
  if (discountElement) discountElement.innerHTML = `Discount <span>EGP ${discount.toLocaleString()}</span>`;
  if (totalPriceElement) totalPriceElement.textContent = `${(totalPrice - discount).toLocaleString()} EGP`;
  if (orderSummary && products.length < 1) orderSummary.innerHTML = '';

  // Render cart items
  const allItems = document.querySelector(".allItems");
  if (allItems) {
    allItems.innerHTML = products.length > 0
      ? products.map((product, index) => `
          <div class="cartItem">
            <div class="imageContainer">
              <img class="image" src="${product.image}" height="164px" width="140px">
            </div>
            <div class="itemName">
              <span>${product.title}</span>
            </div>
            <div class="total d-flex flex-row-reverse mx-2">
              <span class="currency">EGP</span>
              <span class="price">${product.price.toLocaleString()}</span>
            </div>
            <div class="itemCount mx-2">
              Qty:
              <button class="qtyButton" data-index="${index}" data-action="decrement">-</button>
              <span>${product.quantity}</span>
              <button class="qtyButton" data-index="${index}" data-action="increment">+</button>
            </div>
          </div>
        `).join("")
      : "<h3>No items in cart.</h3>";
  }
};

// Handle quantity button clicks
const allItems = document.querySelector(".allItems");
if (allItems) {
  allItems.addEventListener("click", (event) => {
    if (event.target.classList.contains("qtyButton")) {
      const action = event.target.getAttribute("data-action");
      const index = event.target.getAttribute("data-index");

      if (action === "increment") {
        products[index].quantity += 1;
      } else if (action === "decrement") {
        products[index].quantity -= 1;
      }

      // Remove product if quantity is 0
      if (products[index].quantity === 0) {
        products.splice(index, 1);
      }

      // Save updated products to cookies and refresh UI
      setCookie("productCart", products, 1, authType);
      updateQuantity();
    }
  });
}

// Initialize the cart UI
const currentPath = window.location.pathname;
if (currentPath.endsWith("cart.html")) {
  NavBar("navbar")
  document.addEventListener("DOMContentLoaded",  updateQuantity);
  // updateQuantity();
}