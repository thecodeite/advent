var md5 = require('md5');

var isMatch = false;
var data = 'ckczppom';
var test = 0;

do {
  test++;
  var input = data + test;
  var hash = md5(input);

  isMatch = hash.startsWith('000000');


} while (!isMatch);
console.log(input, '->', hash, isMatch);
