import KEYDATA from "./keyData.js";

class Keyboard {
  constructor() {
    this.keyData = KEYDATA;
    this.container = null;
    this.textarea = null;
    this.keyboard = null;
    this.renderKeyboard();
  }

  renderKeyboard() {
    this.container = document.createElement("div");
    this.textfield = document.createElement("textarea");
    this.keyboard = document.createElement("div");

    this.container.classList.add("container");
    this.textfield.classList.add("textarea");
    this.textfield.setAttribute("cols", 35);
    this.textfield.setAttribute("rows", 10);
    this.keyboard.classList.add("keyboard");
    document.body.append(this.container);
    this.container.append(this.textfield, this.keyboard);

    this.keyData.forEach((key) => {
      const keyNode = document.createElement("div");
      keyNode.innerHTML = key.eng.toUpperCase();
      key.classes.forEach((el) => keyNode.classList.add(el));
      this.keyboard.append(keyNode);
    });
  }
}

export default Keyboard;
