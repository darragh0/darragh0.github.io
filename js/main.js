import { sleep, delChars, typeText } from "./typewriter.js";
import { setupParticles } from "./particles.js";

// Animate elements when they enter viewport
function animateOnScroll() {
  const elements = document.querySelectorAll(
    ".project-card, section h2, .skill-tags span"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

// Initialize everything when document is ready
$(document).ready(async () => {
  setupParticles();

  // Debounce function to limit keyboard navigation frequency
  let isNavigating = false;
  const debounceNav = (callback, delay = 500) => {
    if (isNavigating) return;
    isNavigating = true;
    callback();
    setTimeout(() => {
      isNavigating = false;
    }, delay);
  };

  // Handle keyboard navigation between sections
  $(document).on("keydown", function (e) {
    // Check if Enter key was pressed (key code 13)
    if (e.which === 13) {
      debounceNav(() => {
        // Get all sections and header
        const sections = $("header, section");
        let currentIndex = -1;
        const lastIndex = sections.length - 1;

        // Find which section is currently visible in the viewport
        sections.each(function (index) {
          const rect = this.getBoundingClientRect();
          // Check if section is mostly visible in the viewport
          if (rect.top <= 100 && rect.bottom >= window.innerHeight / 2) {
            currentIndex = index;
            return false; // Break the loop
          }
        });

        // Navigation logic with boundaries
        if (currentIndex !== -1) {
          let targetIndex;

          if (e.shiftKey) {
            // Shift+Enter: Go to previous section (don't go past first section)
            targetIndex = Math.max(0, currentIndex - 1);
          } else {
            // Enter: Go to next section (don't go past last section)
            targetIndex = Math.min(lastIndex, currentIndex + 1);

            // If we're already at the last section, don't do anything
            if (currentIndex === lastIndex) {
              return;
            }
          }

          // Don't do anything if we're already at the target section
          if (targetIndex === currentIndex) {
            return;
          }

          e.preventDefault();

          const targetSection = sections[targetIndex];

          $("html, body").animate(
            {
              scrollTop: $(targetSection).offset().top,
            },
            300,
            "swing"
          );
        }
      });
    }
  });

  // Smooth scrolling for anchor links with faster animation
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();

    const target = this.hash;
    const $target = $(target);

    $("html, body").animate(
      {
        scrollTop: $target.offset().top,
      },
      300, // Reduced from 800ms to 300ms for much faster scrolling
      "swing" // Using "swing" for a quicker acceleration/deceleration
    );
  });

  // Initialize scroll animations
  animateOnScroll();

  // Add active class to section when scrolling
  $(window).on("scroll", function () {
    const scrollPosition = $(this).scrollTop();

    $("section").each(function () {
      const topDistance = $(this).offset().top - 100;

      if (scrollPosition >= topDistance) {
        const id = $(this).attr("id");
        $(".footer-nav a").removeClass("active");
        $('.footer-nav a[href="#' + id + '"]').addClass("active");
      }
    });
  });

  $("#title").addClass("cursor-bar");

  await sleep(500);
  await typeText($("#title"), 65, 0);
  await sleep(500);

  $("#title").removeClass("cursor-bar");
  $("#title").addClass("crlf");
  $("#title-description").append("<wbr />");
  $("#title-description").addClass("cursor-bar");

  await sleep(500);
  await typeText($("#title-description"), 50, 0);
  await sleep(500);

  await delChars(4, document.getElementById("title-description"), 100);
  await sleep(500);

  await typeText($("#title-description"), 100, 5, "reland.");

  // Animate social links with slight delay between each
  $(".social-links a").each(function (index) {
    setTimeout(() => {
      $(this).addClass("animated");
    }, 5000 + index * 200);
  });
});

// Auto-expanding textarea
const textarea = document.getElementById("message");
if (textarea) {
  textarea.addEventListener("input", function () {
    // Reset height to auto to get the correct scrollHeight
    this.style.height = "auto";

    // Set the height to the scrollHeight (content height)
    // The max-height in CSS will handle the limit and scrollbar
    this.style.height = this.scrollHeight + "px";
  });
}

// Form validation and submission
document.addEventListener("DOMContentLoaded", () => {
  // Contact form handling
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);

    // Add input validation listeners
    const formInputs = contactForm.querySelectorAll("input, textarea");
    formInputs.forEach((input) => {
      // Clear error when user starts typing again
      input.addEventListener("input", () => {
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) {
          errorElement.textContent = "";
        }
      });
    });
  }
});

// Form validation function
function validateInput(input) {
  let isValid = true;
  let errorMessage = "";

  // Skip validation for optional fields if empty
  if (!input.required && !input.value.trim()) {
    return true;
  }

  switch (input.id) {
    case "name":
      if (!input.value.trim()) {
        isValid = false;
        errorMessage = "Please enter your name";
      } else if (input.value.trim().length < 2) {
        isValid = false;
        errorMessage = "Name must be at least 2 characters";
      }
      break;

    case "email":
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!input.value.trim()) {
        isValid = false;
        errorMessage = "Please enter your email";
      } else if (!emailPattern.test(input.value.trim())) {
        isValid = false;
        errorMessage = "Please enter a valid email address";
      }
      break;

    case "message":
      if (!input.value.trim()) {
        isValid = false;
        errorMessage = "Please enter a message";
      } else if (input.value.trim().length < 10) {
        isValid = false;
        errorMessage = "Message must be at least 10 characters";
      }
      break;
  }

  // Update UI based on validation
  const errorElement = document.getElementById(`${input.id}-error`);
  if (errorElement) {
    errorElement.textContent = errorMessage;
  }

  return isValid;
}

// Form submission handler
function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formInputs = form.querySelectorAll(
    "input[required], textarea[required]"
  );
  let isFormValid = true;

  // Validate all required inputs on submission
  formInputs.forEach((input) => {
    const currentValid = validateInput(input);
    // Update overall form validity
    isFormValid = isFormValid && currentValid;
  });

  if (isFormValid) {
    // Form is valid, show success message
    alert("Thanks for your message! I'll get back to you soon.");

    // Reset form and clear any error messages
    form.reset();

    // Reset textarea height
    const textarea = form.querySelector("textarea");
    if (textarea) {
      textarea.style.height = "auto";
    }

    // Clear any error messages
    const errorElements = form.querySelectorAll(".error-message");
    errorElements.forEach((element) => {
      element.textContent = "";
    });
  }
}
