import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import * as bootstrap from 'bootstrap'
import "./style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { addToCart } from "./Pages/products/products";
import { isLoggedIn } from "./assets/reusable";
function getCookie(name) {
  // Check sessionStorage first
  if (sessionStorage.getItem("Auth")) {
    const sessionValue = sessionStorage.getItem("Auth");
    try {
      const sessionData = JSON.parse(sessionValue); // Parse the session data
      console.log("🚀 ~ getCookie ~ sessionData:", sessionData )
      if (sessionData) {
        return { name:"Auth", value: sessionValue , type: "session" }; // Return the session value
      }
    } catch (error) {
      console.error("Error parsing sessionStorage data:", error);
    }
  }

  // If not found in sessionStorage, check cookies
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {      
      return { name: cookieName, value: cookieValue, type:"cookies" }; // Return the cookie value
    }
  }

  // If not found, return null
  return null;
}
// Get the "Auth" cookie
const authCookie = getCookie("Auth");
// console.log("🚀 ~ authCookie:", authCookie)

// DeleteCookie
function deleteCookie(name) {
  console.log(name);
  
  sessionStorage.clear();
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  
}

// Check if the cookie exists and extract the values
export const authName = authCookie ? authCookie.name : null;
export const authData = authCookie ? authCookie.value : null;
export const authType = authCookie ? authCookie.type : null;
console.log(authName, authData,authType);
const currentPath =  window.location.pathname;
const userData=JSON.parse(authData)

// export const isLoggedIn = (authData)=> {
//   const userBtn = document.querySelector(".userBtn");
//   const userData=JSON.parse(authData)
//   if (userBtn && currentPath =="/" && userData ) {

//     userBtn.innerHTML = `
//       <div class="btn-group">
//         <button type="button" class="btn ms-2 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" >
//           <i class="fa-solid fa-user"></i>
//         </button>
//         <ul class="dropdown-menu" style="left: -100%;">
//           <li> ${userData.firstName} ${userData.lastName}</li>
//           <li><a class="dropdown-item" href="./src/Pages/Profile/Profile.html"><i class="fa-regular fa-user"></i> Profile</a></li>
//           <li><a class="dropdown-item" href="#"><i class="fa-solid fa-star"></i> WishList</a></li>
//           <li><a class="dropdown-item" href="#"><i class="fa-solid fa-box-archive"></i> Orders</a></li>
//           <li><hr class="dropdown-divider"></li>
//           <li><a class="dropdown-item logOutBtn" href="./"><i class="fa-solid fa-arrow-right-from-bracket"></i>LogOut</a></li>
//         </ul>
//       </div>
//     `
//     const logOutBtn = document.querySelector(".logOutBtn");
//     console.log("🚀 ~ initializeApp ~ logOutBtn:", logOutBtn)
//     if (logOutBtn) {
//       logOutBtn.addEventListener("click", (event) => {
//         event.preventDefault();
//         deleteCookie("Auth");
//         window.location.href = "http://localhost:5173/"; // Redirect to login page
//       });
//     }
//     return true;
//   } else {
//     console.log(userBtn);
//     userBtn.innerHTML = `
//      <a href="./src/Pages/Register/register.html">
//             <button class="btn btn-outline-light ms-2" type="button">
//               Signup
//             </button>
//           </a>
//     `;
//     return false;
//   }
// }

  const initializeApp = async () =>{
    const btnCart = document.querySelectorAll(".btnCart");
    (async function () {
      try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
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
      } catch (err) {
        console.error(`Data is not found: ${err}`);
      }
    })();
    // isLoggedIn(authData)

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
        <button class="btn mt-auto btn-success btnCart" productData="${
          element.id
        }">Add to cart</button>
        </div>
      </div>
      </div>
      `;
    })
    .join("");
  img.innerHTML = product;
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
        <button class="btn mt-auto btn-success btnCart" productData="${
          element.id
        }">Add to cart</button>
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
        <button class="btn mt-auto btn-success btnCart" productData="${
          element.id
        }">Add to cart</button>
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
<button class="btn mt-auto btn-success btnCart" productData="${
        element.id
      }">Add to cart</button>
        
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
        <button class="btn mt-auto btn-success btnCart" productData="${
          element.id
        }">Add to cart</button>
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
        <button class="btn mt-auto btn-success btnCart" productData="${
          element.id
        }">Add to cart</button>
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
        <button class="btn mt-auto btn-success btnCart" productData="${
          element.id
        }">Add to cart</button>
        </div>
      </div>
      </div>
        `;
    })
    .join("");
  img.innerHTML = product;
}};
// CheckAuth(authData);
if (currentPath == "/") {
  isLoggedIn(authData,'./src/Pages/Register/register.html')
  document.addEventListener("DOMContentLoaded", initializeApp);
}
