import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

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
    return data;
  } catch (err) {
    console.error(`data is not found ${err}`);
  }
})();

// export const data = await getData();

function renderClothing(data) {
  const img = document.querySelector(".clothing");
  const product = data
    .filter((element) => element.category === "men's clothing")
    .slice(0, 5)
    .map((element) => {
      return `
    <div class="card mx-2 border border-primary shadow p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
      <img src="${element.image}" class="card-img-top productCard" alt="${
        element.title
      }">
      <div class="card-body d-flex flex-column ">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text text-danger mt-auto">Price: ${element.price}$</p>
        <p class="card-text text-success">Discount ${element.discount || 0}%</p>
        <a href="#" class="btn mt-auto btn-primary">Go somewhere</a>
      </div>
      </div>
      `;
    })
    .join("");
  img.innerHTML = product;
}

function renderJewelery(data) {
  const img = document.querySelector(".jewelery");
  const product = data
    .filter((element) => element.category === "jewelery")
    .slice(0, 5)
    .map((element) => {
      return `
    <div class="card mx-2 border border-primary shadow p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
      <img src="${element.image}" class="card-img-top productCard" alt="${
        element.title
      }">
      <div class="card-body d-flex flex-column ">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text text-danger mt-auto">Price: ${element.price}$</p>
        <p class="card-text text-success">Discount ${element.discount || 0}%</p>
        <a href="#" class="btn mt-auto btn-primary">Go somewhere</a>
      </div>
      </div>
      `;
    })
    .join("");
  img.innerHTML = product;
}

function renderElectronics(data) {
  const img = document.querySelector(".electronics");
  const product = data
    .filter((element) => element.category === "electronics")
    .slice(0, 5)
    .map((element) => {
      return `
    <div class="card mx-2 border border-primary shadow p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
      <img src="${element.image}" class="card-img-top productCard" alt="${
        element.title
      }">
      <div class="card-body d-flex flex-column ">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text text-danger mt-auto">Price: ${element.price}$</p>
        <p class="card-text text-success">Discount ${element.discount || 0}%</p>
        <a href="#" class="btn mt-auto btn-primary">Go somewhere</a>
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
    <div class="card mx-2 border border-primary shadow p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
      <img src="${element.image}" class="card-img-top productCard" alt="${
        element.title
      }">
      <div class="card-body d-flex flex-column ">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text text-danger mt-auto">Price: ${element.price}$</p>
        <p class="card-text text-success">Discount ${element.discount || 0}%</p>
        <a href="#" class="btn mt-auto btn-primary">Go somewhere</a>
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
    <div class="card mx-2 border border-primary shadow p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
      <img src="${element.image}" class="card-img-top productCard" alt="${
        element.title
      }">
      <div class="card-body d-flex flex-column ">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text text-danger mt-auto">Price: ${element.price}$</p>
        <p class="card-text text-success">Discount ${element.discount || 0}%</p>
        <a href="#" class="btn mt-auto btn-primary">Go somewhere</a>
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
      <div class="card mx-3 border border-primary shadow p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
        <img src="${element.image}" class="card-img-top productCard" alt="${
        element.title
      }">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text text-danger mt-auto">Price: ${element.price}$</p>
        <p class="card-text mt-auto text-success">Discount ${
          element.discount || 0
        }%</p>
        <a href="#" class="btn mt-auto btn-primary">Go somewhere</a>
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
      <div class="card mx-3 border border-primary shadow p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
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
        <a href="#" class="btn mt-auto btn-primary">Go somewhere</a>
      </div>
      </div>
        `;
    })
    .join("");
  img.innerHTML = product;
}
