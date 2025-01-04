import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { setupCounter } from "./counter.js";

document.querySelector("#app").innerHTML = `
  <i class="fa-brands fa-facebook"></i>
  <i class="fa-brands fa-facebook"></i>
`;

setupCounter(document.querySelector("#counter"));
