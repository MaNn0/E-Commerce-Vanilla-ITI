
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import { getCookie,isLoggedIn,authData } from "../../assets/reusable";
// import { loadStripe } from '@stripe/stripe-js';
// import {amount_stripe } from './Payment.js'


// // Initialize Stripe with your publishable key
// const stripe = await loadStripe('pk_test_51Qf9q7AnBfxoX5a3ubkQ9mbIGvB6FujzedMCkDo7AvQXnz9ZHZSbsrGP8P8oEWkMc6eckOGJthugfD0tk3Gljibw00uNOSK4YD');

// const elements = stripe.elements();

// // Create the Card Element
// const cardElement = elements.create('card', {
//   style: {
//     base: {
//       color: '#32325d',
//       fontFamily: 'Arial, sans-serif',
//       fontSize: '16px',
//       '::placeholder': {
//         color: '#aab7c4',
//       },
//     },
//     invalid: {
//       color: '#fa755a',
//     },
//   },
// });

// // Mount the Card Element
// cardElement.mount('#card-element');

// // Form Submission Handler
// const form = document.getElementById('payment-form');

// form.addEventListener('submit', async (event) => {
//   event.preventDefault(); // Prevent the form from reloading

//   // Collect user details from the form
//   const firstName = document.getElementById('first-name').value;
//   const lastName = document.getElementById('last-name').value;
//   const country = document.getElementById('country').value;
//   const city = document.getElementById('city').value;
//   const zipCode = document.getElementById('zip-code').value;
//   const email = document.getElementById('email').value;
//   const phoneNumber = document.getElementById('phone-number').value;

//   // Call your backend to create a Payment Intent
//   //post man https://web.postman.co/workspace/be3e1119-c301-42d9-8075-8dcadada94f8/request/create?requestId=6db5ac94-5e6b-4d6b-bdfa-e39bd063e6ea
//   const response = await fetch('http://localhost:5000/create-payment-intent', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ amount: amount_stripe }), // Replace with your amount in cents
//   });

//   const { clientSecret } = await response.json();

//   // Confirm the payment
//   const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//     payment_method: {
//       card: cardElement,
//       billing_details: {
//         name: `${firstName} ${lastName}`,
//         email: email,
//         address: {
//           city: city,
//           postal_code: zipCode,
//           country: country,
//         },
//         phone: phoneNumber,
//       },
//     },
//   });

//   if (error) {
//     // Display error message
//     document.getElementById('card-errors').textContent = error.message;
//   } else if (paymentIntent.status === 'succeeded') {
//     // Payment succeeded
//     alert('Payment Successful!');
//   }
// });



// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import { loadStripe } from '@stripe/stripe-js';
// import { amount_stripe } from './Payment.js'; // Import the amount_stripe from Payment.js

// // Initialize Stripe with your publishable key
// const stripe = await loadStripe('pk_test_51Qf9q7AnBfxoX5a3ubkQ9mbIGvB6FujzedMCkDo7AvQXnz9ZHZSbsrGP8P8oEWkMc6eckOGJthugfD0tk3Gljibw00uNOSK4YD');

// // Place Order Button Event Listener
// document.querySelector(".btn-primary").addEventListener("click", async function () {
//   const address = document.getElementById("address").value.trim();
//   const addressOptionSelected = document.querySelector('input[name="address-option"]:checked');
//   const paymentOptionSelected = document.querySelector('input[name="paymentOption"]:checked');

//   // Check if all required fields are filled
//   if (!address || !addressOptionSelected || !paymentOptionSelected) {
//     document.getElementById("errorMessage").textContent = "Please fill all the required fields and select options where necessary.";
//     const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
//     errorModal.show();
//     return;
//   }

//   // Define success and cancel URLs
//   const success_url = 'http://localhost:5173/src/Pages/Payment/success.html'; // Replace with your success page URL
//   const cancel_url = 'http://localhost:5173/src/Pages/Payment/fail.html'; // Replace with your failure page URL

//   // Call the backend to create a Checkout Session
//   const response = await fetch('http://localhost:5000/create-checkout-session', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       amount: amount_stripe, // Use the amount_stripe from Payment.js
//       currency: 'EGP',
//       success_url: success_url,
//       cancel_url: cancel_url,
//     }),
//   });

//   const { id } = await response.json(); // Get the session ID
//   // Redirect to Stripe's hosted payment page
//   await stripe.redirectToCheckout({ sessionId: id });
// });


// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import { loadStripe } from '@stripe/stripe-js';
// import { amount_stripe, products } from './Payment.js'; // Import the amount_stripe and products from Payment.js

