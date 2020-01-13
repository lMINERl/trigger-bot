'use strict';
// const { spawn } = require("child_process");
const iohook = require('iohook');
const memoryjs = require('memoryjs');
const { game } = require('./game');
const { custom, eventEmitter } = require('./events');
const { generators } = require('./helpers');
const { automate } = require('./util');
const { processOpen, setBuffer } = require('./process.async');


const baseInfAmmo = 0x00533385; // base address for assymbly
const baseInfAmmoBytesOrignal = '\x89\x81\x08\x01\x00\x00'; // original assymbly codes
const baseInfAmmoBytesReplace = '\x90\x90\x90\x90\x90\x90'; // assymply for nop codes



game.fovGen = generators.write(
  () => !game.exit,
  () => custom.changeHandleArray(game.handle, memoryjs.FLOAT, 108, game.fovOffsetPTR, lastValue => console.log('Changed Fov from 85 to ', lastValue))
);

game.hpGen = generators.write(
  () => !game.exit,
  () =>
    custom.changeHandleArray(game.handle, memoryjs.FLOAT, 'pass', game.hpOffsetPTR, lastValue => {
      if (lastValue < 51) {
        custom.changeHandleArray(game.handle, memoryjs.FLOAT, 50, game.hpOffsetPTR);
      }
    })
);

game.clipGen = generators.write(
  () => !game.exit && (game.mouseHold.right || game.mouseHold.left),
  () => custom.changeHandleArray(game.handle, memoryjs.INT32, 'pass', game.clipOffsetPTR, lastValue => automate.toggleKey(lastValue < 1, 'control'))
);

game.enemyHoverGen = generators.write(
  () => !game.exit,
  () => custom.changeHandleArray(game.handle, memoryjs.INT32, 'pass', game.enemyHoverOffsetPTR, lastValue => automate.toggleMouse(lastValue != 0, 'left'))
);

game.isInGameGen = generators.write(
  () => !game.exit,
  () =>
    custom.changeHandleArray(game.handle, memoryjs.INT32, 'pass', game.isInGameInGameOffsetPTR, lastValue => {
      game.isInGame = Boolean(lastValue);
    })
);

iohook.start();
console.log('cheats only Works if you are in game');
console.log('HOME For Exit');
console.log('ALT+Q For toggleing reloadable ammo');
console.log('ALT+F For Activating Field of View');
console.log('MOUSE_RIGHT For Activating Trigger Bot');
console.log('ALT+1 to Search for Process File name again "F.E.A.R. 3.exe"');

const writeProcessInterval = setInterval(() => {
  if (game.isGameProcess) {
    processOpen('f.e.a.r. 3.exe');
    game.isGameProcess = false;
  }
  if (!(game.handle && game.isInGameGen && game.enemyHoverGen && game.isPlayerAction)) {
    return;
  }
  game.isInGame = game.isInGameGen.next().value;
  if (!game.isInGame) {
    return;
  }

  if (game.mouseHold.right) {
    eventEmitter.emit('onActivate', () => game.hpGen.next());
    eventEmitter.emit('onActivate', () => game.enemyHoverGen.next());
  }
  if (!game.toggleFov.ignore) {
    game.toggleFov.ignore = true;
    if (game.toggleFov.isActive) {
      game.fovGen.next();
    }
  }
  if (!game.toggleClip.ignore) {
    game.toggleClip.ignore = true;
    if (game.toggleClip.isActive) {
      console.log('freez reload ammo on');
      setBuffer(game.handle, baseInfAmmo, baseInfAmmoBytesOrignal.length, baseInfAmmoBytesReplace);
    } else {
      console.log('freez reload ammo off');
      setBuffer(game.handle, baseInfAmmo, baseInfAmmoBytesOrignal.length, baseInfAmmoBytesOrignal);
    }
  }
}, 80);

const loop = setInterval(() => {
  if (game.exit) {
    
    iohook.unload();
    if (game.handle) {
      memoryjs.closeProcess(game.handle);
    }
    clearInterval(writeProcessInterval);
    clearInterval(loop);
    process.exit();
  }
}, 1000);
