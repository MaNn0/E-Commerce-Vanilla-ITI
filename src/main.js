import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {getCookie, addToCart,fetchData ,NavBar,changeBtn} from "./assets/reusable";

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

  const data=await fetchData();
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
  //Event Listener
  

  function renderClothing(data) {
    const img = document.querySelector(".clothing");
    const product = data
      .filter((element) => element.category === "menClothing")
      .slice(0, 5)
      .map((element) => {
        return `
    <div class="card mx-2 border border-primary shadow-lg p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
      <img src="${
        element.image
      }" style="max-height:300px" class="card-img-top productCard" alt="${
          element.title
        }">
      <div class="card-body d-flex flex-column ">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text text-danger mt-auto">Price: ${element.price}$</p>
        <p class="card-text text-success">Discount ${element.discount || 0}%</p>
        <div class="d-flex">
        <a href="/src/Pages/products/productdetails/productdetails.html?id=${
          element.id
        }"  class="btn mx-2 mt-auto btn-warning">Product Details</a>
        <button class="btn mt-auto btn-success btnCart addToCart" productData="${
          element.id
        }">Add to cart</button>
        </div>
      </div>
      </div>
      `;
      })
      .join("");
    img.innerHTML = product;
    changeBtn("clothing", "addToCart",data);
  }
  function renderJewelery(data) {
    // console.log("🚀 ~ renderJewelery ~ data:", data);
    const img = document.querySelector(".jewelery");

    const product = data
      .filter((element) => element.category === "jewelery")
      .slice(0, 5)
      .map((element) => {
        return `
    <div class="card mx-2 productCards border border-primary shadow-lg p-3 mb-3 bg-body-tertiary rounded" style="width: 18rem;">
      <img src="${
        element.image
      }" style="max-height:300px" class="card-img-top productCard" alt="${
          element.title
        }">
      <div class="card-body d-flex flex-column ">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text text-danger mt-auto">Price: ${element.price}$</p>
        <p class="card-text text-success">Discount ${element.discount || 0}%</p>
        <div class="d-flex">
        <a href="/src/Pages/products/productdetails/productdetails.html?id=${
          element.id
        }"  class="btn mx-2 mt-auto btn-warning">Product Details</a>
        <button class="btn mt-auto btn-success btnCart addToCart" productData="${
          element.id
        }">Add to cart</button>
        </div>
      </div>
      </div>
      `;
      })
      .join("");

    img.innerHTML = product;
    changeBtn("jewelery", "addToCart",data);
  }

  function renderElectronics(data) {
    const img = document.querySelector(".electronics");
    const product = data
      .filter((element) => element.category === "electronics")
      .slice(0, 5)
      .map((element) => {
        return `
    <div class="card mx-2 border border-primary shadow-lg p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
      <img src="${
        element.image
      }" style="max-height:300px" class="card-img-top productCard" alt="${
          element.title
        }">
      <div class="card-body d-flex flex-column ">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text text-danger mt-auto">Price: ${element.price}$</p>
        <p class="card-text text-success">Discount ${element.discount || 0}%</p>
        <div class="d-flex">
        <a href="/src/Pages/products/productdetails/productdetails.html?id=${
          element.id
        }"  class="btn mx-2 mt-auto btn-warning">Product Details</a>
        <button class="btn mt-auto btn-success btnCart addToCart" productData="${
          element.id
        }">Add to cart</button>
        </div>
      </div>
      </div>
      `;
      })
      .join("");
    img.innerHTML = product;
    changeBtn("electronics", "addToCart",data);
  }

  function renderMobile(data) {
    const img = document.querySelector(".mobile");
    const product = data
      .filter((element) => element.category === "mobile")
      .slice(0, 5)
      .map((element) => {
        return `
    <div class="card mx-2 border border-primary shadow-lg p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
      <img src="${
        element.image
      }" style="max-height:300px" class="card-img-top productCard" alt="${
          element.title
        }">
      <div class="card-body d-flex flex-column ">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text text-danger mt-auto">Price: ${element.price}$</p>
        <p class="card-text text-success">Discount ${element.discount || 0}%</p>
        <div class="d-flex">
        <a href="/src/Pages/products/productdetails/productdetails.html?id=${
          element.id
        }"  class="btn mx-2 mt-auto btn-warning">Product Details</a>
<button class="btn mt-auto btn-success btnCart addToCart" productData="${
          element.id
        }">Add to cart</button>
        
        </div>
      </div>
      </div>
      `;
      })
      .join("");
    img.innerHTML = product;
    changeBtn("mobile", "addToCart",data);

    
  }
  function renderImg(data) {
    const img = document.querySelector(".audio");
    const product = data
      .filter((element) => element.category === "audio")
      .slice(0, 5)
      .map((element) => {
        return `
    <div class="card mx-2 border border-primary shadow-lg p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
      <img src="${
        element.image
      }" style="max-height:300px" class="card-img-top productCard" alt="${
          element.title
        }">
      <div class="card-body d-flex flex-column ">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text text-danger mt-auto">Price: ${element.price}$</p>
        <p class="card-text text-success">Discount ${element.discount || 0}%</p>
        <div class="d-flex">
        <a href="/src/Pages/products/productdetails/productdetails.html?id=${
          element.id
        }"  class="btn mx-2 mt-auto btn-warning">Product Details</a>
        <button class="btn mt-auto btn-success btnCart addToCart" productData="${
          element.id
        }">Add to cart</button>
        </div>
      </div>
      </div>
      `;
      })
      .join("");
    img.innerHTML = product;
    changeBtn("audio ", "addToCart",data);
  }

  function renderGaming(data) {
    const img = document.querySelector(".gaming");
    const product = data
      .filter((element) => element.category === "gaming")
      .slice(0, 5)
      .map((element) => {
        return `
      <div class="card mx-3 border border-primary shadow-lg p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
        <img src="${
          element.image
        }" style="max-height:300px" class="card-img-top productCard" alt="${
          element.title
        }">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text text-danger mt-auto">Price: ${element.price}$</p>
        <p class="card-text mt-auto text-success">Discount ${
          element.discount || 0
        }%</p>
        <div class="d-flex">
        <a href="/src/Pages/products/productdetails/productdetails.html?id=${
          element.id
        }"  class="btn mx-2 mt-auto btn-warning">Product Details</a>
        <button class="btn mt-auto btn-success btnCart addToCart" productData="${
          element.id
        }">Add to cart</button>
        </div>
      </div>
      </div>
        `;
      })
      .join("");
    img.innerHTML = product;
    changeBtn("gaming ", "addToCart",data);
  }

  function renderTv(data) {
    const img = document.querySelector(".tv");
    const product = data
      .filter((element) => element.category === "tv")
      .slice(0, 5)
      .map((element) => {
        return `
      <div class="card mx-3 border border-primary shadow-lg p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
        <img src="${
          element.image
        }" style="max-height:300px" class="card-img-top productCard" alt="${
          element.title
        }">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text mt-auto text-danger mt-auto">Price: ${
          element.price
        }$</p>
        <p class="card-text mt-auto text-success">Discount ${
          element.discount || 0
        }%</p>
        <div class="d-flex">
        <a href="/src/Pages/products/productdetails/productdetails.html?id=${
          element.id
        }"  class="btn mx-2 mt-auto btn-warning">Product Details</a>
        <button class="btn mt-auto btn-success btnCart addToCart" productData="${
          element.id
        }">Add to cart</button>
        </div>
      </div>
      </div>
        `;
      })
      .join("");
    img.innerHTML = product;
    changeBtn("tv ", "addToCart",data);
  }
};

// CheckAuth(authData);
if (currentPath == "/") {
  // isLoggedIn(authData, "./src/Pages/Register/register.html");
  NavBar("navbar")
  document.addEventListener("DOMContentLoaded", initializeApp);
}
