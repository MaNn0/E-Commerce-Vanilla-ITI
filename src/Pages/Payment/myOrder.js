import { setCookie,getCookie,deleteCookie } from "../../assets/reusable";


document.addEventListener("DOMContentLoaded", async () => {
  const ordersContainer = document.getElementById("orders-container");
  //Get Orders from session/Cookie Function Calling
  const productCart = getCookie("productCart");
  const authCookie = getCookie("Auth");
  const userOrder = getCookie("orders");

  //Declare
  // User Data
   const authName = authCookie ? authCookie.name : null; // Name of The Get Cookie
  // console.log("🚀 ~ authName:", authName)
   const authType = authCookie ? authCookie.type : null; // Type of The Get Cookie/Session/localStorage
  // console.log("🚀 ~ authType:", authType)
   const authData = authCookie ? authCookie.value : null;//The Actual Data
  // console.log("🚀 ~ authData:", authData)
  //Products Data
   const productsName = productCart ? productCart.name : null; // Name of The Get Cookie
  // console.log("🚀 ~ productsName:", productsName)
   const productsType = productCart ? productCart.type : null; // Type of The Get Cookie/Session/localStorage
  // console.log("🚀 ~ productsType:", productsType)
   const productsData = productCart ? productCart.value : null; //The Actual Data
  // console.log("🚀 ~ productsData:", productsData)
  //Orders Data
  const orders = userOrder ? JSON.parse(userOrder.value) : [];   //The Actual Data After Parsing
  console.log("🚀 ~ document.addEventListener ~ orders:", orders)
  
  // Retrieve orders from localStorage
  // const orders = JSON.parse(localStorage.getItem("orders")) || []; // Retrieve orders from localStorage

  if (orders.length === 0) {
    ordersContainer.innerHTML = `
      <div class="alert alert-info text-center" role="alert">
        No orders available.
      </div>
    `;
    return;
  }

  // Verify payment status for each order
  for (const order of orders) {
    try {
      // Fetch payment verification
      const response = await fetch(`http://localhost:5000/verify-payment?session_id=${order.sessionId}`);
      console.log(order.sessionId)
      if (response.ok) {
        const data = await response.json();
        console.log('Payment verification success:', data);
        deleteCookie("productCart");
        // Update the order success status based on the payment status
        order.success = data.status === 'Successful';
      } else {
        const errorData = await response.json();
        console.error('Error verifying payment:', errorData.error || errorData.message);
        order.success = false; // Mark as failed if there's an error
      }
      
    } catch (error) {
      console.error('Error verifying payment status:', error);
      order.success = false; // Assume payment failed if there's an error
    }
  }

  // Save updated orders back to localStorage
  // localStorage.setItem('orders', JSON.stringify(orders));
setCookie("orders", orders, 1, authType);
  // Create a table to display orders
  const ordersTable = document.createElement("table");
  ordersTable.className = "table table-bordered";

  ordersTable.innerHTML = `
    <thead class="table-dark">
      <tr>
        <th>#</th>
        <th>Session ID</th> <!-- Display Session ID -->
        <th>Order Details</th>
        <th>Order State</th>
        <th>Order Date</th>
      </tr>
    </thead>
    <tbody >
      ${orders.map((order, index) => `
        <tr >
          <td>${index + 1}</td>
          <td>${order.sessionId}</td> <!-- Show Session ID here -->
          <td>
            ${order.products.map(product => `
              <div class="d-flex align-items-center mb-2">
                <img src="${product.image}" alt="${product.title}" class="img-thumbnail me-3" style="width: 75px; height: 75px;">
                <div>
                  <h6 class="mb-1">${product.title}</h6>
                  <p class="mb-0">Price: EGP ${product.price } | Quantity: ${product.quantity}</p>
                </div>
              </div>
            `).join("")}
          </td>
          <td>
            <span class="badge ${order.success ? 'bg-success' : 'bg-danger'}" title="${order.success ? 'This order was completed successfully.' : 'This order failed.'}">
              ${order.success ? 'Successful' : 'Failed'}
            </span>
          </td>
          <td>${new Date(order.timestamp).toLocaleString()}</td>
        </tr>
      `).join("")}
    </tbody>
  `;
      if (orders[0].success==true) {
      console.log("hello");
    
      }
      else{

        console.log("no");
      }

      
  ordersContainer.appendChild(ordersTable);
});
