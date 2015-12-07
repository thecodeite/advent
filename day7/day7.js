const readLineData = require('../dataReader').readLineData;
const data = readLineData();

/*
const data = [
  '123 -> x',
  '456 -> y',
  'x AND y -> d',
  'x OR y -> e',
  'x LSHIFT 2 -> f',
  'y RSHIFT 2 -> g',
  'NOT x -> h',
  'NOT y -> i',
];
*/

/*
const data = [
  'b OR c -> a',
  '1 LSHIFT 5 -> b',
  '255 RSHIFT 5 -> c',
];
*/

const mask16Bit = (1 << 16)-1;
const wires = {};

data.forEach(row => {
  const parsed = parseRow(row);
  wires[parsed.variable] = parsed.operation;
});

wires['b'] = {
  left: 46065,
  action: 'v'
}

console.log('a='+resolve('a', []));

function resolve(wireName, state) {
  //console.log('Resolving', wireName, state);
  state.push(wireName);
  const wire = wires[wireName];
  if(wire === undefined) throw new Error('No wire '+wireName);

  var left, right;

  if(wire.left) {
    if(typeof(wire.left) === 'number') {
      left = wire.left;
    } else {
      if(state.indexOf(wire.left) !== -1) throw new Error(wire.left+' Loop: '+state);
      left = resolve(wire.left, state);
    }
  }

  if(wire.right) {
    if(typeof(wire.right) === 'number') {
      right = wire.right;
    } else {
      if(state.indexOf(wire.right) !== -1) throw new Error(wire.right+' Loop: '+state);
      right = resolve(wire.right, state);
    }
  }

  console.log('Resolving:', wireName, `left=${left} right=${right} action=${wire.action}`);
  var res = (() => {
    switch(wire.action) {
      case 'v': return left;
      case '~': return (~right) & mask16Bit;
      case '&': return left & right;
      case '|': return left | right;
      case '<<': return left << right;
      case '>>': return left >> right;
      default: throw new Error('Cant do action '+wire.action);
    }
  })();

  wires[wireName] = {
    left: res,
    action: 'v'
  }

  state.pop();
  return res;

}

function parseRow(row) {
  const bits = row.split(' -> ');
  const operation = bits[0];
  const variable = bits[1];

  var action, left, right;

  if(operation.indexOf(' AND ') !== -1) {
    left = operation.split(' AND ')[0];
    right = operation.split(' AND ')[1];
    action = '&';
  } else if(operation.indexOf(' OR ') !== -1) {
    left = operation.split(' OR ')[0];
    right = operation.split(' OR ')[1];
    action = '|';
  } else if(operation.indexOf(' LSHIFT ') !== -1) {
    left = operation.split(' LSHIFT ')[0];
    right = operation.split(' LSHIFT ')[1];
    action = '<<';
  } else if(operation.indexOf(' RSHIFT ') !== -1) {
    left = operation.split(' RSHIFT ')[0];
    right = operation.split(' RSHIFT ')[1];
    action = '>>';
  } else if(operation.indexOf('NOT ') !== -1) {
    right = operation.split('NOT ')[1];
    action = '~';
  } else {
    left = operation;
    action = 'v';
  }

  if((~~left) == left) left = ~~left;
  if((~~right) == right) right = ~~right;

  return {
    variable: variable,
    operation: {
      left: left,
      right: right,
      action: action
    }
  };

}
