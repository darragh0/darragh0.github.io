import { setupParticles } from "./particles.js";
import { delChars, sleep, typeText } from "./typewriter.js";

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

$(document).ready(async () => {
  setupParticles();

  let isNavigating = false;
  const debounceNav = (callback, delay = 500) => {
    if (isNavigating) return;
    isNavigating = true;
    callback();
    setTimeout(() => {
      isNavigating = false;
    }, delay);
  };

  $(document).on("keydown", function (e) {
    if (e.which === 13) {
      debounceNav(() => {
        const sections = $("header, section");
        let currentIndex = -1;
        const lastIndex = sections.length - 1;

        sections.each(function (index) {
          const rect = this.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= window.innerHeight / 2) {
            currentIndex = index;
            return false;
          }
        });

        if (currentIndex !== -1) {
          let targetIndex;
          if (e.shiftKey) {
            targetIndex = Math.max(0, currentIndex - 1);
          } else {
            targetIndex = Math.min(lastIndex, currentIndex + 1);
            if (currentIndex === lastIndex) {
              return;
            }
          }
          if (targetIndex === currentIndex) {
            return;
          }

          e.preventDefault();

          const targetSection = sections[targetIndex];

          $("html, body").animate(
            {
              scrollTop: $(targetSection).offset().top,
            },
            50,
            "swing"
          );
        }
      });
    }
  });

  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();

    const target = this.hash;
    const $target = $(target);

    $("html, body").animate(
      {
        scrollTop: $target.offset().top,
      },
      50,
      "swing"
    );
  });

  animateOnScroll();

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

  $(".social-links a").each(function (index) {
    setTimeout(() => {
      $(this).addClass("animated");
    }, 5000 + index * 200);
  });
});

