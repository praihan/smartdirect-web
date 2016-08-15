const getEnv = function getEnv(varName) {
  varName = String(varName);
  if (!process.env[varName]) {
    throw Error(`Missing environment variable '${varName}'`);
  }
  return process.env[varName];
};

module.exports = function(environment) {
  const ENV = {
    modulePrefix: 'smartdirect-web',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  // Authentication set up
  ENV['ember-simple-auth'] = {
    baseURL: ENV.rootURL,
  };

  if (environment !== 'production') {
    // In non-production set up we use the Smartdirect-Develop client
    ENV['auth0-ember-simple-auth'] = {
      clientID: 'LbGid9glzIogma9BHpJYvy4svR5A1lGa',
      domain: 'smartdirect.auth0.com'
    };
  } else {
    // fetch config from whoever is building the app
    ENV['ember-simple-auth'] = {
      baseURL: ENV.rootURL,
    };
    ENV['auth0-ember-simple-auth'] = {
      clientID: getEnv('AUTH0_CLIENT_ID'),
      domain: getEnv('AUTH0_DOMAIN')
    };
  }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
