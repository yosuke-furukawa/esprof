var Traverse = require("../lib/traverse");
var esprima = require("esprima");
var escodegen = require('escodegen');

var assert = require("power-assert");
describe('Traverse', function(){
  describe('#replace()', function(){
    it('insert function', function(){
      var src = " function abc() { var test = function(){console.log('hello');}; test();} abc();";
      var expected = " function abc() { console.time('abc'); var test = function(){console.time('test'); console.log('hello'); console.timeEnd('test');}; test(); console.timeEnd('abc');} abc();";

      expected = escodegen.generate(esprima.parse(expected));
      var ast = esprima.parse(src);
      var enter = "console.time('${name}');";
      var leave = "console.timeEnd('${name}');";
      var traverse = new Traverse(ast);
      var traversedAst = traverse.replace(enter, leave);
      var code = escodegen.generate(traversedAst);
      assert(expected == code);
    });
  });
});

describe('Traverse', function(){
  describe('#replace()', function(){
    it('immediate function', function(){
      var src = "(function() { var test = function(){console.log('hello');}; test();}());";
      var expected = "(function() { console.time('no name function'); var test = function(){console.time('test'); console.log('hello'); console.timeEnd('test');}; test(); console.timeEnd('no name function');}());";

      expected = escodegen.generate(esprima.parse(expected));
      var ast = esprima.parse(src);
      var enter = "console.time('${name}');";
      var leave = "console.timeEnd('${name}');";
      var traverse = new Traverse(ast);
      var traversedAst = traverse.replace(enter, leave);
      var code = escodegen.generate(traversedAst);
      assert(expected == code);
    });
  });
});
