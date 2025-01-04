import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./style.css";

import "@fortawesome/fontawesome-free/css/all.min.css";

// document.querySelector("#NavBar").innerHTML = `

// `;

// document.querySelector("#slide").innerHTML = `

// `;

// console.log("hi");

fetch("http://localhost:3000/products")
  .then((response) => response.json())
  .then((data) => data);
// console.log(data.category.audo);
