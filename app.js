require('dotenv').config();
const port = process.env.PORT || 3000;
const express = require('express');
const Multer = require('multer');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { bucket } = require('./firebase');
const helper = require('./helpers');
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
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});
// app init
const app = express();
// api docs
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
// file manage
// app.use(multer.any());
// routes
app.get('/', (req, res) => {
  res.send('Welcome to Budgeting App');
});
app.get('/test-file', (req, res) => {
  res.send(`
  <form action="/users/test" method="post" enctype= multipart/form-data>
  <input type="file" name="image" />
  <button type="submit">Save</button>
  </form>
`);
});

app.use('/', require('./routes/index'));
// server init
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

// app.post('/test-file', multer.single('file'), (req, res) => {
//   let file = req.file;
//   if (file) {
//     helper
//       .uploadImageToStorage(file, bucket)
//       .then((success) => {
//         res.status(200).send({
//           status: 'success',
//           link: success,
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//         return res.status(500).send('Server Error');
//       });
//   } else {
//     return res.send('not found');
//   }
// });
