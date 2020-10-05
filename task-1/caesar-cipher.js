const optionsEnum = require('./options/options.enum');
const fs = require('fs');
const { Transform, Writable, pipeline } = require('stream');
const { Command } = require('commander');
const { isValidAsync } = require('./options/validators/validator');
const { CaesarCipher } = require('./cipher/caesar');

const program = new Command('caesar-cipher');

program.storeOptionsAsProperties(false).passCommandToAction(false);

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

isValidAsync(options)
  .then(() => run())
  .catch(errorMessages => {
    process.stderr.write(`${errorMessages.join('\n')}\n`);
    process.exitCode = 400;
  });

function run() {
  pipeline(getInputStream(), getTransformStream(), getOutputStream(), err => {
    if (err) {
      console.log('Program finished with unhandled error');
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
  return process.stdin;
}

function writeInput() {
  return new Writable({
    write(chunk, encoding, callback) {
      process.stdout.write(`${chunk}\n`);
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
