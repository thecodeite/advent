const readLineData = require('../dataReader').readLineData;
const rawData = readLineData();

const dataSample = [
  '""',
  '"abc"',
  '"aaa\\"aaa"',
  '"\\x27"',
];

const data = rawData;

Array.prototype.sum = function () {
  return this.reduce((p,c) => p+c, 0);
}

String.prototype.count = function(str) {
  var count = 0;
  for(var i=0; i<this.length; i++) {
    if(str===this[i]) count++;
  }
  return count;
}

const rawLength = data.map(x => x.length).sum();
console.log('data:', data);
console.log('rawLength:', rawLength);

const cleaned = data
  .map(x => x.substring(1, x.length - 1))
  .map(x => x.replace(/\\x[0-9a-fA-F]{2}|\\"|\\\\/g, '@'));
//console.log(unwrapped);


const cleanedLength = cleaned.map(x => x.length).sum();
console.log('cleanedLength:', cleanedLength);

data.forEach(x=>{
  console.log(x.length, x);
});

const escaped = data
  .map(x => x.replace(/\\/g, '\\\\'))
  .map(x => x.replace(/"/g, '\\"'))
  .map(x => '"'+x+'"');

console.log(escaped);
escaped.forEach(x=>{
  console.log(x.length, x);
});

const escapedLength = escaped.map(x => x.length).sum();
console.log('escapedLength:', escapedLength);

console.log('rawLength - cleanedLength:', rawLength - cleanedLength);
console.log('escapedLength - rawLength:', escapedLength - rawLength);
