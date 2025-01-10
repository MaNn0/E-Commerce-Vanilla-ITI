import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./profile.css";

import { isLoggedIn,authName,authData,authType } from "../../assets/reusable";

document.querySelector("#profile").innerHTML = `
`;
let btn = document.querySelector("#btn");
let sideBar = document.querySelector(".sideBar");
btn.onclick = function () {
  sideBar.classList.toggle("active");
};
console.log(authName,authType,authData);
isLoggedIn(authData,"./../Register/register.html")