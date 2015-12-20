
function flatten() {
  return this.reduce((p, c) => Array.prototype.concat.apply(p, [c]), []);
}

function toObject(key, value) {
  const res = {};
  this.forEach(x => res[key(x)] = value(x));
  return res;
}

function unique() {
  const obj = toObject.call(this, k=>k, v=>0);
  return Object.keys(obj);
}

function min(comp) {
  const first = this[0];
  var lowest = first;

  this.forEach(x => lowest = (comp(x)<comp(lowest))?x:lowest);
  return lowest;
}

function max(comp) {
  const first = this[0]
  var lowest = first;

  this.forEach(x => lowest = (comp(x)>comp(lowest))?x:lowest);
  return lowest;
}

function sum(field) {
  if(field === undefined) field = x => x;
  return this.reduce((p,c)=>p+field(c), 0);
}

function product(field) {
  if(field === undefined) field = x => x;
  return this.reduce((p,c)=>p*field(c), 1);
}

function count(field) {
  if(field === undefined) field = x => x;
  return this.filter(field).length;
}


function useFlatten() {
  Array.prototype.flatten = flatten;
}

function useToObject() {
  Array.prototype.toObject = toObject;
}

function useUnique() {
  Array.prototype.unique = unique;
}

function useMin() {
  Array.prototype.min = min;
}

function useMax() {
  Array.prototype.max = max;
}

function useSum() {
  Array.prototype.sum = sum;
}

function useProduct() {
  Array.prototype.product = product;
}

function useCount() {
  Array.prototype.count = count;
}

module.exports = {
  useFlatten: useFlatten,
  useToObject: useToObject,
  useUnique: useUnique,
  useMin: useMin,
  useMax: useMax,
  useSum: useSum,
  useProduct: useProduct,
  useCount: useCount
}
