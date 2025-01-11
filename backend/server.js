// // const express = require('express');
// // const Stripe = require('stripe');
// // const dotenv = require('dotenv');
// // const cors = require('cors'); // Import CORS package


// // dotenv.config(); // Load environment variables from .env

// // const app = express();

// // // Enable CORS to allow cross-origin requests from the frontend
// // app.use(cors()); // This will allow requests from any origin. You can customize this if needed.

// // // Middleware to parse JSON
// // app.use(express.json());

// // const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// // console.log(process.env.STRIPE_SECRET_KEY); // This should print the Stripe secret key

// // // Home route to check if the backend is running
// // app.get('/', (req, res) => {
// //   res.send('Backend server is running!');
// // });

// // // Create a route to handle the payment intent
// // app.post('/create-payment-intent', async (req, res) => {
// //   const { amount } = req.body; // Amount to be charged (in cents)

// //   try {
// //     // Create a payment intent with Stripe
// //     const paymentIntent = await stripe.paymentIntents.create({
// //       amount, // Amount in cents
// //       currency: 'EGP', // Set the currency
// //     });

// //     res.json({
// //       clientSecret: paymentIntent.client_secret, // Send back client secret to frontend
// //     });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // Start the server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`Server running on http://localhost:${PORT}`);
// // });
// const express = require('express');
// const Stripe = require('stripe');
// const dotenv = require('dotenv');
// const cors = require('cors');

// dotenv.config(); // Load environment variables from .env

// const app = express();

// // Enable CORS to allow cross-origin requests from the frontend
// app.use(cors());

// // Middleware to parse JSON
// app.use(express.json());

// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// console.log(process.env.STRIPE_SECRET_KEY); // This should print the Stripe secret key

// // Home route to check if the backend is running
// app.get('/', (req, res) => {
//   res.send('Backend server is running!');
// });

// // Create a route to handle the checkout session
// app.post('/create-checkout-session', async (req, res) => {
//   const { amount, currency, success_url, cancel_url } = req.body;

//   try {
//     // Create a Stripe Checkout Session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: currency || 'EGP', // Default to EGP if not provided
//             product_data: {
//               name: 'Your Order',
//             },
//             unit_amount: amount, // Amount in cents
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: success_url, // Redirect URL after successful payment
//       cancel_url: cancel_url, // Redirect URL if payment is canceled
//     });

//     res.json({ id: session.id }); // Return the session ID to the frontend
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// const express = require('express');
// const Stripe = require('stripe');
// const dotenv = require('dotenv');
// const cors = require('cors');

// dotenv.config(); // Load environment variables from .env

// const app = express();

// // Enable CORS to allow cross-origin requests from the frontend
// app.use(cors());

// // Middleware to parse JSON
// app.use(express.json());

// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// console.log(process.env.STRIPE_SECRET_KEY); // This should print the Stripe secret key

// // Home route to check if the backend is running
// app.get('/', (req, res) => {
//   res.send('Backend server is running!');
// });

// // Helper function to check if a product exists in Stripe
// async function findOrCreateProduct(product) {
//   try {
//     // Search for the product in Stripe
//     const products = await stripe.products.search({
//       query: `name:'${product.title}'`, // Search by product title
//     });

//     // If the product exists, return its price ID
//     if (products.data.length > 0) {
//       const price = await stripe.prices.list({
//         product: products.data[0].id,
//       });
//       return price.data[0].id; // Return the price ID unique identifier
//     }

//     // If the product does not exist, create it
//     const newProduct = await stripe.products.create({
//       name: product.title,
//       description: product.description || 'No description', // Optional
//       images: [product.image], // Use the product image
//     });

//     // Create a price for the new product
//     const newPrice = await stripe.prices.create({
//       unit_amount: product.price, // Convert to cents
//       currency: 'EGP',
//       product: newProduct.id,
//     });

//     return newPrice.id; // Return the new price ID
//   } catch (error) {
//     console.error('Error finding or creating product:', error);
//     throw error;
//   }
// }

// // Create a route to handle the checkout session
// app.post('/create-checkout-session', async (req, res) => {
//   const { products, success_url, cancel_url } = req.body;

//   try {
//     // Prepare line items for the Checkout Session
//     const line_items = await Promise.all(
//       products.map(async (product) => {
//         const priceId = await findOrCreateProduct(product); // Get or create the product in Stripe
//         return {
//           price: priceId, // Use the price ID
//           quantity: product.quantity || 1, // Default to 1 if quantity is not provided
//         };
//       })
//     );

//     // Create a Stripe Checkout Session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items, // Include the line items
//       mode: 'payment',
//       success_url: success_url, // Redirect URL after successful payment
//       cancel_url: cancel_url, // Redirect URL if payment is canceled
//     });

//     res.json({ id: session.id }); // Return the session ID to the frontend
//   } catch (error) {
//     console.error('Error creating checkout session:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require('express');
const Stripe = require('stripe');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config(); // Load environment variables from .env

const app = express();

// Enable CORS to allow cross-origin requests from the frontend
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

const stripe = Stripe('sk_test_51Qf9q7AnBfxoX5a3kzC1a8dEjsaAscWnYmKIire0XkfMEZHlIqsKaV84DCGM7N3hxKHiSUYXJx1LqKuOmkWf43mZ00Nn1f3pxi');
console.log(process.env.STRIPE_SECRET_KEY); // This should print the Stripe secret key

// Home route to check if the backend is running
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Create a route to handle the checkout session
app.post('/create-checkout-session', async (req, res) => {
  const {  amount,currency, success_url, cancel_url, products } = req.body;
  console.log("Incoming Request Data:", {
    amount,
    currency,
    success_url,
    cancel_url,
    products,
  });
  try {
    // Prepare line items for the Checkout Session
    const line_items = products.map(product => {
     
      return {
        price_data: {
          currency: currency || 'EGP',
          product_data: {
            name: product.title,
            images: [product.image],
          },
          unit_amount:product.price,
        },
        quantity: product.quantity || 1,
      };
    });
    console.log("Processed Line Items:", JSON.stringify(line_items, null, 2));

console.log("Products:", products);

    console.log("Line Items:", line_items); //trace

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items, // Include the line items
      mode: 'payment',
      success_url: success_url, // Redirect URL after successful payment
      cancel_url: cancel_url, // Redirect URL if payment is canceled
    });

    res.json({ id: session.id }); // Return the session ID to the frontend
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});