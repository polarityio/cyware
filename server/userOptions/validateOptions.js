const { validateStringOptions, validateUrlOption } = require('./utils');

const validateOptions = async (options, callback) => {
  const stringOptionsErrorMessages = {
    url: '* Required',
    appUrl: '* Required',
    accessId: '* Required',
    secretKey: '* Required'
  };

  const stringValidationErrors = validateStringOptions(
    stringOptionsErrorMessages,
    options
  );

  const apiUrlValidationError = validateUrlOption(options, 'url');
  const appUrlValidationError = validateUrlOption(options, 'appUrl');

  const errors = stringValidationErrors
    .concat(apiUrlValidationError)
    .concat(appUrlValidationError);

  callback(null, errors);
};

module.exports = validateOptions;
