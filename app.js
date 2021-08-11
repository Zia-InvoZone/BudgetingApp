require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const app = express();
const usersRouter = require('./routes/users');
const groupsRouter = require('./routes/groups');
const expensesRouter = require('./routes/expenses');

app.use('/users', usersRouter);
app.use('/groups', groupsRouter);
app.use('/expenses', expensesRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
