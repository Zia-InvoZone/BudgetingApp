const router = require('express').Router();
const { Op } = require('sequelize');
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
    res.json(
      await DB.create({
        name: data.name,
        email: data.email,
        password: data.password,
      })
    );
  } catch (error) {
    return res.status('500').send('Server Error');
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

module.exports = router;
