
const express = require('express');
const Stripe = require('stripe');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load environment variables from .env

const app = express(); //server 

// Enable CORS to allow cross-origin requests from the frontend
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Home route to check if the backend is running
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Create a route to handle the checkout session
app.post('/create-checkout-session', async (req, res) => {
  const { currency, success_url, cancel_url, products } = req.body;

  try {
    const line_items = products.map(product => {
      const priceWithTax = Math.round(product.price * 1.12); // Add 12% tax

      return {
        price_data: {
          currency: currency || 'EGP',
          product_data: {
            name: product.title,
            images: [product.image],
          },
          unit_amount: priceWithTax,
        },
        quantity: product.quantity || 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${success_url}?session_id={CHECKOUT_SESSION_ID}`, // Include session ID in success URL
      cancel_url: cancel_url,
    });

    res.json({ id: session.id }); // Return the session ID to the frontend
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});



// Create a route to handle session completion
// Create a route to verify payment (formerly checkout-session-complete)
// Create a route to verify payment (formerly checkout-session-complete)
// Create a route to verify payment (formerly checkout-session-complete)
app.get('/verify-payment', async (req, res) => {
  const sessionId = req.query.session_id;

  if (!sessionId) {
    console.error('Session ID is missing');
    return res.status(400).json({ error: 'Session ID is missing' });
  }

  try {
    // Retrieve session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      console.error(`Session with ID ${sessionId} not found`);
      return res.status(404).json({ error: 'Session not found' });
    }

    const orderStatus = session.payment_status === 'paid' ? 'Successful' : 'Failed';

    console.log(`Order Status for Session ID ${sessionId}: ${orderStatus}`);

    // Simulating storing order details, in a production environment this should be stored in a database
    const order = {
      sessionId: sessionId,
      success: orderStatus === 'Successful',
      timestamp: new Date().toISOString(),
    };

    // Log the order details to check the status
    console.log('Order details:', order);

    // Normally, you would save the order to a database here
    // For example:
    // await saveOrderToDatabase(order);

    // Send a JSON response with order status instead of redirecting (for debugging)
    res.status(200).json({ sessionId, status: orderStatus, order });

  } catch (error) {
    console.error('Error verifying payment:', error.message);

    // Send proper error response with message
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
