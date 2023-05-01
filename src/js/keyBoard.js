import KEYDATA from './keyData.js';

class Keyboard {
  constructor() {
    this.keyData = KEYDATA;
    this.container = null;
    this.textfield = null;
    this.keyboard = null;
    this.pressedKeys = [];
    this.keyNodes = [];
    this.lang = localStorage.getItem('lang') || 'eng';
    this.renderKeyboard();
    this.capsCounter = 0;
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
      keyNode.dataset.code = key.code;
      keyNode.innerHTML = key[this.lang];
      key.classes.forEach((el) => keyNode.classList.add(el));
      this.keyNodes.push(keyNode);
      this.keyboard.append(keyNode);
    });

    this.textfield.addEventListener('blur', () => {
      this.textfield.focus();
    });
  }

  chnageLang(code) {
    const firstIf = this.pressedKeys.includes('ControlLeft') && this.pressedKeys.includes('AltLeft');
    const secondIf = code === 'ControlLeft' || code === 'AltLeft';
    if (firstIf && secondIf) {
      this.lang = this.lang === 'eng' ? 'ru' : 'eng';
      localStorage.setItem('lang', this.lang);
    }
  }

  getValue(key) {
    if (this.isShiftPressed() && this.isCapsLockPressed() && !key.controlKey) {
      return key[`${this.lang}_add`]
        ? key[`${this.lang}_add`]
        : key[this.lang];
    } if (this.isShiftPressed() && !this.isCapsLockPressed() && !key.controlKey) {
      return key[`${this.lang}_add`]
        ? key[`${this.lang}_add`]
        : key[this.lang].toUpperCase();
    } if (this.isCapsLockPressed() && !key.controlKey) {
      return key[this.lang].toUpperCase();
    }
    return key[this.lang];
  }

  isShiftPressed() {
    return this.pressedKeys.includes('ShiftLeft') || this.pressedKeys.includes('ShiftRight');
  }

  isCapsLockPressed() {
    return this.pressedKeys.includes('CapsLock');
  }

  changePosition(value) {
    this.textfield.selectionStart = value;
    this.textfield.selectionEnd = value;
  }

  getSubStr(start, end = this.textfield.value.length) {
    return this.textfield.value.substring(start, end);
  }

  updateText(code) {
    const start = this.textfield.selectionStart;
    const end = this.textfield.selectionEnd;
    const key = this.keyData.find((el) => el.code === code);
    if (key) {
      if (!key.controlKey) {
        this.textfield.value = this.getSubStr(0, start) + this.getValue(key) + this.getSubStr(end);
        this.changePosition(start + 1);
      } else if (code === 'Tab' || code === 'Enter' || code === 'Space') {
        let s = code === 'Tab' ? '\t' : '\n';
        switch (code) {
          case 'Tab':
            s = '\t';
            break;
          case 'Enter':
            s = '\n';
            break;
          case 'Space':
            s = ' ';
            break;
          default:
            break;
        }
        this.textfield.value = this.getSubStr(0, start) + s + this.getSubStr(end);
        this.changePosition(start + 1);
      } else if (code === 'Backspace') {
        if (start === end) {
          this.textfield.value = this.getSubStr(0, start - 1) + this.getSubStr(end);
          this.changePosition(start !== 0 ? start - 1 : 0);
        } else {
          this.textfield.value = this.getSubStr(0, start) + this.getSubStr(end);
          this.changePosition(start);
        }
      } else if (code === 'Delete') {
        if (start === end && end !== this.textfield.value.length) {
          this.textfield.value = this.getSubStr(0, start) + this.getSubStr(end + 1);
        } else {
          this.textfield.value = this.getSubStr(0, start) + this.getSubStr(end);
        }
        this.changePosition(start);
      }
    }
  }

  update() {
    this.keyNodes.forEach((keyNode) => {
      const node = keyNode;
      const key = this.keyData.find((el) => el.code === node.dataset.code);
      node.innerHTML = this.getValue(key);
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
    this.updateText(code);
    this.update();
  }

  unpressKey(code) {
    const node = this.keyNodes.find((el) => el.dataset.code === code);
    if (code === 'CapsLock') {
      this.capsCounter += 1;
      if (this.capsCounter === 2) {
        this.pressedKeys = this.pressedKeys.filter((el) => el !== code);
        node.classList.remove('pressed-key');
        this.capsCounter = 0;
      }
    } else if (code === 'ShiftLeft' || code === 'ShiftRight') {
      this.pressedKeys = this.pressedKeys.filter((el) => el !== 'ShiftLeft' && el !== 'ShiftRight');
      const shiftLeft = this.keyNodes.find((el) => el.dataset.code === 'ShiftLeft');
      const shiftRight = this.keyNodes.find((el) => el.dataset.code === 'ShiftRight');
      shiftLeft.classList.remove('pressed-key');
      shiftRight.classList.remove('pressed-key');
    } else if (node) {
      this.pressedKeys = this.pressedKeys.filter((el) => el !== code);
      node.classList.remove('pressed-key');
    }
    this.update();
  }

  unpress(code) {
    this.unpressKey(code);
  }
}

export default Keyboard;
