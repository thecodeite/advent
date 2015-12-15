const fs = require('fs');

const data = fs.readFileSync('day2.data').toString().split("\n");

var totals = data.map(calcSpace);

var total = 0, rt = 0;

for(var i=0; i< totals.length; i++) {
  total += totals[i].total;
  rt += totals[i].ribbon;

  console.log(`${i} ${totals[i].in+' '+totals[i].total} ${total} Ribbon: ${totals[i].ribbon} Rt: ${rt}`); 
}

//console.log(totals.reduce((p, c) => p+c, 0));


function calcSpace(dim) {
  var numbers = dim.split('x').map(x=>~~x);

  const [w, h, l] = numbers;
  const faces = [w*h, h*l, l*w]

  const ribbon = (((w+h+l) - Math.max.apply(null, numbers))*2) + (w*h*l)


  const total = (faces[0]+faces[1]+faces[2]) * 2 + Math.min.apply(null, faces);

  return {in: dim, total: total, ribbon: ribbon}
}
