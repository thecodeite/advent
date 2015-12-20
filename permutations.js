
function generatePermutations(a, cb) {
  generateInner(a.slice(), a.length)

  function generateInner(a, n) {
    //if(n === undefined) n = a.length;
    
    if(n === 1) {
      cb(a);
      return;
    }
    
    for(var i=0; i<n-1; i++) {
      generateInner(a, n-1)
      
      if(n%2 == 0) {
        var other = a[n-1];
        a[n-1] = a[i];
        a[i] = other;
      } else {
        var other = a[n-1];
        a[n-1] = a[0];
        a[0] = other;
      }
    }
    
    generateInner(a, n-1)
  }
}

function nChoseK(arr, k, cb) {
  
  if(typeof(cb) !== 'function')
    cb = x => console.log(x);
  
  nChoseKInner(arr, k, [], 0, 0)
  function nChoseKInner(arr, k, out, p, off) {
    if(k === 0) {
      cb(out.slice());
      return;
    }
    
    for(var i=off; i<arr.length; i++) {
      out[p] = arr[i];
      nChoseKInner(arr, k-1, out, p+1, i+1)
    }
  }
}

function nChose(arr, cb) {
  for(var k=1; k<=arr.length; k++) {
    nChoseK(arr, k, cb)
  }
}

module.exports = {
  generatePermutations: generatePermutations,
  nChoseK: nChoseK,
  nChose: nChose
}