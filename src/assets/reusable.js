import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
  import * as bootstrap from "bootstrap";
// import { Button } from "bootstrap/dist/js/bootstrap.bundle.min.js";
// DataFetching
export const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3000/products");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    // Display an error message to the user
    const productsContainer = document.querySelector(".products");
    if (productsContainer) {
      productsContainer.innerHTML = `<p class="text-danger">Failed to load products. Please try again later.</p>`;
    }
    return []; // Return an empty array to avoid breaking the app
  }
};
// setCookie
export function setCookie(name, value, daysToExpire, authType) {
  try {
    if (authType === "cookies") {
      // Set a cookie

      const date = new Date();
      date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000); // Calculate expiration date

      const expires = `expires=${date.toUTCString()}`; // Format expiration date

      const cookieValue = JSON.stringify(value); // Convert value to JSON string

      // Set the cookie with additional attributes for security
      document.cookie = `${name}=${cookieValue}; ${expires}; path=/; Secure; SameSite=Strict`;

      console.log("🚀 ~ setCookie ~ cookie set:", { name, value, expires });
    } else if (authType === "session") {
      // Store in sessionStorage
      const sessionValue = JSON.stringify(value); // Convert value to JSON string
      sessionStorage.setItem(name, sessionValue);
      // console.log("🚀 ~ setCookie ~ sessionStorage set:", { name, value });
    } else {
      const localValue = JSON.stringify(value); // Convert value to JSON string
      localStorage.setItem(name, localValue);
    }
  } catch (error) {
    console.error("Error in setCookie:", error);
  }
}

// GetCookie

export function getCookie(name) {
  // console.log(name);
  if (sessionStorage.getItem(name)) {
    const sessionValue = sessionStorage.getItem(name);
    try {
      const sessionData = JSON.parse(sessionValue); // Parse the session data
      // console.log("🚀 ~ getCookie ~ sessionData:", sessionData )
      if (sessionData) {
        return { name: name, value: sessionValue, type: "session" }; // Return the session value
      }
    } catch (error) {
      console.error("Error parsing sessionStorage data:", error);
    }
  } else if (localStorage.getItem(name)) {
    const localValue = localStorage.getItem(name);
    try {
      const localData = JSON.parse(localValue); // Parse the session data
      // console.log("🚀 ~ getCookie ~ sessionData:", sessionData )
      if (localData) {
        return { name: name, value: localValue, type: "local" }; // Return the session value
      }
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
    }
  } else {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split("=");
      if (cookieName === name) {
        return { name: cookieName, value: cookieValue, type: "cookies" }; // Return the cookie value
      }
    }
  }

  return null;
}

// Delete Cookies When user LogOut

export function deleteCookie(name) {
  sessionStorage.removeItem(name); // Deletes the 'username'
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  // sessionStorage.clear();
}

const authCookie = getCookie("Auth");
const productCart = getCookie("productCart");
// Better For Handling Error To get cookies and ReuseThem There {Destruct }
export const authName = authCookie ? authCookie.name : null;
// console.log("🚀 ~ authName:", authName)
export const authData = authCookie ? authCookie.value : null;
// console.log("🚀 ~ authData:", authData)
export const authType = authCookie ? authCookie.type : null;
export const productsName = productCart ? productCart.name : null;
export const productsData = productCart ? productCart.value : null;
export const isLoggedIn = (authData, href) => {
  const userBtn = document.querySelector(".userBtn");

  // Check if the user button exists
  if (!userBtn) {
    console.error("User button element not found.");
    return false;
  }

  // If authData is not provided, show the signup button
  if (!authData) {
    console.error("No authentication data provided.");
    renderSignupButton(userBtn, href);
    return false;
  }

  // Parse user data from authData
  let userData;
  try {
    userData = JSON.parse(authData);
  } catch (error) {
    console.error("Error parsing user data:", error);
    renderSignupButton(userBtn, href);
    return false;
  }

  // Update the UI if the user is logged in
  if (userBtn && userData) {
    userBtn.innerHTML = `
               <div class="btn-group ">
          <button type="button" class="btn ms-2 dropdown-toggle text-white" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-user"></i>
          </button>
          <ul class="dropdown-menu text-center" style="left: -100%;">
            <li class="py-2">Hello, <span class="text-danger">${userData.firstName} ${userData.lastName}</span></li>
            <li><a class="dropdown-item border-top" href="/src/Pages/Profile/Profile.html"><i class="fa-regular fa-user me-1"></i> Profile</a></li>
     
            <li><a class="dropdown-item border-top" href="/src/Pages/Wishlist/wishlist.html"><i class="fa-regular fa-bookmark me-1"></i>Wishlist</a></li>
     
            <li><a class="dropdown-item border-top" href="/src/Pages/Payment/myOrder.html"><i class="fa-solid fa-cart-shopping me-1"></i> Orders</a></li>
     
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item logOutBtn" href="/"><i class="fa-solid fa-arrow-right-from-bracket"></i>LogOut</a></li>
          </ul>
        </div>
      `;
    const logOutBtn = document.querySelector(".logOutBtn");
    if (logOutBtn) {
      logOutBtn.addEventListener("click", (event) => {
        event.preventDefault();
        deleteCookie("Auth");
        deleteCookie("orders");
        deleteCookie("productCart");
        deleteCookie("wishlist");

        if (
          window.location.href ==
          "http://localhost:5173/src/Pages/Profile/Profile.html"
        ) {
          window.location.pathname = "/";
        } else {
          window.location.href = window.location.href;
        }
      });
    }
    return true;
  } else {
    userBtn.innerHTML = `
        <a href=${href}>
          <button class="btn btn-outline-light ms-2" type="button">
            Signup
          </button>
        </a>
      `;
    return false;
  }
};

