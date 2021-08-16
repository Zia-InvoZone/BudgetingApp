const DB = require('../models').groups;

module.exports = {
  create: async (req, res) => {
    try {
      const Data = req.body;
      const group = await DB.create({
        name: Data.name,
      });
      return res.json(group);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  findAll: async (req, res) => {
    try {
      const groups = await DB.findAll();
      return res.send(groups);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  show: async (req, res) => {
    const groups = await DB.findAll({
      where: {
        id: req.params.id,
      },
    });
    if (groups.length) {
      res.send(groups);
    } else {
      return res.status(404).send('Not Found');
    }
  },
  update: async (req, res) => {
    try {
      const result = await DB.update(
        {
          name: req.body.name,
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
