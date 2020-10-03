const { Command } = require('commander');
const program = new Command();

program
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .name('caesar-cipher');
// .exitOverride();

program
  .option('-a, --action <action>', 'an action encode/decode') // TODO: use requiredOption, but how to handle error?
  .option('-s, --shift <shift>', 'a shift') // TODO: use requiredOption, but how to handle error?
  .option('-i, --input <input>', 'an input file')
  .option('-o, --output <output>', 'an output file');

program.parse(process.argv);

const options = program.opts();

checkOnErrors();

function checkOnErrors() {
  const requiredOptionKeys = ['action', 'shift'];
  const optionKeysWithErrors = getCheckRequiredOption(...requiredOptionKeys);

  if (optionKeysWithErrors.length > 0) {
    const errorMessage = `You have not set the ${optionKeysWithErrors.join(
      ', '
    )} properties. Set needed properties and run it again.`;
    process.stderr.write(`${errorMessage}\n`);
    process.exitCode = 400;
  }
}

function getCheckRequiredOption(...requiredOptionKeys) {
  return requiredOptionKeys
    .map(o => (options[o] === undefined ? o : null))
    .filter(o => o !== null);
}
