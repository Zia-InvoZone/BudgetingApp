const express = require('express');
const app = express();
const DB = require('../models').expenses;

app.use(express.urlencoded());
app.use(express.json());
app.post('/', async (req, res) => {
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
});

app.get('/', async (req, res) => {
  try {
    const expenses = await DB.findAll();
    return res.send(expenses);
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.get('/:id', async (req, res) => {
  const expenses = await DB.findAll({
    where: {
      id: req.params.id,
    },
  });
  res.send(expenses);
});

app.put('/:id', async (req, res) => {
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
});

app.delete('/:id', async (req, res) => {
  try {
    const result = await DB.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.send({ deleted: result });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = app;
