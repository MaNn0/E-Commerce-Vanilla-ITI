import { getCookie, transferGuestAction } from "../../assets/reusable";
// Fetch user data from the server
export async function fetchUserData() {
  try {
    const url = "http://localhost:3000/accounts";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    // console.log('Success:', result); to alert
    return result; // Return the parsed result
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error for handling in the caller function
  }
}

// Set a cookie with a name, value, and expiration in days
function setCookie(name, value, daysToExpire, rememberMe) {
  // console.log(rememberMe)
  if (rememberMe) {
    const date = new Date();
    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000); //Date formela Expiredate
    const expires = `expires=${date.toUTCString()}`; //set Expiredate
    const cookieValue = JSON.stringify(value); // Convert value to JSON string
    document.cookie = `${name}=${cookieValue}; ${expires}; path=/`; //Set Cookie to Application
  } else {
    // SetSession Name==>Key Data==>Value
    const sessionValue = JSON.stringify(value); // Convert value to JSON string
    sessionStorage.setItem("Auth", sessionValue); // SetSession to Application
  }
}

// Handle user login

const userLogin = async (userCredentials) => {
  try {
    const userData = await fetchUserData();
    // console.log("Fetched user data:", userData);

    // Find the user in the fetched data
    const user = userData.find(
      (data) =>
        data.email === userCredentials.loginEmail &&
        data.password === userCredentials.loginPassword
    );

    if (user) {
      // console.log("User found:", user);
      setCookie("Auth", user, 1, userCredentials.rememberMe); // Set cookie with user data
      // Retrieve cookies
      const productCart = getCookie("productCart");
      const authCookie = getCookie("Auth"); // Ensure this is defined
      const wishList = getCookie("wishlist"); // Ensure this is defined
      const authType = authCookie ? authCookie.type : null;
      const productsName = productCart ? productCart.name : null;
      const wshLists = wishList ? wishList.name : null;

      // Debugging logs
      console.log("🚀 ~ userLogin ~ authType:", authType);
      console.log("🚀 ~ userLogin ~ productsName:", productsName);
      console.log("🚀 ~ userLogin ~ wshLists:", wshLists);

      // Check if user is authenticated
      if (authType) {
        // Transfer guest actions (e.g., cart, wishlist) to authenticated user
        if (productsName) {
          transferGuestAction(productsName, authType);
        } else {
          console.error("Product cart name is missing.");
        }

        if (wshLists) {
          transferGuestAction(wshLists, authType);
        } else {
          console.error("Wishlist name is missing.");
        }

        // Display welcome message
        if (user && user.firstName) {
          alert(`You are logged in as ${user.firstName}`);
        } else {
          console.error("User information is missing.");
        }

        // Redirect user
        location.replace("http://localhost:5173");
      } else {
        console.error("User is not authenticated.");
      }
    } else {
      console.log("User not found");
      alert("Invalid email or password");
    }
  } catch (error) {
    console.error("Login failed:", error);
    alert("An error occurred during login. Please try again.");
  }
};

// Trigger the login process
const loginForm = document.querySelector(".loginForm");
const currentPath = window.location.pathname;
if (currentPath == "/src/Pages/Register/register.html") {
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent the default form submission

      // Extract form data into an object
      const formData = new FormData(e.target); // Create a FormData object from the form
      const formValues = Object.fromEntries(formData.entries()); // Convert FormData to a plain object

      // Log the form data
      console.log("Form Data:", formValues);

      // Example: Validate or process the form data
      if (formValues.loginEmail && formValues.loginPassword) {
        console.log("Email:", formValues.loginEmail);
        console.log("Password:", formValues.loginPassword);
        console.log("Remember Me:", formValues.rememberMe === "on"); // Checkbox value
        userLogin(formValues);
        // Add your login logic here (e.g., call a login API)
      } else {
        console.error("Email and password are required.");
      }
    });
  } else {
    console.error("Login form not found!");
  }
}
