/*******************************************************************************************************
 *                                                                                                      *
 *                                           Navbar                                                     *
 *                                                                                                      *
 *******************************************************************************************************/
const topBar = document.querySelector(".top-bar");
const header = document.querySelector("header");
const navLinks = document.querySelectorAll(".nav-links li a");
const sections = document.querySelectorAll("section");

const whatsapp = document.querySelector(".whatsapp");
const lang = document.querySelector(".lang");

function onScroll() {
  let scrollTop = window.pageYOffset;

  // Show/hide top bar and adjust header position
  if (scrollTop > 0) {
    topBar.style.top = "-50px";
    header.classList.add("with-bg");
    whatsapp.style.opacity = "1";
    lang.style.opacity = "1";
  } else {
    if (scrollTop === 0) {
      topBar.style.top = "0";
      header.classList.remove("with-bg");
      whatsapp.style.opacity = "0";
      lang.style.opacity = "0";
    }
  }

  // Update active nav link based on scroll position
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollTop >= sectionTop - 50 &&
      scrollTop < sectionTop + sectionHeight - 50
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active-nav");
        if (link.getAttribute("href").includes(sectionId)) {
          link.classList.add("active-nav");
        }
      });
    }
  });
}

// Function to handle click event on nav links
function onClick(event) {
  navLinks.forEach((link) => link.classList.remove("active-nav"));
  event.target.classList.add("active-nav");
}

// Attach scroll event listener
window.addEventListener("scroll", onScroll);

// Attach click event listeners to nav links
navLinks.forEach((link) => {
  link.addEventListener("click", onClick);
});

// Side Menu
const navMenu = document.getElementById("nav-menu");
const sideMenu = document.getElementById("side-menu");
const closeMenu = document.getElementById("close-menu");
const sideOverlay = document.getElementById("side-overlay");
const sideNavLinks = document.querySelectorAll(".side-nav-link");

// Function to open the side menu
function openSideMenu() {
  sideMenu.style.left = "0";
  sideOverlay.style.display = "block";
}

// Function to close the side menu
function closeSideMenu() {
  sideMenu.style.left = "-90%";
  sideOverlay.style.display = "none";
}

// Event listeners
navMenu.addEventListener("click", openSideMenu);
closeMenu.addEventListener("click", closeSideMenu);
sideOverlay.addEventListener("click", closeSideMenu);

/*******************************************************************************************************
 *                                                                                                      *
 *                                         Custom Alert                                                 *
 *                                                                                                      *
 *******************************************************************************************************/

let customAlert = document.getElementById("custom-alert");
let alertMessage = document.getElementById("alert-message");

function showAlert(message, bg) {
  alertMessage.innerText = message;
  customAlert.style.backgroundColor = bg;
  customAlert.classList.add("show");
  setTimeout(function () {
    customAlert.classList.remove("show");
  }, 2000);
}

/*******************************************************************************************************
 *                                                                                                      *
 *                                           Slider                                                     *
 *                                                                                                      *
 *******************************************************************************************************/

const sliderItems = document.querySelectorAll(".home .slide-list .slide-item");
const sliderPrev = document.querySelector(".slider-btn.prev");
const sliderNext = document.querySelector(".slider-btn.next");

let sliderCount = sliderItems.length;
let slideActive = 0;

let refreshIntervel = setInterval(function () {
  nextSlide();
}, 6000);

function prevSlide() {
  slideActive = slideActive - 1;
  if (slideActive < 0) {
    slideActive = sliderCount - 1;
  }
  showSLider();
}

function nextSlide() {
  slideActive = slideActive + 1;
  if (slideActive >= sliderCount) {
    slideActive = 0;
  }
  showSLider();
}

function showSLider() {
  let slideActiveOld = document.querySelector(
    ".home .slide-list .active-slide"
  );

  slideActiveOld.classList.remove("active-slide");
  sliderItems[slideActive].classList.add("active-slide");

  clearInterval(refreshIntervel);
  refreshIntervel = setInterval(function () {
    nextSlide();
  }, 6000);

  // Reset Animation
  sliderItems[slideActive].querySelector("img").style.animation = "none";
  sliderItems[slideActive].querySelector("img").offsetHeight;
  sliderItems[slideActive].querySelector("img").style.animation = "";
}

