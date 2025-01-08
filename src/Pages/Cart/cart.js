import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const products = JSON.parse(localStorage.getItem("products"));
console.log("🚀 ~ Product:", products);

const updateQuantity = () => {
  let totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  document.querySelector(
    ".titleCount"
  ).innerHTML = `${products.length} item(s)`;
  document.querySelector(".subTotal").innerHTML = `Subtotal: ${
    products.length
  } item(s) <span>EGP ${totalPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>`;
  document.querySelector(".totalPrice").innerHTML = `${totalPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} EGP`;
  document.querySelector(".allItems").innerHTML = products
    .map((product, index) => {
      return `
           
          <div class="cartItem">

          <div class="imageContainer">
            <img class="image" src="${product.image}" height="164px" width="140px">
          </div>

          <div class="itemName">
            <span>${product.title}</span>
          </div>

          <div class="total d-flex flex-row-reverse mx-2">
            <span class="currency">EGP</span><span class="price">${product.price}</span>
          </div>
        

          <div class="itemCount mx-2">
            Qty:
            <button class="qtyButton" index=${index} data-action="decrement">-</button>
            <span>${product.quantity}</span>
            <button class="qtyButton" index=${index} data-action="increment">+</button>
          </div>

        </div>
`;
    })
    .join("");
};

document.querySelector(".allItems").addEventListener("click", (event) => {
  if (event.target.classList.contains("qtyButton")) {
    const action = event.target.getAttribute("data-action");
    const index = event.target.getAttribute("index");

    if (action === "increment") {
      products[index].quantity += 1;
    } else if (action === "decrement") {
      products[index].quantity -= 1;
    }
    if(products[index].quantity === 0){
        products.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(products));
    }
    else{
        localStorage.setItem("products", JSON.stringify(products));
    }
    

    updateQuantity();
  }
});
updateQuantity();