// Post Data After Updating
export async function postData(data = {}, userId) {
  try {
    // Validate input parameters
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid user ID");
    }
    if (Object.keys(data).length === 0) {
      throw new Error("No data provided for update");
    }

    console.log("🚀 ~ postData ~ data:", data);

    const url = `http://localhost:3000/accounts/${userId}`;

    // Fetch options
    const options = {
      method: "PUT", // Specify the request method
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify(data), // Convert the data to JSON
    };

    // Await the fetch call
    const response = await fetch(url, options);

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      // Handle specific HTTP errors
      const errorMessage =
        response.status === 404
          ? "User not found"
          : response.status === 400
          ? "Invalid data provided"
          : `HTTP error! Status: ${response.status}`;
      throw new Error(errorMessage);
    }

    // Parse the JSON response
    const result = await response.json();

    // Log the result
    console.log("🚀 ~ postData ~ result:", result);

    // Provide user feedback
    alert("Success: Data updated successfully!");
    return result; // Return the parsed result
  } catch (error) {
    // Handle errors
    console.error("Error in postData:", error);

    // Provide user feedback
    alert(`Failed: ${error.message}`);
  }
}
// Erorr AND declaration Handling
const nameForm = document.querySelector("#name");
const nameError = document.querySelector(".nameError");

const name2Form = document.querySelector("#name2");
const name2Error = document.querySelector(".name2Error");

const email = document.querySelector("#email");
const emailError = document.querySelector(".emailError");

const password = document.querySelector("#password");
const passwordError = document.querySelector(".passwordError");

const repassword = document.querySelector("#repassword");
const repasswordError = document.querySelector(".repasswordError");

const address = document.querySelector("#inputAddress");
const addressError = document.querySelector(".addressError");

const city = document.querySelector("#inputCity");
const cityError = document.querySelector(".cityError");

