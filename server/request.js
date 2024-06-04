const { map, get, getOr, filter, flow, negate, isEmpty } = require('lodash/fp');
const { parallelLimit } = require('async');
const crypto = require('crypto');
const {
  logging: { getLogger },
  requests: { createRequestWithDefaults }
} = require('polarity-integration-utils');
const config = require('../config/config');

const requestWithDefaults = createRequestWithDefaults({
  config,
  roundedSuccessStatusCodes: [200],
  requestOptionsToOmitFromLogsKeyPaths: ['qs.AccessID', 'qs.Signature'],
  preprocessRequestOptions: async ({ route, options, ...requestOptions }) => {
    const unixTimestamp = Math.round(Date.now() / 1000);
    const expireTimestamp = unixTimestamp + 20;
    const toSign = options.accessId + '\n' + expireTimestamp;
    let hmacSignatureInBase64 = crypto
      .createHmac('sha1', options.secretKey)
      .update(toSign)
      .digest('base64');

    return {
      ...requestOptions,
      qs: {
        AccessID: options.accessId,
        Signature: hmacSignatureInBase64,
        Expires: expireTimestamp,
        ...requestOptions.qs
      },
      json: true
    };
  },
  postprocessRequestFailure: (error) => {
    try {
      const errorResponseBody = JSON.parse(error.description);
      error.message = `${error.message} - (${error.status}) ${getOr(
        '',
        'errors.server.message',
        errorResponseBody
      )}`;
    } catch (parseError) {
      error.message = `${error.message} - (${error.status})`;
    }

    throw error;
  }
});

const createRequestsInParallel =
  (requestWithDefaults) =>
  async (
    requestsOptions,
    responseGetPath,
    limit = 10,
    onlyReturnPopulatedResults = true
  ) => {
    const unexecutedRequestFunctions = map(
      ({ resultId, ...requestOptions }) =>
        async () => {
          const response = await requestWithDefaults(requestOptions);
          const result = responseGetPath ? get(responseGetPath, response) : response;
          return resultId ? { resultId, result } : result;
        },
      requestsOptions
    );

    const results = await parallelLimit(unexecutedRequestFunctions, limit);

    return onlyReturnPopulatedResults
      ? filter(
          flow((result) => getOr(result, 'result', result), negate(isEmpty)),
          results
        )
      : results;
  };

const requestsInParallel = createRequestsInParallel(requestWithDefaults);

module.exports = {
  requestWithDefaults,
  requestsInParallel
};
