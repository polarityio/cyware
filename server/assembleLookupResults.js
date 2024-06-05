const { size, map, some } = require('lodash/fp');
const { getResultForThisEntity } = require('./dataTransformations');
const { DateTime } = require('luxon');

const {
  logging: { getLogger }
} = require('polarity-integration-utils');

const assembleLookupResults = (entities, indicators, options) =>
  map((entity) => {
    const resultsForThisEntity = getResultsForThisEntity(entity, indicators, options);

    const resultsFound = some(size, resultsForThisEntity);

    const lookupResult = {
      entity,
      data: resultsFound
        ? {
            summary: createSummaryTags(resultsForThisEntity, options),
            details: resultsForThisEntity
          }
        : null
    };

    return lookupResult;
  }, entities);

const getResultsForThisEntity = (entity, indicators, options) => ({
  indicators: getResultForThisEntity(entity, indicators, options)
});

const createSummaryTags = ({ indicators }, options) => {
  const tags = [];
  // Note, it appears that only a single indicator will ever be returned but keeping this logic
  // as a precaution
  if (indicators.length > 1) {
    tags.push(`Indicators: ${indicators.length}`);
  } else if (indicators.length === 1) {
    const indicator = indicators[0];
    tags.push(`Score: ${indicator.analyst_score === null ? 0 : indicator.analyst_score}`);
    tags.push(`Confidence: ${indicator.confidence_score}`);
    tags.push(`TLP: ${indicator.tlp}`);
    if (indicator.valid_until) {
      tags.push(`Valid to: ${DateTime.fromISO(indicator.valid_until).toFormat('DD')}`);
    }
  }
  return tags;
};

module.exports = assembleLookupResults;
