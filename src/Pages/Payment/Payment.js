import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { loadStripe } from '@stripe/stripe-js';

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
const products = JSON.parse(localStorage.getItem("cartProducts")) || [];
console.log("🚀 ~ Product:", products);
// Calculate the subtotal
// acc >> accumulator , 0 initial value  return the acc 
const subtotal = products.reduce((acc, product) => acc + product.price*product.quantity, 0) ;

// Calculate total VAT (12% of each product's price)
const vat = products.reduce((acc, product) => acc + product.price * 0.12*product.quantity, 0);

// shipping fee 
const shippingFee = 50;
var FinaleFee = shippingFee+vat

// Update the Subtotal in the DOM
const debitCreditCardInputs = document.getElementById('debitCreditCard');
const cashOnDeliveryInputs = document.getElementById('cashOnDelivery');

if(subtotal==0)
  {
    document.getElementById("subtotal").textContent = `Please Add Some Items To Cart`;
    debitCreditCardInputs.disabled = true; //disable radio button
    cashOnDeliveryInputs.disabled = true;
  }
  else { document.getElementById("subtotal").textContent = `EGP ${subtotal}`}
  
  const debitCreditCardInput = document.getElementById('debitCreditCard');
  const cashOnDeliveryInput = document.getElementById('cashOnDelivery');
  const shippingFeeElement = document.querySelector(".text-success"); //  shipping fee
  
  const paymentModals = new bootstrap.Modal(document.getElementById('paymentModals')); //for payment modal 
  paymentModals.show(); // show modal
  
  //round the values 
  const total=   Math.round(((subtotal+vat)+ Number.EPSILON) * 100) / 100;
  const total_vac=   Math.round(((subtotal+FinaleFee)+ Number.EPSILON) * 100) / 100;

  // update shipping fee
function updateShippingFee() {
  //if credit card checked
  if (debitCreditCardInput.checked) {
    shippingFeeElement.textContent = "Free Shipping"; // shipping fee element

    document.getElementById("total").textContent = `EGP ${total}`; // >>>>>>>>>>>>>  Update the total in the DOM

//if on cash checked
  } else if (cashOnDeliveryInput.checked) {
    shippingFeeElement.textContent = `EGP +${shippingFee}`; // shipping fee element
    ;
    // Update the total in the DOM
    document.getElementById("total").textContent = `EGP ${total_vac}`; // >>>>>>>>>>>>>  Update the total in the DOM
  }
}

// for radio button chaanges
debitCreditCardInput.addEventListener('change', () => {
  if (debitCreditCardInput.checked) {
    paymentModals.show(); // show modal
  }
  updateShippingFee(); });

cashOnDeliveryInput.addEventListener('change', updateShippingFee);


// Get the container where the order items will be displayed in "Your Order" section
const orderContainer = document.querySelector('.your-order-section .order-container'); // Targeting the row inside the unique section

// Clear existing content in the container (optional)
orderContainer.innerHTML = '';


// Loop through the products array and create HTML elements for each product
 //change md for sizing line 104
 // Check if there are products in the array
if (products.length === 0) {
  // If no products, display the "No items" message
  orderContainer.innerHTML = `
    <div class="col-12">
      <p>No Items To Pay for, Please Check Your Cart</p>
    </div>
  `;
}
else {
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

const amount_stripe = total_vac*100
console.log(amount_stripe)

// Initialize Stripe with your publishable key
const stripe = await loadStripe('pk_test_51Qf9q7AnBfxoX5a3ubkQ9mbIGvB6FujzedMCkDo7AvQXnz9ZHZSbsrGP8P8oEWkMc6eckOGJthugfD0tk3Gljibw00uNOSK4YD');

const elements = stripe.elements();

// Create the Card Element
const cardElement = elements.create('card', {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
    },
  },
});

// Mount the Card Element
cardElement.mount('#card-element');

// Form Submission Handler
const form = document.getElementById('payment-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the form from reloading

  // Collect user details from the form
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const country = document.getElementById('country').value;
  const city = document.getElementById('city').value;
  const zipCode = document.getElementById('zip-code').value;
  const email = document.getElementById('email').value;
  const phoneNumber = document.getElementById('phone-number').value;

  // Call your backend to create a Payment Intent
  //post man https://web.postman.co/workspace/be3e1119-c301-42d9-8075-8dcadada94f8/request/create?requestId=6db5ac94-5e6b-4d6b-bdfa-e39bd063e6ea
  const response = await fetch('http://localhost:5000/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: amount_stripe }), // Replace with your amount in cents
  });

  const { clientSecret } = await response.json();

  // Confirm the payment
  const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement,
      billing_details: {
        name: `${firstName} ${lastName}`,
        email: email,
        address: {
          city: city,
          postal_code: zipCode,
          country: country,
        },
        phone: phoneNumber,
      },
    },
  });

  if (error) {
    // Display error message
    document.getElementById('card-errors').textContent = error.message;
  } else if (paymentIntent.status === 'succeeded') {
    // Payment succeeded
    alert('Payment Successful!');
  }
});
