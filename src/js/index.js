import Keyboard from './keyBoard.js';

const KEYBOARD = new Keyboard();
let pressTrigger = null;

window.addEventListener('mousedown', (e) => {
  if (e.target.tagName === 'BUTTON') {
    KEYBOARD.press(e.target.dataset.code);
    pressTrigger = e.target.dataset.code;
  }
});

window.addEventListener('mouseup', () => {
  if (pressTrigger) {
    KEYBOARD.unpress(null);
    pressTrigger = null;
  }
});
