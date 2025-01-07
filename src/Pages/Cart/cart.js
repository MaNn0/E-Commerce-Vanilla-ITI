import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const products = JSON.parse(localStorage.getItem("products"));
console.log("🚀 ~ Product:", products);

document.querySelector(".cartItem").innerHTML = products.map((product) => {
  return `
  <h1>Cart <span class="titleCount">${products.length}</span> </h1>
        <div class="row">
           <div class="allItems col-7 mt-4">
                 <div class="cartItem">

                     <div class="imageContainer">
                         <img class="image" src=${product.image} height="164px" width="120px">
                    </div>

                    <div class="itemName">
                        <h4>item name</h4>
                    </div>

                 <div class="total d-flex flex-row-reverse mx-2">
                        <span class="currency">EGP</span><span class="price">124.00</span>
                    </div>

                     <div class="buttonContainer">
                         <button class="removeButton"><img src="./images/trash-solid.svg" width="20px"
                                 height="20px"></button>
                    </div>

                     <div class="itemCount mx-2">
                        <label for="qty">Qty </label>
                         <select name="qty" id="qty">
                            <option value="1">1</option>
                            <option value="2">2</option>
                           <option value="3">3</option>
                             <option value="4">4</option>
                         </select>
                     </div>

                </div>
             </div>
`;
});
