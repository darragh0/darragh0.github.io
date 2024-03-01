$(document).ready(() => {

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
