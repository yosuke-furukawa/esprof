var util = require('util');
var Prof = require('../prof');

/*
 * RequestProf constructor
 * This constructor has an argument for XHR.
 * new RequestProf({host: 'localhost', port: 3000});
 */
var RequestProf = function(opts){
  this.opts = opts;
};
util.inherits(RequestProf, Prof);

RequestProf.prototype.startProgram = function() {
  var xhrrequest = "\
    window.EsprofXHR = new XMLHttpRequest(" + JSON.stringify(this.opts) + "); \
  ";
  return xhrrequest;
};

RequestProf.prototype.start = function() {
  var url = '/esprofile_start?name=${name}';
  var start = "\
    EsprofXHR.open('GET', " + url + ");\
  ";
  return start;
};

RequestProf.prototype.end = function() {
  var url = '/esprofile_end?name=${name}';
  var end = "\
    EsprofXHR.open('GET', " + url + ");\
  ";
  return end;
};

module.exports = RequestProf;

