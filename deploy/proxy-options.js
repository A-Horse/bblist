module.exports = {
  // order is important
  '/api': {
    target: 'http://localhost:5500',
    changeOrigin: true
  },
  '/storage': {
    target: 'http://localhost:5500'
  }
};
