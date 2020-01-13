const robot = require('robotjs');

robot.setKeyboardDelay(100);
robot.setMouseDelay(15);

/**
 * @function toggleMouse
 * @param {boolean} condition Evaluate if should press the key or not
 * @param {string} key Key to press
 * @description 'https://robotjs.io/docs/syntax' for list of keys
 */
function toggleMouse(condition, key) {
  if (condition) {
    robot.mouseToggle('down', key);
    robot.mouseToggle('up', key);
  }
}

/**
 * @function toggleKey
 * @param {boolean} condition Evaluate if should press the key or not
 * @param {string} key Key to press
 * @description 'https://robotjs.io/docs/syntax' for list of keys
 */
function toggleKey(condition, key) {
  if (condition) {
    robot.keyToggle(key, 'down');
    robot.keyToggle(key, 'up');
  }
}
module.exports = { toggleMouse, toggleKey };
