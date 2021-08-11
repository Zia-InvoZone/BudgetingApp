const express = require('express');
const app = express();
const DB = require('../models').groups;

app.use(express.urlencoded());
app.use(express.json());
app.post('/', async (req, res) => {
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
});

app.get('/', async (req, res) => {
  try {
    const groups = await DB.findAll();
    return res.send(groups);
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.get('/:id', async (req, res) => {
  const groups = await DB.findAll({
    where: {
      id: req.params.id,
    },
  });
  res.send(groups);
});

app.put('/:id', async (req, res) => {
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
