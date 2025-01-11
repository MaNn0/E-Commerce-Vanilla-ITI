
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
  const ErrorContainer = document.querySelector('.footer-error .error-body-text'); // error text upper place order 
console.log(addressOptionSelected)
console.log(address)
  if(products.length===0)
  {
   // Clear existing content in the container (optional)
ErrorContainer.innerHTML = `
<div class="alert alert-danger text-start py-2 mb-3" id="PlaceOrderError" role="alert">
  You Can Not Place Order While No Items In Your Cart
</div>
`;
return; // Exit the function early if there are no products
  }
  else  if (!address || !addressOptionSelected ) {
    ErrorContainer.innerHTML = `
    <div class="alert alert-danger text-start py-2 mb-3" id="PlaceOrderError" role="alert">
      Please Check Your Address Information
    </div>
    `;
    return;
  }

//if you want error modal
  

  // // Check if all required fields are filled
  // if (!address || !addressOptionSelected ) {
  //   document.getElementById("errorMessage").textContent = "Please fill all the required fields and select options where necessary.";
  //   const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
  //   errorModal.show();
  //   return;
  // }

  // Define success and cancel URLs
  const success_url = 'http://127.0.0.1:5500/src/Pages/Payment/success.html'; // Replace with your success page URL
  const cancel_url = 'http://127.0.0.1:5500/src/Pages/Payment/fail.html'; // Replace with your failure page URL

  // Log the products array for debugging
  // console.log("Products:", products);
  // products.forEach(product => {
  //   const originalUrl = product.image;
  //   const sanitizedUrl = encodeURI(originalUrl.trim().replace(/\s/g, '%20'));
  //   console.log("Original URL:", originalUrl);
  //   console.log("Sanitized URL:", sanitizedUrl);
  // });

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