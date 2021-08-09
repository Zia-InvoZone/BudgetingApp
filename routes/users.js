const router = require('express').Router();
const { Op } = require('sequelize');
const Multer = require('multer');
const helper = require('../helpers');
const { bucket } = require('../firebase');
// const { hash } = require('bcryptjs');
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});
const DB = require('../models').user;
/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      requried: -name -email -passwrod
 *      properties:
 *        id:
 *          type: number
 *          description: Auto generarted id
 *        name:
 *          type: string
 *          description: Name
 *        email:
 *          type: string
 *          description: Email
 *        password:
 *          type: string
 *          description: some password
 *        image:
 *          type: string
 *          description: file name with extension
 *      example:
 *        name: dev
 *        email: dev@example.com
 *        password: secret
 *
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', async (req, res) => res.json(await DB.findAll()));
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Server Error
 */
router.post('/', async (req, res) => {
  try {
    let data = req.body;
    // return res.send(data);
    // let { password } = await hash(data.password, 12);
    const user = await DB.create({
      name: data.name,
      email: data.email,
      password: data.password,
      image: null,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status('500').send(error);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
router.get('/:id', async (req, res) => {
  try {
    const user = await DB.findByPk(req.params.id);
    if (user) return res.json(user);
    else return res.status(404).send('Not Found');
  } catch (error) {
    return res.status(500).send('Server Error');
  }
});
/**
 * @swagger
 * /users/{id}:
 *  put:
 *    summary: Update the user by the id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

router.put('/:id', async (req, res) => {
  try {
    let data = req.body;
    const id = req.params.id;
    const [result] = await DB.update(
      { name: data.name, email: data.email },
      { where: { id } }
    );
    return res.json({ updated: result });
  } catch (error) {
    return res.status(500).send('Server Error');
  }
});
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await DB.destroy({
      where: { id },
    });
    return res.status(200).json({ deleted: result });
  } catch (error) {
    return res.status(500).send('Some server error');
  }
});

/**
 * @swagger
 * /users/upload-image:
 *  post:
 *    summary: Upload the user image
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            image:
 *                type: string
 *                format: binary
 *    responses:
 *      200:
 *        description: The user was updated
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

router.post('/upload-image', multer.single('image'), async (req, res) => {
  let filePath = null;
  if (req.file) {
    helper.uploadImageToStorage(req.file, bucket).then((value) => {
      res.send(value);
    });
    return;
  }
  return res.status(400).send('File not found');
});

/**
 * @swagger
 * /users/set-image/{id}:
 *  put:
 *    summary: Update the user image by the id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            file_path:
 *              type: string
 *    responses:
 *      200:
 *        description: The user was updated
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */
router.put('/set-image/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await DB.update(
      { image: req.body.file_path },
      { where: { id } }
    );
    return res.json({ updated: result });
  } catch (error) {
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
