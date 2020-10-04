function isValid(options) {
  const validationRequiredOptionsResult = validateRequiredOptions(options, [
    'action',
    'shift'
  ]);

  const errorMessages = [
    validationRequiredOptionsResult,
    validateNumberTypeOptions(
      options,
      ['shift'].filter(
        o => !(validationRequiredOptionsResult.keys || []).includes(o)
      )
    )
  ]
    .filter(i => !i.isValid)
    .map((item, index) => `${index + 1}) ${item.message}`);

  if (errorMessages.length > 0) {
    process.stderr.write(`${errorMessages.join('\n')}\n`);
    process.exitCode = 400;
    return false;
  }
  return true;
}

function validateRequiredOptions(options, requiredOptionKeys) {
  const errorRequiredOptionKeys = requiredOptionKeys
    .map(o => (options[o] === undefined ? o : null))
    .filter(o => o !== null);

  if (errorRequiredOptionKeys.length === 0) {
    return { isValid: true };
  }
  return {
    isValid: false,
    keys: errorRequiredOptionKeys,
    message: `You have not set the ${errorRequiredOptionKeys.join(
      ', '
    )} properties.`
  };
}

function validateNumberTypeOptions(options, numberTypeOptionKeys) {
  const errorNumberTypeOptionKeys = numberTypeOptionKeys
    .map(o => (isNaN(options[o]) ? o : null))
    .filter(o => o !== null);

  if (errorNumberTypeOptionKeys.length === 0) {
    return { isValid: true };
  }
  return {
    isValid: false,
    keys: errorNumberTypeOptionKeys,
    message: `You set the ${errorNumberTypeOptionKeys.join(
      ', '
    )} properties to a not number.`
  };
}

module.exports.OptionsValidator = {
  isValid
};
