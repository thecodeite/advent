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

var target = input;
var comp = (a, b) => (a[1].length - a[0].length) < (b[1].length - b[0].length);

parsedData.forEach(x => x[2] = x[1].length - x[0].length);

var reductions = parsedData.slice().sort((a, b) => b[2] - a[2])

//console.log(reductions)
var count = 0;
while(target != 'e') {
  var sub = reductions.find(r => target.indexOf(r[1]) !== -1)
  
 
  
  target = target.replace(sub[1], sub[0]);
   console.log(sub, target.length);
  
  
  count++;
}

console.log('Results:', results.size)
console.log('count:', count)


function parseLine(line) {
  return line.split(' => ');
}