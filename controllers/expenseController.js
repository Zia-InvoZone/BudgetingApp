const DB = require('../models').expenses;

module.exports = {
  create: async (req, res) => {
    try {
      const Data = req.body;
      const expense = await DB.create({
        type: Data.type,
        amount: Data.amount,
        description: Data.description,
        created_by: Data.created_by,
      });
      return res.json(expense);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  findAll: async (req, res) => {
    try {
      const expenses = await DB.findAll();
      return res.send(expenses);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  show: async (req, res) => {
    const expenses = await DB.findAll({
      where: {
        id: req.params.id,
      },
    });
    if (expenses.length) {
      return res.send(expenses);
    } else {
      return res.status(404).send('Not Found');
    }
  },
  update: async (req, res) => {
    try {
      const Data = req.body;
      const result = await DB.update(
        {
          type: Data.type,
          amount: Data.amount,
          description: Data.description,
          created_by: Data.created_by,
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
