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
  'London to Dublin = 464',
  'London to Belfast = 518',
  'Dublin to Belfast = 141'
];

const lineMatcher = /^(\w+) to (\w+) = (\d+)$/;
const data = rawData;
//const data = dataSample;

const parsedData = data.map(parseLine);

const distances = parsedData.map(x=> {
    const left = `${x[0]}-${x[1]}`;
    const right = `${x[1]}-${x[0]}`;
    return [[left, ~~x[2]], [right, ~~x[2]]];
  })
  .flatten()
  .toObject(k=>k[0], v=>v[1]);

const locations = parsedData
  .map(x=>[x[0], x[1]])
  .flatten()
  .unique();

console.log(distances);
console.log(locations);

var engine = new PermutationEngine(locations.length);

var perm = engine.initialPerm();
var allRoutes = [];
do {
  var route = perm.map(x=>locations[x-1]);
  allRoutes.push({route: route, len: routeLength(route)});

  perm = engine.nextPerm(perm);
} while(perm);

//console.log(allRoutes);
console.log('min', allRoutes.min(x=>x.len));
console.log('max', allRoutes.max(x=>x.len));

function routeLength(route) {
  var curr = null;
  return route.reduce((p, c) => {
    if(!curr) { curr = c; return 0;}
    var dist = distances[curr+'-'+c];
    curr = c;
    return p + dist;
  }, 0);
}

function parseLine(line) {
  const matches = lineMatcher.exec(line);

  matches.shift();
  delete matches.index;
  delete matches.index;
  return matches;
}
