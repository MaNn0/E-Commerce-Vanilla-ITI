const express = require('express');
const Stripe = require('stripe');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS package


dotenv.config(); // Load environment variables from .env

const app = express();

// Enable CORS to allow cross-origin requests from the frontend
app.use(cors()); // This will allow requests from any origin. You can customize this if needed.

// Middleware to parse JSON
app.use(express.json());

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
console.log(process.env.STRIPE_SECRET_KEY); // This should print the Stripe secret key

// Home route to check if the backend is running
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Create a route to handle the payment intent
app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body; // Amount to be charged (in cents)

  try {
    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency: 'EGP', // Set the currency
    });

    res.json({
      clientSecret: paymentIntent.client_secret, // Send back client secret to frontend
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
