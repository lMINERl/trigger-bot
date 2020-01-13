const { setOffsetPtrAddr, setAddress } = require('../process.async');

/**
 * @function changeHandleArray
 * @param {number} handle - handle window number
 * @param {string} dataType - memory.js data type
 * @param {number|string} valueToSet - depending on the datatype the value will be set on the address if "pass" then u will read the address value
 * @param {Array} offsetPtrArray -32 bit number array that specifies a static address in the [0] position and the rest are offset values Note: order matters
 * @param {(number)=>{}:void} [callback] - callback function takes value of the address and operate upon it Note: chaning last value wont do anything to process value
 * @param {()=>{}:boolean} [conditionLock] - check if the operation should proceede or not
 * @returns {void}
 * @example event.emit('onClipChange',()=>changehandleArray(
 *  game.handle,
 * memoryjs.INT32,
 * "pass",
 * game.clipOffsetPTR,
 * (value)=>{ console.log('do logic on', value) },
 * ()=> {
 *  if(game.isClipChange){ game.isClipChange=false; return true;} else return false
 * })
 */
function changeHandleArray(handle, dataType, valueToSet, offsetPtrArray, callback = lastValue => {}, conditionLock = () => true) {
  if (conditionLock()) {
    const lastValue = setOffsetPtrAddr(handle, offsetPtrArray, dataType, valueToSet);
    callback(lastValue);
    return lastValue;
  }
}

/**
 * @function changeHandleArray
 * @param {number} handle - handle window number
 * @param {string} dataType - memory.js data type
 * @param {number|string} valueToSet - depending on the datatype the value will be set on the address if "pass" then u will read the address value
 * @param {number} staticAddress -32 bit number  that specifies a static address
 * @param {(number)=>{}:void} [callback] - callback function takes value of the address and operate upon it Note: chaning last value wont do anything to process value
 * @param {()=>{}:boolean} [conditionLock] - check if the operation should proceede or not
 * @returns {void}
 * @example event.emit('onClipChange',()=>changehandleArray(
 *  game.handle,
 * memoryjs.INT32,
 * "pass",
 * 0x0014D182,
 * (value)=>{ console.log('do logic on', value) },
 * ()=> {
 *  if(game.isClipChange){ game.isClipChange=false; return true;} else return false
 * })
 */
function changeHandleAddress(handle, dataType, valueToSet, staticAddress, callback = lastValue => {}, conditionLock = () => true) {
  if (conditionLock()) {
    const lastValue = setAddress(handle, staticAddress, dataType, valueToSet);
    callback(lastValue);
    return lastValue;
  }
}

module.exports = { changeHandleArray, changeHandleAddress };
