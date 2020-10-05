const optionsEnum = require('./options/options.enum');
const { pipeline } = require('stream');
const { Command } = require('commander');
const { isValidAsync } = require('./options/validators/validator');
const { readInput } = require('./program-utils/read-input.stream');
const { readFile } = require('./program-utils/read-file.stream');
const { writeInput } = require('./program-utils/write-input.stream');
const { writeFile } = require('./program-utils/write-file.stream');
const { getTransformStream } = require('./program-utils/transform.stream');

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
  pipeline(
    getInputStream(),
    getTransformStream(
      options[optionsEnum.ACTION.name],
      options[optionsEnum.SHIFT.name]
    ),
    getOutputStream(),
    err => {
      if (err) {
        console.log('Program finished with unhandled error');
      }
    }
  );
}

function getInputStream() {
  return options[optionsEnum.INPUT.name] === undefined
    ? readInput()
    : readFile(options[optionsEnum.INPUT.name]);
}

function getOutputStream() {
  return options[optionsEnum.OUTPUT.name] === undefined
    ? writeInput()
    : writeFile(options[optionsEnum.OUTPUT.name]);
}
