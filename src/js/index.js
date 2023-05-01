import Keyboard from './keyBoard.js';

const KEYBOARD = new Keyboard();
let pressTrigger = null;

window.addEventListener('keydown', (e) => {
  KEYBOARD.press(e.code);
  e.preventDefault();
});

window.addEventListener('keyup', (e) => {
  KEYBOARD.unpress(e.code);
  e.preventDefault();
});

window.addEventListener('mousedown', (e) => {
  if (e.target.tagName === 'BUTTON') {
    KEYBOARD.press(e.target.dataset.code);
    pressTrigger = e.target.dataset.code;
  }
});

window.addEventListener('mouseup', () => {
  if (pressTrigger) {
    KEYBOARD.unpress(pressTrigger);
    pressTrigger = null;
  }
});
