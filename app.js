require('dotenv').config();
const port = process.env.PORT || 3000;
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Budget App API',
      version: '1.0.0',
      description: 'A simple budget app API',
    },
    servers: [
      {
        url: `http://localhost:${port}/`,
      },
    ],
  },
  apis: ['./routes/*.js'],
};
const specs = swaggerJsDoc(options);
const app = express();
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// for parsing application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to Budgeting App');
});

app.use('/', require('./routes/index'));

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
