let config;

if (process.env.NODE_ENV === 'production') {
  config = require('./configureStore.prod').default;
} else {
  config = require('./configureStore.dev').default;
}

export const configureStore = config;
