
var num = '1321131112'.split('');
for(var n=1; n<=50; n++) {
  var next = countNumbers(num);
  //console.log(num.join('') + ' -> ' + next.join(''));
  console.log(n+'] '+next.length);
  num = next;
}

function countNumbers(data) {
  var res = [];
  var pos = 0;
  var state = data[pos];
  var count = 1;

  while(pos <= data.length) {
    pos++;
    var next = data[pos];

    if(next === state) {
      count++;
    } else {
      res.push(count+'');
      res.push(state);
      state = next;
      count = 1;
    }
  }

  return res;
}
