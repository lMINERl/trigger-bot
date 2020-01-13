const { eventEmitter } = require('./custom');
require('./iohooks');
const custom = require('../handlers');

module.exports = { eventEmitter, custom };
