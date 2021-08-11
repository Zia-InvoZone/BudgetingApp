require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const app = express();
const usersRouter = require('./routes/users');
const groupsRouter = require('./routes/groups');
const expensesRouter = require('./routes/expenses');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
      description: 'Express Library API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};
const specs = swaggerJsDoc(options);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);
app.use('/expenses', expensesRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