/*******************************************************************************************************
 *                                                                                                      *
 *                                        Profile Form                                                  *
 *                                                                                                      *
 *******************************************************************************************************/
// profile elements
const profilePopupEl = document.getElementById("profile-popup");
const overlay = document.getElementById("overlay");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const addressInput = document.getElementById("address");
const phoneNumberInput = document.getElementById("phone-number");
const cityInput = document.getElementById("city");
const emailInput = document.getElementById("email");
const saveMessage = document.getElementById("save-message");
const saveButton = document.getElementById("saveButton");

// visibility
function profilePopup() {
  const overlay = document.getElementById("overlay");
  if (profilePopupEl.style.display === "block") {
    profilePopupEl.style.display = "none";
    overlay.style.display = "none";
  } else {
    profilePopupEl.style.display = "block";
    overlay.style.display = "block";
  }
}

function resetProfile() {
  showAlert("Profile Reset", "black");
  firstNameInput.value = "";
  lastNameInput.value = "";
  addressInput.value = "";
  phoneNumberInput.value = "";
  cityInput.value = "";
  emailInput.value = "";

  // Enable form
  formFieldsFn(true);
  saveButton.innerText = "Save";

  // Remove profile from local storage
  localStorage.removeItem("profile");
}

function saveProfile() {
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const address = addressInput.value;
  const phoneNumber = phoneNumberInput.value;
  const city = cityInput.value;
  const email = emailInput.value;

  if (!firstName || !lastName || !address || !phoneNumber || !city || !email) {
    showAlert("Please fill out all fields.", "red");
    return;
  }

  saveMessage.style.display = "block";
  saveMessage.style.color = "green";
  setTimeout(() => {
    saveMessage.style.display = "none";
  }, 2000);

  // Lock the form
  formFieldsFn(false);
  saveButton.innerText = "Edit";

  saveProfileToLocalStorage();
}

// form state
function formFieldsFn(enabled) {
  const formFields = document.querySelectorAll(
    "#profileForm input, #profileForm select"
  );
  formFields.forEach((field) => (field.disabled = !enabled));
}

function saveEdit() {
  if (saveButton.innerText === "Save") {
    saveProfile();
  } else {
    formFieldsFn(true);
    saveButton.innerText = "Save";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const formFields = document.querySelectorAll(
    "#profileForm input, #profileForm select"
  );
  let isEmpty = true;
  formFields.forEach((field) => {
    if (field.value !== "") {
      isEmpty = false;
    }
  });
  formFieldsFn(isEmpty);

  saveButton.addEventListener("click", saveEdit);
  document.querySelector(".reset").addEventListener("click", resetProfile);

  // Load profile from local storage
  loadProfileFromLocalStorage();
});

// Save and load functions for profile
function saveProfileToLocalStorage() {
  const profile = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    address: addressInput.value,
    phoneNumber: phoneNumberInput.value,
    city: cityInput.value,
    email: emailInput.value,
  };
  localStorage.setItem("profile", JSON.stringify(profile));
}

function loadProfileFromLocalStorage() {
  const storedProfile = localStorage.getItem("profile");
  if (storedProfile) {
    const profile = JSON.parse(storedProfile);
    firstNameInput.value = profile.firstName;
    lastNameInput.value = profile.lastName;
    addressInput.value = profile.address;
    phoneNumberInput.value = profile.phoneNumber;
    cityInput.value = profile.city;
    emailInput.value = profile.email;

    // Lock the form if profile is filled
    if (
      profile.firstName &&
      profile.lastName &&
      profile.address &&
      profile.phoneNumber &&
      profile.city &&
      profile.email
    ) {
      formFieldsFn(false);
      saveButton.innerText = "Edit";
    }
  }
}

// Function to check if profile form is filled
function isProfileFormFilled() {
  const fields = [
    firstNameInput.value,
    lastNameInput.value,
    addressInput.value,
    phoneNumberInput.value,
    cityInput.value,
    emailInput.value,
  ];

  return fields.every((field) => field.trim() !== "");
}

// Function to update checkout button state
function updateCheckoutButtonState() {
  const isProfileValid = isProfileFormFilled();
  const isCartNotEmpty = cartItems.length > 0;
  checkoutButton.disabled = !(isProfileValid && isCartNotEmpty);
}

