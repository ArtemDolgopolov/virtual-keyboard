import KEYDATA from './keyData.js';

class Keyboard {
  constructor() {
    this.keyData = KEYDATA;
    this.container = null;
    this.textfield = null;
    this.keyboard = null;
    this.pressedKeys = [];
    this.keyNodes = [];
    this.renderKeyboard();
  }

  renderKeyboard() {
    this.container = document.createElement('div');
    this.textfield = document.createElement('textarea');
    this.keyboard = document.createElement('div');

    this.container.classList.add('container');
    this.textfield.classList.add('textarea');
    this.textfield.setAttribute('cols', 35);
    this.textfield.setAttribute('rows', 10);
    this.keyboard.classList.add('keyboard');
    document.body.append(this.container);
    this.container.append(this.textfield, this.keyboard);

    this.keyData.forEach((key) => {
      const keyNode = document.createElement('button');
      keyNode.innerHTML = key.eng.toUpperCase();
      keyNode.dataset.code = key.code;
      key.classes.forEach((el) => keyNode.classList.add(el));
      this.keyNodes.push(keyNode);
      this.keyboard.append(keyNode);
    });

    this.textfield.addEventListener('blur', () => {
      this.textfield.focus();
    });
  }

  pressKey(code) {
    const node = this.keyNodes.find((keyNode) => keyNode.dataset.code === code);
    if (node) {
      this.pressedKeys.push(code);
      node.classList.add('pressed-key');
    }
  }

  press(code) {
    this.pressKey(code);
  }

  unpressKey(code) {
    const node = this.keyNodes.find((keyNode) => keyNode.dataset.code === code);
    if (node) {
      this.pressedKeys = this.pressedKeys.filter((keyNode) => keyNode !== code);
      node.classList.remove('pressed-key');
    }
  }

  unpress(code) {
    this.unpressKey(code);
  }
}

export default Keyboard;
