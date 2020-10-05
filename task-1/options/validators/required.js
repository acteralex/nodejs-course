function required(options, optionName) {
  if (options[optionName] === undefined) {
    return {
      isValid: false,
      message: `You don't set the ${optionName} property.`
    };
  }
  return { isValid: true };
}

module.exports.required = required;
