function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function delChars(chars, element, delSpeed) {
  let text = element.innerHTML;

  for (let i = 1; i <= chars; i++) {
    await sleep(delSpeed);
    element.innerHTML = text.substring(0, text.length - i);
  }
}

async function typeText(element, typingSpeed, caretBlinks, text = null) {
  if (text === null) text = element.data("text");

  const comma_indices = [];
  for (let i = 0; i < text.length; i++) {
    if (text[i] === "," && i + 1 < text.length) comma_indices.push(i + 1);
  }

  for (let i = 0; i < text.length; i++) {
    if (comma_indices.includes(i)) await sleep(2.5 * typingSpeed);

    await sleep(typingSpeed);
    element.append(text[i]);
  }

  // Only perform blinking if requested
  if (caretBlinks === 0) {
    return;
  }

  async function blink() {
    element.removeClass("cursor-bar");
    await sleep(750);
    element.addClass("cursor-bar");
  }

  const intervalID = setInterval(blink, 1_500);

  await sleep(caretBlinks * 1_500 + 750);
  clearInterval(intervalID);

  await sleep(750);
  element.removeClass("cursor-bar");
}

export { sleep, delChars, typeText };
