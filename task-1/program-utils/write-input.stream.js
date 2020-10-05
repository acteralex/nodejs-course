const { Writable } = require('stream');

function writeInput() {
  return new Writable({
    write(chunk, encoding, callback) {
      process.stdout.write(`${chunk}\n`);
      callback(null);
    }
  });
}

module.exports.writeInput = writeInput;
