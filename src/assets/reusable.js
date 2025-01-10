import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import * as bootstrap from 'bootstrap'
export function getCookie(name) {
    if (sessionStorage.getItem("Auth")) {
        const sessionValue = sessionStorage.getItem("Auth");
        try {
            const sessionData = JSON.parse(sessionValue); // Parse the session data
            // console.log("🚀 ~ getCookie ~ sessionData:", sessionData )
            if (sessionData) {
                return { name: "Auth", value: sessionValue, type: "session" }; // Return the session value
            }
        } catch (error) {
            console.error("Error parsing sessionStorage data:", error);
        }
    }

    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return { name: cookieName, value: cookieValue, type: "cookies" }; // Return the cookie value
        }
    }

    return null;
}

const authCookie = getCookie("Auth");

function deleteCookie(name) {
    console.log(name);

    sessionStorage.clear();
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

}

export const authName = authCookie ? authCookie.name : null;
export const authData = authCookie ? authCookie.value : null;
export const authType = authCookie ? authCookie.type : null;
//   console.log(authName, authData,authType);

export const isLoggedIn = (authData, href) => {
    const userBtn = document.querySelector(".userBtn");
    // If authData is not provided, return early
    if (!authData) {
        //   console.error("No authentication data provided.");

    }
    else {

    }

    // Parse user data from authData
    let userData;
    try {
        userData = JSON.parse(authData);
    } catch (error) {
        console.error("Error parsing user data:", error);
        return false;
    }

    // Update the UI if the user is logged in
    if (userBtn && userData) {
        userBtn.innerHTML = `
        <div class="btn-group">
          <button type="button" class="btn ms-2 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-user"></i>
          </button>
          <ul class="dropdown-menu" style="left: -100%;">
            <li>${userData.firstName} ${userData.lastName}</li>
            <li><a class="dropdown-item" href="./src/Pages/Profile/Profile.html"><i class="fa-regular fa-user"></i> Profile</a></li>
     
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item logOutBtn" href="./"><i class="fa-solid fa-arrow-right-from-bracket"></i>LogOut</a></li>
          </ul>
        </div>
      `;
    //   <li><a class="dropdown-item" href="#"><i class="fa-solid fa-star"></i> WishList</a></li>
    //   <li><a class="dropdown-item" href="#"><i class="fa-solid fa-box-archive"></i> Orders</a></li>
        // Add event listener for logout
        const logOutBtn = document.querySelector(".logOutBtn");
        //   console.log("🚀 ~ isLoggedIn ~ logOutBtn:", logOutBtn);
        if (logOutBtn) {
            logOutBtn.addEventListener("click", (event) => {
                event.preventDefault();
                deleteCookie("Auth");
                if (window.location.href == "http://localhost:5173/src/Pages/Profile/Profile.html") {
                    window.location.pathname = "/"
                }
                else {
                    window.location.href = window.location.href
                }
            });
        }
        return true;
    } else {
        userBtn.innerHTML = `
        <a href=${href}>
          <button class="btn btn-outline-light ms-2" type="button">
            Signup
          </button>
        </a>
      `;
        return false;
    }
};
function setCookie(name, value, daysToExpire, authType) {

    if (authType == "cookies") {
        const date = new Date();
        date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        const cookieValue = JSON.stringify(value); // Convert value to JSON string
        document.cookie = `${name}=${cookieValue}; ${expires}; path=/`;
    } else {
        const sessionValue = JSON.stringify(value); // Convert value to JSON string
        sessionStorage.setItem("Auth", sessionValue);
    }
}
async function postData(data = {}, userId) {
    try {
        // Validate input parameters
        if (!userId || typeof userId !== 'string') {
            throw new Error("Invalid user ID");
        }
        if (Object.keys(data).length === 0) {
            throw new Error("No data provided for update");
        }

        console.log("🚀 ~ postData ~ data:", data);

        const url = `http://localhost:3000/accounts/${userId}`;

        // Fetch options
        const options = {
            method: 'PUT', // Specify the request method
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify(data), // Convert the data to JSON
        };

        // Await the fetch call
        const response = await fetch(url, options);

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            // Handle specific HTTP errors
            if (response.status === 404) {
                throw new Error("User not found");
            } else if (response.status === 400) {
                throw new Error("Invalid data provided");
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        }

        // Parse the JSON response
        const result = await response.json();

        // Log the result
        console.log("🚀 ~ postData ~ result:", result);

        // Provide user feedback
        alert("Success: Data updated successfully!");
        return result; // Return the parsed result
    } catch (error) {
        // Handle errors
        console.error("Error in postData:", error);

        // Provide user feedback
        alert(`Failed: ${error.message}`);
    }
}
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

function showError(nameForm, name2Form, email, password, repassword, address, address2, city) {
    let hasErrors = 0;

    // Check for empty first name
    nameForm.value.trim().length === 0
        ? (nameError.classList.remove("d-none"), (hasErrors = 1))
        : nameError.classList.add("d-none");

    // Check for empty second name
    name2Form.value.trim().length === 0
        ? (name2Error.classList.remove("d-none"), (hasErrors = 1))
        : name2Error.classList.add("d-none");

    // Check email validation
    if (email.value.trim().length === 0) {
        emailError.textContent = "Email can't be empty";
        hasErrors = 1;
    } else if (!/^[a-zA-Z0-9.%+-]+@gmail\.com$/.test(email.value.trim())) {
        emailError.textContent = "Email is invalid / not a gmail address";
        hasErrors = 1;
    } else {
        emailError.textContent = "";
    }

    // Check password validation
    if (password.value.trim().length === 0) {
        passwordError.textContent = "Password required";
        hasErrors = 1;
    } else if (password.value.trim().length < 8) {
        passwordError.textContent = "Password must be at least 8 characters";
        hasErrors = 1;
    } else if (!/[*@$#%&!^()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password.value.trim())) {
        passwordError.textContent =
            "Password must contain at least one special character (e.g., * @ % $ #)";
        hasErrors = 1;
    } else {
        passwordError.textContent = "";
    }

    // Check password match
    if (repassword.value.trim().length === 0) {
        repasswordError.textContent = "";
    } else if (repassword.value.trim() !== password.value.trim()) {
        repasswordError.textContent = "Passwords are not matched";
        hasErrors = 1;
    } else {
        repasswordError.textContent = "";
    }

    // Check address
    if (address.value.trim().length === 0) {
        addressError.textContent = "Required";
        hasErrors = 1;
    } else {
        addressError.textContent = "";
    }

    // Check address2
    // if (address2.value.trim().length === 0) {
    //   address2Error.textContent = "Required";
    //   hasErrors = 1;
    // } else {
    //   address2Error.textContent = "";
    // }

    // Check city
    if (city.value.trim().length === 0) {
        cityError.textContent = "Required";
        hasErrors = 1;
    } else {
        cityError.textContent = "";
    }

    return hasErrors;
}
export function formSubmit(authType, userId, formName, formData, inputFirstName, inputLastName, inputEmail, inputPassword, inputRePassword, inputMainAddress, inputSecondaryAddress, inputCity) {
    //   console.log(inputFirstName,inputLastName,inputEmail,inputPassword,inputRePassword,inputMainAddress,inputSecondaryAddress,inputCity);

    let noErrors = showError(inputFirstName, inputLastName, inputEmail, inputPassword, inputRePassword, inputMainAddress, inputSecondaryAddress, inputCity);
    if (noErrors === 0) {
        setCookie("Auth", formData, 1, authType)
        postData(formData, userId)

    }
}
