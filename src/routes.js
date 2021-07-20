const routes = require('express').Router();
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

const { Access } = require('./app/models');
const AccessController = require('./app/controllers/AccessController');

require('dotenv').config({
  path: ".env"
});

// Logging
// routes.use(morgan('dev'));

// Remove cache
routes.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})

// Info
routes.get('/info', (req, res, next) => {
  res.send('This is a proxy controller which proxies to MercadoLibre API.');
});

// GET
routes.get('/list', AccessController.index);

// GET
routes.get('/criar', AccessController.store);


// Proxy endpoints
routes.use('/api/proxy',AccessController.store)

routes.use('/api/proxy', 
  createProxyMiddleware({
    target: process.env.APP_API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/api/proxy`]: '',
    }
  })
)

module.exports = routes;