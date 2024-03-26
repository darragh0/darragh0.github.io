function find_commas(string) {
    const indices = []

    for (let i = 0; i < string.length; i++) {
        if (string[i] === "," && (i + 1) < string.length)
            indices.push(i + 1);
    }

    return indices
}

export function type(text_element, caret_element, speed, pause_timeout, blink_delay, callback) {

    caret_element.animate({opacity: 1});

    const text = text_element.data("text");
    const comma_indices = find_commas(text);

    let timeout_offset = 0

    for (let i = 1; i < text.length + 1; i++) {
        setTimeout(() =>
            text_element.append(text[i - 1]),
            (i * speed) + timeout_offset
        );

        if (comma_indices.includes(i))
            timeout_offset += pause_timeout;
    }

    function blink_caret() {
        caret_element.animate({opacity: 1});
        caret_element.animate({opacity: 0});
    }

    // Extremely cursed ;-; ignore this pls
    setTimeout(
        () => {
            const interval_id = setInterval(blink_caret, 1_500);

            setTimeout(() => {
                    clearInterval(interval_id);
                    setTimeout(() => callback(), 1_000);
                },
                6_000
            );
        },
        blink_delay
    );

}
