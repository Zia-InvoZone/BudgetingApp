const express = require('express');
const app = express();
const userController = require('../controllers/userController');
app.use(express.urlencoded());
app.use(express.json());
/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of the user
 *        name:
 *          type: string
 *          description: User name
 *        email:
 *          type: string
 *          description: User email address
 *        password:
 *          type: string
 *          description: User password
 *      example:
 *        id: 1
 *        name: Zia Saleem
 *        email: zia@gmail.com
 *        password: zia.inzone123
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: User Apis
 */

/**
 * @swagger
 * /users:
 *  post:
 *    summary: Create a new user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: User successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: Some server error
 */

app.post('/', userController.create);

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Returns the list of all the user
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: List of the users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              $ref: '#/components/schemas/User'
 */

app.get('/', userController.findAll);

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    summary: Get the user by id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: User id
 *    responses:
 *      200:
 *        description: User by id
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: User not found
 */

app.get('/:id', userController.show);

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    summary: Update user by id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: User id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: User updated
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: User not found
 *      500:
 *        description: Server Error
 */

app.put('/:id', userController.update);

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    summary: Delete user by id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: User id
 *    responses:
 *      200:
 *        description: User deleted
 *      404:
 *        description: User not found
 */

app.delete('/:id', userController.delete);

module.exports = app;
