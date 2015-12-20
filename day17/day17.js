const nChose = require('../permutations').nChose;
const arrayExtensions = require('../arrayExtensions');

arrayExtensions.useSum();

//const data = [20, 15, 10, 5, 5]
//const target = 25;

const data = [
  43,
  3,
  4,
  10,
  21,
  44,
  4,
  6,
  47,
  41,
  34,
  17,
  17,
  44,
  36,
  31,
  46,
  9,
  27,
  38
]
const target = 150;


const sortedData = data.sort((a,b) => a>b);
var combinationCount = 0;

nChose(sortedData, arr => {
  if(arr.sum() === target) {
    console.log(arr);
    combinationCount++;
  }
})

console.log('combinationCount:', combinationCount)

