const switchBtn = document.querySelector(".switchBtn");
switchBtn.addEventListener("click", () => {
  const swtichbtn = document.querySelector(".switchBtn");
  if (swtichbtn.innerHTML === "Register") {
    swtichbtn.innerHTML = "Login";
    document.querySelector(".email").classList.add = "d-none";
  } else {
    swtichbtn.innerHTML = "Register";
  }
});
