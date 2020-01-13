// all game data that uses
const game = {
  path: '',
  handle: false,
  isPlayerAction: false,

  isGameProcess: true,

  hpGen: null,
  hpOffsetPTR: [0x187e1c0, 0x23c, 0x134, 0x5c, 0x2e8, 0x54],

  fovGen: null,
  toggleFov: { isActive: false, ignore: false },
  fovOffsetPTR: [0x018187d8, 0x4bc, 0xa0, 0xc, 0x2bc, 0xb8],

  toggleClip: { isActive: false, ignore: true },
  clipGen: null,
  clipOffsetPTR: [0x185b2bc, 0x10, 0x5ec, 0xcc, 0x164, 0xb8], //fear

  enemyHoverGen: null,
  enemyHoverChange: true,
  enemyHoverOffsetPTR: [0x0187e1c0, 0x23c, 0x138, 0x74, 0x74, 0x20], // fear

  isInGame: false,
  isInGameGen: null,
  isInGameInGameOffsetPTR: [0x1822200, 0x128, 0x8, 0x10, 0xb4, 0x12c],

  exit: false,
  mouseHold: {
    left: false,
    right: false,
    isActive: function() {
      return game.mouseHold.right || game.mouseHold.left;
    }
  },
  keyHold: false
};
module.exports = game;