// Call update checkout button state on input change
document
  .querySelectorAll("#profileForm input, #profileForm select")
  .forEach((input) => {
    input.addEventListener("input", updateCheckoutButtonState);
  });

/*******************************************************************************************************
 *                                                                                                      *
 *                                         Slide Cart                                                   *
 *                                                                                                      *
 *******************************************************************************************************/
// Define variables
let cartItems = [];
let cartCount = 0;
let totalPrice = 0;
const waPhoneNumber = "528123681120";

// DOM Elements
const cartBody = document.querySelector(".cart-body");
const cartIconCount = document.querySelector(".cart-icon .cart-count span");
const cartTitleCount = document.querySelector(".cart-title span");
const totalPriceElement = document.querySelector(".cart-bottom .total span");
const cartIcon = document.querySelector(".cart-icon");
const cart = document.querySelector(".cart");
const closeBtn = document.querySelector(".close-btn");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const checkoutButton = document.getElementById("checkout");

// Open and close cart event listeners
cartIcon.addEventListener("click", () => {
  cart.classList.add("open");
});

closeBtn.addEventListener("click", () => {
  cart.classList.remove("open");
});

// Function to add item to cart
function addToCart(event) {
  const menuItem = event.target.closest(".menu-item");
  const title = menuItem.querySelector("h2").textContent;
  const priceText = menuItem.querySelector(".price").innerText;
  const price = parseFloat(priceText.replace("$", ""));
  const imgSrc = menuItem.querySelector("img").src;

  // Check if item already in cart
  const existingItemIndex = cartItems.findIndex((item) => item.title === title);

  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].count += 1;
  } else {
    cartItems.push({ title, price, imgSrc, count: 1 });
  }

  updateCart();
}

// Function to update the cart display
function updateCart() {
  cartBody.innerHTML = "";
  cartCount = 0;
  totalPrice = 0;

  cartItems.forEach((item) => {
    cartCount += item.count;
    totalPrice += item.price * item.count;

    cartBody.innerHTML += `
      <div class="cart-item">
        <button class="remove-btn" onclick="removeFromCart('${item.title}')">
          <ion-icon name="close-circle-outline"></ion-icon>
        </button>
        <div class="item-img">
          <img src="${item.imgSrc}" alt="cart item image">
        </div>
        <div class="item-content">
          <div class="item-info">
            <h2 class="item-title">${item.title}</h2>
            <p class="item-price">Price: <span>$${item.price.toFixed(
              2
            )}</span></p>
          </div>
          <div class="item-action">
            <button class="item-btn" onclick="changeItemCount('${
              item.title
            }', -1)"><ion-icon name="remove-outline"></ion-icon></button>
            <div class="item-count"><span>${item.count}</span></div>
            <button class="item-btn" onclick="changeItemCount('${
              item.title
            }', 1)"><ion-icon name="add-outline"></ion-icon></button>
          </div>
        </div>
      </div>
    `;
  });

  // Update cart count in header and cart title
  cartIconCount.textContent = cartCount;
  cartTitleCount.textContent = cartCount;

  // Display empty message if cart is empty
  if (totalPrice === 0) {
    cartBody.innerHTML = `
      <div class="empty">
        <p class="empty-message">Your cart is currently empty.</p>
        <a href="#menu" class="btn">View Our Menu</a>
      </div>
    `;
  }

  // Update total price in cart
  totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;

  // Save cart items to local storage
  saveCartToLocalStorage();

  // Update checkout button state
  updateCheckoutButtonState();
}

// Function to remove item from cart
function removeFromCart(title) {
  cartItems = cartItems.filter((item) => item.title !== title);
  updateCart();
}

// Function to change item count
function changeItemCount(title, countChange) {
  const item = cartItems.find((item) => item.title === title);
  item.count += countChange;

  if (item.count <= 0) {
    removeFromCart(title);
  } else {
    updateCart();
  }
}

// Add event listeners to menu buttons
addToCartButtons.forEach((button) => {
  button.addEventListener("click", addToCart);
});

// Event listener to close the cart when clicking outside of it
document.addEventListener("click", (event) => {
  if (!cart.contains(event.target) && !cartIcon.contains(event.target)) {
    cart.classList.remove("open");
  }
});

// Stop propagation for clicks inside the cart
cart.addEventListener("click", (event) => {
  event.stopPropagation();
});

