const { Transform } = require('stream');
const { CaesarCipher } = require('../cipher/caesar');

function getTransformStream(action, shift) {
  return new Transform({
    transform(chunk, encoding, callback) {
      const text = chunk.toString();
      const actionFn = (action === 'encode'
        ? CaesarCipher.getEncodeFn
        : CaesarCipher.getDecodeFn)(shift);
      callback(null, actionFn(text));
    }
  });
}

module.exports.getTransformStream = getTransformStream;
