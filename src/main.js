import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import * as bootstrap from 'bootstrap'
import "./style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { addToCart } from "./Pages/products/products";
import {fetchData} from "./Pages/products/products"
export function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return cookieValue
    }
  }
  return null;
}

export const Auth = getCookie("Auth")
const CheckAuth = () => {
  // Get the user button element
  let userBtn = document.querySelector(".userBtn");

  // Check if the user button exists
  if (!userBtn) {
    console.error("User button not found!");
    return false;
  }

  // Check if the user is authenticated
  if (Auth) {
    // If authenticated, replace the button with a dropdown
    userBtn.innerHTML = `
<div class="btn-group">
  <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    <i class="fa-solid fa-user " ></i>
</button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item userBtn logOut" href="#">LogOut</a></li>
  </ul>
</div>
    `;
    return true;
  } else {
    // If not authenticated, display Signup button
    userBtn.innerHTML = `
      <button class="btn btn-outline-success ms-2" type="button">
        Signup
      </button>
    `;
    return false;
  }
  
};
  
// document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
const logOutBtn = document.querySelector(".usrbtn");

// Check if the logout button exists
if (logOutBtn) {
  // Add event listener to the logout button
  logOutBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default link behavior
    console.log("Logging out..."); // Debugging message
    logOut("Auth"); // Call the logout function
  });
} else {
  console.error("Logout button not found!"); // Error message if the button is missing
}

// Call the function
CheckAuth();

console.log( CheckAuth())

// Error In ur code mate

// (async function () {
//   try {
//     const response = await fetch("http://localhost:3000/products");
//     const data = await response.json();
//     renderClothing(data);
//     renderJewelery(data);
//     renderElectronics(data);
//     renderImg(data);
//     renderGaming(data);
//     renderTv(data);
//     renderMobile(data);
//     return data;
//   } catch (err) {
//     console.error(`data is not found ${err}`);
//   }
// })();
const fetchedData = await fetchData()
renderClothing(fetchedData);
    renderJewelery(fetchedData);
    renderElectronics(fetchedData);
    renderImg(fetchedData);
    renderGaming(fetchedData);
    renderTv(fetchedData);
    renderMobile(fetchedData);
// export const data = await getData();

function renderClothing(data) {
  const img = document.querySelector(".clothing");
  const product = data
    .filter((element) => element.category === "menClothing")
    .slice(0, 5)
    .map((element) => {
      return `
    <div class="card mx-2 border border-primary shadow-lg p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
      <img src="${element.image}" class="card-img-top productCard" alt="${
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
        <a href="/src/Pages/products/productdetails/productdetails.html" class="btn mt-auto btn-success">Add to cart</a>
        </div>
      </div>
      </div>
      `;
    })
    .join("");
  img.innerHTML = product;
}

function renderJewelery(data) {
  console.log("🚀 ~ renderJewelery ~ data:", data);
  const img = document.querySelector(".jewelery");

  const product = data
    .filter((element) => element.category === "jewelery")
    .slice(0, 5)
    .map((element) => {
      return `
        <div class="card mx-2 border border-primary shadow-lg p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
          <img src="${element.image}" class="card-img-top productCard" alt="${element.title}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text text-danger mt-auto">Price: ${element.price}$</p>
            <p class="card-text text-success">Discount: ${element.discount || 0}%</p>
            <div class="d-flex">
              <a href="/src/Pages/products/productdetails/productdetails.html?id=${element.id}" class="btn mx-2 mt-auto btn-warning">
                Product Details
              </a>
              <button class="btn mt-auto btn-success btnCart" productData=${element.id} >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  img.innerHTML = product;
}
const accordioniItem=document.querySelector(".jewelery")
accordioniItem.addEventListener("click", (event) => {
    if (event.target.classList.contains("btnCart")) {
      const productId = event.target.getAttribute("productData");
      addToCart(productId, fetchedData);
    }  
});
function renderElectronics(data) {
  const img = document.querySelector(".electronics");
  const product = data
    .filter((element) => element.category === "electronics")
    .slice(0, 5)
    .map((element) => {
      return `
    <div class="card mx-2 border border-primary shadow-lg p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
      <img src="${element.image}" class="card-img-top productCard" alt="${
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
        <a href="/src/Pages/products/productdetails/productdetails.html" class="btn mt-auto btn-success">Add to cart</a>
        </div>
      </div>
      </div>
      `;
    })
    .join("");
  img.innerHTML = product;
}

function renderMobile(data) {
  const img = document.querySelector(".mobile");
  const product = data
    .filter((element) => element.category === "mobile")
    .slice(0, 5)
    .map((element) => {
      return `
    <div class="card mx-2 border border-primary shadow-lg p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
      <img src="${element.image}" class="card-img-top productCard" alt="${
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
        <a href="/src/Pages/products/productdetails/productdetails.html" class="btn mt-auto btn-success">Add to cart</a>
        
        </div>
      </div>
      </div>
      `;
    })
    .join("");
  img.innerHTML = product;
}
function renderImg(data) {
  const img = document.querySelector(".audio");
  const product = data
    .filter((element) => element.category === "audio")
    .slice(0, 5)
    .map((element) => {
      return `
    <div class="card mx-2 border border-primary shadow-lg p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
      <img src="${element.image}" class="card-img-top productCard" alt="${
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
        <a href="/src/Pages/products/productdetails/productdetails.html" class="btn mt-auto btn-success">Add to cart</a>
        </div>
      </div>
      </div>
      `;
    })
    .join("");
  img.innerHTML = product;
}

function renderGaming(data) {
  const img = document.querySelector(".gaming");
  const product = data
    .filter((element) => element.category === "gaming")
    .slice(0, 5)
    .map((element) => {
      return `
      <div class="card mx-3 border border-primary shadow-lg p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
        <img src="${element.image}" class="card-img-top productCard" alt="${
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
        <a href="/src/Pages/products/productdetails/productdetails.html" class="btn mt-auto btn-success">Add to cart</a>
        </div>
      </div>
      </div>
        `;
    })
    .join("");
  img.innerHTML = product;
}

function renderTv(data) {
  const img = document.querySelector(".tv");
  const product = data
    .filter((element) => element.category === "tv")
    .slice(0, 5)
    .map((element) => {
      return `
      <div class="card mx-3 border border-primary shadow-lg p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
        <img src="${element.image}" class="card-img-top productCard" alt="${
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
        <a href="/src/Pages/products/productdetails/productdetails.html" class="btn mt-auto btn-success">Add to cart</a>
        </div>
      </div>
      </div>
        `;
    })
    .join("");
  img.innerHTML = product;
}
