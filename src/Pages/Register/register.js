import "@fortawesome/fontawesome-free/css/all.min.css";

const switchBtnLogin = document.querySelector(".switchBtnLogin");
const switchBtnRegister = document.querySelector(".switchBtnRegister");
const hideLogin = document.querySelector("#toggleHideLogin");
const hideRegister = document.querySelector("#toggleHideRegister");

switchBtnLogin.addEventListener("click", () => {
  hideLogin.classList.add("hide");
  hideRegister.classList.remove("hide");
  hideRegister.classList.add("show");
  hideLogin.classList.remove("show");
});

switchBtnRegister.addEventListener("click", () => {
  hideLogin.classList.add("show");
  hideRegister.classList.remove("show");
  hideRegister.classList.add("hide");
  hideLogin.classList.remove("hide");
});
