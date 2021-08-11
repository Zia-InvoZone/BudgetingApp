const express = require('express');
const app = express();
const DB = require('../models').users;

app.use(express.urlencoded());
app.use(express.json());
app.post('/', async (req, res) => {
  try {
    const Data = req.body;
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
});

app.get('/', async (req, res) => {
  try {
    const users = await DB.findAll();
    return res.send(users);
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.get('/:id', async (req, res) => {
  const users = await DB.findAll({
    where: {
      id: req.params.id,
    },
  });
  res.send(users);
});

app.put('/:id', async (req, res) => {
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
