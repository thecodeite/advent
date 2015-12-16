const PermutationEngine = require('permutation-engine');

const readLineData = require('../dataReader').readLineData;
const rawData = readLineData();

Array.prototype.flatten = function() {
  return this.reduce((p, c) => Array.prototype.concat.apply(p, [c]), []);
}

Array.prototype.toObject = function(key, value) {
  const res = {};
  this.forEach(x => res[key(x)] = value(x));
  return res;
}

Array.prototype.unique = function() {
  const obj = this.toObject(k=>k, v=>0);
  return Object.keys(obj);
}

Array.prototype.min = function(comp) {
  const first = this.shift();
  var lowest = first;

  this.forEach(x => lowest = (comp(x)<comp(lowest))?x:lowest);
  return lowest;
}

Array.prototype.max = function(comp) {
  const first = this.shift();
  var lowest = first;

  this.forEach(x => lowest = (comp(x)>comp(lowest))?x:lowest);
  return lowest;
}

const dataSample = [
  'Alice would gain 54 happiness units by sitting next to Bob.',
  'Alice would lose 79 happiness units by sitting next to Carol.',
  'Alice would lose 2 happiness units by sitting next to David.',
  'Bob would gain 83 happiness units by sitting next to Alice.',
  'Bob would lose 7 happiness units by sitting next to Carol.',
  'Bob would lose 63 happiness units by sitting next to David.',
  'Carol would lose 62 happiness units by sitting next to Alice.',
  'Carol would gain 60 happiness units by sitting next to Bob.',
  'Carol would gain 55 happiness units by sitting next to David.',
  'David would gain 46 happiness units by sitting next to Alice.',
  'David would lose 7 happiness units by sitting next to Bob.',
  'David would gain 41 happiness units by sitting next to Carol.'
];

const lineMatcher = /^(\w)\w+ would (\w+) (\d+) happiness units by sitting next to (\w)\w+.$/;
const data = rawData;
//const data = dataSample;

const parsedData = data.map(parseLine);

//const distances = parsedData.map(x=> {
//    const left = `${x[0]}-${x[1]}`;
//    const right = `${x[1]}-${x[0]}`;
//    return [[left, ~~x[2]], [right, ~~x[2]]];
//  })
//  .flatten()
//  .toObject(k=>k[0], v=>v[1]);

const people = parsedData
  .map(x=>x.a)
  .unique();
  
people.push('Z');

people.forEach(p => {
  parsedData.push({
    a: 'Z',
    b: p,
    ab: 'Z'+p,
    h: 0
  });
  parsedData.push({
    a: p,
    b: 'Z',
    ab: p+'Z',
    h: 0
  });
});

const combinations = parsedData.toObject(key=>key.ab, val=>val.h);


console.log(people);
//console.log(combinations);

var engine = new PermutationEngine(people.length-1);

var perm = engine.initialPerm();
var allCombinations = [];
do {
  
  var table = perm.map(x=>people[x]);
  table.unshift(people[0]);

  allCombinations.push({table: table, happiness: tableHapiness(table)});

  perm = engine.nextPerm(perm);
} while(perm);

//console.log(allCombinations);
//console.log(allCombinations.max(x=>x.happiness));
tableHapiness(allCombinations.max(x=>x.happiness).table, true);

function tableHapiness(table, debug) {
  var hapiness = 0;
  if(debug) console.log('table:', table);

  for(var i=0; i<table.length; i++) {
    var next = (i+1)%table.length;
    var left = table[i]+table[next];
    var right = table[next]+table[i];
    var lhappy = combinations[left];
    var rhappy = combinations[right];
    hapiness += lhappy + rhappy;
    
    if(debug) {
      console.log('left:', left, 'right:', right);
      console.log('lhappy:', lhappy, 'rhappy:', rhappy);
      console.log('hapiness:', hapiness, '\n');
    }
    
  }
  return hapiness;
}

function parseLine(line) {
  const matches = lineMatcher.exec(line);
  //console.log(line, matches);

  var val;
  if(matches[2] === 'gain') {
    val = ~~matches[3];
  } else if(matches[2] === 'lose') {
    val = -~~matches[3];
  } else {
    throw new Error('Eh? '+matches[2])
  }

  return {
    a: matches[1],
    b: matches[4],
    ab: matches[1]+matches[4],
    h: val
  };
}
