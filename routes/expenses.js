const express = require('express');
const app = express();
const DB = require('../models').expenses;

/**
 * @swagger
 * components:
 *  schemas:
 *    Expense:
 *      type: object
 *      required:
 *        - amount
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of the user
 *        type:
 *          type: string
 *          description: Expense type
 *        amount:
 *          type: string
 *          description: Expense amount
 *        description:
 *          type: string
 *          description: Expense description
 *        created_by:
 *          type: string
 *          description: who create expense
 *      example:
 *        id: 1
 *        type: friends
 *        amount: $300
 *        description: Dinner at Tandori
 *        created_by: Zia
 */

/**
 * @swagger
 * tags:
 *  name: Expenses
 *  description: Expense Apis
 */

/**
 * @swagger
 * /expenses:
 *  post:
 *    summary: Create a new expense
 *    tags: [Expenses]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Expense'
 *    responses:
 *      200:
 *        description: Expense successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Expense'
 *      500:
 *        description: Some server error
 */

app.use(express.urlencoded());
app.use(express.json());
app.post('/', async (req, res) => {
  try {
    const Data = req.body;
    const expense = await DB.create({
      type: Data.type,
      amount: Data.amount,
      description: Data.description,
      created_by: Data.created_by,
    });
    return res.json(expense);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

/**
 * @swagger
 * /expenses:
 *  get:
 *    summary: Returns the list of all the expenses
 *    tags: [Expenses]
 *    responses:
 *      200:
 *        description: List of the expenses
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              $ref: '#/components/schemas/Expense'
 */

app.get('/', async (req, res) => {
  try {
    const expenses = await DB.findAll();
    return res.send(expenses);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * @swagger
 * /expenses/{id}:
 *  get:
 *    summary: Get the expense by id
 *    tags: [Expenses]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Expense id
 *    responses:
 *      200:
 *        description: Expense by id
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              $ref: '#/components/schemas/Expense'
 *      404:
 *        description: Expense not found
 */

app.get('/:id', async (req, res) => {
  const expenses = await DB.findAll({
    where: {
      id: req.params.id,
    },
  });
  if (expenses.length) {
    return res.send(expenses);
  } else {
    return res.status(404).send('Not Found');
  }
});

/**
 * @swagger
 * /expenses/{id}:
 *  put:
 *    summary: Update expense by id
 *    tags: [Expenses]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Expense id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Expense'
 *    responses:
 *      200:
 *        description: Expense updated
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              $ref: '#/components/schemas/Expense'
 *      404:
 *        description: Expense not found
 *      500:
 *        description: Server Error
 */

app.put('/:id', async (req, res) => {
  try {
    const Data = req.body;
    const result = await DB.update(
      {
        type: Data.type,
        amount: Data.amount,
        description: Data.description,
        created_by: Data.created_by,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return res.send({ updated: result });
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * @swagger
 * /expenses/{id}:
 *  delete:
 *    summary: Delete expense by id
 *    tags: [Expenses]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Expense id
 *    responses:
 *      200:
 *        description: Expense deleted
 *      404:
 *        description: Expense not found
 */

app.delete('/:id', async (req, res) => {
  const result = await DB.destroy({
    where: {
      id: req.params.id,
    },
  });
  return res.send({ deleted: result });
});

module.exports = app;
