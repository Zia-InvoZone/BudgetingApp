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
 *          description: Auto gen id
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
 *        password: 12761872638126812
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
 *         description: Some server error
 */

router.get('/', async (req, res) => res.json(await DB.findAll()));
router.post('/', async (req, res) => {
  let data = req.body;
  res.json(
    await DB.create({
      name: data.name,
      email: data.email,
      password: data.password,
    })
  );
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

router.get('/:id', async (req, res) =>
  res.json(
    await DB.findAll({
      where: {
        [Op.eq]: req.params.id,
      },
    })
  )
);
router.put('/:id', async (req, res) => {
  let data = req.body;
  res.json(
    await DB.update(
      { name: data.name, email: data.email },
      {
        where: {
          [Op.eq]: req.params.id,
        },
      }
    )
  );
});
router.delete('/:id', async (req, res) =>
  res.json(
    await User.destroy({
      where: {
        [Op.eq]: req.params.id,
      },
    })
  )
);

module.exports = router;
