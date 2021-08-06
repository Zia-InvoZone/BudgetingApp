const router = require('express').Router();
const bcrypt = require('bcryptjs');
const DB = require('../models').user;

/**
 * @swagger
 * /auth/attempt:
 *   post:
 *     summary: Attempt to login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             email:
 *              type: string
 *             password:
 *              type: string
 *     responses:
 *       200:
 *         description: send attepmt [passed,failed]
 *         content:
 *           application/json:
 *             schema:
 *                  attempt:
 *                      type: string
 *       500:
 *         description: Server Error
 */
router.post('/attempt', async (req, res) => {
  try {
    // validations
    // req.checkBody('email', 'Email is required').notEmpty();
    // req.checkBody('email', 'Email is not valid').isEmail();
    // req.checkBody('password', 'Password is required').notEmpty();
    // const errors = req.validationErrors();
    // if (errors) return res.status(400).json(errors);
    let email = req.body.email;
    let password = req.body.password;

    let user = await DB.find({
      where: { email },
    });
    if (user) {
      if (await bcrypt.compare(password, user.password))
        return res.send({ attempt: 'passed' });
      return res.send({ attempt: 'failed', message: 'Password is not valid' });
    }
    return res.send({ attempt: 'failed', message: 'No matching record found' });
  } catch (error) {
    return res.status('500').send('Server Error');
  }
});

module.exports = router;
