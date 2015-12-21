const arrayExtensions = require('../arrayExtensions');
arrayExtensions.useSum()

var presents = 0;
var houseNum = 0;
const elves = new Map();
do{
  houseNum++;
  var factors = calcFactors(houseNum);
  
  factors.forEach(f => elves[f] = elves[f]?elves[f]+1:1)
  factors = factors.filter(f => elves[f] <= 50)
  
  presents = factors.sum()*11;
  
  if(houseNum % 10000 === 0) {
    console.log('House', houseNum, presents)
    //console.log('Factors', factors)
  }
} while(presents < 29000000)
console.log('House', houseNum, presents)
console.log('Factors', factors)
//console.log('elves', elves)

/// House 4324320 32136335
// 718200 too hight
function calcFactors(num) {
  const sqr = Math.ceil(Math.sqrt(num));
  const res = new Set();
  for(var i=1; i<=sqr; i++) {
    if(num % i == 0) {
      res.add(i);
      res.add(num/i);
     }
  }
  
  const arr = Array.from(res.keys())
  arr.sort();
  return arr;
}