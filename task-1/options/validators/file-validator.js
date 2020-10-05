const fs = require('fs');

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

module.exports.FileValidator = {
  allowReadFileAsync,
  allowWriteFileAsync
};
