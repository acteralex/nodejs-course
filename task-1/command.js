const optionsEnum = require('./options.enum');
const fs = require('fs');
const { Transform, Writable, pipeline } = require('stream');
const { Command } = require('commander');
const { OptionsValidator } = require('./options.validator');
const { CaesarCipher } = require('./caesar-cipher');

const program = new Command();

program
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .name('caesar-cipher');
// .exitOverride();

Object.values(optionsEnum).forEach(o => {
  program.option(
    `-${o.shortName}, --${o.name} <${o.name}>`,
    o.description,
    o.mapFn,
    o.defaultValue
  );
});

program.parse(process.argv);

const options = program.opts();

OptionsValidator.isValidAsync(options)
  .then(() => run())
  .catch(errorMessages => {
    process.stderr.write(`${errorMessages.join('\n')}\n`);
    process.exitCode = 400;
  });

function run() {
  pipeline(getInputStream(), getTransformStream(), getOutputStream(), err => {
    if (err) {
      // console.log('error');
    } else {
      // console.log('then');
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
  return fs.createReadStream(options.input, {
    flags: 'r'
  });
}

function writeFile() {
  return fs.createWriteStream(options.output, {
    flags: 'a'
  });
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
