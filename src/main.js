import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { setupCounter } from "./counter.js";

document.querySelector("#app").innerHTML = `
 
`;

setupCounter(document.querySelector("#counter"));