function showError(
  nameForm,
  name2Form,
  email,
  password,
  repassword,
  address,
  address2,
  city
) {
  let hasErrors = 0;

  // Check for empty first name
  nameForm.value.trim().length === 0
    ? (nameError.classList.remove("d-none"), (hasErrors = 1))
    : nameError.classList.add("d-none");

  // Check for empty second name
  name2Form.value.trim().length === 0
    ? (name2Error.classList.remove("d-none"), (hasErrors = 1))
    : name2Error.classList.add("d-none");

  // Check email validation
  if (email.value.trim().length === 0) {
    emailError.textContent = "Email can't be empty";
    hasErrors = 1;
  } else if (!/^[a-zA-Z0-9.%+-]+@gmail\.com$/.test(email.value.trim())) {
    emailError.textContent = "Email is invalid / not a gmail address";
    hasErrors = 1;
  } else {
    emailError.textContent = "";
  }

  // Check password validation
  if (password.value.trim().length === 0) {
    passwordError.textContent = "Password required";
    hasErrors = 1;
  } else if (password.value.trim().length < 8) {
    passwordError.textContent = "Password must be at least 8 characters";
    hasErrors = 1;
  } else if (
    !/[*@$#%&!^()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password.value.trim())
  ) {
    passwordError.textContent =
      "Password must contain at least one special character (e.g., * @ % $ #)";
    hasErrors = 1;
  } else {
    passwordError.textContent = "";
  }

  // Check password match
  if (repassword.value.trim().length === 0) {
    repasswordError.textContent = "";
  } else if (repassword.value.trim() !== password.value.trim()) {
    repasswordError.textContent = "Passwords are not matched";
    hasErrors = 1;
  } else {
    repasswordError.textContent = "";
  }

  // Check address
  if (address.value.trim().length === 0) {
    addressError.textContent = "Required";
    hasErrors = 1;
  } else {
    addressError.textContent = "";
  }

  // Check address2
  // if (address2.value.trim().length === 0) {
  //   address2Error.textContent = "Required";
  //   hasErrors = 1;
  // } else {
  //   address2Error.textContent = "";
  // }

  // Check city
  if (city.value.trim().length === 0) {
    cityError.textContent = "Required";
    hasErrors = 1;
  } else {
    cityError.textContent = "";
  }

  return hasErrors;
}
// Updating Form Data
export function formSubmit(
  authType,
  userId,
  formName,
  formData,
  inputFirstName,
  inputLastName,
  inputEmail,
  inputPassword,
  inputRePassword,
  inputMainAddress,
  inputSecondaryAddress,
  inputCity
) {
  // Check For Errors
  let noErrors = showError(
    inputFirstName,
    inputLastName,
    inputEmail,
    inputPassword,
    inputRePassword,
    inputMainAddress,
    inputSecondaryAddress,
    inputCity
  );

  if (noErrors === 0) {
    setCookie("Auth", formData, 1, authType);
    // Post Data
    postData(formData, userId);
  }
}

export const addToCart = (productId, products) => {
  let productCart = getCookie("productCart");
  const productsName = productCart ? productCart.name : null;
  const productsData = productCart ? productCart.value : null;

  const product = products.find((p) => p.id == productId);

  const existingProducts = JSON.parse(productsData) || [];
  console.log("🚀 ~ addToCart ~ existingProducts:", existingProducts);
  const productIndex = existingProducts.findIndex((p) => p.id === productId);
  // productIndex = true(index) OR false (-1)
  if (productIndex !== -1) {
    // y3ne mawgod [1,2,4,5,6]
    existingProducts[productIndex].quantity += 1;
  } else {
    // lw m4 mawgod
    product.quantity = 1; // creating quantity
    existingProducts.push(product);
  }
  setCookie("productCart", existingProducts, 1, authType);
};
// Fetch Data

// is userLoged in Cart Btn Login Button
export const transferGuestAction = (name, authType) => {
  const localItem = localStorage.getItem(name);
  console.log("🚀 ~ transferGuestAction ~ localItem:", localItem);
  const localValue = JSON.parse(localItem);
  console.log("🚀 ~ transferGuestAction ~ localValue:", localValue);
  if (localValue) {
    if (authType === "cookies") {
      setCookie(name, localValue, 1, authType);
      localStorage.removeItem(name);
    } else if (authType === "session") {
      setCookie(name, localValue, 1, authType);
      localStorage.removeItem(name);
    } else {
      console.log("🚀 ~ transferGuestAction ~ lovalValue:", localValue);
    }
  }
};
export const searchButton = () => {
  const searchContainer = document.querySelector(".search-container");
  const searchBtn = document.querySelector(".searchBtn");
  const searchResults = document.querySelector(".searchResults");

  let products = []; // Store fetched products

  // Fetch products when the button is clicked
  searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    // Fetch product data
    products = await fetchData();

    let input = searchContainer.querySelector(".searchInput");
    if (!input) {
      input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Search...";
      input.className = "searchInput"; // Add the base class

      searchContainer.replaceChild(input, searchBtn);

      setTimeout(() => {
        input.classList.add("active", "searchInput2");
        input.focus();
      }, 10);

      input.addEventListener("blur", () => {
        if (!input.value.trim()) {
          input.classList.remove("active");
          searchResults.classList.add("d-none");
          setTimeout(() => {
            searchContainer.replaceChild(searchBtn, input);
          }, 300);
        }
      });

      input.addEventListener("input", () => {
        searchResults.classList.remove("d-none");

        const foundProduct = products.filter((product) =>
          product.title.toLowerCase().includes(input.value.toLowerCase())
        );

        if (foundProduct) {
          searchResults.innerHTML = foundProduct
            .map(
              (product) => `
    <a class="text-decoration-none " href="/src/Pages/products/productdetails/productdetails.html?id=${product.id}">
    <div class="productlink">
      <img style="width:50px" src="${product.image}" alt="Product Image" />
      <span>${product.title}</span>
      </div>
    </a>
  `
            )
            .join("");
        } else {
          searchResults.textContent = "No product found"; // If no product found
        }
      });
    } else {
      input.focus(); // Focus on the existing input
    }
  });
};

