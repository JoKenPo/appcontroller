const routes = require('express').Router();
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

require('dotenv').config({
  path: ".env"
});

// Logging
routes.use(morgan('dev'));

routes.get('/info', (req, res, next) => {
  res.send('This is a proxy controller which proxies to MercadoLibre API.');
});

// Proxy endpoints
routes.use('/api/ml', (req, res, next) => {
  console.log(req.connection.remoteAddress);
  console.log(req.url);
  console.log(req.method);

  createProxyMiddleware({
    target: process.env.APP_API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/api/ml`]: '',
    },
  })
});

module.exports = routes;