import { sleep, del_chars, type_text } from "./typewriter.js";

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
  // Smooth scrolling for anchor links
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();

    const target = this.hash;
    const $target = $(target);

    $("html, body").animate(
      {
        scrollTop: $target.offset().top,
      },
      800,
      "swing"
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

  $("#title").removeClass("cursor-hidden");
  $("#title-description").addClass("cursor-hidden");

  await sleep(500);
  await type_text($("#title"), 65, 0);
  await sleep(500);

  $("#title").addClass("cursor-hidden");
  $("#title-description").removeClass("cursor-hidden");

  await sleep(500);
  await type_text($("#title-description"), 50, 0);
  await sleep(500);

  await del_chars(4, document.getElementById("title-description"), 100);
  await sleep(500);

  await type_text($("#title-description"), 100, 5, "reland.");

  // Animate social links with slight delay between each
  $(".social-links a").each(function (index) {
    setTimeout(() => {
      $(this).addClass("animated");
    }, 5000 + index * 200);
  });

  // Add parallax effect to header
  $(window).on("mousemove", function (e) {
    const moveX = (e.pageX * -1) / 25;
    const moveY = (e.pageY * -1) / 25;

    $("header").css("--move-x", `${moveX}px`);
    $("header").css("--move-y", `${moveY}px`);
  });
});
