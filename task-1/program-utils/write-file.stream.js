const fs = require('fs');

function writeFile(fileName) {
  return fs.createWriteStream(fileName, {
    flags: 'a'
  });
}

module.exports.writeFile = writeFile;
