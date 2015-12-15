const readLineData = require('../dataReader').readLineData;

const data = readLineData();
//const data = ['aaaa', 'aabaa', 'abddab', 'abcdedfgh', 'abcdefgcdhi'];
//const badness = ['ab', 'cd', 'pq', 'xy'];


var res = data.map(x => ({
  data: x,
  hasDuplicatePair: hasDuplicatePair(x),
  hasSplitPair: hasSplitPair(x),
  //hasThreeVowles: hasThreeVowles(x),
  //hasDuplicate: hasDuplicate(x),
  //hasNoBadness: hasNoBadness(x)
}));
console.log(res);

var niceData = data.map(isNice).reduce((p, c) => p+c, 0);
console.log('niceData:', niceData);

function isNice(str) {
  return (hasDuplicatePair(str) && hasSplitPair(str)) ? 1 : 0;
}

function hasSplitPair(str) {
  var last = str[0];
console.log('hasSplitPair(str)', str);
  for(var i=2; i<str.length; i++){
    if(last == str[i]) {
      console.log('split:', str.substr(i-2, 3));
      return true;
    }
    last = str[i-1];
  }

  return false;
}

function hasDuplicatePair(str) {


  for(var pos=0; pos < str.length-1; pos++) {
    var pair = str.substr(pos, 2);
    if(str.indexOf(pair, pos+2) !== -1) {
      console.log('pair:', pair);
      return true;
    }
  }
  return false;
}

function findDuplicate(str, pos) {
  var last = str[pos];
  for(var i=pos; i<str.length; i++) {
    if(last == str[i+1]) return i;
    last = str[i+1];
  }

  return -1;
}

function isNiceOld(str) {
  return (hasNoBadness(str) && hasDuplicate(str) && hasThreeVowles(str)) ? 1 : 0;
}

function hasNoBadness(str) {
  for(var i=0; i<badness.length; i++) {
    if(str.indexOf(badness[i]) !== -1) return false;
  }
  return true;
}

function hasDuplicate(str) {
  var last = str[0];
  for(var i=1; i<str.length; i++) {
    if(last == str[i]) return true;
    last = str[i];
  }

  return false;
}

function hasThreeVowles(str) {
  var score =
    count(str, 'a') +
    count(str, 'e') +
    count(str, 'i') +
    count(str, 'o') +
    count(str, 'u');

  return score >= 3;
}

function count(target, match) {
  var start = 0;
  var count = 0;
  do {
    var found = target.indexOf(match, start);
    if(found !== -1) {
      count++;
      start = found+1;
    }
  } while(found !== -1);

  return count;
}
