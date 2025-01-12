
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { loadStripe } from '@stripe/stripe-js';
import { amount_stripe, products } from './Payment.js'; // Import the amount_stripe and products from Payment.js

// Initialize Stripe with your publishable key
const stripe = await loadStripe('pk_test_51Qf9q7AnBfxoX5a3ubkQ9mbIGvB6FujzedMCkDo7AvQXnz9ZHZSbsrGP8P8oEWkMc6eckOGJthugfD0tk3Gljibw00uNOSK4YD');

document.querySelector(".btn-primary").addEventListener("click", async function () {
  const address = document.getElementById("address").value.trim();
  const addressOptionSelected = document.querySelector('input[name="address-option"]:checked');
  const errorContainer = document.querySelector('.footer-error .error-body-text');

  // Clear previous error messages
  errorContainer.innerHTML = "";

  if (products.length === 0) {
    showError("You cannot place an order while no items are in your cart.");
    return;
  }

  if (!address || !addressOptionSelected) {
    showError("Please check your address information.");
    return;
  }

  const success_url = 'http://localhost:5173/src/Pages/Payment/myOrder.html'; // Redirect to myOrder.html after successful payment
  const cancel_url = 'http://localhost:5173/src/Pages/Payment/fail.html';

  try {
    const response = await fetch('http://localhost:5000/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: amount_stripe,
        currency: 'EGP',
        success_url,
        cancel_url,
        products: products.map(product => ({
          title: product.title,
          price: product.price * 100, // Stripe accepts prices in cents
          quantity: product.quantity || 1,
          image: encodeURI(product.image.trim()),
        })),
      }),
    });

    const { id } = await response.json(); // Get the session ID

    // Store the order in localStorage with a pending state
    const order = {
      sessionId: id,
      products,
      totalAmount: amount_stripe,
      timestamp: new Date().toISOString(),
      success: false, // Initially set to false
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    // Redirect to Stripe's hosted payment page
    await stripe.redirectToCheckout({ sessionId: id });
  } catch (error) {
    console.error("Error during checkout:", error);

    // Store a failed order state
    const failedOrder = {
      products,
      totalAmount: amount_stripe,
      timestamp: new Date().toISOString(),
      success: false, // Mark as failed
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    existingOrders.push(failedOrder);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    showError("Something went wrong with your order. Please try again.");
  }
});

function showError(message) {
  const errorContainer = document.querySelector('.footer-error .error-body-text');
  errorContainer.innerHTML = `
    <div class="alert alert-danger text-start py-2 mb-3" role="alert">
      ${message}
    </div>
  `;
}
