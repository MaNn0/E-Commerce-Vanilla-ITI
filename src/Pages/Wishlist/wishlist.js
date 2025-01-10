import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { isLoggedIn,authName,authData,authType,setCookie,productsData, getCookie} from "../../assets/reusable"
// Retrieve wishlist from localStorage
// const products = JSON.parse(localStorage.getItem("cartProducts")) || [];

let account = { ...JSON.parse(authData), wishlist: []}

// Function to update the cart UI and calculations

console.log(account.wishlist.length);
setCookie("Auth", account,1,authType)

  // Render wishlist items
  document.querySelector(".wishlistItem").innerHTML = account.wishlist.length > 0
    ? account.wishlist.map((product, index) => `
        <td width="45%">
                    <div class="display-flex align-center">
                      <div class="img-product">
                        <img
                          src=${product.image}
                      </div>
                      <div class="name-product">
                      ${product.name}
                      </div>
                    </div>
                  </td>
                  <td width="15%" class="price">${product.price}</td>
                  <td width="15%"><button class="round-black-btn small-btn">Add to Cart</button></td>
                  <td width="10%" class="text-center"><a href="#" class="trash-icon"><i
                        class="far fa-trash-alt"></i></a></td>
      `).join("")
    : "<h3 class= 'mt-5' >No items.</h3>";
