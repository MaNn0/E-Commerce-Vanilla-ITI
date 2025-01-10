export function getCookie(name) {
    if (sessionStorage.getItem("Auth")) {
      const sessionValue = sessionStorage.getItem("Auth");
      try {
        const sessionData = JSON.parse(sessionValue); // Parse the session data
        console.log("🚀 ~ getCookie ~ sessionData:", sessionData )
        if (sessionData) {
          return { name:"Auth", value: sessionValue , type: "session" }; // Return the session value
        }
      } catch (error) {
        console.error("Error parsing sessionStorage data:", error);
      }
    }
  
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {      
        return { name: cookieName, value: cookieValue, type:"cookies" }; // Return the cookie value
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
  console.log(authName, authData,authType);
   
  export const isLoggedIn = (authData,href) => {
    const userBtn = document.querySelector(".userBtn");
    // If authData is not provided, return early
    if (!authData) {
      console.error("No authentication data provided.");
     
    }
    else{

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
    if (userBtn  && userData) {
      userBtn.innerHTML = `
        <div class="btn-group">
          <button type="button" class="btn ms-2 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-user"></i>
          </button>
          <ul class="dropdown-menu" style="left: -100%;">
            <li>${userData.firstName} ${userData.lastName}</li>
            <li><a class="dropdown-item" href="./src/Pages/Profile/Profile.html"><i class="fa-regular fa-user"></i> Profile</a></li>
            <li><a class="dropdown-item" href="#"><i class="fa-solid fa-star"></i> WishList</a></li>
            <li><a class="dropdown-item" href="#"><i class="fa-solid fa-box-archive"></i> Orders</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item logOutBtn" href="./"><i class="fa-solid fa-arrow-right-from-bracket"></i>LogOut</a></li>
          </ul>
        </div>
      `;
  
      // Add event listener for logout
      const logOutBtn = document.querySelector(".logOutBtn");
      console.log("🚀 ~ isLoggedIn ~ logOutBtn:", logOutBtn);
      if (logOutBtn) {
        logOutBtn.addEventListener("click", (event) => {
          event.preventDefault();
          deleteCookie("Auth");
          if (window.location.href =="http://localhost:5173/src/Pages/Profile/Profile.html" ){
            window.location.pathname ="/"
          }
          else{         
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