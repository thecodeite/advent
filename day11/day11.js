const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

//var password = 'vzbxkghb';
var password = nextPassword('vzbxxyzz');
while(!isValid(password)) {

  password = nextPassword(password);
  console.log(password, isValid(password),
    noIol(password),
    hasStraight(password),
    hasTwoPairs(password));
}

function nextPassword(current) {
  const arr = current.split('').reverse();

  var pos = 0;
  do {
    arr[pos] = nextLetter(arr[pos]);
  } while(arr[pos++] === 'a');

  return arr.reverse().join('');
}

function nextLetter(letter) {
  return alphabet[(alphabet.indexOf(letter) + 1) % 26];
}

function isValid(password) {
  return noIol(password)
    && hasStraight(password)
    && hasTwoPairs(password);
}

function hasTwoPairs(password) {
  var firstPair = '';
  var pos = 0;
  const arr = password.split('');

  do {
    if(firstPair === '') {
      if(arr[pos] === arr[pos+1]) {
        firstPair = arr[pos];
      }
    } else {
      if(arr[pos] !== firstPair && arr[pos] === arr[pos+1]) {
        return true;
      }
    }

    pos++;
  } while(pos < arr.length-1);

  return false;
}

function hasStraight(password) {
  const arr = password.split('').map(x=>alphabet.indexOf(x));
  var pos = 0;

  do {
    if(arr[pos] <= 23
      && arr[pos] === arr[pos+1]-1
      && arr[pos+1] === arr[pos+2]-1) return true;

    pos++;
  } while(pos < arr.length-2);
  return false;
}

function noIol(password) {
  return password.indexOf('i') === -1 &&
    password.indexOf('o') === -1 &&
    password.indexOf('l') === -1;
}
