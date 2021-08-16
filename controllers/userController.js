const DB = require('../models').users;

module.exports = {
  create: async (req, res) => {
    try {
      const Data = req.body;
      console.log('asd', Data);
      const user = await DB.create({
        name: Data.name,
        email: Data.email,
        password: Data.password,
      });
      return res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  findAll: async (req, res) => {
    try {
      const users = await DB.findAll();
      return res.send(users);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  show: async (req, res) => {
    const user = await DB.findAll({
      where: {
        id: req.params.id,
      },
    });

    if (user.length) {
      return res.json(user);
    } else {
      return res.status(404).send('Not Found');
    }
  },
  update: async (req, res) => {
    try {
      const result = await DB.update(
        {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      return res.send({ updated: result });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  delete: async (req, res) => {
    const result = await DB.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.send({ deleted: result });
  },
};
