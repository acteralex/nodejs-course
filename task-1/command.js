const fs = require('fs');
const { Transform, Writable, pipeline } = require('stream');
const { Command } = require('commander');
const { OptionsValidator } = require('./options-validator');
const { CaesarCipher } = require('./caesar-cipher');

const program = new Command();

program
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .name('caesar-cipher');
// .exitOverride();

program
  .option('-a, --action <action>', 'an action encode/decode') // TODO: use requiredOption, but how to handle error?
  .option('-s, --shift <shift>', 'a shift', parseInt) // TODO: 1) add logic to convert to INT 2) use requiredOption, but how to handle error?
  .option('-i, --input <input>', 'an input file')
  .option('-o, --output <output>', 'an output file');

program.parse(process.argv);

const options = program.opts();

if (OptionsValidator.isValid(options)) {
  run();
}

function run() {
  pipeline(getInputStream(), getTransformStream(), getOutputStream(), err => {
    if (err) {
      console.log('error');
    } else {
      console.log('then');
    }
  });
}

function getTransformStream() {
  return new Transform({
    transform(chunk, encoding, callback) {
      const text = chunk.toString();
      const action = (options.action === 'encode'
        ? CaesarCipher.getEncodeFn
        : CaesarCipher.getDecodeFn)(options.shift);
      callback(null, action(text));
    }
  });
}

function getInputStream() {
  return options.input === undefined ? readInput() : readFile();
}

function getOutputStream() {
  return options.output === undefined ? writeInput() : writeFile();
}

function readInput() {
  return process.stdin.on('data', () => {
    process.stdin.pause();
  });
}

function writeInput() {
  return new Writable({
    write(chunk, encoding, callback) {
      process.stdout.write(chunk);
      callback(null);
    }
  });
}

function readFile() {
  return fs.createReadStream(options.input);
}

function writeFile() {
  return fs.createWriteStream(options.output);
}

// function writeInputAgain() {
//   process.stdout.write(`Do you want to ${options.action} more? (y/n)`);
//   process.stdin.once('data', data => {
//     if (data.toString() === 'y') {
//       process.stdin.resume();
//     } else {
//       process.stdin.end();
//     }
//   });
// }
