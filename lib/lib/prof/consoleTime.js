var util = require('util');
var Prof = require('../prof');

var ConsoleTimeProf = function(){};
util.inherits(ConsoleTimeProf, Prof);

ConsoleTimeProf.prototype.start = function() {
  return "console.time('${name}')";
};

ConsoleTimeProf.prototype.end = function() {
  return "console.timeEnd('${name}')";
};

module.exports = ConsoleTimeProf;
