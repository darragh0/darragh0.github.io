function updateSquircle() {
    let temp = $("<div></div>");
    let nextTheme = THEMES[(themeIndex + 1) % THEME_COUNT]

    temp.addClass(nextTheme);
    $("body").append(temp);

    let computedStyle = window.getComputedStyle(temp[0]);
    let primary = computedStyle.getPropertyValue("--primary");
    let secondary = computedStyle.getPropertyValue("--secondary");
    let accent = computedStyle.getPropertyValue("--accent-color");

    $("#squircle").css("border-color", `${primary}${accent}${secondary}${accent}`);

    temp.remove();
}

const THEMES = [
    "dark-theme-purple",
    "dark-theme-grey",
    "light-theme-blue",
    "light-theme-red",
    "light-theme-green"
];

const THEME_COUNT = THEMES.length;
const DEFAULT_THEME = THEMES[0];

let themeIndex = parseInt(sessionStorage.getItem("theme-index"));

if (isNaN(themeIndex)) {
    $("body").addClass(DEFAULT_THEME);
    themeIndex = 0;
} else
    $("body").addClass(THEMES[themeIndex]);

updateSquircle();

// Animate elements when they enter viewport
function animateOnScroll() {
    const elements = document.querySelectorAll('.project-card, section h2, .skill-tags span');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

$(document).ready(() => {
    // Theme toggle
    $("#change-theme").click(() => {
        $("body").removeClass();

        themeIndex = ++themeIndex % THEME_COUNT;
        sessionStorage.setItem("theme-index", themeIndex);

        updateSquircle();
        $("body").addClass(THEMES[themeIndex]);
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        const target = this.hash;
        const $target = $(target);

        $('html, body').animate({
            'scrollTop': $target.offset().top
        }, 800, 'swing');
    });

    // Initialize scroll animations
    animateOnScroll();

    // Add active class to section when scrolling
    $(window).on('scroll', function () {
        const scrollPosition = $(this).scrollTop();

        $('section').each(function () {
            const topDistance = $(this).offset().top - 100;

            if (scrollPosition >= topDistance) {
                const id = $(this).attr('id');
                $('.footer-nav a').removeClass('active');
                $('.footer-nav a[href="#' + id + '"]').addClass('active');
            }
        });
    });
});