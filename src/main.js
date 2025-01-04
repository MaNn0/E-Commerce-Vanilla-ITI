import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./style.css";

import "@fortawesome/fontawesome-free/css/all.min.css";

// document.querySelector("#NavBar").innerHTML = `

// `;

// document.querySelector("#slide").innerHTML = `

// `;

const getData = async function () {
  try {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();
    renderImg(data);
    return data;
  } catch (err) {
    console.error(`data is not found ${err}`);
  }
};
export const data = await getData();

console.log(data);

function renderImg(data) {
  const img = document.querySelector(".row");
  const product = data.map((element) => {
    return `
      <div class="card mx-3" style="width: 18rem;">
        <img src="${element.image}" class="card-img-top productCard" alt="${element.title}">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text text-danger">Price: ${element.price}$</p>
          <p class="card-text text-danger">Discount ${element.discount}%</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>
        `;
  });
  img.innerHTML = product;
}
