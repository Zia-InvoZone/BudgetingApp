const router = require('express').Router();
const { Op } = require('sequelize');
const DB = require('../models').group;
/**
 * @swagger
 * components:
 *  schemas:
 *    Group:
 *      type: object
 *      requried: -name
 *      properties:
 *        id:
 *          type: number
 *          description: Auto generarted id
 *        name:
 *          type: string
 *          description: Name
 *      example:
 *        name: General
 *
 */

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: The groups managing API
 */

/**
 * @swagger
 * /groups:
 *   get:
 *     summary: Returns the list of all the groups
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Group'
 */
router.get('/', async (req, res) => res.json(await DB.findAll()));
/**
 * @swagger
 * /groups:
 *   post:
 *     summary: Create a new group
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       200:
 *         description: The group was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       500:
 *         description: Server Error
 */
router.post('/', async (req, res) => {
  try {
    let data = req.body;
    res.json(await DB.create({ name: data.name }));
  } catch (error) {
    return res.status('500').send('Server Error');
  }
});

/**
 * @swagger
 * /groups/{id}:
 *   get:
 *     summary: Get the group by id
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The group id
 *     responses:
 *       200:
 *         description: The group description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       404:
 *         description: The group was not found
 */
router.get('/:id', async (req, res) => {
  try {
    const result = await DB.findByPk(req.params.id);
    if (result) return res.json(result);
    else return res.status(404).send('Not Found');
  } catch (error) {
    return res.status(500).send('Server Error');
  }
});
/**
 * @swagger
 * /groups/{id}:
 *  put:
 *    summary: Update the group by the id
 *    tags: [Groups]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The group id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Group'
 *    responses:
 *      200:
 *        description: The group was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Group'
 *      404:
 *        description: The group was not found
 *      500:
 *        description: Some error happened
 */

router.put('/:id', async (req, res) => {
  try {
    let data = req.body;
    const id = req.params.id;
    const [result] = await DB.update({ name: data.name }, { where: { id } });
    return res.json({ updated: result });
  } catch (error) {
    return res.status(500).send('Server Error');
  }
});
/**
 * @swagger
 * /groups/{id}:
 *   delete:
 *     summary: Remove the group by id
 *     tags: [Groups]
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
 *         description: The group was deleted
 *       404:
 *         description: The group was not found
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
