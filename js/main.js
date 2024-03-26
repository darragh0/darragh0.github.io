import {type} from "./typewriter.js";

$(document).ready(() => {

    type($("#header"), $("#caret"), 50, 200, 0, () =>
        type($("#header-description"), $("#header-description-caret"), 50, 250, 2_000)
    );

    let count = 0;
    let x_disabled = true;

    function toggle() {
        $(".hamburger-bar").toggleClass("hamburger-x");
        $("#hamburger a").toggleClass("hamburger-x-padding");
        $(".nav-center").slideToggle(200);
    }

    $("#hamburger a").click(() => { 
        toggle();
        x_disabled = !(++count % 2);
    });

    $(window).resize(() => {
        if (window.matchMedia("(min-width: 600px)").matches) {
            $(".nav-center").show();
        } else if (x_disabled) {
            $(".nav-center").hide();
        }
    });

});
