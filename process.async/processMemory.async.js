const memoryjs = require('memoryjs');
const concentrate = require('concentrate'); // for creatting a buffer please refer to 'npm concentrate'

/**
 * @function setAddress
 * @param {number} handle - a process handle number from opened process
 * @param {number} staticAddr  - 32 bit number that specifies an address in the given process handle that doesnt change over time
 * @param {string} dataType - memory.js data type
 * @param {any} [valueToSet] depending on the datatype the value will be set on the address if "pass" then u will read the address value
 * @returns {number|string}
 * @summary read / write to single address that does not change in a process using the data type
 */
function setAddress(handle, staticAddr, dataType, valueToSet = 'pass') {
  const value = memoryjs.readMemory(handle, staticAddr, dataType);
  if (valueToSet === 'pass') {
    return value;
  } else {
    return memoryjs.writeMemory(handle, staticAddr, valueToSet, dataType);
  }
}

/**
 * @function setOffsetPtrAddr
 * @param {number} handle - a process handle number from opened process
 * @param {number} offsetArray  - 32 bit number array that specifies a static address in the [0] position and the rest are offset values Note: order matters
 * @param {string} dataType - memory.js data type
 * @param {any} [valueToSet] depending on the datatype the value will be set on the address if "pass" then u will read the address value
 * @return {any} last value changed or the Pointer value
 * @summary loops through pointer offset to find the last value and edit it or return it if valueToSet is "pass"
 * @description this function uses nested async callbacks and closures to save the CPU time there is a potential that you may run into max stack frames
 * however if your pointer is getting more that 10 offsets you might concider finding another way
 */
function setOffsetPtrAddr(handle, offsetArray, dataType, valueToSet = 'pass') {
  if (!handle) {
    return undefined;
  }
  let value = null;
  const getPtr = (handle, address, acc = 1) => {
    if (acc >= offsetArray.length - 1) {
      if (address === undefined) {
        console.log('cannot write to procees cause Address is undefined');
      } else {
        if (valueToSet !== 'pass') {
          memoryjs.writeMemory(handle, address + offsetArray[acc], valueToSet, dataType);
        }
        value = memoryjs.readMemory(handle, address + offsetArray[acc], dataType);
      }
    } else {
      memoryjs.readMemory(handle, address + offsetArray[acc], memoryjs.INT32, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          getPtr(handle, data, acc + 1);
          // console.log(address.toString(16), '+', offsetArray[acc].toString(16), '=>', data.toString(16));
        }
      });
    }
  };
  getPtr(handle, memoryjs.readMemory(handle, offsetArray[0], memoryjs.INT32), 1);
  return value;
}

/**
 * @function setBuffer
 * @param {number} handle - a process handle number from opened process
 * @param {number} baseAddress  - 32 bit number that specifies a static address
 * @param {number} size - size of the base code assymbly
 * @param {string} asciiCodeHex astring of hex ascii code
 * @return {undefined}
 * @summary replace the program code to a another code of your choice if its able to read the address
 * @example
 * setBuffer(0x2fc,0x001732DF,5,'\x90\x90\x90\x90\x90');
 */
function setBuffer(handle, baseAddress, size, asciiCodeHex) {
  const c = concentrate();
  memoryjs.readBuffer(handle, baseAddress, size, (err, buffer) => {
    if (err) return;
    c.string(asciiCodeHex, 'ascii').result();
    memoryjs.writeBuffer(handle, baseAddress, c.result());
  });
}

module.exports = { setAddress, setOffsetPtrAddr, setBuffer };
