import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  authData,
  authType,
  setCookie,
  getCookie,
} from "../../assets/reusable";
import { sideBarInjection } from "../../assets/sideBar";
import "./wishlist.css";
let wishlist = getCookie("wishlist");
const wishlistData = wishlist ? wishlist.value : null;
let wishlistProducts = JSON.parse(wishlistData);

// Render wishlist items
const updateWishlist = () => {
  document.querySelector(".cart-item").innerHTML =
    wishlistProducts.length > 0
      ? wishlistProducts
          .map(
            (product, index) => `
         <div class="row">
                <div class="col-md-6 my-auto">
                  <a href="../products/productdetails/productdetails.html?id=${product.id}">
                    <label class="product-name">
                      <img src="${product.image}" style="width: 150px; height: 150px" alt="">
                      ${product.title}
                    </label>
                  </a>
                </div>
                <div class="col-md-2 my-auto">
                  <label class="price">${product.price} EGP</label>
                </div>
               
                <div class="col-md-2 col-5 my-auto">
                  <div class="remove">
                    <button data-index=${index} class="round-red-btn small-btn"><i class="fa fa-trash"></i> Remove</button>
                  </div>
                </div>
              </div>
      `
          )
          .join("")
      : "<h3 class= 'mt-5' >No items.</h3>";
};
const cart = document.querySelector(".cart-item");
console.log("🚀 ~ cart:", cart);
document.querySelector(".cart-item").addEventListener("click", (event) => {
  if (event.target.classList.contains("round-red-btn")) {
    const index = event.target.getAttribute("data-index");
    const newWishlistProduct = wishlistProducts.filter(
      (product) => product.id !== wishlistProducts[index].id
    );
    setCookie("wishlist", newWishlistProduct, 1, authType);
    wishlistProducts = newWishlistProduct;
    updateWishlist();
  }
});
// Initialize the cart UI
updateWishlist();

sideBarInjection("sideBar");
