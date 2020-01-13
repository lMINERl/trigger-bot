const events = require('events');

const eventEmitter = new events.EventEmitter();

eventEmitter.on('onActivate', callback => {
  callback();
});

module.exports = { eventEmitter };