// Stop propagation for cart icon clicks
cartIcon.addEventListener("click", (event) => {
  event.stopPropagation();
});

function formatCart(cartItems, totalPrice) {
  let message = "Cart Details:\n\n";

  cartItems.forEach((item) => {
    message += `${item.title} (x${item.count}): $${(
      item.price * item.count
    ).toFixed(2)}\n\n`;
  });

  // Add delivery cost
  message += `Delivery Cost: $25.00\n`;

  // Update total price including delivery
  totalPrice += 25;
  message += `Total (including delivery): $${totalPrice.toFixed(2)}\n`;

  // Add profile information
  message += "\nProfile Information:\n";
  message += `First Name: ${firstNameInput.value}\n`;
  message += `Last Name: ${lastNameInput.value}\n`;
  message += `Address: ${addressInput.value}\n`;
  message += `Phone Number: ${phoneNumberInput.value}\n`;
  message += `City: ${cityInput.value}\n`;
  message += `Email: ${emailInput.value}\n`;

  return message;
}

function getWhatsAppURL(cartItems, totalPrice, waPhoneNumber) {
  const message = formatCart(cartItems, totalPrice);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${waPhoneNumber}/?text=${encodedMessage}`;
}

checkoutButton.addEventListener("click", () => {
  const isProfileValid = isProfileFormFilled();
  const isCartNotEmpty = cartItems.length > 0;

  if (!isProfileValid) {
    showAlert("Please fill out your profile information", "red");
    return;
  }

  if (!isCartNotEmpty) {
    showAlert("Your cart is empty", "red");
    return;
  }

  const waURL = getWhatsAppURL(cartItems, totalPrice, waPhoneNumber);
  window.open(waURL, "_blank");
});

// Save and load cart items to local storage
function saveCartToLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function loadCartFromLocalStorage() {
  const savedCartItems = localStorage.getItem("cartItems");
  if (savedCartItems) {
    cartItems = JSON.parse(savedCartItems);
    updateCart();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadCartFromLocalStorage();
});

/*******************************************************************************************************
 *                                                                                                      *
 *                                           Menu Filter                                                *
 *                                                                                                      *
 *******************************************************************************************************/

const filterButtons = document.querySelectorAll(".filter-btn");
const menuItems = document.querySelectorAll(".menu-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    const filter = this.getAttribute("data-filter");

    menuItems.forEach((item) => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.classList.add("all");
      } else {
        item.classList.remove("all");
      }
    });
  });
});

/*******************************************************************************************************
 *                                                                                                      *
 *                                         Contact Email Send                                           *
 *                                                                                                      *
 *******************************************************************************************************/

const contactForm = document.getElementById("contact-form");
const contactName = document.querySelector(".contact #name");
const contactEmail = document.querySelector(".contact #email");
const contactPhone = document.querySelector(".contact #phone");
const contactMessage = document.querySelector(".contact #message");

function sendEmail() {
  const bodyMessage = `Full Name: ${contactName.value}<br>Email: ${contactEmail.value}<br> Phone Number: ${contactPhone.value}<br> Message: ${contactMessage.value}`;

  Email.send({
    SecureToken: "c187706a-bf7f-4930-95f4-adf48f2ec711",
    To: "restaurantgadel@gmail.com",
    From: "restaurantgadel@gmail.com",
    Subject: "New Form Message",
    Body: bodyMessage,
  }).then((message) => {
    if (message == "OK") {
      showAlert("Your Message Send Successfully", "green");
    }
  });
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  sendEmail();
});

/*******************************************************************************************************
 *                                                                                                      *
 *                                         NewsLetter Email Send                                        *
 *                                                                                                      *
 *******************************************************************************************************/
const newsLetterForm = document.querySelector("footer form");
const newsLetterEmail = document.getElementById("news");

function sendNews() {
  const bodyMessage = `Email: ${newsLetterEmail.value}`;

  Email.send({
    SecureToken: "c187706a-bf7f-4930-95f4-adf48f2ec711",
    To: "restaurantgadel@gmail.com",
    From: "restaurantgadel@gmail.com",
    Subject: "New News Email",
    Body: bodyMessage,
  }).then((message) => {
    if (message == "OK") {
      showAlert("Your Email Send Successfully", "green");
    }
  });
}

newsLetterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  sendNews();
});
