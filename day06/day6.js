const readLineData = require('../dataReader').readLineData;
const data = readLineData();
//console.log(data);

const zoom = 1;

const size = 1000/zoom;
const grid = new Array(size*size);
for(var i=0; i<size*size; i++) grid[i] = 0;

const instructions = data
  .map(parseRow);
  //.map(x => ({x: x, t: x.do(true), f: x.do(false)}));

//console.log(instructions);

//render(grid);

instructions.forEach(applyInst);
//applyInst(instructions[0]);
//console.log('apply');

render(grid);

console.log(grid.reduce((p,c) => p+c, 0));

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
  console.log(`<style>
    p, b {border: 0; margin: 0; display: block; width: 1px; height: 1px; }
    `);
    for(var i=0; i<256; i+=4) {
      console.log(`.b${i/4} {background-color: rgb(${i},${256-i},0)}`);
    }
    console.log(`div { display: flex; }
  </style><p>`)
  for(var y = 0; y <= size; y++) {
    var row = grid.slice(y*size, (y+1)*size);
    console.log('<div>'+row.map(b=>'<p class="b'+b+'"></p>').join('')+'</div>\n');
  }
  console.log('</p>');
}

function parseRow(row) {
  const action = {};
  if(row.startsWith('turn off ')) {
    action.do = x => x === 0?0:x-1;
    row = row.substr('turn off '.length);
  } else if(row.startsWith('turn on ')) {
    action.do = x => x+1;
    row = row.substr('turn on '.length);
  } else if(row.startsWith('toggle ')) {
    action.do = x => x+2;
    row = row.substr('toggle '.length);
  }

  const bits = row.split(' through ');
  action.from = parseCord(bits[0]);
  action.to = parseCord(bits[1]);

  return action;
}

function parseCord(cord) {
  return {
    x: ~~(cord.split(',')[0]/zoom),
    y: ~~(cord.split(',')[1]/zoom)
  };
}
