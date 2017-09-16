module.exports = {
  // order is important
  '/api/t/': {
    target: 'http://localhost:5502'
  },
  '/api/ts/': {
    target: 'http://localhost:5501'
  },
  '/api': {
    target: 'http://localhost:5500'
  },
  '/storage': {
    target: 'http://localhost:5500'
  }
};
