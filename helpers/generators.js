/**
 * @generator
 * @function write
 * @param {()=>boolean} condition - callback function will be put in a while( condition ) to check if its able to make next
 * @param {()=>any} callback
 * @yields {any} - result from the callback function
 * @example let result = write(true,()=>console.log('delayed'));
 * result.next(); // prints delayed
 * @summary a function generator that calles the {callback} on the given {condition} if true
 * @description this function is used for intensive looping on the callback on given condition like while(true)
 */
function* write(condition, callback) {
  while (condition()) {
    yield callback();
  }
}

module.exports = { write };
