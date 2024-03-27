import {type_text, del_chars, sleep} from "./typewriter.js";


$(document).ready(async () => {

    await type_text($("#header"), 75, 2);
    await sleep(500);

    $("#header-description").css("--after-opacity", 1);

    await type_text($("#header-description"), 50, 0);
    await sleep(500);

    await del_chars(4, document.getElementById("header-description"), 100);
    await sleep(500);

    await type_text($("#header-description"), 100, 5, "reland.");

});
