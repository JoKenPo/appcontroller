const { Access } = require('../models');

class AccessController {
  
  // List route
  async index(req, res){
    const offset = (req.query.offset ? parseInt(req.query.offset) : 0);

    const access = await Access.findAll({ offset: offset, limit: 15 })
    .catch((err) => {
      res.status(401).json({ message: "It was not possible to list the log" });
    });

    return res.json({ data: access, status: 200 });
  }

  // Create route
  async store(req, res){
    const access = await Access.create({
      user_ip: req.connection.remoteAddress,
      path: req.url,
      method: req.method
    })
    .catch((err) => {
      res.status(401).json({ message: 'It was not possible to create log' });
    });

    return res.json({ data: access, status: 200 });
  }
}

    module.exports = new AccessController