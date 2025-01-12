import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  getCookie,
  addToCart,
  fetchData,
  NavBar,
  changeBtn,
  footerInjection,
} from "./assets/reusable";
import { Button } from "bootstrap/dist/js/bootstrap.bundle.min.js";

// Imports Ends Here
//Global Declared Variables
let productCart = getCookie("productCart");
let authCookie = getCookie("Auth");
const products = productCart ? JSON.parse(productCart.value) : null;
export const authName = authCookie ? authCookie.name : null;
export const authData = authCookie ? authCookie.value : null;
export const authType = authCookie ? authCookie.type : null;
const currentPath = window.location.pathname;
// Declaretion  End Here

//main Function
const initializeApp = async () => {
  //Lexical Declaration Variables
  // searchButton()

  const btnCart = document.querySelectorAll(".btnCart");
  //DataFetched To Allocate to Function

  const data = await fetchData();
  renderClothing(data);
  renderJewelery(data);
  renderElectronics(data);
  renderImg(data);
  renderGaming(data);
  renderTv(data);
  renderMobile(data);

  // Attach the event listener after data is fetched and buttons are rendered
  btnCart.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("productData");
      // Ensure `data` is available when calling `addToCart`
      addToCart(productId, data);
    });
  });

  function renderClothing(data) {
    const img = document.querySelector(".clothing");
    const product = data
      .filter((element) => element.category === "menClothing")
      .slice(0, 5)
      .map((element) => {
        return `
    <div class="hoverCard card mx-2 border border-primary shadow-lg p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
    <a href="/src/Pages/products/productdetails/productdetails.html?id=${
      element.id
    }"class=" mx-2 mt-auto text-decoration-none">
      <img src="${
        element.image
      }" style="max-height:300px;min-height: 300px;" class="card-img-top productCard " alt="${
          element.title
        }">
        <h5 class="card-title mt-2">${element.title}</h5>
        </a>
      <div class="card-body d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center mt-auto mb-3">
        <span class="card-text fs-3 mt-auto"><sup>$</sup>${element.price}</span>
        <span class="card-text text-success">Discount ${
          element.discount || 0
        }%</span>
        </div>
        <div class="d-flex justify-content-between">
        <button class="btn mt-auto btn-success btnCart addToCart" productData="${
          element.id
        }">Add to cart</button>
        
        <button class="btn d-flex  btnWishlist fs-3" style="border:0" productData=${
          element.id
        } aria-label="Add to Wishlist">
      
    </button>
        </div>
      </div>
      </div>
      `;
      })
      .join("");
    img.innerHTML = product;
    changeBtn("clothing", "addToCart", data, "productCart");
    changeBtn("clothing", "btnWishlist", data, "wishlist");
  }
  function renderJewelery(data) {
    // console.log("🚀 ~ renderJewelery ~ data:", data);
    const img = document.querySelector(".jewelery");

    const product = data
      .filter((element) => element.category === "jewelery")
      .slice(0, 5)
      .map((element) => {
        return `
        <div class="hoverCard card mx-2 border border-primary shadow-lg p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
    <a href="/src/Pages/products/productdetails/productdetails.html?id=${
      element.id
    }"class=" mx-2 mt-auto text-decoration-none">
      <img src="${
        element.image
      }" style="max-height:300px;min-height: 300px;" class="card-img-top productCard " alt="${
          element.title
        }">
        <h5 class="card-title mt-2">${element.title}</h5>
        </a>
      <div class="card-body d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center mt-auto mb-3">
        <span class="card-text fs-3 mt-auto"><sup>$</sup>${element.price}</span>
        <span class="card-text text-success">Discount ${
          element.discount || 0
        }%</span>
        </div>
        <div class="d-flex justify-content-between">
        <button class="btn mt-auto btn-success btnCart addToCart" productData="${
          element.id
        }">Add to cart</button>
        
        <button class="btn d-flex  btnWishlist fs-3" style="border:0" productData=${
          element.id
        } aria-label="Add to Wishlist">
      
    </button>
        </div>
      </div>
      </div>
      `;
      })
      .join("");

    img.innerHTML = product;
    changeBtn("jewelery", "addToCart", data, "productCart");
    changeBtn("jewelery", "btnWishlist", data, "wishlist");
  }

  function renderElectronics(data) {
    const img = document.querySelector(".electronics");
    const product = data
      .filter((element) => element.category === "electronics")
      .slice(0, 5)
      .map((element) => {
        return `
       <div class="hoverCard card mx-2 border border-primary shadow-lg p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
    <a href="/src/Pages/products/productdetails/productdetails.html?id=${
      element.id
    }"class=" mx-2 mt-auto text-decoration-none">
      <img src="${
        element.image
      }" style="max-height:300px;min-height: 300px;" class="card-img-top productCard " alt="${
          element.title
        }">
        <h5 class="card-title mt-2">${element.title}</h5>
        </a>
      <div class="card-body d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center mt-auto mb-3">
        <span class="card-text fs-3 mt-auto"><sup>$</sup>${element.price}</span>
        <span class="card-text text-success">Discount ${
          element.discount || 0
        }%</span>
        </div>
        <div class="d-flex justify-content-between">
        <button class="btn mt-auto btn-success btnCart addToCart" productData="${
          element.id
        }">Add to cart</button>
        
        <button class="btn d-flex  btnWishlist fs-3" style="border:0" productData=${
          element.id
        } aria-label="Add to Wishlist">
      
    </button>
        </div>
      </div>
      </div>
      `;
      })
      .join("");
    img.innerHTML = product;
    changeBtn("electronics", "addToCart", data, "productCart");
    changeBtn("electronics", "btnWishlist", data, "wishlist");
  }

  function renderMobile(data) {
    const img = document.querySelector(".mobile");
    const product = data
      .filter((element) => element.category === "mobile")
      .slice(0, 5)
      .map((element) => {
        return `
        <div class="hoverCard card mx-2 border border-primary shadow-lg p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
    <a href="/src/Pages/products/productdetails/productdetails.html?id=${
      element.id
    }"class=" mx-2 mt-auto text-decoration-none">
      <img src="${
        element.image
      }" style="max-height:300px;min-height: 300px;" class="card-img-top productCard " alt="${
          element.title
        }">
        <h5 class="card-title mt-2">${element.title}</h5>
        </a>
      <div class="card-body d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center mt-auto mb-3">
        <span class="card-text fs-3 mt-auto"><sup>$</sup>${element.price}</span>
        <span class="card-text text-success">Discount ${
          element.discount || 0
        }%</span>
        </div>
        <div class="d-flex justify-content-between">
        <button class="btn mt-auto btn-success btnCart addToCart" productData="${
          element.id
        }">Add to cart</button>
        
        <button class="btn d-flex  btnWishlist fs-3" style="border:0" productData=${
          element.id
        } aria-label="Add to Wishlist">
      
    </button>
        </div>
      </div>
      </div>
      `;
      })
      .join("");
    img.innerHTML = product;
    changeBtn("mobile", "addToCart", data, "productCart");
    changeBtn("mobile", "btnWishlist", data, "wishlist");
  }
  function renderImg(data) {
    const img = document.querySelector(".audio");
    const product = data
      .filter((element) => element.category === "audio")
      .slice(0, 5)
      .map((element) => {
        return `
        <div class="hoverCard card mx-2 border border-primary shadow-lg p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
    <a href="/src/Pages/products/productdetails/productdetails.html?id=${
      element.id
    }"class=" mx-2 mt-auto text-decoration-none">
      <img src="${
        element.image
      }" style="max-height:300px;min-height: 300px;" class="card-img-top productCard " alt="${
          element.title
        }">
        <h5 class="card-title mt-2">${element.title}</h5>
        </a>
      <div class="card-body d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center mt-auto mb-3">
        <span class="card-text fs-3 mt-auto"><sup>$</sup>${element.price}</span>
        <span class="card-text text-success">Discount ${
          element.discount || 0
        }%</span>
        </div>
        <div class="d-flex justify-content-between">
        <button class="btn mt-auto btn-success btnCart addToCart" productData="${
          element.id
        }">Add to cart</button>
        
        <button class="btn d-flex  btnWishlist fs-3" style="border:0" productData=${
          element.id
        } aria-label="Add to Wishlist">
      
    </button>
        </div>
      </div>
      </div>
      `;
      })
      .join("");
    img.innerHTML = product;
    changeBtn("audio ", "addToCart", data, "productCart");
    changeBtn("audio", "btnWishlist", data, "wishlist"); //Wishlist Button
  }

  function renderGaming(data) {
    const img = document.querySelector(".gaming");
    const product = data
      .filter((element) => element.category === "gaming")
      .slice(0, 5)
      .map((element) => {
        return `
    <div class="hoverCard card mx-2 border border-primary shadow-lg p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
    <a href="/src/Pages/products/productdetails/productdetails.html?id=${
      element.id
    }"class=" mx-2 mt-auto text-decoration-none">
      <img src="${
        element.image
      }" style="max-height:300px;min-height: 300px;" class="card-img-top productCard " alt="${
          element.title
        }">
        <h5 class="card-title mt-2">${element.title}</h5>
        </a>
      <div class="card-body d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center mt-auto mb-3">
        <span class="card-text fs-3 mt-auto"><sup>$</sup>${element.price}</span>
        <span class="card-text text-success">Discount ${
          element.discount || 0
        }%</span>
        </div>
        <div class="d-flex justify-content-between">
        <button class="btn mt-auto btn-success btnCart addToCart" productData="${
          element.id
        }">Add to cart</button>
        
        <button class="btn d-flex  btnWishlist fs-3" style="border:0" productData=${
          element.id
        } aria-label="Add to Wishlist">
      
    </button>
        </div>
      </div>
      </div>
        `;
      })
      .join("");
    img.innerHTML = product;
    changeBtn("gaming", "addToCart", data, "productCart"); //Cart Button
    changeBtn("gaming", "btnWishlist", data, "wishlist"); //Wishlist Button
  }

  function renderTv(data) {
    const img = document.querySelector(".tv");
    const product = data
      .filter((element) => element.category === "tv")
      .slice(0, 5)
      .map((element) => {
        return `
        <div class="hoverCard card mx-2 border border-primary shadow-lg p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
    <a href="/src/Pages/products/productdetails/productdetails.html?id=${
      element.id
    }"class=" mx-2 mt-auto text-decoration-none">
      <img src="${
        element.image
      }" style="max-height:300px;" class="card-img-top productCard " alt="${
          element.title
        }">
        <h5 class="card-title mt-2">${element.title}</h5>
        </a>
      <div class="card-body d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center mt-auto mb-3">
        <span class="card-text fs-3 mt-auto"><sup>$</sup>${element.price}</span>
        <span class="card-text text-success">Discount ${
          element.discount || 0
        }%</span>
        </div>
        <div class="d-flex justify-content-between">
        <button class="btn mt-auto btn-success btnCart addToCart" productData="${
          element.id
        }">Add to cart</button>
        
        <button class="btn d-flex  btnWishlist fs-3" style="border:0" productData=${
          element.id
        } aria-label="Add to Wishlist">
      
    </button>
        </div>
      </div>
      </div>
        `;
      })
      .join("");
    img.innerHTML = product;
    changeBtn("tv ", "addToCart", data, "productCart");
    changeBtn("tv", "btnWishlist", data, "wishlist"); //Wishlist Button
  }
};

// CheckAuth(authData);
if (currentPath == "/") {
  // isLoggedIn(authData, "./src/Pages/Register/register.html");
  NavBar("navbar");
  footerInjection("footer");
  document.addEventListener("DOMContentLoaded", initializeApp);
}
