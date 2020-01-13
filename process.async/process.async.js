const memoryjs = require('memoryjs');
const { game } = require('../game/index');

/**
 * @function process
 * @param {string} processName - a lowered-cased string with file extention {.exe|.dll ... etc}
 * @returns {undefined} - result from the callback function
 * @example process('process.exe');
 * @summary a function that ueses async function that searches for the processes and opens it for changes
 * @description this function changes the gameState depending on the state of the process
 */
function processOpen(processName) {
  memoryjs.getProcesses((err, prcs) => {
    if (err) {
      console.log('failed to get Process list');
    } else {
      const gamePrcs = prcs.filter(p => p.szExeFile.toLowerCase() === processName);
      if (gamePrcs.length === 0 || gamePrcs[0].th32ProcessID === undefined) {
        console.log('cannot find given Process');
      } else {
        memoryjs.openProcess(gamePrcs[0].th32ProcessID, (err, obj) => {
          if (err) {
            console.log('Cannot Open Process');
          } else {
            console.log(obj);
            game.handle = obj.handle;
          }
        });
      }
    }
  });
}

module.exports = { processOpen };
