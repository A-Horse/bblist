const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', { target: 'http://localhost:5500/' }));
  app.use(proxy('/storage', { target: 'http://localhost:5500/' }));
};
