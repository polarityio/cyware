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

  if (options.minScore.value < 0 || options.minScore.value > 100) {
    errors.push({
      key: 'minScore',
      message: 'Score must be between 0 and 100'
    });
  }

  callback(null, errors);
};

module.exports = validateOptions;
