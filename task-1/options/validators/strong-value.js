function strongValue(...accessableValues) {
  return (options, optionName) => {
    if (!accessableValues.includes(options[optionName])) {
      return {
        isValid: false,
        message: `You set incorrect value for the ${optionName} property. Allow only: ${accessableValues.join(
          ', '
        )}.`
      };
    }
    return { isValid: true };
  };
}

module.exports.strongValue = strongValue;
