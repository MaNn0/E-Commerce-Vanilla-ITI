import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// radio for address button [show,hide]
const defaultAddInput = document.getElementById('defaultADD');
const newAddInput = document.getElementById('newADD');
const addAddressBtn = document.getElementById('add-address-btn');

function toggleAddressButton() {
  if (defaultAddInput.checked) {
    addAddressBtn.style.display = 'none';
  } else {
    addAddressBtn.style.display = 'inline-block';
  }
}
defaultAddInput.addEventListener('change', toggleAddressButton);
newAddInput.addEventListener('change', toggleAddressButton);
toggleAddressButton();


//place order button
document.querySelector(".btn-primary").addEventListener("click", function () {

  const address = document.getElementById("address").value.trim();
  const addressOptionSelected = document.querySelector('input[name="address-option"]:checked');
  const paymentOptionSelected = document.querySelector('input[name="paymentOption"]:checked');

  // checking for empty
  if (!address || !addressOptionSelected || !paymentOptionSelected) {
    
    document.getElementById("errorMessage").textContent = "Please fill all the required fields and select options where necessary.";

    const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
    errorModal.show();
  } else {
    alert("Order Placed ");
  }
});






// Get the products from localStorage
const products = JSON.parse(localStorage.getItem("products")) || [];

// Calculate the subtotal
const subtotal = products.reduce((acc, product) => acc + product.price, 0);

// Update the Subtotal in the DOM
document.getElementById("subtotal").textContent = `EGP ${subtotal}`;

// Optionally, calculate the total if a shipping fee is added
const shippingFee = 50; // Example shipping fee



// shipping fee 
const debitCreditCardInput = document.getElementById('debitCreditCard');
const cashOnDeliveryInput = document.getElementById('cashOnDelivery');
const shippingFeeElement = document.querySelector(".text-success"); //  shipping fee


const paymentModals = new bootstrap.Modal(document.getElementById('paymentModals')); //for payment modal 
paymentModals.show(); // show modal

// update shipping fee
function updateShippingFee() {
  if (debitCreditCardInput.checked) {
    shippingFeeElement.textContent = "Free Shipping"; // Free 
  } else if (cashOnDeliveryInput.checked) {
    shippingFeeElement.textContent = `EGP ${shippingFee}`; // EGP 50 ya f2eeeeeer
  }
}


// for radio button chaanges
debitCreditCardInput.addEventListener('change', () => {
  if (debitCreditCardInput.checked) {
    paymentModals.show(); // show modal
  }
  updateShippingFee(); });

cashOnDeliveryInput.addEventListener('change', updateShippingFee);


// Update the Total in the DOM
const total = subtotal + shippingFee;
document.getElementById("total").textContent = `EGP ${total}`;

