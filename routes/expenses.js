const router = require('express').Router();
const { Op } = require('sequelize');
const DB = require('../models').expense;
/**
 * @swagger
 * components:
 *  schemas:
 *    Expense:
 *      type: object
 *      requried: -type -amount -description -created_by
 *      properties:
 *        id:
 *          type: number
 *          description: Auto generarted id
 *        type:
 *          type: string
 *          description: Type of expense
 *        amount:
 *          type: number
 *          description: Expense amount
 *        description:
 *          type: string
 *          description: Detail about expense
 *        created_by:
 *          type: number
 *          description: Reference id of user
 *      example:
 *        type: Food
 *        amount: 150
 *        description: we enjoy a good meal
 *        created_by: 1
 *
 */
/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: The expenses managing API
 */

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Returns the list of all the expenses
 *     tags: [Expenses]
 *     responses:
 *       200:
 *         description: The list of the expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 */
router.get('/', async (req, res) => res.json(await DB.findAll()));
/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Create a new expense
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       200:
 *         description: The expense was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       500:
 *         description: Some server error
 */
router.post('/', async (req, res) => {
  try {
    let data = req.body;
    return res.json(
      await DB.create({
        type: data.type,
        amount: data.amount,
        description: data.description,
        created_by: data.created_by,
      })
    );
  } catch (error) {
    return res.status(500).send('Some server error');
  }
});
/**
 * @swagger
 * /expenses/{id}:
 *   get:
 *     summary: Get the expense by id
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The expense id
 *     responses:
 *       200:
 *         description: The expense description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       404:
 *         description: Not Found
 */
router.get('/:id', async (req, res) => {
  const result = await DB.findByPk(req.params.id);
  if (result) return res.json(result);
  else return res.status(404).send('Not Found');
});
/**
 * @swagger
 * /expenses/{id}:
 *  put:
 *    summary: Update the expense by the id
 *    tags: [Expenses]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The expense id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Expense'
 *    responses:
 *      200:
 *        description: The expense was updated
 *      404:
 *        description: Not Found
 *      500:
 *        description: Some server error
 */

router.put('/:id', async (req, res) => {
  try {
    let data = req.body;
    const id = req.params.id;
    const [result] = await DB.update(
      {
        type: data.type,
        amount: data.amount,
        description: data.description,
        created_by: data.created_by,
      },
      {
        where: { id },
      }
    );
    return res.json({ updated: result });
  } catch (error) {
    return res.status(500).send('Some server error');
  }
});
/**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: Remove the expense by id
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The expense id
 *     responses:
 *       200:
 *         description: The expense was deleted
 *       404:
 *         description: Not Found
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
