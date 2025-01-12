import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { isLoggedIn,   setCookie, getCookie, NavBar, addToCart } from "../../assets/reusable";
import { loadStripe } from '@stripe/stripe-js';


let productCart = getCookie("productCart");
const productsCart = productCart ? JSON.parse(productCart.value) : [];
const productsName = productCart ? productCart.name : null;
const authCookie = getCookie("Auth");
  //Declare
  // User Data
   const authName = authCookie ? authCookie.name : null; // Name of The Get Cookie
  // console.log("🚀 ~ authName:", authName)
   const authType = authCookie ? authCookie.type : null; // Type of The Get Cookie/Session/localStorage
  // console.log("🚀 ~ authType:", authType)
   const authData = authCookie ? JSON.parse(authCookie.value) : null;//The Actual Data
   console.log("🚀 ~ authData:", authData)
   console.log("🚀 ~ authData:", authData.mainAddress)
   
// const AuthData = userDdata ? JSON.parse(userDdata.value) : null;
// console.log(AuthData.mainAddress);

// radio for address button [show,hide]
const defaultAddInput = document.getElementById('defaultADD');
const newAddInput = document.getElementById('newADD');
const addAddressBtn = document.getElementById('add-address-btn');

function toggleAddressButton() {
  if (defaultAddInput.checked) {
    addAddressBtn.style.display = 'none';
    document.getElementById("address").setAttribute("disabled", "disabled");
    document.getElementById("address").value = authData.mainAddress

  } else {
    addAddressBtn.style.display = 'inline-block';
    document.getElementById("address").value = ""
    document.getElementById("address").removeAttribute("disabled", "disabled");


  }
}
defaultAddInput.addEventListener('change', toggleAddressButton);
newAddInput.addEventListener('change', toggleAddressButton);
toggleAddressButton();


// //place order button
// document.querySelector(".btn-primary").addEventListener("click", function () {

//   const address = document.getElementById("address").value.trim();
//   const addressOptionSelected = document.querySelector('input[name="address-option"]:checked');
//   const paymentOptionSelected = document.querySelector('input[name="paymentOption"]:checked');

//   // checking for empty
//   if (!address || !addressOptionSelected || !paymentOptionSelected) {
    
//     document.getElementById("errorMessage").textContent = "Please fill all the required fields and select options where necessary.";

//     const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
//     errorModal.show();
//   } else {
//     alert("Order Placed ");
//   }
// });


// Get the products from localStorage

export const products = productsCart || [];
console.log("🚀 ~ Product:", products);

// Calculate the subtotal
// acc >> accumulator , 0 initial value  return the acc 
const subtotal = products.reduce((acc, product) => acc + product.price*product.quantity, 0) ;

// Calculate total VAT (12% of each product's price)
const vat = products.reduce((acc, product) => acc + product.price * 0.12*product.quantity, 0);


if(subtotal==0)
  {
    document.getElementById("subtotal").textContent = `Please Add Some Items To Cart`;
    // debitCreditCardInputs.disabled = true; //disable radio button
    // cashOnDeliveryInputs.disabled = true;
  }

  else { document.getElementById("subtotal").textContent = `EGP ${Math.round(((subtotal)+ Number.EPSILON) * 100) / 100}`}
  
//   const debitCreditCardInput = document.getElementById('debitCreditCard');
//   const cashOnDeliveryInput = document.getElementById('cashOnDelivery');
  const shippingFeeElement = document.querySelector(".text-success"); //  shipping fee
  
//   const paymentModals = new bootstrap.Modal(document.getElementById('paymentModals')); //for payment modal 
  // paymentModals.show(); // show modal
  
  //round the values 
  const total=   Math.round(((subtotal+vat)+ Number.EPSILON) * 100) / 100;

  shippingFeeElement.textContent = "Free Shipping"; // shipping fee element

  if(total==0)
    {
      document.getElementById("total").textContent = `No Items`; 
    }
    else {  document.getElementById("total").textContent = `EGP ${total}`; }
    


// Get the container where the order items will be displayed in upper "Place Order" section
const orderContainer = document.querySelector('.your-order-section .order-container');  // Targeting the row inside the unique section


// Loop through the products array and create HTML elements for each product
 //change md for sizing line 104
 // Check if there are products in the array
 console.log("before no items",products)
if (products.length === 0) {
  // If no products, display the "No items" message
  orderContainer.innerHTML = `
    <div class="col-12">
      <p>No Items To Pay for, Please Check Your Cart</p>
    </div>
  `;
}
else {
  orderContainer.innerHTML = ''; //Clear the orderContainer before appending the new rows if not used it duplicates items
products.forEach(product => {
  const productRow = `
    <div class="row mb-4">
      <div class="col-md-1">
        <img src="${product.image}" alt="Product Image" class="img-fluid">
      </div>
      <div class="col-md-6">
        <h6 class="card-subtitle mb-2 text-muted">Product Name</h6>
        <p class="card-text">${product.title}</p>
      </div>
      <div class="col-md-2">
        <h6 class="card-subtitle mb-2 text-muted">Product Price</h6>
        <p class="card-text">${product.price} EGP</p>
      </div>
      <div class="col-md-2">
        <h6 class="card-subtitle mb-2 text-muted">Count</h6>
        <p class="card-text">${product.quantity}</p>
      </div>
    </div>
  `;

  // Append the new product row to the "Your Order" container
  orderContainer.innerHTML += productRow;
});
}

export const  amount_stripe = total*100
console.log("aaaaaaaahhhhh",amount_stripe)

