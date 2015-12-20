const readLineData = require('../dataReader').readLineData;
const data = readLineData();


const arrayExtensions = require('../arrayExtensions');

arrayExtensions.useCount();

//const data = [
//  '.#.#.#',
//  '...##.',
//  '#....#',
//  '..#...',
//  '#.#..#',
//  '####..'
//]

const dim = data.length;
const grid = data.join('').split('');
defect(grid, dim);

var current = grid;
var next = new Array(grid.length);

function tick(before, after, dim) {
  before.forEach((x, i) => {
    after[i] = live(before, dim, i)
  })
  defect(after, dim);
}

function defect(grid, dim) {
  grid[0] = '#';
  grid[dim-1] = '#';
  grid[dim*dim-dim] = '#';
  grid[dim*dim-1] = '#';
}

render(current, dim);
for(var i=0; i<100; i++) {
  tick(current, next, dim);
  render(next, dim);
  
  var a = next;
  var next = current;
  var current = a;
}


function live(grid, dim, pos) {
  
  const x = pos % dim;
  
  var tl=-1, l=-1, bl=-1;
  var tr=-1, r=-1, br=-1;
  var t, b
  
  if(x > 0) {
    tl = pos - dim - 1;
    l = pos - 1;
    bl = pos + dim - 1;
  }

  if(x < dim-1) {
    tr = pos - dim + 1;
    r = pos + 1;
    br = pos + dim + 1;
  }
  
  t = pos - dim;
  b = pos + dim;
    
  const neighburs = [tl, t, tr, l, r, bl, b, br];
  //console.log(x);
  //console.log(neighburs);
  
  const neighbursOn = neighburs
    .filter(x => x >= 0 && x < grid.length)
    .map(x => grid[x])
    .count(x => x==='#')
  
  //return (neighbursOn === 2 || neighbursOn === 3)?'#':'.';
  if(grid[pos] === '#') {
    if(neighbursOn === 2 || neighbursOn === 3) {
      return '#';
    }
    return '.'
  } else {
    if(neighbursOn === 3) {
      return '#';
    }
    return '.';
  }
}

function render(grid, dim) {
  process.stdout.write('\033[2J');
  process.stdout.write('\033[0f');
  
  for(y=0; y<dim; y++) {
    console.log(grid.slice(y*dim, y*dim + dim).join(''));
  }
  console.log(grid.count(x=>x==='#'))
}
