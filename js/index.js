import {type_text, del_chars, sleep} from "./typewriter.js";

$(document).ready(async () => {

    await type_text($("#title"), 65, 0);
    await sleep(250);

    $("#title").css("--after-opacity", 0);

    await sleep(250);

    $("#title-description").css("--after-opacity", 1);

    await type_text($("#title-description"), 50, 0);
    await sleep(500);

    await del_chars(4, document.getElementById("title-description"), 100);
    await sleep(500);

    await type_text($("#title-description"), 100, 5, "reland.");

});