export const footerInjection = (footerNam) => {
  const footerElement = document.querySelector(`.${footerNam}`);

  // Check if the element exists
  if (!footerElement) {
    console.error(`Element with class "${footerNam}" not found.`);
    return;
  }

  // Define the footer HTML
  const footerHTML = `
    <div class="container text-center">
      <div class="row gy-4">
        <!-- Mahmoud Nasr -->
        <div class="col-md-3 border-end border-black">
          <h4 class="bg-dark text-white py-2 rounded">Mahmoud Nasr</h4>
          <a href="https://www.linkedin.com/in/mahmoud-nasr-82aa822a9/" target="_blank"
            class="d-inline d-flex align-items-center justify-content-center text-white text-decoration-none hover-link my-2">
            LinkedIn <i class="fa-brands fa-linkedin ms-2"></i>
          </a>
          <a href="https://github.com/MahmoudNasrZ" target="_blank"
            class="d-inline d-flex align-items-center justify-content-center text-white text-decoration-none hover-link my-2">
            GitHub <i class="fa-brands fa-github ms-2"></i>
          </a>
          <a href="https://mahmoudnasrz.github.io/Portfolio/" target="_blank"
            class="d-inline d-flex align-items-center justify-content-center text-white text-decoration-none hover-link my-2">
            Portfolio <i class="fa-solid fa-briefcase ms-2"></i>
          </a>
        </div>

        <!-- Abdelrahman Ebeid -->
        <div class="col-md-3 border-end border-black">
          <h4 class="bg-dark text-white py-2 rounded">Abdelrahman Ebeid</h4>
          <a href="https://www.linkedin.com/in/abdelrahman-ebied69/" target="_blank"
            class="d-inline d-flex align-items-center justify-content-center text-white text-decoration-none hover-link my-2">
            LinkedIn <i class="fa-brands fa-linkedin ms-2"></i>
          </a>
          <a href="https://github.com/MaNn0" target="_blank"
            class="d-inline d-flex align-items-center justify-content-center text-white text-decoration-none hover-link my-2">
            GitHub <i class="fa-brands fa-github ms-2"></i>
          </a>
          <a href="https://mann0.github.io/Portfolio/" target="_blank"
            class="d-inline d-flex align-items-center justify-content-center text-white text-decoration-none hover-link my-2">
            Portfolio <i class="fa-solid fa-briefcase ms-2"></i>
          </a>
        </div>

        <!-- Hossam Zakaria -->
        <div class="col-md-3 border-end border-black">
          <h4 class="bg-dark text-white py-2 rounded">Hossam Zakaria</h4>
          <a href="https://www.linkedin.com/in/hossam-zakaria-s/" target="_blank"
            class="d-inline d-flex align-items-center justify-content-center text-white text-decoration-none hover-link my-2">
            LinkedIn <i class="fa-brands fa-linkedin ms-2"></i>
          </a>
          <a href="https://github.com/HossamZakariaSannad" target="_blank"
            class="d-inline d-flex align-items-center justify-content-center text-white text-decoration-none hover-link my-2">
            GitHub <i class="fa-brands fa-github ms-2"></i>
          </a>
          <a href="https://hossamzakariasannad.github.io/html-project-portfolio/" target="_blank"
            class="d-inline d-flex align-items-center justify-content-center text-white text-decoration-none hover-link my-2">
            Portfolio <i class="fa-solid fa-briefcase ms-2"></i>
          </a>
        </div>

        <!-- Farid Mahmoud -->
        <div class="col-md-3">
          <h4 class="bg-dark text-white py-2 rounded">Farid Mohamed</h4>
          <a href="https://www.linkedin.com/in/farid-azzam-2882051b2/" target="_blank"
            class="d-inline d-flex align-items-center justify-content-center text-white text-decoration-none hover-link my-2">
            LinkedIn <i class="fa-brands fa-linkedin ms-2"></i>
          </a>
          <a href="https://github.com/fazm1" target="_blank"
            class="d-inline d-flex align-items-center justify-content-center text-white text-decoration-none hover-link my-2">
            GitHub <i class="fa-brands fa-github ms-2"></i>
          </a>
          <a href="https://fazm1.github.io/portfolio/" target="_blank"
            class="d-inline d-flex align-items-center justify-content-center text-white text-decoration-none hover-link my-2">
            Portfolio <i class="fa-solid fa-briefcase ms-2"></i>
          </a>
        </div>
      </div>
    </div>
  `;

  // Inject the footer HTML into the footer element
  footerElement.innerHTML = footerHTML;
};
export const NavBar = (navName) => {
  const navElement = document.querySelector(`.${navName}`);

  // Check if the element exists
  if (!navElement) {
    console.error(`Element with class "${navName}" not found.`);
    return;
  }

  // Navbar HTML template
  const navbarHTML = `
      <div class="container-fluid">
        <div class="left">
          <span class="navbar-brand mb-0 h1 text-white">Khaled's Store |</span>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
                      <li class="nav-item">
              <a class="nav-link text-white" href="/"><i class="fa-solid fa-house"></i>Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="/src/Pages/Cart/cart.html"><i class="fa-solid fa-cart-shopping"></i> Cart</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="/src/Pages/products/products.html"><i class="fa-solid fa-store"></i> Store</a>
            </li>
            </li>  <li class="nav-item">
              <a class="nav-link text-white" href="/src/Pages/Contact/contact.html"><i class="fa-solid fa-credit-card"></i> Contact Us</a>
            </li>
          </ul>
          <form class="d-flex">
            <input class="form-control me-2 searchInput" type="search" placeholder="Search" aria-label="Search" id="searchInput" />
            <div class="search-container">
              <button class="searchBtn" type="submit"><i class="fa-solid fa-magnifying-glass" style="color: #f6f5f4;"></i></button>
              <div class="searchResults d-none"></div>
            </div>
            <span class="userBtn"></span>
          </form>
        </div>
      </div>
    `;

  // Inject the navbar HTML
  navElement.innerHTML = navbarHTML;

  // Initialize the search button functionality
  searchButton();

  // Check if the user is logged in
  isLoggedIn(authData, "/src/Pages/Register/register.html");
};

