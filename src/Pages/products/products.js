import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  authType,
  setCookie,
  getCookie,
  NavBar,
  fetchData,
  changeBtn,
  footerInjection
} from "../../assets/reusable";
import "./products.css";

// Render products to the DOM
// const fetchedData = await fetchData();
const renderProducts = async (data, container) => {
  const fetchedData = await fetchData();
  // console.log("🚀 ~ renderProducts ~ data:", data);
  container.innerHTML = data
    .map(
      (product) => `
        <div class="card mx-2 productCards mx-auto border border-primary shadow-lg p-3 mb-3 bg-body-tertiary rounded" style="width: 18rem;">
          <img src="${product.image}" class="card-img-top" alt="${
        product.title
      }" style="max-height:250px">
          <div class="card-body visibleBody">
  <h5 class="card-title fs-5 text-center">${product.title}</h5>
  <div class="d-flex justify-content-between align-items-center">
    <h3 class="card-title text-danger mb-0">${product.price} $</h3>
    <h3 class="card-title text-success mb-0">Discount ${
      product.discount || 0
    }%</h3>
  </div>
</div>

<div class="hiddenBody d-flex flex-column">
  <h5 class="card-title text-center">${product.title}</h5>
  <div class="mt-auto d-flex justify-content-end gap-2">
    <a href="/src/Pages/products/productdetails/productdetails.html?id=${
      product.id
    }" class="btn btn-primary">View Details</a>
    <button type="button" class="btn btn-success btnCart addToCart" productData=${
      product.id
    } aria-label="Add to Cart">
      Add to Cart
    </button>
    <button type="button" class="btn btn-warning btnWishlist" productData=${
      product.id
    } aria-label="Add to Wishlist">
      Add to Wishlist
    </button>
  </div>
</div>

</div>

        </div>
      `
    )
    .join("");
  

    changeBtn("products", "addToCart",fetchedData);

};

// Add product to cart
// export const addToCart = (productId, products) => {
//   let productCart = getCookie("productCart");
//   const productsName = productCart ? productCart.name : null;
//   const productsData = productCart ? productCart.value : null;

//   console.log("🚀 ~ getCookieValue ~ getCookie:", getCookie("productCart"));
//   const product = products.find((p) => p.id == productId);
//   // const existingProducts =
//   //   JSON.parse(localStorage.getItem("productCart")) || [];
//   // console.log("🚀 ~ addToCart ~ productsData:", productsData)
//   const existingProducts = JSON.parse(productsData) || [];
//   console.log("🚀 ~ addToCart ~ existingProducts:", existingProducts);
//   const productIndex = existingProducts.findIndex((p) => p.id === productId);
//   // productIndex = true(index) OR false (-1)
//   if (productIndex !== -1) {
//     // y3ne mawgod [1,2,4,5,6]
//     existingProducts[productIndex].quantity += 1;
//   } else {
//     // lw m4 mawgod
//     product.quantity = 1; // creating quantity
//     existingProducts.push(product);
//   }
//   setCookie("productCart", existingProducts, 1, authType);
//   // localStorage.setItem("cartProducts", JSON.stringify(existingProducts));
//   // console.log("Product added to cart:", product);
// };

export const addToWishlist = (productId, products) => {
  let wishlist = getCookie("wishlist");
  const wishlistData = wishlist ? wishlist.value : null;
  const existingProducts = JSON.parse(wishlistData) || [];
  let wishlistedProduct = products.filter((p) => productId === p.id);
  console.log(wishlistedProduct)
  if(existingProducts.findIndex((p)=> p.id === productId) === -1){
    existingProducts.push(wishlistedProduct[0]);
    setCookie("wishlist", existingProducts, 1, authType);
  }

  
};

// Initialize the app
const initializeApp = async () => {
  const fetchedData = await fetchData();
  const productsContainer = document.querySelector(".products");
  const categorySelect = document.querySelector(".productCategory");
  const brandSelect = document.querySelector(".productBrand");
  const sortSelectByPrice = document.querySelector(".sortProductByPrice");
  const sortSelectByTitle = document.querySelector(".sortProduct");
  // Check if required elements exist
  if (
    !productsContainer ||
    !categorySelect ||
    !brandSelect ||
    !sortSelectByPrice ||
    !sortSelectByTitle
  ) {
    console.error("Required DOM elements not found.");
    return;
  }

  // Render all products initially
  renderProducts(fetchedData, productsContainer);

  // Add event listener for cart buttons
  productsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("btnCart")) {
      const productId = event.target.getAttribute("productData");
      // addToCart(productId, fetchedData);
    }
  });

  productsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("btnWishlist")) {
      const productId = event.target.getAttribute("productData");
      addToWishlist(productId, fetchedData);
    }
  });

  // Populate category dropdown
  const uniqueCategories = [
    ...new Set(fetchedData.map((product) => product.category)),
  ];
  uniqueCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });

  // Populate brand dropdown
  const uniqueBrands = [
    ...new Set(fetchedData.map((product) => product.brand)),
  ];
  uniqueBrands.forEach((brand) => {
    const option = document.createElement("option");
    option.value = brand;
    option.textContent = brand;
    brandSelect.appendChild(option);
  });

  // Handle filtering and sorting
  const updateProducts = () => {
    const selectedCategory = categorySelect.value;
    const selectedBrand = brandSelect.value;
    const sortPrice = sortSelectByPrice.value;
    const sortTitle = sortSelectByTitle.value;

    let filteredProducts = fetchedData.filter((product) => {
      return (
        (!selectedCategory || product.category === selectedCategory) &&
        (!selectedBrand || product.brand === selectedBrand)
      );
    });

    filteredProducts.sort((a, b) => {
      if (sortPrice === "ascending") return a.price - b.price;
      if (sortPrice === "descending") return b.price - a.price;
      if (sortTitle === "A-Z") return a.title.localeCompare(b.title);
      if (sortTitle === "Z-A") return b.title.localeCompare(a.title);
      return 0;
    });

    renderProducts(filteredProducts, productsContainer);
  };

  // Add event listeners for filtering and sorting
  categorySelect.addEventListener("change", updateProducts);
  brandSelect.addEventListener("change", updateProducts);
  sortSelectByPrice.addEventListener("change", updateProducts);
  sortSelectByTitle.addEventListener("change", updateProducts);

  // Set default category from URL params
  const categoryParams = new URLSearchParams(window.location.search);
  const paramsValue = categoryParams.get("category");
  if (paramsValue && uniqueCategories.includes(paramsValue)) {
    categorySelect.value = paramsValue;
    updateProducts(); // Apply the filter immediately
  }
};

// Check if the current page is the products page
const currentPath = window.location.pathname;
if (currentPath.endsWith("products.html")) {

  NavBar("navbar");
  footerInjection("footer")
  document.addEventListener("DOMContentLoaded", initializeApp);
}
