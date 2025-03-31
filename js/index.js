import { type_text, del_chars, sleep } from "./typewriter.js";

$(document).ready(async () => {
    // Wait for initial load animation
    await sleep(500);

    // Animate title with typewriter effect
    await type_text($("#title"), 65, 0);
    await sleep(250);

    $("#title").css("--after-opacity", 0);

    await sleep(250);

    $("#title-description").css("--after-opacity", 1);

    // Type description with mistake and correction
    await type_text($("#title-description"), 50, 0);
    await sleep(500);

    await del_chars(4, document.getElementById("title-description"), 100);
    await sleep(500);

    await type_text($("#title-description"), 100, 5, "reland.");

    // Animate social links with slight delay between each
    $(".social-links a").each(function (index) {
        setTimeout(() => {
            $(this).addClass("animated");
        }, 5000 + (index * 200));
    });

    // Add parallax effect to header
    $(window).on('mousemove', function (e) {
        const moveX = (e.pageX * -1 / 25);
        const moveY = (e.pageY * -1 / 25);

        $('header::before').css({
            'transform': 'translate(' + moveX + 'px, ' + moveY + 'px)'
        });
    });
});