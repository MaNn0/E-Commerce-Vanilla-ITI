import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./product.css";

const fetchData = async function () {
  try {
    const response = await fetch("http://localhost:3000/products");
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchedData = await fetchData();
console.log(fetchedData);

let dataToMap = fetchedData;
const catValue = "";
if (catValue) {
  const dataToMap = fetchedData.filter((catValue) =>
    catValue.title.includescatValue(catValue)
  );
} else {
  dataToMap = fetchedData;
}

document.querySelector(".products").innerHTML = dataToMap
  .map((product) => {
    return `
    <div class="card productCards" style="width: 18rem;">
      <img src="${product.image}" class="card-img-top" alt="${product.title}">
      <div class="card-body visibleBody">
        <h5 class="card-title">${product.title}</h5>
        <h5 class="card-title">${product.price} LE</h5>
      </div>
      <div class="hiddenBody">
        <h5 class="card-title">${product.title}</h5>
        <a href="/src/Pages/products/productdetails/productdetails.html?id=${product.id}" class="btn btn-primary">View Details</a>
        <button type="button" class="btn btn-success btnCart " productData=${product.id} >Add to Cart</button>     
         </div>
    </div>`;
  })
  .join("");
document.querySelector(".products").addEventListener("click", function (event) {
  if (event.target.classList.contains("btnCart")) {
    const productId = event.target.getAttribute("productData");
    console.log("Product ID:", productId);
    const product = fetchedData.find((p) => p.id == productId);
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = [...existingProducts, product];
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    console.log("Product Data:", product);
    console.log("Updated Products:", updatedProducts);
  }
});
