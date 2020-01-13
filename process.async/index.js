const { processOpen } = require('./process.async');
const { setAddress, setOffsetPtrAddr, setBuffer } = require('./processMemory.async');

module.exports = { processOpen, setAddress, setOffsetPtrAddr, setBuffer };
