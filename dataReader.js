const fs = require('fs');

module.exports.readLineData = function (path) {
  path = path || 'data';

  return fs.readFileSync(path)
    .toString()
    .split('\n')
    .filter(x=>x.length > 0);
};

module.exports.readData = function (path) {
  path = path || 'data';

  return fs.readFileSync(path).toString();
};
