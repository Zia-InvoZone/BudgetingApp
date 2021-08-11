const express = require('express');
const app = express();
const DB = require('../models').groups;

/**
 * @swagger
 * components:
 *  schemas:
 *    Group:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of the user
 *        name:
 *          type: string
 *          description: Group name
 *      example:
 *        id: 1
 *        name: ZAQS
 */

/**
 * @swagger
 * tags:
 *  name: Groups
 *  description: Group Apis
 */

/**
 * @swagger
 * /groups:
 *  post:
 *    summary: Create a new group
 *    tags: [Groups]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Group'
 *    responses:
 *      200:
 *        description: Group successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Group'
 *      500:
 *        description: Some server error
 */

app.use(express.urlencoded());
app.use(express.json());
app.post('/', async (req, res) => {
  try {
    const Data = req.body;
    const group = await DB.create({
      name: Data.name,
    });
    return res.json(group);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

/**
 * @swagger
 * /groups:
 *  get:
 *    summary: Returns the list of all the group
 *    tags: [Groups]
 *    responses:
 *      200:
 *        description: List of the groups
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              $ref: '#/components/schemas/Group'
 */

app.get('/', async (req, res) => {
  try {
    const groups = await DB.findAll();
    return res.send(groups);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * @swagger
 * /groups/{id}:
 *  get:
 *    summary: Get the group by id
 *    tags: [Groups]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Group id
 *    responses:
 *      200:
 *        description: Group by id
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              $ref: '#/components/schemas/Group'
 *      404:
 *        description: Group not found
 */

app.get('/:id', async (req, res) => {
  const groups = await DB.findAll({
    where: {
      id: req.params.id,
    },
  });
  if (groups.length) {
    res.send(groups);
  } else {
    return res.status(404).send('Not Found');
  }
});

/**
 * @swagger
 * /groups/{id}:
 *  put:
 *    summary: Update group by id
 *    tags: [Groups]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Group id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Group'
 *    responses:
 *      200:
 *        description: Group updated
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              $ref: '#/components/schemas/Group'
 *      404:
 *        description: Group not found
 *      500:
 *        description: Server Error
 */

app.put('/:id', async (req, res) => {
  try {
    const result = await DB.update(
      {
        name: req.body.name,
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
 * /groups/{id}:
 *  delete:
 *    summary: Delete group by id
 *    tags: [Groups]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Group id
 *    responses:
 *      200:
 *        description: Group deleted
 *      404:
 *        description: Group not found
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
