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

    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            $("#ise-logo img").animate({translate: "0", opacity: "1"}, 600)
            observer.disconnect();
        }
    });
      
    observer.observe(document.querySelector('#ise-logo'));

});
