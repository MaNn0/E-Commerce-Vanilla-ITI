import "./sideBar.css";   

export function sideBarInjection(sideName) {
  const navElement = document.querySelector(`.${sideName}`);

  // Check if the element exists
  if (!navElement) {
    console.error(`Element with class "${sideName}" not found.`);
    return;
  }

  // Inject the sidebar HTML
  const sideBarHTML = `
    <!-- Sidebar Starts Here -->
      <div class="top">
        <div class="logo">
          <i class="fas fa-home"></i>
          <span class="navItem">Logo</span>
        </div>
        <i class="fas fa-bars" id="btn"></i>
      </div>
      <!-- Sidebar User (Image) -->
      <div class="user">
        <img src="../../../public/Images/icons8-user-52.png" alt="User" class="userImg" />
        <p class="userName bold navItem">No User</p>
      </div>
      <!-- Sidebar List -->
      <ul>
        <li>
          <a href="/">
            <i class="fas fa-info-circle"></i>
            <span class="navItem">Home</span>
          </a>
          <span class="toolTip">Home</span>
        </li>
        <li>
          <a href="#">
            <i class="fas fa-info-circle"></i>
            <span class="navItem">Account Setting</span>
          </a>
          <span class="toolTip">Account Setting</span>
        </li>
        <li>
          <a href="../Wishlist/wishlist.html">
            <i class="fa-solid fa-star"></i>
            <span class="navItem">Wishlist</span>
          </a>
          <span class="toolTip">Wishlist</span>
        </li>
        <li>
          <a href="../Payment/myOrder.html">
            <i class="fa-solid fa-box-archive"></i>
            <span class="navItem">Orders</span>
          </a>
          <span class="toolTip">Orders</span>
        </li>
      </ul>

  `;

  // Inject the sidebar HTML into the navElement
  navElement.innerHTML = sideBarHTML;

  // Select the button after injecting the HTML
  const btn = document.querySelector("#btn");

  // Attach event listener to the button
  if (btn && navElement) {
    btn.onclick = function () {
      navElement.classList.toggle("active");
    };
  } else {
    console.error("Button with id 'btn' not found.");
  }
}