// Change Button

export function changeBtn(parent, child, fetchData, targetKey) {
  // debugger

  let btnName = "";
  let btnRmName = "";

  if (child === "addToCart") {
    btnName = "Add To Cart";
    btnRmName = "Remove From Cart";
  } else {
    btnName = `<i class="fa-regular fa-heart"></i>`;
    btnRmName = `<i class="fa-solid fa-heart" style="color:#b10b0b"></i>`;
  }

  // Get the product cart data from storage

  const product = getCookie(targetKey);
  const productInCart = product ? JSON.parse(product.value) : [];

  // Select the container
  const container = document.querySelector(`.${parent}`);
  if (!container) return; // Exit if the container doesn't exist

  // Function to update button text and class
  function updateButtons() {
    const btnToChangeNodes = document.querySelectorAll(`.${child}`);

    btnToChangeNodes.forEach((element) => {
      const productData = element.getAttribute("productdata");

      // Check if the product is in the cart
      const productExists = productInCart.some(
        (product) => product.id == productData
      );

      // Update the button text and class
      if (productExists) {
        console.log("🚀 ~ changeBtn ~ btnRmName:", btnRmName);
        console.log("🚀 ~ changeBtn ~ BtnName:", btnName);
        element.innerHTML = `${btnRmName}`;
        element.classList.remove("addToCartIcon");
        element.classList.add("removeFromCart");
      } else {
        element.innerHTML = `${btnName}`;
        element.classList.add("addToCartIcon");
        element.classList.remove("removeFromCart");
      }
    });
  }

  // Initial button update
  updateButtons();

  // Add event listener to the container for event delegation
  container.addEventListener("click", (event) => {
    if (event.target.classList.contains(child.replace(".", ""))) {
      //If you want to use it Pul Value
      const productData = event.target.getAttribute("productdata");

      // Find the product in the cart
      const productIndex = productInCart.findIndex(
        (product) => product.id == productData
      );

      if (productIndex === -1) {
        // Product doesn't exist in the cart, so add it
        const productToAdd = fetchData.find(
          (product) => product.id === productData
        );
        if (productToAdd) {
          // Set initial quantity to 1
          productToAdd.quantity = 1;
          productInCart.push(productToAdd);
          console.log("Product added to cart:", productToAdd);
        }
      } else {
        // Product exists in the cart, so remove it
        const removedProduct = productInCart.splice(productIndex, 1);
        console.log("Product removed from cart:", removedProduct);
      }

      // Update the storage with the new cart data
      setCookie(targetKey, productInCart, 1, authType); // Set cookie with 1-day expiration

      // Update the buttons to reflect the new cart state
      updateButtons();
    }
  });
}
