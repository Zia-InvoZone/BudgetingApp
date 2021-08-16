const express = require('express');
const groupController = require('../controllers/groupController');
const app = express();
app.use(express.urlencoded());
app.use(express.json());

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

app.post('/', groupController.create);

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

app.get('/', groupController.findAll);

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

app.get('/:id', groupController.show);

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

app.put('/:id', groupController.update);

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

app.delete('/:id', groupController.delete);

module.exports = app;
