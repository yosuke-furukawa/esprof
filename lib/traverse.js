var esprima = require('esprima');
var estraverse = require('estraverse');
var tmpl = require('lodash.template');

var Traverse = function(ast){
  this.ast = ast;
};

Traverse.prototype.replace = function(start, end){
  return estraverse.replace(this.ast, {
    enter: function (node, parent) {
      if (node.type == 'Identifier') { 
        this.name = node.name;
      } else if (node.type == 'FunctionExpression' || node.type == 'FunctionDeclaration') {
        var name = (node.id && node.id.name) || this.name || "no name function";
        var startSentence = tmpl(start, {name: name});
        var endSentence = tmpl(end, {name: name});
        var startAst = esprima.parse(startSentence);
        var endAst = esprima.parse(endSentence);
        var body = node.body.body;
        startAst.body.forEach(function(a){
          body.unshift(a);
        });
        endAst.body.forEach(function(a){
          body.push(a);
        });
        node.body.body = body;
        return node;
      } else {
        this.name = null;
      }
    }.bind(this),
  });
};

module.exports = Traverse;
