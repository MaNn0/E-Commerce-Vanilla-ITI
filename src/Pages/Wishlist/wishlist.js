import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { isLoggedIn,authName,authData,authType,setCookie,productsData, getCookie} from "../../assets/reusable"
// Retrieve products from localStorage
// const products = JSON.parse(localStorage.getItem("cartProducts")) || [];
let productCart = getCookie("productCart")
const products = productCart ?JSON.parse(productCart.value): null
const productsName = productCart ?productCart.name: null;
console.log("🚀 ~ products:", products)
// Function to update the cart UI and calculations

const updateQuantity = () => {
  // Calculate total price, discount, and quantity
  const totalPrice = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  const discount = products.reduce((acc, product) => acc + (product.discount || 0) * product.quantity, 0);
  const quantity = products.reduce((acc, product) => acc + product.quantity, 0);

  // Update checkout button event listener
  document.querySelector(".checkoutButton").addEventListener("click", () => {
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice - discount));
    window.location.href = "../Payment/Payment.html";
  });

  // Update cart summary
  document.querySelector(".titleCount").textContent = `${quantity} item(s)`;
  document.querySelector(".subTotal").innerHTML = `Subtotal: ${quantity} item(s) <span>EGP ${totalPrice.toLocaleString()}</span>`;
  document.querySelector(".discount").innerHTML = `Discount <span>EGP ${discount.toLocaleString()}</span>`;
  document.querySelector(".totalPrice").textContent = `${(totalPrice - discount).toLocaleString()} EGP`;
  if(products.length < 1){
   document.querySelector(".orderSummary").innerHTML = ''
  }

  // Render cart items
  document.querySelector(".allItems").innerHTML = products.length > 0
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
};

// Handle quantity button clicks
document.querySelector(".allItems").addEventListener("click", (event) => {
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

    // Save updated products to localStorage and refresh UI
    setCookie("productCart", products,1,authType)
    // localStorage.setItem("cartProducts", JSON.stringify(products));
    updateQuantity();
  }
});
isLoggedIn(authData,"./../Register/register.html")
// Initialize the cart UI
updateQuantity();