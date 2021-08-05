require('dotenv').config();
const Sequelize = require('sequelize');
const port = process.env.PORT;
const express = require('express');
const app = express();
const User = require('./models').user;
app.get('/', (req, res) => {
  return res.send('welcome');
});
app.get('/add-user', (req, res) => {
  // sample user testing for insertion
  return User.create({
    name: 'test ',
    email: 'test@example.com',
    password: '123',
  })
    .then((user) => res.status(201).send(user))
    .catch((error) => res.status(400).send(error));
});
app.get('*', (req, res) =>
  res.status(400).send({
    message: 'Your Lost',
  })
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
