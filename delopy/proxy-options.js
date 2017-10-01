module.exports = {
  // order is important
  '/api/t/': {
    target: 'http://localhost:5502'
  },
  '/api/tk/': {
    target: 'http://localhost:5503'
  },
  '/api/user/': {
    target: 'http://localhost:5508'
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
