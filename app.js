require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const app = express();
const User = require('./models').users;

app.get('/', async (req, res) => {
  // const user = await users.create({
  //   name: 'test',
  //   email: 'test@gmail.com',
  //   password: '123',
  // });
  const users = await User.findAll();

  res.send(users);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
