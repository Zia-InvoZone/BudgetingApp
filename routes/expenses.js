const router = require('express').Router();
const { Op } = require('sequelize');
const DB = require('../models').expense;

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
