const fs = require('fs');

function readFile(fileName) {
  return fs.createReadStream(fileName, {
    flags: 'r'
  });
}

module.exports.readFile = readFile;
