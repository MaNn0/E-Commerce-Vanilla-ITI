const switchBtnLogin = document.querySelector(".switchBtnLogin");
const switchBtnRegister = document.querySelector(".switchBtnRegister");
const hideLogin = document.querySelector("#toggleHideLogin");
const hideRegister = document.querySelector("#toggleHideRegister");

// We Have to check id and E-mail Uniqness

switchBtnLogin.addEventListener("click", () => {
  hideLogin.classList.add("hide");
  hideLogin.classList.remove("show");
  hideRegister.classList.remove("hide");
  hideRegister.classList.add("show");
});

switchBtnRegister.addEventListener("click", () => {
  hideRegister.classList.add("hide");
  hideRegister.classList.remove("show");
  hideLogin.classList.remove("hide");
  hideLogin.classList.add("show");
});

const signup = document.querySelector(".signup");

const nameForm = document.querySelector("#name");
const nameError = document.querySelector(".nameError");

const name2Form = document.querySelector("#name2");
const name2Error = document.querySelector(".name2Error");

const email = document.querySelector("#email");
const emailError = document.querySelector(".emailError");

const password = document.querySelector("#password");
const passwordError = document.querySelector(".passwordError");

const repassword = document.querySelector("#repassword");
const repasswordError = document.querySelector(".repasswordError");

const address = document.querySelector("#inputAddress");
const addressError = document.querySelector(".addressError");

const city = document.querySelector("#inputCity");
const cityError = document.querySelector(".cityError");

//fetch Post

async function postData(data = {}) {
  try {
    const url="http://localhost:3000/accounts"
    // Fetch options
    const options = {
      method: 'POST', // Specify the request method
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify(data), // Convert the data to JSON
    };

    // Await the fetch call
    const response = await fetch(url, options);

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const result = await response.json();

    // Log the result
    console.log('Success:', result);
    return result; // Return the parsed result
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
  }
}

//FetchPost Ends
function showError() {
  let hasErrors = 0;

  // Check for empty first name
  nameForm.value.length === 0
    ? (nameError.classList.remove("d-none"), (hasErrors = 1))
    : nameError.classList.add("d-none");

  // Check for empty second name
  name2Form.value.length === 0
    ? (name2Error.classList.remove("d-none"), (hasErrors = 1))
    : name2Error.classList.add("d-none");

  // Check email validation
  email.value.length === 0
    ? ((emailError.textContent = "Email can't be empty"), (hasErrors = 1))
    : !/^[a-zA-Z0-9.%+-]+@gmail.com$/.test(email.value)
    ? ((emailError.textContent = "Email is invalid / not a gmail address"),
      (hasErrors = 1))
    : (emailError.textContent = "");

  // Check password validation
  password.value.length === 0
    ? ((passwordError.textContent = "Password required"), (hasErrors = 1))
    : password.value.length < 8
    ? ((passwordError.textContent = "Password must be at least 8 characters"),
      (hasErrors = 1))
    : !/[*@$#%&!^()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password.value)
    ? ((passwordError.textContent =
        "Password must contain at least one special character (e.g., * @ % $ #)"),
      (hasErrors = 1))
    : (passwordError.textContent = "");

  // Check password match
  repassword.value.length === 0
    ? (repasswordError.textContent = "")
    : repassword.value !== password.value
    ? ((repasswordError.textContent = "Passwords are not matched"),
      (hasErrors = 1))
    : (repasswordError.textContent = "");

  // Check address
  address.value.length === 0
    ? ((addressError.textContent = "Required"), (hasErrors = 1))
    : (addressError.textContent = "");

  // Check city
  city.value.length === 0
    ? ((cityError.textContent = "Required"), (hasErrors = 1))
    : (cityError.textContent = "");

  return hasErrors;
}

signup.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = {};

  // Loop through all form elements
  for (let element of e.target.elements) {
    if (element.type !== 'submit' && element.name) { // Skip the submit button and elements without a name
      if (element.value) {
        // console.log(`${element.name} || ${element.value}`);
        formData[element.name.trim()] = element.value.trim(); // Trim keys and values
      }
    }
  }

  console.log(formData); // Log the formData object
 
  let noErrors = showError();
  if (noErrors === 0) {
    sendMail();
    postData(formData)
  }
});
let otp = ""; // global otp to be accessed in another functions

function generateOTP() {
  otp = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < 6; i++) {
    otp += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return otp;
}
// console.log(generateOTP());

const otpInput = document.querySelector("#otpInput");
const verify = document.querySelector(".verify");
const otpError = document.querySelector(".otpError");
const showModalButton = document.querySelector("#showModalButton");
const showModalButton2 = document.querySelector("#showModalButton2");
const check = document.querySelector(".check");
const welcome = document.querySelector(".welcome");
function sendMail() {
  otp = generateOTP(); // Generate OTP
  // console.log(otp);

  let params = {
    to_name: nameForm.value, // First name
    name: "ITI Store", // Sender name
    email: email.value, // Recipient email
    message: otp, // OTP message
  };

  emailjs.send("service_9vy98ci", "template_f6ks3rw", params).then(
    () => {
      showModalButton.click();
      //     // Trigger the modal via a hidden button
    },
    (error) => {
      console.error("Failed to send email:", error);
      alert("Failed to send email. Please try again.");
    }
  );
}
check.addEventListener("click", (e) => {
  e.preventDefault();
  if (otpInput.value === otp) {
    verify.classList.remove("disabled");
    otpError.classList.remove("text-danger");
    otpError.classList.add("text-success");
    otpError.textContent = "OTP is correct , please verify to proccess";
    welcome.textContent = `Welcome ${nameForm.value}`;
  } else {
    otpError.textContent = "OTP is invalid !";
  }
});
