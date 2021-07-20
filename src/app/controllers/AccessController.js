const { createProxyMiddleware } = require('http-proxy-middleware');

const { Access } = require('../models');

require('dotenv').config({
  path: ".env"
});

var limitIP = 4; // limit of requests by IP
var limitPath = 2; // limit of requests by PATH
var limitMethod = 3; // limit of requests by METHOD

class AccessController {
  
  // List route
  async index(req, res){
    const offset = (req.query.offset ? parseInt(req.query.offset) : 0);

    const access = await Access.findAndCountAll({ offset: offset, limit: 15 })
    // .then((result) => {
    //   total
    // })
    .catch((err) => {
      res.status(401).json({ message: "It was not possible to list the log" });
    });

    access.status = 200;

    return res.json( access );
  }

  // Proxy route
  async store(req, res, next){
    // Validates how many requests were made by this ip
    const ipData = await Access.findAndCountAll(
      { where: {
          user_ip: req.connection.remoteAddress
        },
        limit: 0
      }
    );
    var countIP = ipData.count;
    if (countIP > limitIP) {return res.status(401).json({ message: 'Limit of requests by IP reached' });}

    // Validates how many requests were made by this ip
    const pathData = await Access.findAndCountAll(
      { where: {
          path: req.url
        },
        limit: 0
      }
    );
    var countPath = pathData.count;
    if (countPath > limitPath) {return res.status(401).json({ message: 'Limit of requests by PATH reached' });}

    // Validates how many requests were made by this ip
    const methodData = await Access.findAndCountAll(
      { where: {
          path: req.url
        },
        limit: 0
      }
    );
    var countMethod = methodData.count;
    if (countMethod > limitMethod) {return res.status(401).json({ message: 'Limit of requests by METHOD reached' });}

    // Create new log value
    const access = await Access.create({
      user_ip: req.connection.remoteAddress,
      path: req.url,
      method: req.method
    })
    .catch((err) => {
      res.status(401).json({ message: 'It was not possible to create log' });
    });

    return next()
    // return res.json({ data: access, status: 200 });
  }
}

    module.exports = new AccessController