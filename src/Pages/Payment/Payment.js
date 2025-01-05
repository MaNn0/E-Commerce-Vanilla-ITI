import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// radio for address button [show,hide]
const defaultAddInput = document.getElementById('defaultADD');
const newAddInput = document.getElementById('newADD');
const addAddressBtn = document.getElementById('add-address-btn');

function toggleAddressButton() {
  if (defaultAddInput.checked) {
    addAddressBtn.style.display = 'none';
  } else {
    addAddressBtn.style.display = 'inline-block';
  }
}
defaultAddInput.addEventListener('change', toggleAddressButton);
newAddInput.addEventListener('change', toggleAddressButton);
toggleAddressButton();

// shipping fee 
const debitCreditCardInput = document.getElementById('debitCreditCard');
const cashOnDeliveryInput = document.getElementById('cashOnDelivery');
const shippingFeeElement = document.querySelector(".text-success"); //  shipping fee

const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));

// update shipping fee
function updateShippingFee() {
  if (debitCreditCardInput.checked) {
    shippingFeeElement.textContent = "Free Shipping"; // Free 
  } else if (cashOnDeliveryInput.checked) {
    shippingFeeElement.textContent = "EGP 50.00"; // EGP 50 ya f2eeeeeer
  }
}


// for radio button chaanges
debitCreditCardInput.addEventListener('change', () => {
  if (debitCreditCardInput.checked) {
    paymentModal.show(); // show modal
  }
  updateShippingFee(); });

cashOnDeliveryInput.addEventListener('change', updateShippingFee);

//place order button
document.querySelector(".btn-primary").addEventListener("click", function () {

  const address = document.getElementById("address").value.trim();
  const addressOptionSelected = document.querySelector('input[name="address-option"]:checked');
  const paymentOptionSelected = document.querySelector('input[name="paymentOption"]:checked');

  // checking for empty
  if (!address || !addressOptionSelected || !paymentOptionSelected) {
    
    document.getElementById("errorMessage").textContent = "Please fill all the required fields and select options where necessary.";

    const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
    errorModal.show();
  } else {
    alert("Order Placed ");
  }
});
