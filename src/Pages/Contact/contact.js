import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { NavBar, footerInjection } from "../../assets/reusable";

const currentPath = window.location.pathname;
if (currentPath.endsWith("contact.html")) {
  NavBar("navbar");
  footerInjection("footer");
  document.addEventListener("DOMContentLoaded", initializeApp);
}
