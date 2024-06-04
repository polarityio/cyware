const {
  logging: { setLogger, getLogger },
  errors: { parseErrorToReadableJson }
} = require('polarity-integration-utils');

const { validateOptions } = require('./server/userOptions');
const { removePrivateIps } = require('./server/dataTransformations');
const { getIndicators } = require('./server/queries');

const assembleLookupResults = require('./server/assembleLookupResults');

const doLookup = async (entities, options, cb) => {
  const Logger = getLogger();
  try {
    Logger.debug({ entities }, 'Entities');

    const searchableEntities = removePrivateIps(entities);

    const indicators = await getIndicators(searchableEntities, options);

    Logger.trace({ indicators, searchableEntities });

    const lookupResults = assembleLookupResults(entities, indicators, options);

    Logger.trace({ lookupResults }, 'Lookup Results');

    cb(null, lookupResults);
  } catch (error) {
    const parsedError = parseErrorToReadableJson(error);
    parsedError.detail = parsedError.message;
    delete parsedError.message;

    Logger.error({ parsedError }, 'Get Lookup Results Failed');
    cb(parsedError);
  }
};

module.exports = {
  startup: setLogger,
  validateOptions,
  doLookup
};
