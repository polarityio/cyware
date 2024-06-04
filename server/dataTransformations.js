const {
  map,
  filter,
  get,
  flow,
  eq,
  gte,
    lte,
  flatMap,
  uniqWith,
  isEqual,
  identity,
  first,
  toLower,
  some,
  getOr
} = require('lodash/fp');

const isPrivateIP = (ip) => {
  var parts = ip.split('.');
  return (
    parts[0] === '10' ||
    (parts[0] === '172' &&
      parseInt(parts[1], 10) >= 16 &&
      parseInt(parts[1], 10) <= 31) ||
    (parts[0] === '192' && parts[1] === '168')
  );
};

const removePrivateIps = (entities) =>
  filter(({ isIP, value }) => !isIP || (isIP && !isPrivateIP(value)), entities);

const getEntityTypes = (typesToGet, entities) => {
  const lowerTypesToGet =
    typeof typesToGet === 'string' ? [toLower(typesToGet)] : map(toLower, typesToGet);

  const entitiesOfTypesToGet = filter((entity) => {
    const lowerEntityTypes = map(toLower, entity.types);

    const entityTypesAreInTypesToGet = some(
      (typeToGet) => lowerEntityTypes.includes(typeToGet),
      lowerTypesToGet
    );

    return entityTypesAreInTypesToGet;
  }, entities);

  return entitiesOfTypesToGet;
};

const getResultForThisEntity = (
  entity,
  results,
  options,
  onlyOneResultExpected = false,
  onlyReturnUniqueResults = false
) =>
  flow(
    // toLowerCase() required because hashes must be in lowercase for a match
    filter(flow(get('name'), eq(entity.value.toLowerCase()))),
    filter(flow(getOr(0, 'analyst_score'), lte(options.minScore))),
    onlyReturnUniqueResults ? uniqWith(isEqual) : identity,
    onlyOneResultExpected ? first : identity
  )(results);

module.exports = {
  removePrivateIps,
  getEntityTypes,
  getResultForThisEntity
};
