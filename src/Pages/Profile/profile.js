import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./profile.css";
import { isLoggedIn,authName,authData,authType } from "../../assets/reusable";
import { formSubmit } from "../../assets/reusable";
document.querySelector("#profile").innerHTML = `
`;
let btn = document.querySelector("#btn");
let sideBar = document.querySelector(".sideBar");
btn.onclick = function () {
  sideBar.classList.toggle("active");
};
const HandleForm = (authData) => {
  const profileForm = document.querySelector(".profileForm");
  if (!profileForm) {
    // console.error("Profile form not found!");
    return;
  }
// console.log(authData);

  // Parse the user data
  let UserData;
  try {
    UserData = JSON.parse(authData);
    
  } catch (error) {
    // console.error("Error parsing user data:", error);
    return;
  }


  // Populate the form fields with user data
  if (UserData) {
    // console.log("🚀 ~ HandleForm ~ UserData:", UserData,UserData.id);
    // Example: Populate input fields if they exist
    const inputUserId = profileForm.querySelector('input[name="id"]');
    const inputFirstName = profileForm.querySelector('input[name="firstName"]');
    const inputLastName = profileForm.querySelector('input[name="lastName"]');
    const inputEmail = profileForm.querySelector('input[name="email"]');
    const inputMainAddress = profileForm.querySelector('input[name="mainAddress"]');
    const inputSecondaryAddress = profileForm.querySelector('input[name="secondaryAddress"]');
    const inputCity = profileForm.querySelector('input[name="city"]');
    const inputPassword = profileForm.querySelector('input[name="password"]');
    const inputRePassword = profileForm.querySelector('input[name="repassword"]');

    if (inputUserId) inputUserId.value = UserData.id || "";
    if (inputFirstName) inputFirstName.value = UserData.firstName || "";
    if (inputLastName) inputLastName.value = UserData.lastName || "";
    if (inputPassword) inputPassword.value = UserData.password || "";
    if (inputRePassword) inputRePassword.value = UserData.repassword || "";
    if (inputEmail) inputEmail.value = UserData.email || "";
    if (inputMainAddress) inputMainAddress.value = UserData.mainAddress || "";
    if (inputSecondaryAddress) inputSecondaryAddress.value = UserData.secondaryAddress || "";
    if (inputCity) inputCity.value = UserData.city || "";

    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      // Collect form data
      const formData = {};
      formData.id=UserData.id
      for (let element of e.target.elements) {
        if (element.type !== 'submit' && element.name) {
          if (element.value) {
            // console.log(formData[element.name.trim()] = element.value.trim() );
            
            formData[element.name.trim()] = element.value.trim(); // Trim keys and values
          }
        }
      }
      formSubmit(authType,UserData.id,profileForm,formData,inputFirstName,inputLastName,inputEmail,inputPassword,inputRePassword,inputMainAddress,inputSecondaryAddress,inputCity)
     
      
    });
  }


};



HandleForm(authData);

// console.log(authName,authType,authData);   
isLoggedIn(authData,"./../Register/register.html")