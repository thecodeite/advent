const readLineData = require('../dataReader').readLineData;
const data = readLineData();

//const data = [
//  'Sue 1: goldfish: 9, cars: 0, samoyeds: 9',
//  'Sue 2: perfumes: 5, trees: 8, goldfish: 8',
//  'Sue 3: pomeranians: 2, akitas: 1, trees: 5',
//  'Sue 4: goldfish: 10, akitas: 2, perfumes: 9'
//]

const mfcsamOutput = new Map([
  ['children', x => x === 3],
  ['cats', x => x > 7],
  ['samoyeds', x => x === 2],
  ['pomeranians', x => x < 3],
  ['akitas', x => x === 0],
  ['vizslas', x => x === 0],
  ['goldfish', x => x < 5],
  ['trees', x => x > 3],
  ['cars', x => x === 2],
  ['perfumes', x => x === 1]
])

const properties = Object.keys(mfcsamOutput);

const sues = data.map(parseLine);

const sue = sues.filter(s => {
  console.log(s.id)
  var isMatch = true;
  mfcsamOutput.forEach((v, k) => {
    var val = s.specs[k];
    var match = val === undefined || v(val)
    console.log(k, v, s, val, match);
    if(!match) {
      isMatch = false;
    }
  })
  
  return isMatch;
})
console.log('sue:', sue);

function parseLine(line) {
  const matcher = 
    /^Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)$/;
  
  const m = matcher.exec(line);
  
  return {
    id: m[1],
    specs: {
      [m[2]]: ~~m[3],
      [m[4]]: ~~m[5],
      [m[6]]: ~~m[7]
    }
  };
}