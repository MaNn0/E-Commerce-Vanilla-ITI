import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { authData, authType, setCookie, getCookie } from "../../assets/reusable";
import { sideBarInjection } from "../../assets/sideBar";

// Retrieve wishlist from localStorage
let wishlist = getCookie("wishlist");
const wishlistData = wishlist ? wishlist.value : null;
let wishlistProducts = wishlistData ? JSON.parse(wishlistData) : [];

// Render wishlist items
const updateWishlist = () => {
  const cartItemContainer = document.querySelector(".cart-item");

  if (cartItemContainer) {
    cartItemContainer.innerHTML =
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
        : "<h3 class='mt-5'>No items.</h3>";
  } else {
    console.error("Element with class '.cart-item' not found.");
  }
};

// Initialize the sidebar
sideBarInjection("sideBar");

// Handle remove button clicks
const cartItemContainer = document.querySelector(".cart-item");
if (cartItemContainer) {
  cartItemContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("round-red-btn")) {
      const index = event.target.getAttribute("data-index");
      const newWishlistProduct = wishlistProducts.filter(
        (product, i) => i !== parseInt(index)
      );
      setCookie("wishlist", newWishlistProduct, 1, authType);
      wishlistProducts = newWishlistProduct;
      updateWishlist();
    }
  });
} else {
  console.error("Element with class '.cart-item' not found.");
}

// Initialize the wishlist UI
updateWishlist();