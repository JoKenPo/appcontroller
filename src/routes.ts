const routes = require('express').Router();

routes.get('/api/ml', (req, res) => {
  console.log(req.connection.remoteAddress);
  console.log(req.url);
  console.log(req.method);

  return res.status(200).send();
})

module.exports = routes;