// // Initialize Stripe with your publishable key
// const stripe = await loadStripe('pk_test_51Qf9q7AnBfxoX5a3ubkQ9mbIGvB6FujzedMCkDo7AvQXnz9ZHZSbsrGP8P8oEWkMc6eckOGJthugfD0tk3Gljibw00uNOSK4YD');

// // Place Order Button Event Listener
// document.querySelector(".btn-primary").addEventListener("click", async function () {
//   const address = document.getElementById("address").value.trim();
//   const addressOptionSelected = document.querySelector('input[name="address-option"]:checked');
//   const paymentOptionSelected = document.querySelector('input[name="paymentOption"]:checked');

//   // Check if all required fields are filled
//   if (!address || !addressOptionSelected || !paymentOptionSelected) {
//     document.getElementById("errorMessage").textContent = "Please fill all the required fields and select options where necessary.";
//     const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
//     errorModal.show();
//     return;
//   }

//   // Define success and cancel URLs
//   const success_url = 'http://localhost:5173/src/Pages/Payment/success.html'; // Replace with your success page URL
//   const cancel_url = 'http://localhost:5173/src/Pages/Payment/fail.html'; // Replace with your failure page URL

//   console.log(products)
//   // Prepare the products array for the backend
// // Prepare the products array for the backend
// //image must be "url"
// const productsForCheckout = products.map(product => ({
//     title: product.title,
//     image: "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947383286-714WUJlhbLS._SL1500_.jpg",
//     price: product.price * 100, // Convert price to cents
//     quantity: product.quantity || 1, // Default to 1 if quantity is not provided
//   }));
  
//   // Log the prepared products array
//   console.log("Prepared products for checkout:", productsForCheckout);
//   // Call the backend to create a Checkout Session
//   const response = await fetch('http://localhost:5000/create-checkout-session', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       products: productsForCheckout, // Send the products array
//       success_url: success_url,
//       cancel_url: cancel_url,
//     }),
//   });

//   const { id } = await response.json(); // Get the session ID

//   // Redirect to Stripe's hosted payment page
//   await stripe.redirectToCheckout({ sessionId: id }); // Pass the sessionId
// });

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { loadStripe } from '@stripe/stripe-js';
import { amount_stripe, products } from './Payment.js'; // Import the amount_stripe and products from Payment.js

// Initialize Stripe with your publishable key
const stripe = await loadStripe('pk_test_51Qf9q7AnBfxoX5a3ubkQ9mbIGvB6FujzedMCkDo7AvQXnz9ZHZSbsrGP8P8oEWkMc6eckOGJthugfD0tk3Gljibw00uNOSK4YD');

// Place Order Button Event Listener
document.querySelector(".btn-primary").addEventListener("click", async function () {
  const address = document.getElementById("address").value.trim();
  const addressOptionSelected = document.querySelector('input[name="address-option"]:checked');
  const paymentOptionSelected = document.querySelector('input[name="paymentOption"]:checked');

  // Check if all required fields are filled
  if (!address || !addressOptionSelected || !paymentOptionSelected) {
    document.getElementById("errorMessage").textContent = "Please fill all the required fields and select options where necessary.";
    const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
    errorModal.show();
    return;
  }

  // Define success and cancel URLs
  const success_url = 'http://localhost:5173/src/Pages/Payment/success.html'; // Replace with your success page URL
  const cancel_url = 'http://localhost:5173/src/Pages/Payment/fail.html'; // Replace with your failure page URL

  // Log the products array for debugging
  console.log("Products:", products);
  products.forEach(product => {
    const originalUrl = product.image;
    const sanitizedUrl = encodeURI(originalUrl.trim().replace(/\s/g, '%20'));
    console.log("Original URL:", originalUrl);
    console.log("Sanitized URL:", sanitizedUrl);
  });

  // Call the backend to create a Checkout Session
  const response = await fetch('http://localhost:5000/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        amount: amount_stripe,
        currency: 'EGP',
        success_url: success_url,
        cancel_url: cancel_url,
        products: products.map(product => ({
          title: product.title,
          price: product.price * 100,
          quantity: product.quantity || 1,
          image: encodeURI(product.image.trim()), // Ensure this is valid product.image  encodeURI(product.image.trim().replace(/\s/g, '%20'))
        })),
      }),
      
  });

  const { id } = await response.json(); // Get the session ID

  // Redirect to Stripe's hosted payment page
  await stripe.redirectToCheckout({ sessionId: id });
});