function find_commas(string) {
    const indices = []

    for (let i = 0; i < string.length; i++) {
        if (string[i] === "," && (i + 1) < string.length)
            indices.push(i + 1);
    }

    return indices
}


export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export async function del_chars(chars, element, delSpeed) {

    let text = element.innerHTML
    
    for (let i = 1; i <= chars; i++) {
        await sleep(delSpeed);
        element.innerHTML = text.substring(0, text.length - i);
    }

}


export async function type_text(element, typingSpeed, caretBlinks, text = null) {

    if (text === null)
        text = element.data("text");
    
    const comma_indices = find_commas(text);

    for (let i = 0; i < text.length; i++) {

        if (comma_indices.includes(i))
            await sleep(2.5 * typingSpeed);

        await sleep(typingSpeed);
        element.append(text[i]);

    }

    if (caretBlinks === 0)
        return;

    async function blink() {
        element.css("--after-opacity", 0);
        await sleep(750);
        element.css("--after-opacity", 1);
    }

    const intervalID = setInterval(blink, 1_500);  

    await sleep((caretBlinks * 1_500) + 750);
    clearInterval(intervalID);

    await sleep(750);
    element.css("--after-opacity", 0);

}
