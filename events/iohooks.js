const iohook = require('iohook');
const { game } = require('../game');

const HOME_NUMLOCKED = 3655;
const LEFT_BUTTON = 0x1;
const RIGHT_BUTTON = 0x2;

iohook.on('keydown', event => {
  // console.log(event);
  game.keyHold = true;
  game.isPlayerAction = game.keyHold;
  switch (event.keycode) {
    case HOME_NUMLOCKED: // home numlocked
      game.exit = true;
      break;
  }
});
iohook.on('keyup', event => {
  game.keyHold = false;
  game.isPlayerAction = game.keyHold || game.mouseHold.isActive();
});

iohook.on('mouseup', event => {
  if (event.button == LEFT_BUTTON) {
    game.mouseHold.left = false;
  }
  if (event.button == RIGHT_BUTTON) {
    game.mouseHold.right = false;
  }
  game.isPlayerAction = game.keyHold || game.mouseHold.isActive();
  // console.log(game.mouseHold);
});
iohook.on('mousedown', event => {
  if (event.button == LEFT_BUTTON) {
    game.mouseHold.left = true;
  }
  if (event.button == RIGHT_BUTTON) {
    game.mouseHold.right = true;
  }
  game.isPlayerAction = game.mouseHold.left || game.mouseHold.right;
});

//  Alt + q
iohook.registerShortcut([56, 16], shortcut => {
  game.toggleClip.isActive = !game.toggleClip.isActive;
  // console.log(game.toggleClip.isActive ? 'active' : 'inactive');
  game.toggleClip.ignore = false;
});
// alt + f
iohook.registerShortcut([56, 33], shortcut => {
  game.toggleFov.isActive = !game.toggleFov.isActive;
  game.toggleFov.ignore = false;
});

iohook.registerShortcut([56, 2], shortcut => {
  game.isGameProcess = true;
});
