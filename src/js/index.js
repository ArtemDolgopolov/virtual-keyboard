import Keyboard from "./keyBoard.js";

const KEYBOARD = new Keyboard();
KEYBOARD.renderKeyboard();

window.addEventListener("mousedown", (e) => {
  if (e.target.tagName === "BUTTON") {
    e.target.classList.add("pressed-key");
  }
});

window.addEventListener("mouseup", (e) => {
  if (e.target.tagName === "BUTTON") {
    e.target.classList.remove("pressed-key");
  }
});
