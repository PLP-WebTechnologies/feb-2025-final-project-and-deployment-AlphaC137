document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }

  themeToggle.addEventListener("click", () => {
    const theme = document.documentElement.getAttribute("data-theme");
    if (theme === "dark") {
      document.documentElement.removeAttribute("data-theme");
      localStorage.removeItem("theme");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  });

  // Active Navigation Link
  const currentPage = location.pathname.split("/").pop();
  document.querySelectorAll("nav a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // Newsletter Forms
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput) {
        alert(
          `Thanks for subscribing, ${emailInput.value}! We'll keep you updated.`
        );
        form.reset();
      }
    });
  });

  // Portfolio Interaction
  document.querySelectorAll(".portfolio-item").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.querySelector("img").style.transform = "scale(1.05)";
    });

    item.addEventListener("mouseleave", () => {
      item.querySelector("img").style.transform = "scale(1)";
    });
  });

  // Observers for Animations
  const createObserver = (selector, options = {}) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, options);

    document.querySelectorAll(selector).forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "all 0.5s ease-out";
      observer.observe(el);
    });
  };

  // Initialize observers
  createObserver(".tip-card, .service-card, .pros, .cons, .stat-card");

  // Image Gallery Interaction
  document.querySelectorAll(".lifestyle-gallery img").forEach((img) => {
    img.addEventListener("click", () => {
      img.classList.toggle("gallery-expanded");
    });
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".blog-posts article, .featured-post, .service-card, .team-member"
    );

    elements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          entry.target.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";
        }
      });
    });

    elements.forEach((el) => {
      observer.observe(el);
    });
  };

  animateOnScroll();

  // Contact Form Handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      };

      alert(`Thank you ${formData.name}! Your message has been sent.`);
      e.target.reset();
    });
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
    {
      name: "Durban",
      lat: -29.8587,
      lon: 31.0218,
      description: "Coastal City",
    },
  ];

  cities.forEach(function (city) {
    L.marker([city.lat, city.lon])
      .addTo(map)
      .bindPopup(`<b>${city.name}</b><br>${city.description}`);
  });
});
