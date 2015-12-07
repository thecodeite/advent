const readLineData = require('../dataReader').readLineData;
const data = readLineData();
//console.log(data);

const size = 1000;
const grid = new Array(size*size);
for(var i=0; i<size*size; i++) grid[i] = false;

const instructions = data
  .map(parseRow);
  //.map(x => ({x: x, t: x.do(true), f: x.do(false)}));

//console.log(instructions);

//render(grid);

instructions.forEach(applyInst);
//applyInst(instructions[0]);
//console.log('apply');

render(grid);

console.log(grid.filter(x => x).length);

function applyInst(inst) {
  //console.log(inst.from.x, inst.from.y, '->', inst.to.x, inst.to.y);
  for(var y = inst.from.y; y <= inst.to.y; y++) {
    for(var x = inst.from.x; x <= inst.to.x; x++) {
      var pos = x + (y*size);
      grid[pos] = inst.do(grid[pos]);
    }
  }
}

function render(grid) {
  for(var y = 0; y <= size; y++) {
    var row = grid.slice(y*size, (y+1)*size);
    console.log(row.map(b=>b?'o':'.').join(''));
  }
}

function parseRow(row) {
  const action = {};
  if(row.startsWith('turn off ')) {
    action.do = _ => false;
    row = row.substr('turn off '.length);
  } else if(row.startsWith('turn on ')) {
    action.do = _ => true;
    row = row.substr('turn on '.length);
  } else if(row.startsWith('toggle ')) {
    action.do = x => !x;
    row = row.substr('toggle '.length);
  }

  const bits = row.split(' through ');
  action.from = parseCord(bits[0]);
  action.to = parseCord(bits[1]);

  return action;
}

function parseCord(cord) {
  return {
    x: ~~(cord.split(',')[0]),
    y: ~~(cord.split(',')[1])
  };
}
