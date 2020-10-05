const optionsEnum = require('../options.enum');
const { required } = require('./required');
const { strongValue } = require('./strong-value');
const { FileValidator } = require('./file-validator');

function isValidAsync(options) {
  const validationSettings = [
    [optionsEnum.ACTION, required, strongValue('encode', 'decode')],
    [optionsEnum.SHIFT, required], // add check on number
    [
      optionsEnum.INPUT,
      FileValidator.allowReadFileAsync(!!options[optionsEnum.INPUT.name])
    ],
    [
      optionsEnum.OUTPUT,
      FileValidator.allowWriteFileAsync(!!options[optionsEnum.OUTPUT.name])
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

module.exports = {
  isValidAsync
};
