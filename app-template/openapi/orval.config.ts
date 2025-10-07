export default {
  dashboard: {
    output: {
      mode: 'tags',
      target: '../frontend/src/apis',
      schemas: './types/',
      client: 'react-query',
      baseUrl: {
        getBaseUrlFromSpecification: true,
      },
      override: {
        useDates: true,
      },
    },
    input: {
      target: './openapi_spec.yaml',
    },
  },
};
