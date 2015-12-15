const readData = require('../dataReader').readData;
const data = readData();

//const data = '[1,2,3]';
//const data = '{"a":2,"b":4}';
//const data = '[[[3]]]'
//const data = '{"a":{"b":4},"c":-1}';
//const data = '{"a":[-1,1]}';
//const data = '[-1,{"a":1}]';
//const data = '[]';
//const data = '{}';

walk(data);

function walk(json) {
  const arr = json.split('');

  var pos=0, sum=0, num='';
  while(pos<arr.length) {

    while(pos<arr.length && !isNumber(arr[pos])) pos++;
    if(pos<arr.length) {
      num = ''+arr[pos++];
      while(pos<arr.length && isNumber(arr[pos])) {
        num += arr[pos];
        pos++;
      }
      console.log('num:', num);
      sum += (~~num);

    }
  }

  console.log('sum:', sum);
}

function isNumber(char) {
  return char === '0' ||
    char === '1' ||
    char === '2' ||
    char === '3' ||
    char === '4' ||
    char === '5' ||
    char === '6' ||
    char === '7' ||
    char === '8' ||
    char === '9' ||
    char === '-';
}
