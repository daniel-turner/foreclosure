var vm = require('vm');
var fs = require('fs');
require('chai').should();

var foreclosure = fs.readFileSync(process.cwd() + '/foreclosure.js', { encoding : 'UTF-8' });
vm.runInThisContext(foreclosure); // file runs and it's contents has access to GLOBAL

describe('foreclosure', function() {

  it('should use strict mode', function() {
    foreclosure.search('\'use strict\';').should.be.above(-1);
  });

  it('should declare a variable named `steve`', function() {
    foreclosure.search('var steve;').should.be.above(-1);
  });

  it('should declare a variable named `stevesLoan`', function() {
    foreclosure.search('var stevesLoan;').should.be.above(-1);
  });

  it('should declare a variable named `month`', function() {
    foreclosure.search('var month = 0;').should.be.above(-1);
  });

  it('should declare a variable named `monthsUntilEvicted`', function() {
    foreclosure.search('var monthsUntilEvicted;').should.be.above(-1);
  });

});