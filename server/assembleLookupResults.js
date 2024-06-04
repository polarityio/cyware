const { size, map, some } = require('lodash/fp');
const { getResultForThisEntity } = require('./dataTransformations');

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
  indicators: getResultForThisEntity(entity, indicators)
});

const createSummaryTags = ({ indicators }, options) => {
  const tags = [];
  if (indicators.length > 1) {
    tags.push(`Indicators: ${indicators.length}`);
  } else if (indicators.length === 1) {
    const indicator = indicators[0];
    tags.push(`Score: ${indicator.analyst_score === null ? 0 : indicator.analyst_score}`);
    tags.push(`Confidence: ${indicators[0].confidence_score}`);
  }
  return tags;
};

module.exports = assembleLookupResults;
