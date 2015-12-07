const fs = require('fs');

const data = fs.readFileSync('day3.data').toString().split('');
//const data = ['>','v','<','^']
const visits = {};

const santa = {x:0, y:0, name: 'Santa'};
const robo = {x:0, y:0, name: 'Robo'};
var active = santa;

var happyKids = 1;
visits[active.x+','+active.y] = true;

data.forEach(d => {

  switch(d) {
    case '>': active.x++; break;
    case '<': active.x--; break;
    case '^': active.y++; break;
    case 'v': active.y--; break;
  }

  if(!visits[active.x+','+active.y]) happyKids++
  visits[active.x+','+active.y] = true;

  console.log(`Did: ${d} Active: ${active.name} At: ${active.x},${active.y} happyKids:${happyKids}`);

  if(active === santa) active = robo;
  else active = santa;
});
