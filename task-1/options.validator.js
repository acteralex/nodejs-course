const optionsEnum = require('./options.enum');
const fs = require('fs');

function isValidAsync(options) {
  const validationSettings = [
    [optionsEnum.ACTION, required, strongValue('encode', 'decode')],
    [optionsEnum.SHIFT, required], // add check on number
    [optionsEnum.INPUT, allowReadFileAsync(!!options[optionsEnum.INPUT.name])],
    [
      optionsEnum.OUTPUT,
      allowWriteFileAsync(!!options[optionsEnum.OUTPUT.name])
    ]
  ];

  return new Promise((resolve, reject) => {
    Promise.all(
      validationSettings
        .map(item => {
          return item
            .slice(1)
            .map(validatorFn => validatorFn(options, item[0].name));
        })
        .flat()
        .map(item => {
          if (item.constructor.name === 'Promise') {
            return item;
          }
          return Promise.resolve(item);
        })
    ).then(results => {
      const errorMessages = results
        .filter(item => item && item.isValid === false)
        .map(item => `— ${item.message}`);

      if (errorMessages.length === 0) {
        resolve();
      } else {
        reject(errorMessages);
      }
    });
  });
}

function required(options, optionName) {
  if (options[optionName] === undefined) {
    return {
      isValid: false,
      message: `You don't set the ${optionName} property.`
    };
  }
  return { isValid: true };
}

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

function allowReadFileAsync(isOptionValueFilled) {
  return (options, optionName) => {
    if (!isOptionValueFilled) {
      return Promise.resolve(null);
    }
    return checkAccessForFileAsync(
      options[optionName],
      fs.constants.R_OK,
      'read'
    );
  };
}

function allowWriteFileAsync(isOptionValueFilled) {
  return (options, optionName) => {
    if (!isOptionValueFilled) {
      return Promise.resolve(null);
    }
    return checkAccessForFileAsync(
      options[optionName],
      fs.constants.W_OK,
      'write'
    );
  };
}

function checkAccessForFileAsync(filePath, mode, actionName) {
  console.log('mode', mode);
  return new Promise(resolve => {
    fs.access(filePath, mode, err => {
      if (err) {
        resolve({
          isValid: false,
          message: `File doesn't exist or you don't have permissions to ${actionName} the file ${filePath}`
        });
      } else {
        resolve({ isValid: true });
      }
    });
  });
}

// function validateNumberTypeOptions(options, numberTypeOptionKeys) {
//   const errorNumberTypeOptionKeys = numberTypeOptionKeys
//     .map(o => (isNaN(options[o]) ? o : null))
//     .filter(o => o !== null);

//   if (errorNumberTypeOptionKeys.length === 0) {
//     return { isValid: true };
//   }
//   return {
//     isValid: false,
//     keys: errorNumberTypeOptionKeys,
//     message: `You set the ${errorNumberTypeOptionKeys.join(
//       ', '
//     )} properties to a not number.`
//   };
// }

module.exports.OptionsValidator = {
  isValidAsync
};
