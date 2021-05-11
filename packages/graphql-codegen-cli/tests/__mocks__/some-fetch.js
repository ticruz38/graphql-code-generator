const { readFileSync } = require('fs');
const { join } = require('path');
const { buildSchema, graphql, introspectionQuery } = require('graphql');

module.exports = {
  someFetchFn: async (url, options) => {
    const schemaFile = readFileSync(join(__dirname, '../test-documents/schema.graphql'), 'utf8');
    const schema = buildSchema(schemaFile);
    return {
      headers: {
        'content-type': 'application/json'
      },
      json() {
        global.CUSTOM_FETCH_FN_CALLED = true;
        return graphql(schema, introspectionQuery);
      },
    };
  },
};
