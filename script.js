// Cart functionality
let cartCount = 0;
let cartItems = [];
const cartCountElement = document.querySelector(".cart-count");
const cartIcon = document.querySelector(".cart-icon");
const modal = document.getElementById("cart-modal");

// Initialize cart from localStorage if available
window.addEventListener("DOMContentLoaded", function () {
  const storedCount = localStorage.getItem("cartCount");
  const storedItems = localStorage.getItem("cartItems");

  if (storedCount) {
    cartCount = parseInt(storedCount);
    cartCountElement.textContent = cartCount;
  }

  if (storedItems) {
    cartItems = JSON.parse(storedItems);
    updateCartModal();
  }
});

// Add to cart functionality
if (document.querySelectorAll(".add-to-cart").length > 0) {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      const name = this.getAttribute("data-name");
      const price = parseFloat(this.getAttribute("data-price"));

      // Check if item is already in cart
      const existingItem = cartItems.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push({
          id,
          name,
          price,
          quantity: 1,
        });
      }

      cartCount += 1;
      cartCountElement.textContent = cartCount;

      // Save to localStorage
      localStorage.setItem("cartCount", cartCount);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Show quick notification
      this.textContent = "Added!";
      setTimeout(() => {
        this.textContent = "Add to Cart";
      }, 1000);

      updateCartModal();
    });
  });
}

// Cart modal functionality
if (modal) {
  const closeModal = document.querySelector(".close-modal");

  cartIcon.addEventListener("click", function () {
    modal.style.display = "flex";
  });

  if (closeModal) {
    closeModal.addEventListener("click", function () {
      modal.style.display = "none";
    });
  }

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}
// Update cart modal content
function updateCartModal() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("total-price");

  if (!cartItemsContainer || !totalElement) return;

  // Clear current items
  cartItemsContainer.innerHTML = "";

  // Calculate total
  let total = 0;

  // Add each item
  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cartItems.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const itemElement = document.createElement("div");
      itemElement.style.display = "flex";
      itemElement.style.justifyContent = "space-between";
      itemElement.style.marginBottom = "10px";
      itemElement.style.padding = "10px";
      itemElement.style.borderBottom = "1px solid #eee";

      itemElement.innerHTML = `
        <div>
          <p><strong>${item.name}</strong></p>
          <p>Quantity: ${item.quantity} x R${item.price.toFixed(2)}</p>
        </div>
        <p>R${itemTotal.toFixed(2)}</p>
      `;

      cartItemsContainer.appendChild(itemElement);
    });
  }

  // Update total
  totalElement.textContent = total.toFixed(2);
}

// Newsletter form validation
const newsletterForm = document.getElementById("newsletter-form");
if (newsletterForm) {
  const emailInput = document.getElementById("email-input");

  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Success message
    alert("Thank you for subscribing to our newsletter!");
    emailInput.value = "";
  });
}

// Image Slider
const slides = document.querySelector(".slides");
if (slides) {
  const slideElements = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slider-dot");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let currentSlide = 0;
  const slideCount = slideElements.length;
  let slideInterval;

  // Initialize the slider
  function showSlide(index) {
    if (index < 0) {
      currentSlide = slideCount - 1;
    } else if (index >= slideCount) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }

    // Move the slides
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  // Add event listeners for navigation
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      showSlide(currentSlide - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      showSlide(currentSlide + 1);
    });
  }

  // Add event listeners for dots
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showSlide(i);
    });
  });

  // Auto-slide every 5 seconds
  function startSlideInterval() {
    slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);
  }

  // Pause auto-sliding when hovering over the slider
  const sliderContainer = document.querySelector(".slider-container");
  if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", () => {
      clearInterval(slideInterval);
    });

    sliderContainer.addEventListener("mouseleave", () => {
      startSlideInterval();
    });
  }

  // Initialize slider
  showSlide(0);
  startSlideInterval();
}

// Accordion functionality
const accordionItems = document.querySelectorAll(".accordion-item");
if (accordionItems.length > 0) {
  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");

    header.addEventListener("click", () => {
      // Close all other accordion items
      accordionItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current item
      item.classList.toggle("active");
    });
  });
}

// Contact Form validation
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const subjectError = document.getElementById("subject-error");
  const messageError = document.getElementById("message-error");
  const successMessage = document.getElementById("success-message");

  function showError(input, errorElement) {
    input.style.borderColor = "#ff4d4d";
    errorElement.style.display = "block";
  }

  function hideAllErrors() {
    nameInput.style.borderColor = "#ddd";
    emailInput.style.borderColor = "#ddd";
    subjectInput.style.borderColor = "#ddd";
    messageInput.style.borderColor = "#ddd";

    nameError.style.display = "none";
    emailError.style.display = "none";
    subjectError.style.display = "none";
    messageError.style.display = "none";

    successMessage.style.display = "none";
  }

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset previous errors
    hideAllErrors();

    // Validate name
    if (nameInput.value.trim() === "") {
      showError(nameInput, nameError);
      return;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      showError(emailInput, emailError);
      return;
    }

    // Validate subject
    if (subjectInput.value.trim() === "") {
      showError(subjectInput, subjectError);
      return;
    }

    // Validate message
    if (messageInput.value.trim() === "") {
      showError(messageInput, messageError);
      return;
    }

    // If all validations pass, show success message
    successMessage.style.display = "block";
    contactForm.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 5000);
  });

  // Add input event listeners to clear errors when typing
  nameInput.addEventListener("input", function () {
    this.style.borderColor = "#ddd";
    nameError.style.display = "none";
  });

  emailInput.addEventListener("input", function () {
    this.style.borderColor = "#ddd";
    emailError.style.display = "none";
  });

  subjectInput.addEventListener("input", function () {
    this.style.borderColor = "#ddd";
    subjectError.style.display = "none";
  });

  messageInput.addEventListener("input", function () {
    this.style.borderColor = "#ddd";
    messageError.style.display = "none";
  });
}

// Interactive timeline animation on scroll
const timelineItems = document.querySelectorAll(".timeline-item");
if (timelineItems.length > 0) {
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function animateTimeline() {
    timelineItems.forEach((item) => {
      if (isElementInViewport(item)) {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }
    });
  }

  // Set initial state for timeline items
  timelineItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(50px)";
    item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  // Check on scroll and initial load
  window.addEventListener("scroll", animateTimeline);
  window.addEventListener("load", animateTimeline);
}

// Map Initialization
var map = L.map("map").setView([-30.5595, 22.9375], 5);

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Add markers for major cities
var cities = [
  {
    name: "Cape Town",
    lat: -33.9249,
    lon: 18.4241,
    description: "Legislative Capital",
  },
  {
    name: "Pretoria",
    lat: -25.7479,
    lon: 28.2293,
    description: "Administrative Capital",
  },
  {
    name: "Johannesburg",
    lat: -26.2041,
    lon: 28.0473,
    description: "Largest City",
  },
  { name: "Durban", lat: -29.8587, lon: 31.0218, description: "Coastal City" },
];

cities.forEach(function (city) {
  L.marker([city.lat, city.lon])
    .addTo(map)
    .bindPopup(`<b>${city.name}</b><br>${city.description}`);
});
