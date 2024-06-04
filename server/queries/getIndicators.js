const { flatten, chunk, map } = require('lodash/fp');

const {
  logging: { getLogger },
  errors: { parseErrorToReadableJson }
} = require('polarity-integration-utils');

const { requestsInParallel } = require('../request');

const getIndicators = async (entities, options) => {
  const Logger = getLogger();

  try {
    const indicatorRequests = map(
      (entityGroup) => ({
        //resultId: entity.value,
        uri: `${options.url}/ingestion/openapi/bulk-lookup/indicator/`,
        qs: {
          relation_data: true,
          page_size: 100
        },
        method: 'POST',
        body: {
          value: entityGroup.map((entity) => entity.value)
        },
        options
      }),
      // Allow up to 20 indicators to be searched in a single HTTP request
      chunk(20, entities)
    );

    const indicators = await requestsInParallel(indicatorRequests, 'body.results');
    const flattenedIndicators = flatten(indicators);

    return flattenedIndicators;
  } catch (error) {
    const err = parseErrorToReadableJson(error);
    Logger.error(
      {
        formattedError: err,
        error
      },
      'Getting Indicators Failed'
    );
    throw error;
  }
};

module.exports = getIndicators;
