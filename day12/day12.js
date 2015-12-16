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

//const data = '-0.5e+56';
//const data = '[1, 2, 3]';
//const data = '{a:1, b:2, c:[3,4,5]}';
//const data = '[1,{"c":"red","b":2},3]';
//const data = '{"d":"red","e":[1,2,3,4],"f":5}';
//const data = '[1,"red",5]';

const stream = {
  arr: data.split(''),
  pos: 0,
  get peek() {
    //console.log('data, stream.pos, data[stream.pos]', stream.arr, stream.pos, stream.arr[stream.pos]);
    return stream.arr[stream.pos];
  },
  read: predicate=>{
    //console.log('stream.read:', predicate);
    const expected = predicate;
    const value = stream.arr[stream.pos++];
    if(predicate && typeof predicate != 'function')
      predicate = (x => x === expected);
    //console.log('value:', value, 'expected:', expected, 'predicate:', predicate, predicate?predicate(value):'n');
    if(predicate && !predicate(value))
      throw new Error('Did not expect:'+stream.peek);
    return value;
  },
  assert: predicate=>{
    if(!predicate(stream.peek)) throw new Error('Did not expect:'+stream.peek);
  },
  skipWhite() {
    while(isWhitespace(stream.peek)) {
      //console.log(`skipWhite: "${stream.peek}" 0x${stream.peek.charCodeAt(0).toString(16)}`);
      stream.read();
    }
  },
  sum:0,
  inRed: false
};

const res = readValue(stream);
console.log('res:', res);

function readValue(stream) {
  const peek = stream.peek;

  stream.skipWhite();

  if(peek === '{') {
    return readObject(stream);
  } else if(peek === '[') {
    return readArray(stream);
  } else if(isDigit(peek) || peek === '-') {
    return readNumber(stream);
  } else if(peek === '"' || peek === "'") {
    return readString(stream);
  } else {
    throw new Error('What to do with a '+stream.peek);
  }
}

function readArray(stream) {
  //console.log('readArray');
  stream.read('[');
  stream.skipWhite();
  var sum = 0;
  
  while(stream.peek != ']') {
    var value = readValue(stream);
    
    if(typeof value === 'number') {
      sum += value;
    }
    
    stream.skipWhite();
    
    if(stream.peek !== ']'){
      stream.read(',');
      stream.skipWhite();
      stream.assert(x => x !== ']');
    }
    
    stream.skipWhite();
  }

  stream.read(']');
  stream.skipWhite();
  
  return sum;
}

function readObject(stream) {
  //console.log('readObject');
  stream.read('{');
  stream.skipWhite();
  var sum = 0;
  
  while(stream.peek != '}') {
    var key = readKey(stream);
    stream.skipWhite();
    stream.read(':');
    
    var value = readValue(stream);
    
    if(typeof value === 'number') {
      sum += value;
    } else if(value === 'red') {
      sum = NaN;
    }
    
    stream.skipWhite();
    
    if(stream.peek !== '}'){
      stream.read(',');
      stream.skipWhite();
      stream.assert(x => x !== '}');
    }
    
    stream.skipWhite();
  }

  stream.read('}');
  stream.skipWhite();
  
  if(isNaN(sum))
    return 0;
  
  return sum;
}

function readKey(stream) {
  if(stream.peek === '"' || stream.peek === "'") {
    return readString(stream);
  } else {
    return readIdentifier(stream);
  }
}

function readString(stream) {
  var quot = stream.read();
  var value = '';
  
  while(stream.peek !== quot) {
    value += stream.read();
  }
  
  stream.read(quot);
  stream.skipWhite();
  return value;
}

function readIdentifier(stream) {
 
  var value = '';
  
  while(isIdentifier(stream.peek)) {
    value += stream.read();
  }
  
  stream.skipWhite();
  console.log('readIdentifier:', value);
  return value;
}

function readNumber(stream) {
  //console.log('readNumber');
  var num = '';
  if(stream.peek === '-') {
    num += stream.read();
  }
  
  if(stream.peek === '0') {
    num += stream.read();
  } else {
    while(isDigit(stream.peek)) {
      num += stream.read();
    }
  }
  
  if(stream.peek === '.') {
    num += stream.read();
    
    stream.assert(isDigit);
    
    while(isDigit(stream.peek)) {
      num += stream.read();
    }
  }
  
  if(stream.peek === 'e' || stream.peek === 'E') {
    num += stream.read();
    
    if(stream.peek === '-' || stream.peek === '+') {
      num += stream.read();
    }
    
    stream.assert(isDigit);
    
    while(isDigit(stream.peek)) {
      num += stream.read();
    }
  }
  
  return ~~num;
}

function isIdentifier(char) {
  return /^[a-zA-Z0-9\-\$]$/.test(char);
}

function isWhitespace(char) {
  return char === ' ' ||
  char === '\r' ||
  char === '\n' ||
  char === '\t';
}

function isDigit(char) {
  return char === '0' ||
    char === '1' ||
    char === '2' ||
    char === '3' ||
    char === '4' ||
    char === '5' ||
    char === '6' ||
    char === '7' ||
    char === '8' ||
    char === '9' 
}

