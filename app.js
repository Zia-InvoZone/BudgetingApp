require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('2nd test!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
