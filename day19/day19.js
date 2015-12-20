const readLineData = require('../dataReader').readLineData;
const data = readLineData();


const arrayExtensions = require('../arrayExtensions');
arrayExtensions.useUnique()


//const data = [
//  'HO => X',
//  'H => OH',
//  'O => HH',
//  'HOH'
//]
//
const input = data.pop();


const parsedData = data.map(parseLine);

//console.log(parsedData);

var count = 0;
const results = new Set();
parsedData.forEach(t => {
  var pos;
  var len = t[0].length;
  //console.log('t:', t)
  do {
    pos = input.indexOf(t[0], pos);

    if(pos !== -1) {
      var left = input.substr(0, pos);
      var right = input.substr(pos+len);
      var res =  left+t[1]+right;
      var pre = results.size;
      results.add(res);
      
      
      pos += len;
    }
  } while(pos !== -1)
})

console.log('Results:', results.size)
//console.log('count:', count)


function parseLine(line) {
  return line.split(' => ');
}