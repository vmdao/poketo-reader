// @flow

const config: { [string]: string } = {
  email: 'hello@poketo.app',
  apiBaseUrl: process.env.REACT_APP_API_BASE || '',
  researchSurveyUrl: 'https://airtable.com/shrUlZo866ItiOmae',
  githubUrl: 'https://github.com/poketo',
  githubSiteUrl: 'https://github.com/poketo/site',
  githubServiceUrl: 'https://github.com/poketo/service',
  githubLibraryUrl: 'https://github.com/poketo/poketo',
  githubSupportedSites:
    'https://github.com/poketo/poketo/blob/master/README.md#supported-sites',
};

export default config;
