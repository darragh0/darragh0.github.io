function toggle() {
    $(".hamburger-bar").toggleClass("hamburger-x");
    $("#hamburger a").toggleClass("hamburger-x-padding");
    $(".nav-center").slideToggle(200);
}


function updateSquircle() {

    let temp = $("<div></div>");
    let nextTheme = THEMES[(themeIndex + 1) % THEME_COUNT]

    temp.addClass(nextTheme);
    $("body").append(temp);

    let computedStyle = window.getComputedStyle(temp[0]);
    let primary = computedStyle.getPropertyValue("--primary");
    let secondary = computedStyle.getPropertyValue("--secondary");

    $("#squircle").css("border-color", `${primary}${secondary}${secondary}${primary}`);

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


$(document).ready(() => {

    let hamburger_clicks = 0;
    let x_disabled = true;

    $("#change-theme").click(() => {
        $("body").removeClass();

        themeIndex = ++themeIndex % THEME_COUNT;
        sessionStorage.setItem("theme-index", themeIndex);

        updateSquircle();
        $("body").addClass(THEMES[themeIndex]);
    });

    $("#hamburger a").click(() => { 
        toggle();
        x_disabled = !(++hamburger_clicks % 2);
    });

    $(window).resize(() => {
        if (window.matchMedia("(min-width: 600px)").matches) {
            $(".nav-center").show();
        } else if (x_disabled) {
            $(".nav-center").hide();
        }
    });

});
